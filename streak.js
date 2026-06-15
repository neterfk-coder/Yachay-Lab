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
    tutor: { icon: "🤖", label: "Sesión con Yachay", xp: 5 },
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
      time: new Date().toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
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

  // ── PANEL COMPLETO ───────────────────────────────────────────
  function openPanel() {
    if (document.getElementById("streak-panel")) return;
    if (!state) load();
    clearTimeout(hideTimer);

    const s = state;
    const todayActs = s.history.filter((h) => true).slice(0, 8);
    const nextM = MILESTONES.find((m) => m.at > s.current);
    const xpBar = nextM
      ? Math.min(100, (s.current / nextM.at) * 100).toFixed(0)
      : 100;

    const panel = document.createElement("div");
    panel.id = "streak-panel";
    panel.className = "streak-panel-backdrop";
    panel.innerHTML = `
      <div class="streak-panel-box">

        <!-- Header -->
        <div class="sp-header">
          <div class="sp-header-left">
            <div class="sp-fire" id="sp-fire">🔥</div>
            <div>
              <div class="sp-title">Your STEM Streak</div>
              <div class="sp-sub">Real-time activity</div>
            </div>
          </div>
          <button class="sp-close" onclick="Streak.closePanel()">✕</button>
        </div>

        <!-- Current streak (big) -->
        <div class="sp-hero">
          <canvas id="streak-ring-canvas" width="140" height="140"></canvas>
          <div class="sp-hero-info">
            <div class="sp-current-num" id="sp-cur">${s.current}</div>
            <div class="sp-current-lbl">day streak</div>
            <div class="sp-best">🏆 Best: ${s.best} days</div>
          </div>
        </div>

        <!-- Stats rápidas -->
        <div class="sp-stats">
          <div class="sp-stat"><div class="sps-num" id="sps-xp">${s.xp}</div><div class="sps-lbl">XP Total</div></div>
          <div class="sp-stat"><div class="sps-num">${s.xpToday}</div><div class="sps-lbl">XP today</div></div>
          <div class="sp-stat"><div class="sps-num">${s.todayCount}</div><div class="sps-lbl">Today</div></div>
          <div class="sp-stat"><div class="sps-num">${s.total}</div><div class="sps-lbl">Total</div></div>
        </div>

        <!-- Next milestone -->
        ${
          nextM
            ? `
        <div class="sp-milestone-progress">
          <div class="smp-header">
            <span>${nextM.icon} Next milestone: ${nextM.label}</span>
            <span class="smp-count">${s.current} / ${nextM.at} days</span>
          </div>
          <div class="smp-bar"><div class="smp-fill" style="width:${xpBar}%"></div></div>
          <div class="smp-hint">${nextM.at - s.current} days to go</div>
        </div>`
            : `
        <div class="sp-milestone-progress sp-max">
          <span>👑 You've reached the top milestone! You're a STEM legend.</span>
        </div>`
        }

        <!-- Unlocked milestones -->
        <div class="sp-milestones-row">
          ${MILESTONES.map(
            (m) => `
            <div class="spm-item ${s.best >= m.at ? "earned" : ""}" title="${m.label} (${m.at} days)">
              <div class="spm-icon">${m.icon}</div>
              <div class="spm-at">${m.at}d</div>
            </div>`,
          ).join("")}
        </div>

        <!-- Recent history -->
        <div class="sp-history-label">Recent activity</div>
        <div class="sp-history" id="sp-history">
          ${
            todayActs.length
              ? todayActs
                  .map(
                    (h) => `
            <div class="sp-hist-item">
              <span class="shi-icon">${h.icon}</span>
              <div class="shi-info">
                <span class="shi-label">${h.label}</span>
                <span class="shi-time">${h.time}</span>
              </div>
              <span class="shi-xp">+${h.xp} XP</span>
            </div>`,
                  )
                  .join("")
              : '<div class="sp-empty">No activity today. Start a simulator! 🚀</div>'
          }
        </div>

        <!-- CTA -->
        <button class="sp-cta" onclick="Streak.closePanel();go('practica')">
          🎯 Hacer una pregunta ahora
        </button>
      </div>`;

    document.body.appendChild(panel);

    // Animar el ring
    setTimeout(() => {
      drawRing(s.current, s.best);
      animateFire(s.current);
    }, 100);

    // Cerrar al click fuera
    panel.addEventListener("click", (e) => {
      if (e.target === panel) closePanel();
    });
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
    // Volver a mostrar widget compacto
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

  return { register, openPanel, closePanel, getState, reset, init, syncAllUI };
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
