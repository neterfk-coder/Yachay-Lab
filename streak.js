/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — SISTEMA DE RACHA (streak.js)
   Complete real-time streak engine.
   Se activa con: Streak.register('tipo', datos)
   Sources: completed simulators, correct answers, AI tutor
═══════════════════════════════════════════════════════════════ */

const Streak = (() => {
  // ── CLAVES localStorage ──────────────────────────────────────
  const KEY = "yl_streak_v2";

  // ── Streak milestones with rewards ──────────────────────────
  const MILESTONES = [
    { at: 3, icon: "🔥", label: "On a roll!", color: "#F59E0B" },
    { at: 5, icon: "⚡", label: "Unstoppable!", color: "#EF4444" },
    { at: 10, icon: "🌟", label: "Incredible!", color: "#8B5CF6" },
    { at: 15, icon: "💎", label: "Diamond!", color: "#06B6D4" },
    { at: 25, icon: "👑", label: "STEM Legend!", color: "#F59E0B" },
    { at: 50, icon: "🏆", label: "Yachay Master!", color: "#10B981" },
  ];

  // ── Activity types ───────────────────────────────────────
  const TYPES = {
    practica: { icon: "🎯", label: "Correct answer", xp: 10 },
    simulador: { icon: "⚗️", label: "Simulator completed", xp: 15 },
    tutor: { icon: "🤖", label: "AI Tutor session", xp: 5 },
    login: { icon: "📅", label: "Daily login", xp: 2 },
  };

  // ── ESTADO en memoria ────────────────────────────────────────
  let state = null;
  let widgetEl = null;
  let hideTimer = null;
  let animRaf = null;

  // ── CARGAR / INICIALIZAR estado ──────────────────────────────
  function load() {
    try {
      state = JSON.parse(localStorage.getItem(KEY)) || fresh();
    } catch {
      state = fresh();
    }
    // Check if streak was broken (more than 24h without activity)
    checkBreak();
    save();
    return state;
  }

  function fresh() {
    return {
      current: 0, // current streak
      best: 0, // best streak ever
      total: 0, // lifetime activities
      xp: 0, // XP total acumulada
      xpToday: 0, // XP earned today
      lastActivity: null, // ISO timestamp last activity
      lastDate: null, // 'YYYY-MM-DD' del último day activo
      history: [], // last 30 activities
      todayCount: 0, // activities completed today
      milestonesHit: [], // milestones already notified
    };
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  // Check if streak was broken (no activity > 1 day)
  function checkBreak() {
    if (!state.lastDate) return;
    const last = new Date(state.lastDate);
    const now = new Date();
    const diffDays = Math.floor((now - last) / 86400000);
    if (diffDays > 1) {
      state.current = 0; // streak broken
      state.xpToday = 0;
      state.todayCount = 0;
    }
    if (diffDays >= 1) {
      state.xpToday = 0; // resetear XP del day
      state.todayCount = 0;
    }
  }

  // ── REGISTER an activity ──────────────────────────────────
  function register(type = "practica", meta = {}) {
    if (!state) load();

    const t = today();
    const xp = (TYPES[type]?.xp || 5) * (meta.correct === false ? 0 : 1);
    if (xp === 0) return; // don't count wrong answers

    // Update daily streak
    const isNewDay = state.lastDate !== t;
    if (isNewDay) {
      state.current++; // new active day = +1 streak
      state.todayCount = 0;
      state.xpToday = 0;
    }
    if (!state.lastDate) {
      state.current = 1; // primer uso
    }

    state.lastDate = t;
    state.lastActivity = new Date().toISOString();
    state.total++;
    state.todayCount++;
    state.xp += xp;
    state.xpToday += xp;
    state.best = Math.max(state.best, state.current);

    // Add to history
    state.history.unshift({
      type,
      icon: TYPES[type]?.icon || "⭐",
      label: meta.label || TYPES[type]?.label || type,
      xp,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toISOString(),
    });
    if (state.history.length > 30) state.history.pop();

    save();

    // Check milestone
    const milestone = MILESTONES.find(
      (m) => m.at === state.current && !state.milestonesHit.includes(m.at),
    );
    if (milestone) {
      state.milestonesHit.push(milestone.at);
      save();
      showMilestone(milestone);
    }

    // Show/update widget
    showWidget(type, xp, meta);
    syncAllUI();

    return state;
  }

  // ── WIDGET FLOTANTE ──────────────────────────────────────────
  function ensureWidget() {
    if (widgetEl) return widgetEl;
    widgetEl = document.createElement("div");
    widgetEl.id = "streak-widget";
    widgetEl.className = "streak-widget";
    widgetEl.innerHTML = `
      <div class="sw-main" onclick="Streak.openPanel()">
        <div class="sw-flame" id="sw-flame">🔥</div>
        <div class="sw-info">
          <div class="sw-num" id="sw-num">0</div>
          <div class="sw-lbl">streak</div>
        </div>
        <div class="sw-xp" id="sw-xp">+0 XP</div>
      </div>
      <div class="sw-bar-wrap">
        <div class="sw-bar"><div class="sw-fill" id="sw-fill"></div></div>
        <div class="sw-next" id="sw-next">Next milestone: 3</div>
      </div>`;
    document.body.appendChild(widgetEl);

    // Click en el widget abre el panel
    return widgetEl;
  }

  function showWidget(type, xp, meta) {
    const w = ensureWidget();
    const icon = TYPES[type]?.icon || "⭐";

    // Update numbers
    document.getElementById("sw-num").textContent = state.current;
    document.getElementById("sw-xp").textContent = `+${xp} XP`;

    // Next milestone
    const next = MILESTONES.find((m) => m.at > state.current);
    const remaining = next ? next.at - state.current : "∞";
    document.getElementById("sw-next").textContent = next
      ? `${next.icon} Milestone in ${remaining} more`
      : "👑 Legend!";

    // Progress bar to next milestone
    const prev = [...MILESTONES]
      .reverse()
      .find((m) => m.at <= state.current) || { at: 0 };
    const pct = next
      ? ((state.current - prev.at) / (next.at - prev.at)) * 100
      : 100;
    const fill = document.getElementById("sw-fill");
    if (fill) {
      fill.style.width = "0%";
      setTimeout(() => (fill.style.width = pct + "%"), 50);
    }

    // Flame color by streak
    const flame = document.getElementById("sw-flame");
    if (flame) {
      if (state.current >= 25) flame.textContent = "👑";
      else if (state.current >= 15) flame.textContent = "💎";
      else if (state.current >= 10) flame.textContent = "🌟";
      else if (state.current >= 5) flame.textContent = "⚡";
      else if (state.current >= 3) flame.textContent = "🔥";
      else flame.textContent = icon;
    }

    // Mostrar con animación
    w.classList.remove("sw-hidden");
    w.classList.add("sw-pop");
    setTimeout(() => w.classList.remove("sw-pop"), 600);

    // Auto-ocultar después de 4 segundos si no hay panel abierto
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!document.getElementById("streak-panel"))
        w.classList.add("sw-shrink");
    }, 4000);
  }

  // ── NOTIFICACIÓN DE HITO ─────────────────────────────────────
  function showMilestone(m) {
    const el = document.createElement("div");
    el.className = "streak-milestone";
    el.innerHTML = `
      <div class="sm-icon">${m.icon}</div>
      <div class="sm-body">
        <div class="sm-title">${m.label}</div>
        <div class="sm-sub">¡${m.at} day streak! +50 XP bonus 🎉</div>
      </div>`;
    el.style.setProperty("--mc", m.color);
    document.body.appendChild(el);

    // Confeti ligero
    spawnConfetti(m.color);

    // XP bonus
    state.xp += 50;
    save();

    setTimeout(() => {
      el.classList.add("sm-out");
      setTimeout(() => el.remove(), 500);
    }, 4000);
  }

  // ── CONFETI ──────────────────────────────────────────────────
  function spawnConfetti(color) {
    const colors = [color, "#F59E0B", "#10B981", "#8B5CF6", "#EF4444"];
    for (let i = 0; i < 30; i++) {
      const c = document.createElement("div");
      c.className = "streak-confetti";
      c.style.cssText = `
        left:${Math.random() * 100}vw;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation-delay:${Math.random() * 0.6}s;
        width:${Math.random() * 8 + 4}px;
        height:${Math.random() * 8 + 4}px;
        border-radius:${Math.random() > 0.5 ? "50%" : "3px"};`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2500);
    }
  }

  // ── PANEL COMPLETO REDISEÑADO ────────────────────────────────
  function openPanel() {
    if (document.getElementById("streak-panel")) return;
    if (!state) load();
    clearTimeout(hideTimer);

    const s = state;
    const nextM = MILESTONES.find((m) => m.at > s.current);
    const xpBar = nextM
      ? Math.min(100, (s.current / nextM.at) * 100).toFixed(0)
      : 100;
    const weekData = getWeekData();

    const panel = document.createElement("div");
    panel.id = "streak-panel";
    panel.className = "streak-panel-backdrop";
    panel.innerHTML = `
      <div class="streak-panel-box">

        <!-- Header -->
        <div class="sp-header">
          <div class="sp-header-left">
            <div class="sp-fire-ico">🔥</div>
            <div>
              <div class="sp-title">Your STEM Streak</div>
              <div class="sp-sub">Real-time activity tracker</div>
            </div>
          </div>
          <button class="sp-close" onclick="Streak.closePanel()">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Hero: Ring + Stats -->
        <div class="sp-hero">
          <div class="sp-ring-wrap">
            <canvas id="streak-ring-canvas" width="130" height="130"></canvas>
            <div class="sp-ring-center">
              <div class="sp-ring-num" id="sp-cur">${s.current}</div>
              <div class="sp-ring-lbl">days</div>
            </div>
          </div>
          <div class="sp-hero-stats">
            <div class="sp-hstat">
              <div class="sp-hstat-num">${s.best}</div>
              <div class="sp-hstat-lbl">🏆 Best streak</div>
            </div>
            <div class="sp-hstat-div"></div>
            <div class="sp-hstat">
              <div class="sp-hstat-num">${s.xp}</div>
              <div class="sp-hstat-lbl">⭐ Total XP</div>
            </div>
            <div class="sp-hstat-div"></div>
            <div class="sp-hstat">
              <div class="sp-hstat-num" style="color:#F59E0B">${s.xpToday}</div>
              <div class="sp-hstat-lbl">⚡ XP today</div>
            </div>
            <div class="sp-hstat-div"></div>
            <div class="sp-hstat">
              <div class="sp-hstat-num">${s.total}</div>
              <div class="sp-hstat-lbl">📊 Activities</div>
            </div>
          </div>
        </div>

        <!-- Weekly Calendar -->
        <div class="sp-week">
          <div class="sp-week-header">
            <span class="sp-week-title">📅 This week</span>
            <span class="sp-week-sub">${weekData.filter((d) => d.active).length} / 7 days active</span>
          </div>
          <div class="sp-week-grid">
            ${weekData
              .map(
                (d) => `
              <div class="sp-day ${d.isToday ? "sp-day-today" : ""} ${d.active ? "sp-day-active" : ""} ${d.isFuture ? "sp-day-future" : ""}">
                <div class="sp-day-name">${d.name}</div>
                <div class="sp-day-ico">${d.active ? "🔥" : d.isToday ? "⭕" : d.isFuture ? "·" : "✗"}</div>
                <div class="sp-day-xp">${d.xp > 0 ? "+" + d.xp : ""}</div>
              </div>`,
              )
              .join("")}
          </div>
        </div>

        <!-- Next milestone -->
        ${
          nextM
            ? `
        <div class="sp-milestone-wrap">
          <div class="sp-milestone-header">
            <span class="sp-milestone-icon">${nextM.icon}</span>
            <div>
              <div class="sp-milestone-name">Next: ${nextM.label}</div>
              <div class="sp-milestone-days">${nextM.at - s.current} more day${nextM.at - s.current !== 1 ? "s" : ""} to go</div>
            </div>
            <span class="sp-milestone-badge">${s.current}/${nextM.at}</span>
          </div>
          <div class="sp-milestone-bar">
            <div class="sp-milestone-fill" style="width:${xpBar}%;background:${nextM.color}"></div>
          </div>
        </div>`
            : `
        <div class="sp-milestone-wrap sp-milestone-max">
          <span>👑 You've reached the top milestone! You're a STEM legend.</span>
        </div>`
        }

        <!-- Milestones row -->
        <div class="sp-milestones-row">
          ${MILESTONES.map(
            (m) => `
            <div class="spm-item ${s.best >= m.at ? "spm-earned" : ""}" title="${m.label} — ${m.at} days">
              <div class="spm-icon">${m.icon}</div>
              <div class="spm-at">${m.at}d</div>
            </div>`,
          ).join("")}
        </div>

        <!-- Recent activity -->
        <div class="sp-history-title">
          <span>Recent activity</span>
          <span class="sp-hist-count">${s.todayCount} today</span>
        </div>
        <div class="sp-history" id="sp-history">
          ${
            s.history.slice(0, 8).length
              ? s.history
                  .slice(0, 8)
                  .map(
                    (h) => `
            <div class="sp-hist-item">
              <div class="shi-icon-wrap">${h.icon}</div>
              <div class="shi-info">
                <div class="shi-label">${h.label}</div>
                <div class="shi-time">${h.time}</div>
              </div>
              <div class="shi-xp">+${h.xp} XP</div>
            </div>`,
                  )
                  .join("")
              : '<div class="sp-empty">No activity today. Start a simulator! 🚀</div>'
          }
        </div>

        <!-- CTA -->
        <button class="sp-cta" onclick="Streak.closePanel();go('practica')">
          🎯 Practice now →
        </button>

      </div>`;

    document.body.appendChild(panel);
    panel.addEventListener("click", (e) => {
      if (e.target === panel) closePanel();
    });

    setTimeout(() => {
      drawRing(s.current, s.best);
      animateFire(s.current);
    }, 120);
  }

  // ── DATOS DE LA SEMANA ────────────────────────────────────────
  function getWeekData() {
    const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const result = [];

    // Lunes a domingo de la semana actual
    const day = now.getDay(); // 0=Sun
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const ds = d.toISOString().slice(0, 10);
      const isFuture = ds > today;
      const isToday = ds === today;

      // Buscar XP del día en historial
      const dayActs = (state?.history || []).filter((h) => {
        if (!h.date) return false;
        return h.date.slice(0, 10) === ds;
      });
      const xp = dayActs.reduce((a, h) => a + (h.xp || 0), 0);
      const active =
        !isFuture &&
        (dayActs.length > 0 ||
          (isToday && (state?.todayCount || 0) > 0) ||
          state?.lastDate === ds);

      result.push({
        name: DAY_NAMES[d.getDay()],
        date: ds,
        isToday,
        isFuture,
        active,
        xp,
      });
    }
    return result;
  }

  // ── RING CIRCULAR (canvas) ───────────────────────────────────
  function drawRing(current, best) {
    const cv = document.getElementById("streak-ring-canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const cx = 70,
      cy = 70,
      r = 54,
      lw = 10;
    ctx.clearRect(0, 0, 140, 140);

    // Fondo del ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#E4E8F5";
    ctx.lineWidth = lw;
    ctx.stroke();

    // Current streak
    const pct = best > 0 ? Math.min(current / best, 1) : current > 0 ? 1 : 0;
    const grad = ctx.createLinearGradient(0, 0, 140, 140);
    grad.addColorStop(0, "#5A5FE0");
    grad.addColorStop(1, "#F59E0B");
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2);
    ctx.strokeStyle = grad;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.stroke();

    // Número central
    ctx.fillStyle = "#0A0E1A";
    ctx.font = "bold 28px Plus Jakarta Sans";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(current, cx, cy - 4);
    ctx.font = "11px Plus Jakarta Sans";
    ctx.fillStyle = "#8892B0";
    ctx.fillText("days", cx, cy + 14);
  }

  // ── LLAMA animada ────────────────────────────────────────────
  function animateFire(current) {
    const el = document.getElementById("sp-fire");
    if (!el) return;
    const fires =
      current >= 25
        ? "👑"
        : current >= 15
          ? "💎"
          : current >= 10
            ? "🌟"
            : current >= 5
              ? "⚡"
              : current >= 3
                ? "🔥"
                : "✨";
    el.textContent = fires;
    el.classList.add("fire-pulse");
  }

  function closePanel() {
    const p = document.getElementById("streak-panel");
    if (p) {
      p.classList.add("sp-out");
      setTimeout(() => p.remove(), 300);
    }
    // Back a mostrar widget compacto
    const w = document.getElementById("streak-widget");
    if (w) {
      w.classList.remove("sw-shrink", "sw-hidden");
    }
  }

  // ── SINCRONIZAR toda la UI ───────────────────────────────────
  function syncAllUI() {
    // Perfil
    const ps = state;
    const rachaEl = document.getElementById("ps-racha");
    if (rachaEl) rachaEl.textContent = ps.current;

    // Home Elo (XP)
    const xpEl = document.getElementById("home-xp");
    if (xpEl) xpEl.textContent = ps.xp;

    // Barra racha en perfil si existe
    const streakBarEl = document.getElementById("profile-streak-bar");
    if (streakBarEl)
      streakBarEl.style.width = Math.min(100, (ps.current / 50) * 100) + "%";
  }

  // ── API PÚBLICA ──────────────────────────────────────────────
  function getState() {
    if (!state) load();
    return state;
  }
  function reset() {
    state = fresh();
    save();
    syncAllUI();
    const w = document.getElementById("streak-widget");
    if (w) w.remove();
    widgetEl = null;
  }

  // Inicializar al cargar
  function init() {
    load();
    ensureWidget();
    // Widget siempre visible pero compacto al inicio
    const w = document.getElementById("streak-widget");
    if (w && state.current > 0) {
      document.getElementById("sw-num").textContent = state.current;
      const flame = document.getElementById("sw-flame");
      if (flame) {
        flame.textContent =
          state.current >= 25
            ? "👑"
            : state.current >= 15
              ? "💎"
              : state.current >= 10
                ? "🌟"
                : state.current >= 5
                  ? "⚡"
                  : state.current >= 3
                    ? "🔥"
                    : "🎯";
      }
      const next = MILESTONES.find((m) => m.at > state.current);
      const prev = [...MILESTONES]
        .reverse()
        .find((m) => m.at <= state.current) || { at: 0 };
      const pct = next
        ? ((state.current - prev.at) / (next.at - prev.at)) * 100
        : 100;
      const fill = document.getElementById("sw-fill");
      if (fill) fill.style.width = pct + "%";
      document.getElementById("sw-next").textContent = next
        ? `${next.icon} Milestone in ${next.at - state.current} more`
        : "👑 Legend!";
    } else if (w) {
      w.classList.add("sw-shrink");
    }
    syncAllUI();
    // Login diario
    register("login");
  }

  // ── BANNER SEMANAL EN HOME ────────────────────────────────────
  function renderWeeklyBanner() {
    const banner = document.getElementById("wsb-days");
    const countEl = document.getElementById("wsb-count");
    const subEl = document.getElementById("wsb-sub");
    if (!banner) return;
    if (!state) load();

    const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));

    let html = "";
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const ds = d.toISOString().slice(0, 10);
      const isFuture = ds > today;
      const isToday = ds === today;
      const dayActs = (state.history || []).filter(
        (h) => h.date && h.date.slice(0, 10) === ds,
      );
      const active =
        !isFuture &&
        (dayActs.length > 0 ||
          (isToday && (state.todayCount || 0) > 0) ||
          state.lastDate === ds);
      html += `
        <div class="wsb-day ${active ? "wsb-active" : ""} ${isToday ? "wsb-today" : ""} ${isFuture ? "wsb-future" : ""}">
          <div class="wsb-day-name">${DAY_NAMES[d.getDay()]}</div>
          <div class="wsb-day-dot">${active ? "🔥" : isToday ? "○" : "·"}</div>
        </div>`;
    }
    banner.innerHTML = html;

    // Actualizar contador y subtítulo
    const cur = state.current || 0;
    if (countEl) countEl.textContent = cur;

    if (subEl) {
      if (cur === 0) subEl.textContent = "Start today — do any activity!";
      else if (cur < 3) subEl.textContent = `${cur} day streak — keep going!`;
      else if (cur < 7)
        subEl.textContent = `🔥 ${cur} days strong — almost a week!`;
      else if (cur < 14) subEl.textContent = `⚡ ${cur} days — unstoppable!`;
      else subEl.textContent = `👑 ${cur} days — STEM legend!`;
    }
  }

  return {
    register,
    openPanel,
    closePanel,
    getState,
    reset,
    init,
    syncAllUI,
    renderWeeklyBanner,
  };
})();

// ── INICIALIZAR automáticamente cuando el DOM esté listo ──────
document.addEventListener("DOMContentLoaded", () => {
  // Solo inicializar si ya hay sesión activa (app visible)
  const checkAndInit = () => {
    const app = document.getElementById("app");
    if (app && app.style.display !== "none") {
      Streak.init();
    } else {
      setTimeout(checkAndInit, 500);
    }
  };
  setTimeout(checkAndInit, 800);
});
