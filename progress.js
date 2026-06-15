/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — PROGRESS, SHARE & AUTH (progress.js)
   1. ProgressChart — gráfica de progreso Elo con Canvas
   2. ShareAchievement — compartir logro como imagen PNG
   3. SupaAuth — login/registro con Supabase Auth real
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   1. PROGRESS CHART — Gráfica de Elo semanal
════════════════════════════════════════════════════════════ */
const ProgressChart = (() => {
  const ELO_HISTORY_KEY = "yl_elo_history";
  let currentTopic = "f";
  let animRaf = null;

  // Save punto de Elo en el historial
  function record(topic, elo) {
    const h = JSON.parse(localStorage.getItem(ELO_HISTORY_KEY) || "{}");
    if (!h[topic]) h[topic] = [];
    h[topic].push({ elo, ts: Date.now() });
    // Máximo 200 puntos por tema
    if (h[topic].length > 200) h[topic] = h[topic].slice(-200);
    localStorage.setItem(ELO_HISTORY_KEY, JSON.stringify(h));
  }

  // Obtener historial agrupado por día
  function getHistory(topic) {
    const h = JSON.parse(localStorage.getItem(ELO_HISTORY_KEY) || "{}");
    const raw = h[topic] || [];
    if (!raw.length) return [];

    // Agrupar por día — tomar el último Elo de cada día
    const byDay = {};
    raw.forEach(({ elo, ts }) => {
      const day = new Date(ts).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      byDay[day] = elo;
    });

    // Convertir a array ordenado (últimos 14 días)
    const entries = Object.entries(byDay);
    return entries.slice(-14);
  }

  // Renderizar gráfica
  function render(topic, btn) {
    currentTopic = topic || currentTopic;

    // Refresh filtro activo
    if (btn) {
      document
        .querySelectorAll(".prog-filter")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    const history = getHistory(currentTopic);
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    const S_elo = JSON.parse(localStorage.getItem("yl_elo") || "{}");
    const topicElo = { f: "elo_f", q: "elo_q", m: "elo_m" };

    const current = S_elo[currentTopic] || 1000;
    const best = ps.maxElo || current;
    const games = ps.pregs || 0;
    const correct = JSON.parse(localStorage.getItem("yl_correct_count") || "0");
    const winRate = games > 0 ? Math.round((correct / games) * 100) : 0;

    setText("prog-current", current);
    setText("prog-best", best);
    setText("prog-games", games);
    setText("prog-win", winRate + "%");

    // Milestones
    renderMilestones(current);

    const cv = document.getElementById("elo-chart");
    const empty = document.getElementById("prog-empty");
    if (!cv) return;

    if (!history.length) {
      cv.style.display = "none";
      if (empty) empty.style.display = "flex";
      return;
    }
    cv.style.display = "block";
    if (empty) empty.style.display = "none";

    // Agregar punto actual si no hay historial del hoy
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!history.find(([d]) => d === today)) history.push([today, current]);

    const ctx = cv.getContext("2d");
    cv.width = cv.parentElement.clientWidth || 700;
    cv.height = 200;
    const W = cv.width,
      H = cv.height;
    const pad = { top: 20, right: 20, bottom: 36, left: 52 };
    const gW = W - pad.left - pad.right;
    const gH = H - pad.top - pad.bottom;

    const vals = history.map(([, v]) => v);
    const minV = Math.max(600, Math.min(...vals) - 50);
    const maxV = Math.min(1500, Math.max(...vals) + 50);

    const xScale = (i) => pad.left + (i / (history.length - 1 || 1)) * gW;
    const yScale = (v) => pad.top + gH - ((v - minV) / (maxV - minV)) * gH;

    ctx.clearRect(0, 0, W, H);

    // Gradiente de fondo de la gráfica
    const gradient = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
    gradient.addColorStop(0, "rgba(90,95,224,.2)");
    gradient.addColorStop(1, "rgba(90,95,224,.0)");

    // Líneas de cuadrícula horizontales
    ctx.strokeStyle = "#E4E8F5";
    ctx.lineWidth = 0.5;
    [0, 0.25, 0.5, 0.75, 1].forEach((p) => {
      const y = pad.top + gH * (1 - p);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
      const label = Math.round(minV + (maxV - minV) * p);
      ctx.fillStyle = "#8892B0";
      ctx.font = "10px Plus Jakarta Sans";
      ctx.textAlign = "right";
      ctx.fillText(label, pad.left - 6, y + 3);
    });

    // Área rellena
    ctx.beginPath();
    history.forEach(([, v], i) => {
      const x = xScale(i),
        y = yScale(v);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(xScale(history.length - 1), H - pad.bottom);
    ctx.lineTo(xScale(0), H - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Línea principal animada
    cancelAnimationFrame(animRaf);
    let progress = 0;
    function drawLine() {
      // Limpiar solo la zona de la línea
      ctx.clearRect(pad.left - 1, 0, gW + 2, H - pad.bottom + 1);
      // Redibujar área
      ctx.beginPath();
      history.forEach(([, v], i) => {
        const x = xScale(i),
          y = yScale(v);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(xScale(history.length - 1), H - pad.bottom);
      ctx.lineTo(xScale(0), H - pad.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Línea
      const limit = Math.floor(progress * (history.length - 1));
      ctx.beginPath();
      ctx.strokeStyle = "#5A5FE0";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      history.slice(0, limit + 1).forEach(([, v], i) => {
        const x = xScale(i),
          y = yScale(v);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Puntos
      history.slice(0, limit + 1).forEach(([, v], i) => {
        const x = xScale(i),
          y = yScale(v);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#5A5FE0";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      progress = Math.min(1, progress + 0.06);
      if (progress < 1) animRaf = requestAnimationFrame(drawLine);
      else {
        // Etiquetas del eje X
        ctx.fillStyle = "#8892B0";
        ctx.font = "10px Plus Jakarta Sans";
        ctx.textAlign = "center";
        const step = Math.max(1, Math.floor(history.length / 6));
        history.forEach(([d], i) => {
          if (i % step === 0 || i === history.length - 1) {
            ctx.fillText(d, xScale(i), H - pad.bottom + 16);
          }
        });
        // Punto y valor del último
        const last = history[history.length - 1];
        const lx = xScale(history.length - 1),
          ly = yScale(last[1]);
        ctx.beginPath();
        ctx.arc(lx, ly, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#5A5FE0";
        ctx.fill();
        ctx.fillStyle = "#0A0E1A";
        ctx.font = "bold 11px Plus Jakarta Sans";
        ctx.textAlign = "center";
        ctx.fillText(last[1], lx, ly - 12);
      }
    }
    drawLine();
  }

  function renderMilestones(elo) {
    const milestones = [
      { v: 1000, icon: "🌱", lbl: "Beginner" },
      { v: 1050, icon: "🥉", lbl: "Bronze" },
      { v: 1100, icon: "🥈", lbl: "Silver" },
      { v: 1200, icon: "🥇", lbl: "Gold" },
      { v: 1300, icon: "🏅", lbl: "Platinum" },
      { v: 1400, icon: "💎", lbl: "Diamond" },
    ];
    const el = document.getElementById("pm-row");
    if (!el) return;
    el.innerHTML = milestones
      .map(
        (m) => `
      <div class="pm-item ${elo >= m.v ? "pm-reached" : ""}">
        <div class="pm-ico">${m.icon}</div>
        <div class="pm-val">${m.v}</div>
        <div class="pm-name">${m.lbl}</div>
        ${elo >= m.v ? '<div class="pm-check">✓</div>' : ""}
      </div>`,
      )
      .join("");
  }

  function setText(id, v) {
    const e = document.getElementById(id);
    if (e) e.textContent = v;
  }

  // Hook — llamar cada vez que cambia el Elo
  function hookElo() {
    const origAnswer = window.answer;
    // Se llama desde app.js con el resultado de cada pregunta
  }

  return { render, record, renderMilestones };
})();

/* ════════════════════════════════════════════════════════════
   2. SHARE ACHIEVEMENT — Compartir logro como imagen PNG
════════════════════════════════════════════════════════════ */
const ShareAchievement = (() => {
  function generate(achievement, userName) {
    const cv = document.getElementById("share-canvas");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = 600,
      H = 340;
    cv.width = W;
    cv.height = H;

    // Fondo degradado oscuro
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#080D1E");
    bg.addColorStop(1, "#0F1735");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Orbe de luz
    const orb = ctx.createRadialGradient(
      W * 0.3,
      H * 0.4,
      0,
      W * 0.3,
      H * 0.4,
      200,
    );
    orb.addColorStop(0, "rgba(90,95,224,.2)");
    orb.addColorStop(1, "rgba(90,95,224,0)");
    ctx.fillStyle = orb;
    ctx.fillRect(0, 0, W, H);

    // Borde brillante
    ctx.strokeStyle = "rgba(90,95,224,.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, 8, 8, W - 16, H - 16, 20);
    ctx.stroke();

    // Ícono del logro (grande)
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText(achievement.ico, W / 2, 110);

    // Texto "Achievement Unlocked"
    ctx.font = "600 13px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "rgba(165,180,255,.7)";
    ctx.letterSpacing = "0.15em";
    ctx.fillText("ACHIEVEMENT UNLOCKED", W / 2, 150);

    // Nombre del logro
    ctx.font = "bold 28px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(achievement.name, W / 2, 190);

    // Descripción
    ctx.font = "14px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.55)";
    wrapText(ctx, achievement.desc, W / 2, 220, W - 80, 22);

    // XP ganada
    ctx.font = "bold 14px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "#10B981";
    ctx.fillText(`+${achievement.xp} XP`, W / 2, 270);

    // Nombre del usuario
    ctx.font = "13px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.4)";
    ctx.fillText(userName || "Yachay Lab Student", W / 2, 295);

    // Logo Yachay
    ctx.font = "bold 13px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "rgba(165,180,255,.5)";
    ctx.fillText("⚗️ Yachay Lab · yachaylab.app", W / 2, 322);

    // Descargar
    const link = document.createElement("a");
    link.download = `yachay-${achievement.id}.png`;
    link.href = cv.toDataURL("image/png");
    link.click();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxW, lineH) {
    const words = text.split(" ");
    let line = "";
    words.forEach((word) => {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line.trim(), x, y);
        line = word + " ";
        y += lineH;
      } else {
        line = test;
      }
    });
    ctx.fillText(line.trim(), x, y);
  }

  return { generate };
})();

/* ════════════════════════════════════════════════════════════
   3. SUPABASE AUTH — Login/Registro real con Supabase
════════════════════════════════════════════════════════════ */
const SupaAuth = (() => {
  // ── Verificar si Supabase Auth está disponible ──────────────
  function available() {
    return window._supa && window._supa.auth;
  }

  // ── REGISTRO ────────────────────────────────────────────────
  async function signUp(email, password, name) {
    if (!available()) return { error: { message: "Supabase not connected" } };
    const { data, error } = await window._supa.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (!error && data.user) {
      // Crear perfil en la tabla profiles
      await window._supa.from("profiles").upsert({
        id: data.user.id,
        name,
        avatar: "🧑‍🎓",
        is_guest: false,
        created_at: new Date().toISOString(),
      });
    }
    return { data, error };
  }

  // ── LOGIN ────────────────────────────────────────────────────
  async function signIn(email, password) {
    if (!available()) return { error: { message: "Supabase not connected" } };
    const { data, error } = await window._supa.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  // ── LOGOUT ──────────────────────────────────────────────────
  async function signOut() {
    if (!available()) return;
    await window._supa.auth.signOut();
  }

  // ── SESIÓN ACTUAL ────────────────────────────────────────────
  async function getSession() {
    if (!available()) return null;
    const { data } = await window._supa.auth.getSession();
    return data?.session || null;
  }

  // ── CARGAR PERFIL DESDE SUPABASE ────────────────────────────
  async function loadProfile(userId) {
    if (!available()) return null;
    const { data } = await window._supa
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return data;
  }

  // ── SINCRONIZAR PROGRESO LOCAL → SUPABASE ───────────────────
  async function syncProgress(userId) {
    if (!available()) return;
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    const S_elo = JSON.parse(localStorage.getItem("yl_elo") || "{}");
    await window._supa.from("profiles").upsert(
      {
        id: userId,
        max_elo: ps.maxElo || 1000,
        sims: ps.sims || 0,
        pregs: ps.pregs || 0,
        xp: st.xp || 0,
        streak: st.current || 0,
        best_streak: st.best || 0,
        last_active: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
  }

  return { signUp, signIn, signOut, getSession, loadProfile, syncProgress };
})();

/* ════════════════════════════════════════════════════════════
   HOOKS — Connect todo al sistema existente
════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // ── Interceptar doLogin para intentar Supabase Auth primero ──
  const _origLogin = window.doLogin;
  window.doLogin = async function () {
    const email =
      document.getElementById("l-email")?.value.trim().toLowerCase() || "";
    const pass = document.getElementById("l-pass")?.value || "";
    const err = document.getElementById("login-err");

    if (!email || !pass) {
      if (err) err.textContent = "Please fill in all fields.";
      return;
    }

    // Intentar Supabase Auth
    if (SupaAuth.available()) {
      const btn = document.querySelector("#form-login .btn-auth");
      if (btn) {
        btn.textContent = "Signing in...";
        btn.disabled = true;
      }
      const { data, error } = await SupaAuth.signIn(email, pass);
      if (btn) {
        btn.textContent = "Sign in";
        btn.disabled = false;
      }

      if (!error && data.user) {
        const user = data.user;
        const profile = await SupaAuth.loadProfile(user.id);
        const name =
          profile?.name || user.user_metadata?.name || email.split("@")[0];
        localStorage.setItem(
          "yl_session",
          JSON.stringify({
            email,
            name,
            guest: false,
            supaId: user.id,
          }),
        );
        // Sincronizar progreso
        await SupaAuth.syncProgress(user.id);
        launchApp({ email, name, guest: false });
        return;
      }
      // Si falla Supabase, intentar localStorage
      if (error && error.message !== "Supabase not connected") {
        if (err)
          err.textContent =
            error.message === "Invalid login credentials"
              ? "Incorrect email or password."
              : error.message;
        return;
      }
    }
    // Fallback localStorage
    if (_origLogin) _origLogin();
  };

  // ── Interceptar doRegister para usar Supabase Auth ───────────
  const _origRegister = window.doRegister;
  window.doRegister = async function () {
    const name = document.getElementById("r-name")?.value.trim() || "";
    const email =
      document.getElementById("r-email")?.value.trim().toLowerCase() || "";
    const pass = document.getElementById("r-pass")?.value || "";
    const pass2 = document.getElementById("r-pass2")?.value || "";
    const err = document.getElementById("reg-err");

    if (!name || !email || !pass || !pass2) {
      if (err) err.textContent = "Please fill in all fields.";
      return;
    }
    if (!email.includes("@")) {
      if (err) err.textContent = "Enter a valid email.";
      return;
    }
    if (pass.length < 6) {
      if (err) err.textContent = "Password must be at least 6 characters.";
      return;
    }
    if (pass !== pass2) {
      if (err) err.textContent = "Passwords do not match.";
      return;
    }

    if (SupaAuth.available()) {
      const btn = document.querySelector("#form-register .btn-auth");
      if (btn) {
        btn.textContent = "Creating account...";
        btn.disabled = true;
      }
      const { data, error } = await SupaAuth.signUp(email, pass, name);
      if (btn) {
        btn.textContent = "Create free account";
        btn.disabled = false;
      }

      if (!error && data.user) {
        localStorage.setItem(
          "yl_session",
          JSON.stringify({
            email,
            name,
            guest: false,
            supaId: data.user.id,
          }),
        );
        showToast("🎉 Account created! Welcome, " + name, 3500);
        launchApp({ email, name, guest: false });
        return;
      }
      if (error) {
        if (err)
          err.textContent = error.message.includes("already registered")
            ? "That email is already registered."
            : error.message;
        return;
      }
    }
    // Fallback localStorage
    if (_origRegister) _origRegister();
  };

  // ── Interceptar doLogout para cerrar sesión en Supabase ──────
  const _origLogout = window.doLogout;
  window.doLogout = async function () {
    if (SupaAuth.available()) await SupaAuth.signOut();
    if (_origLogout) _origLogout();
  };

  // ── Auto-login si hay sesión de Supabase activa ──────────────
  setTimeout(async () => {
    if (!SupaAuth.available()) return;
    const session = await SupaAuth.getSession();
    if (session && !localStorage.getItem("yl_session")) {
      const user = session.user;
      const profile = await SupaAuth.loadProfile(user.id);
      const name =
        profile?.name || user.user_metadata?.name || user.email.split("@")[0];
      localStorage.setItem(
        "yl_session",
        JSON.stringify({
          email: user.email,
          name,
          guest: false,
          supaId: user.id,
        }),
      );
      launchApp({ email: user.email, name, guest: false });
    }
  }, 1500);

  // ── Registrar Elo en historial después de cada pregunta ──────
  document.addEventListener("eloUpdated", (e) => {
    if (e.detail) ProgressChart.record(e.detail.topic, e.detail.elo);
  });

  // ── showPTab extendido para cargar gráfica ───────────────────
  const _origShowPTab = window.showPTab;
  window.showPTab = function (tab, btn) {
    if (_origShowPTab) _origShowPTab(tab, btn);
    if (tab === "progress") {
      setTimeout(() => ProgressChart.render(null, null), 100);
    }
  };
});
