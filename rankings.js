/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — RANKINGS & LOGROS (rankings.js)
   Ranking global simulado con localStorage compartido +
   sistema de 30 logros con animaciones y categorías.
   Listo para conectar a Supabase (ver TODO markers).
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   PARTE 1 — RANKINGS
════════════════════════════════════════════════════════════ */
const Rankings = (() => {
  // ── CLAVE de storage compartido ──────────────────────────────
  // TODO: Reemplazar con Supabase tabla "rankings" cuando esté lista
  const GLOBAL_KEY = "yl_global_ranking";
  const MY_KEY = "yl_session";

  let currentFilter = "elo";
  let allUsers = [];
  let refreshTimer = null;

  // ── DATOS DEMO (se mezclan con usuarios reales del device) ───
  const DEMO_USERS = [
    {
      id: "demo_1",
      name: "Valentina R.",
      avatar: "👩‍🔬",
      flag: "🇵🇪",
      country: "Perú",
      elo: 1387,
      racha: 14,
      xp: 3240,
      sims: 47,
      pregs: 89,
    },
    {
      id: "demo_2",
      name: "Carlos M.",
      avatar: "👨‍💻",
      flag: "🇲🇽",
      country: "México",
      elo: 1352,
      racha: 9,
      xp: 2890,
      sims: 39,
      pregs: 72,
    },
    {
      id: "demo_3",
      name: "Sofía L.",
      avatar: "🦋",
      flag: "🇨🇴",
      country: "Colombia",
      elo: 1318,
      racha: 21,
      xp: 2670,
      sims: 35,
      pregs: 103,
    },
    {
      id: "demo_4",
      name: "Andrés T.",
      avatar: "🚀",
      flag: "🇦🇷",
      country: "Argentina",
      elo: 1290,
      racha: 7,
      xp: 2100,
      sims: 28,
      pregs: 61,
    },
    {
      id: "demo_5",
      name: "Lucía F.",
      avatar: "🌟",
      flag: "🇧🇷",
      country: "Brasil",
      elo: 1265,
      racha: 12,
      xp: 1980,
      sims: 31,
      pregs: 55,
    },
    {
      id: "demo_6",
      name: "Diego S.",
      avatar: "⚡",
      flag: "🇵🇪",
      country: "Perú",
      elo: 1241,
      racha: 5,
      xp: 1750,
      sims: 22,
      pregs: 44,
    },
    {
      id: "demo_7",
      name: "Isabella K.",
      avatar: "🧪",
      flag: "🇨🇱",
      country: "Chile",
      elo: 1218,
      racha: 3,
      xp: 1540,
      sims: 19,
      pregs: 38,
    },
    {
      id: "demo_8",
      name: "Mateo P.",
      avatar: "🔭",
      flag: "🇪🇨",
      country: "Ecuador",
      elo: 1195,
      racha: 8,
      xp: 1320,
      sims: 16,
      pregs: 29,
    },
    {
      id: "demo_9",
      name: "Camila V.",
      avatar: "💎",
      flag: "🇵🇪",
      country: "Perú",
      elo: 1170,
      racha: 2,
      xp: 1100,
      sims: 13,
      pregs: 22,
    },
    {
      id: "demo_10",
      name: "Sebastián O.",
      avatar: "🔬",
      flag: "🇺🇾",
      country: "Uruguay",
      elo: 1148,
      racha: 6,
      xp: 980,
      sims: 11,
      pregs: 18,
    },
    {
      id: "demo_11",
      name: "Gabriela M.",
      avatar: "🌈",
      flag: "🇻🇪",
      country: "Venezuela",
      elo: 1124,
      racha: 4,
      xp: 860,
      sims: 9,
      pregs: 15,
    },
    {
      id: "demo_12",
      name: "Felipe A.",
      avatar: "🎯",
      flag: "🇧🇴",
      country: "Bolivia",
      elo: 1098,
      racha: 1,
      xp: 720,
      sims: 7,
      pregs: 11,
    },
  ];

  // ── OBTENER usuario actual ────────────────────────────────────
  function getCurrentUser() {
    try {
      const ses = JSON.parse(localStorage.getItem(MY_KEY) || "{}");
      const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
      const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
      const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
      const S_elo = JSON.parse(localStorage.getItem("yl_elo") || "{}");

      const maxElo = Math.max(
        ps.maxElo || 1000,
        S_elo.f || 1000,
        S_elo.q || 1000,
        S_elo.m || 1000,
      );

      return {
        id: ses.guestId || ses.email || "me",
        name:
          prof.name ||
          ses.name ||
          (ses.guest ? `Invitado ${ses.shortId || ""}` : "Tú"),
        avatar: prof.avatar || ses.flag || "👤",
        flag: ses.flag || "🌐",
        country: ses.country || prof.country || "—",
        elo: maxElo,
        racha: st.current || ps.racha || 0,
        xp: st.xp || 0,
        sims: ps.sims || 0,
        pregs: ps.pregs || 0,
        isMe: true,
      };
    } catch {
      return null;
    }
  }

  // ── CARGAR todos los usuarios (Supabase primero, demo como fallback) ──────
  async function loadUsers() {
    const me = getCurrentUser();
    // Guardar "yo" en Supabase
    if (me) SupaSync.syncProfile();

    // Intentar cargar desde Supabase
    if (window._supa) {
      try {
        const data = await SupaSync.fetchRanking("elo", 50);
        if (data && data.length > 0) {
          const realIds = new Set(data.map((u) => u.id));
          const demoFiltered = DEMO_USERS.filter((d) => !realIds.has(d.id));
          // Marcar el usuario actual
          allUsers = data.map((u) => ({ ...u, isMe: u.id === me?.id }));
          // Solo agregar demos si hay pocos usuarios reales
          if (data.length < 5) allUsers = [...allUsers, ...demoFiltered];
          return allUsers;
        }
      } catch (e) {
        console.warn("Ranking fetch failed, using local:", e);
      }
    }

    // Fallback local
    if (me) {
      const global = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}");
      global[me.id] = { ...me, lastSeen: new Date().toISOString() };
      localStorage.setItem(GLOBAL_KEY, JSON.stringify(global));
    }
    const stored = JSON.parse(localStorage.getItem(GLOBAL_KEY) || "{}");
    const realUsers = Object.values(stored).map((u) => ({
      ...u,
      isMe: u.id === me?.id,
    }));
    const realIds = new Set(realUsers.map((u) => u.id));
    const demoFiltered = DEMO_USERS.filter((d) => !realIds.has(d.id));
    allUsers = [...realUsers, ...demoFiltered];
    return allUsers;
  }

  // ── ORDENAR según filtro ─────────────────────────────────────
  function sort(users, filter) {
    return [...users].sort((a, b) => (b[filter] || 0) - (a[filter] || 0));
  }

  // ── INICIALIZAR vista ────────────────────────────────────────
  async function init() {
    await loadUsers();
    render();
    // Suscribirse a cambios en tiempo real
    if (window._supa) {
      SupaSync.subscribeRanking(async () => {
        await loadUsers();
        render();
      });
    }
    startAutoRefresh();
  }

  // ── RENDERIZAR ───────────────────────────────────────────────
  function render() {
    const sorted = sort(allUsers, currentFilter);
    renderPodium(sorted);
    renderList(sorted);
    renderMyPosition(sorted);
    renderGlobalStats();
  }

  // ── PODIO ────────────────────────────────────────────────────
  function renderPodium(sorted) {
    const slots = [2, 1, 3]; // orden visual: 2° 1° 3°
    slots.forEach((pos, idx) => {
      const user = sorted[pos - 1];
      const el = document.getElementById(`pod-${pos}`);
      if (!el || !user) return;
      el.querySelector(".pod-avatar").textContent = user.avatar || "👤";
      el.querySelector(".pod-name").textContent = user.name.split(" ")[0];
      el.querySelector(".pod-score").textContent = fmtScore(
        user,
        currentFilter,
      );
      if (user.isMe) el.classList.add("pod-me");
      else el.classList.remove("pod-me");
    });
  }

  // ── LISTA ────────────────────────────────────────────────────
  function renderList(sorted) {
    const list = document.getElementById("rk-list");
    if (!list) return;

    // Actualizar label de columna
    const lbl = document.getElementById("rk-score-label");
    if (lbl)
      lbl.textContent = { elo: "Elo", racha: "Racha", xp: "XP", sims: "Sims" }[
        currentFilter
      ];

    list.innerHTML = sorted
      .map((u, i) => {
        const rank = i + 1;
        const medal =
          rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";
        const isMe = u.isMe;
        const tier = getTier(u.elo);

        return `
        <div class="rk-row ${isMe ? "rk-row-me" : ""}" style="animation-delay:${i * 30}ms">
          <div class="rk-rank">
            ${medal || `<span class="rk-num">${rank}</span>`}
          </div>
          <div class="rk-player">
            <div class="rk-player-avatar ${isMe ? "rk-avatar-me" : ""}">${u.avatar || "👤"}</div>
            <div class="rk-player-info">
              <div class="rk-player-name">
                ${u.name}
                ${isMe ? '<span class="rk-you-badge">Tú</span>' : ""}
              </div>
              <div class="rk-player-tier" style="color:${tier.color}">${tier.icon} ${tier.name}</div>
            </div>
          </div>
          <div class="rk-country">${u.flag || "🌐"} <span class="rk-country-name">${u.country || "—"}</span></div>
          <div class="rk-score">${fmtScore(u, currentFilter)}</div>
          <div class="rk-streak">${u.racha || 0}🔥</div>
        </div>`;
      })
      .join("");
  }

  // ── MI POSICIÓN ──────────────────────────────────────────────
  function renderMyPosition(sorted) {
    const myIdx = sorted.findIndex((u) => u.isMe);
    const el = document.getElementById("rk-my-pos");
    if (myIdx === -1 || !el) {
      if (el) el.style.display = "none";
      return;
    }
    el.style.display = "block";
    const me = sorted[myIdx];
    document.getElementById("rmp-rank").textContent = `#${myIdx + 1}`;
    document.getElementById("rmp-avatar").textContent = me.avatar || "👤";
    document.getElementById("rmp-name").textContent = me.name;
    document.getElementById("rmp-score").textContent = fmtScore(
      me,
      currentFilter,
    );
    // Tendencia ficticia (podría ser real con historial)
    const trend = document.getElementById("rmp-trend");
    if (trend) {
      const up = myIdx < allUsers.length / 2;
      trend.innerHTML = up
        ? '<span class="trend-up">▲ Top 50%</span>'
        : '<span class="trend-dn">▼</span>';
    }
  }

  // ── STATS GLOBALES ───────────────────────────────────────────
  function renderGlobalStats() {
    const totUsers = allUsers.length;
    const totSims = allUsers.reduce((a, u) => a + (u.sims || 0), 0);
    const totPregs = allUsers.reduce((a, u) => a + (u.pregs || 0), 0);
    const totXP = allUsers.reduce((a, u) => a + (u.xp || 0), 0);
    const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : n);
    setText("rgs-users", fmt(totUsers));
    setText("rgs-sims", fmt(totSims));
    setText("rgs-pregs", fmt(totPregs));
    setText("rgs-xp", fmt(totXP));
  }

  // ── HELPERS ──────────────────────────────────────────────────
  function fmtScore(u, filter) {
    const v = u[filter] || 0;
    if (filter === "elo") return v + " pts";
    if (filter === "racha") return v + " días";
    if (filter === "xp") return v + " XP";
    if (filter === "sims") return v + " sims";
    return v;
  }

  function getTier(elo) {
    if (elo >= 1350) return { icon: "💎", name: "Diamante", color: "#06B6D4" };
    if (elo >= 1250) return { icon: "🏅", name: "Platino", color: "#8B5CF6" };
    if (elo >= 1150) return { icon: "🥇", name: "Oro", color: "#F59E0B" };
    if (elo >= 1080) return { icon: "🥈", name: "Plata", color: "#94A3B8" };
    if (elo >= 1000) return { icon: "🥉", name: "Bronce", color: "#CD7C3D" };
    return { icon: "🌱", name: "Principiante", color: "#10B981" };
  }

  function setText(id, val) {
    const e = document.getElementById(id);
    if (e) e.textContent = val;
  }

  // ── FILTRO ───────────────────────────────────────────────────
  function setFilter(f, btn) {
    currentFilter = f;
    document
      .querySelectorAll(".rk-filter")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    render();
  }

  // ── REFRESH ──────────────────────────────────────────────────
  function refresh() {
    const btn = document.getElementById("rk-refresh-btn");
    if (btn) {
      btn.classList.add("rk-spinning");
      setTimeout(() => btn.classList.remove("rk-spinning"), 800);
    }
    loadUsers();
    render();
  }

  function startAutoRefresh() {
    clearInterval(refreshTimer);
    refreshTimer = setInterval(refresh, 30000); // cada 30s
  }

  return { init, refresh, setFilter };
})();

/* ════════════════════════════════════════════════════════════
   PARTE 2 — LOGROS (30 logros con categorías)
════════════════════════════════════════════════════════════ */
const Achievements = (() => {
  // ── CATÁLOGO COMPLETO ────────────────────────────────────────
  const CATALOG = [
    // PRIMEROS PASOS
    {
      id: "welcome",
      cat: "social",
      ico: "🌟",
      name: "Bienvenido",
      desc: "Iniciaste sesión por primera vez en Yachay Lab",
      xp: 10,
      cond: (s) => true,
    },
    {
      id: "profile_done",
      cat: "social",
      ico: "🎨",
      name: "Mi identidad",
      desc: "Completaste tu perfil con nombre, ciudad y bio",
      xp: 20,
      cond: (s) => s.profileDone,
    },
    {
      id: "first_question",
      cat: "practica",
      ico: "💬",
      name: "Primera pregunta",
      desc: "Enviaste tu primera pregunta al Tutor Yachay",
      xp: 5,
      cond: (s) => s.pregs >= 1,
    },
    {
      id: "first_sim",
      cat: "fisica",
      ico: "⚗️",
      name: "Primer experimento",
      desc: "Abriste tu primer simulador",
      xp: 10,
      cond: (s) => s.sims >= 1,
    },

    // FÍSICA
    {
      id: "fis_3",
      cat: "fisica",
      ico: "🔬",
      name: "Aprendiz de física",
      desc: "Completaste 3 simuladores de física",
      xp: 15,
      cond: (s) => s.sims >= 3,
    },
    {
      id: "fis_5",
      cat: "fisica",
      ico: "⚡",
      name: "Físico junior",
      desc: "Completaste 5 simuladores de física",
      xp: 25,
      cond: (s) => s.sims >= 5,
    },
    {
      id: "fis_10",
      cat: "fisica",
      ico: "🚀",
      name: "Físico avanzado",
      desc: "Completaste 10 simuladores",
      xp: 50,
      cond: (s) => s.sims >= 10,
    },
    {
      id: "fis_20",
      cat: "fisica",
      ico: "🌌",
      name: "Maestro del laboratorio",
      desc: "Completaste 20 simuladores",
      xp: 100,
      cond: (s) => s.sims >= 20,
    },
    {
      id: "pendulo",
      cat: "fisica",
      ico: "⏱️",
      name: "Newton en práctica",
      desc: "Usaste el simulador de péndulo",
      xp: 10,
      cond: (s) => s.usedSims?.includes("pendulo"),
    },
    {
      id: "tiro",
      cat: "fisica",
      ico: "🎯",
      name: "Artillero",
      desc: "Simulaste el tiro parabólico",
      xp: 10,
      cond: (s) => s.usedSims?.includes("tiro"),
    },

    // QUÍMICA
    {
      id: "quim_1",
      cat: "quimica",
      ico: "🧪",
      name: "Químico curioso",
      desc: "Abriste tu primer simulador de química",
      xp: 10,
      cond: (s) => s.quimSims >= 1,
    },
    {
      id: "quim_3",
      cat: "quimica",
      ico: "⚗️",
      name: "En el laboratorio",
      desc: "Completaste 3 simuladores de química",
      xp: 25,
      cond: (s) => s.quimSims >= 3,
    },
    {
      id: "quim_5",
      cat: "quimica",
      ico: "🔭",
      name: "Químico avanzado",
      desc: "Completaste 5 simuladores de química",
      xp: 50,
      cond: (s) => s.quimSims >= 5,
    },
    {
      id: "ph_master",
      cat: "quimica",
      ico: "💧",
      name: "Maestro del pH",
      desc: "Exploraste la escala de pH completa",
      xp: 15,
      cond: (s) => s.usedSims?.includes("ph"),
    },
    {
      id: "gas_laws",
      cat: "quimica",
      ico: "💨",
      name: "Ley de los gases",
      desc: "Simulaste gases ideales (PV=nRT)",
      xp: 15,
      cond: (s) => s.usedSims?.includes("gases"),
    },

    // PRÁCTICA Y ELO
    {
      id: "pregs_5",
      cat: "practica",
      ico: "🧠",
      name: "Pensador",
      desc: "Respondiste 5 preguntas en práctica",
      xp: 10,
      cond: (s) => s.pregs >= 5,
    },
    {
      id: "pregs_25",
      cat: "practica",
      ico: "📚",
      name: "Estudioso",
      desc: "Respondiste 25 preguntas",
      xp: 30,
      cond: (s) => s.pregs >= 25,
    },
    {
      id: "pregs_50",
      cat: "practica",
      ico: "🤖",
      name: "Dialéctico",
      desc: "Respondiste 50 preguntas",
      xp: 60,
      cond: (s) => s.pregs >= 50,
    },
    {
      id: "pregs_100",
      cat: "practica",
      ico: "🏆",
      name: "Centurión",
      desc: "Respondiste 100 preguntas",
      xp: 100,
      cond: (s) => s.pregs >= 100,
    },
    {
      id: "elo_1050",
      cat: "practica",
      ico: "📈",
      name: "Subiendo",
      desc: "Alcanzaste Elo 1050",
      xp: 20,
      cond: (s) => s.maxElo >= 1050,
    },
    {
      id: "elo_1100",
      cat: "practica",
      ico: "🥉",
      name: "Bronce Elo",
      desc: "Alcanzaste Elo 1100",
      xp: 40,
      cond: (s) => s.maxElo >= 1100,
    },
    {
      id: "elo_1200",
      cat: "practica",
      ico: "🥈",
      name: "Plata Elo",
      desc: "Alcanzaste Elo 1200",
      xp: 80,
      cond: (s) => s.maxElo >= 1200,
    },
    {
      id: "elo_1300",
      cat: "practica",
      ico: "🥇",
      name: "Oro Elo",
      desc: "Alcanzaste Elo 1300",
      xp: 150,
      cond: (s) => s.maxElo >= 1300,
    },
    {
      id: "elo_1400",
      cat: "practica",
      ico: "💎",
      name: "Diamante Elo",
      desc: "Alcanzaste Elo 1400 — ¡leyenda!",
      xp: 300,
      cond: (s) => s.maxElo >= 1400,
    },

    // RACHA
    {
      id: "racha_3",
      cat: "social",
      ico: "🔥",
      name: "En racha",
      desc: "3 días seguidos de actividad",
      xp: 15,
      cond: (s) => s.bestRacha >= 3,
    },
    {
      id: "racha_7",
      cat: "social",
      ico: "⚡",
      name: "Una semana",
      desc: "7 días seguidos — ¡toda la semana!",
      xp: 40,
      cond: (s) => s.bestRacha >= 7,
    },
    {
      id: "racha_14",
      cat: "social",
      ico: "🌟",
      name: "Dos semanas",
      desc: "14 días seguidos de dedicación",
      xp: 80,
      cond: (s) => s.bestRacha >= 14,
    },
    {
      id: "racha_30",
      cat: "social",
      ico: "👑",
      name: "Mes de ciencia",
      desc: "30 días seguidos — ¡increíble!",
      xp: 200,
      cond: (s) => s.bestRacha >= 30,
    },

    // SOCIAL / ESPECIALES
    {
      id: "voice_user",
      cat: "social",
      ico: "🎤",
      name: "Voz de la ciencia",
      desc: "Usaste el reconocimiento de voz con Yachay",
      xp: 20,
      cond: (s) => s.usedVoice,
    },
    {
      id: "night_owl",
      cat: "social",
      ico: "🦉",
      name: "Búho nocturno",
      desc: "Usaste la app después de las 10pm",
      xp: 15,
      cond: (s) => s.nightOwl,
    },
  ];

  let currentCat = "all";

  // ── OBTENER estado del usuario ────────────────────────────────
  function getStats() {
    try {
      const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
      const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
      const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
      const sims = JSON.parse(localStorage.getItem("yl_used_sims") || "[]");

      return {
        sims: ps.sims || 0,
        quimSims: sims.filter((s) =>
          ["ph", "gases", "reacciones", "titulacion", "tabla"].includes(s),
        ).length,
        pregs: ps.pregs || 0,
        maxElo: ps.maxElo || 1000,
        bestRacha: st.best || 0,
        profileDone: !!(prof.name && prof.grade && prof.country),
        usedSims: sims,
        usedVoice: !!localStorage.getItem("yl_used_voice"),
        nightOwl: !!localStorage.getItem("yl_night_owl"),
      };
    } catch {
      return {};
    }
  }

  // ── CALCULAR logros desbloqueados ─────────────────────────────
  function getEarned() {
    const stats = getStats();
    return new Set(
      CATALOG.filter((a) => {
        try {
          return a.cond(stats);
        } catch {
          return false;
        }
      }).map((a) => a.id),
    );
  }

  // ── RENDERIZAR ───────────────────────────────────────────────
  function render() {
    const earned = getEarned();
    const stats = getStats();

    // Progress bar
    setText("lps-count", earned.size);
    setText("lps-total", CATALOG.length);
    const fill = document.getElementById("lps-fill");
    if (fill)
      fill.style.width =
        ((earned.size / CATALOG.length) * 100).toFixed(0) + "%";

    // XP total
    let totalXP = 0;
    CATALOG.forEach((a) => {
      if (earned.has(a.id)) totalXP += a.xp;
    });
    setText("lxb-xp", totalXP + " XP");

    renderGrid(earned);
  }

  function renderGrid(earned) {
    const grid = document.getElementById("lg-grid");
    if (!grid) return;

    const filtered =
      currentCat === "all"
        ? CATALOG
        : currentCat === "earned"
          ? CATALOG.filter((a) => earned.has(a.id))
          : CATALOG.filter((a) => a.cat === currentCat);

    if (!filtered.length) {
      grid.innerHTML =
        '<div class="lg-empty">No hay logros en esta categoría aún. ¡Sigue practicando! 🚀</div>';
      return;
    }

    grid.innerHTML = filtered
      .map((a, i) => {
        const done = earned.has(a.id);
        return `
        <div class="lg-card ${done ? "lg-earned" : ""}" style="animation-delay:${i * 25}ms"
             onclick="Achievements.showDetail('${a.id}')">
          <div class="lgc-ico-wrap ${done ? "lgc-glow" : ""}">
            <span class="lgc-ico">${a.ico}</span>
            ${done ? '<div class="lgc-check">✓</div>' : ""}
          </div>
          <div class="lgc-body">
            <div class="lgc-name">${a.name}</div>
            <div class="lgc-desc">${a.desc}</div>
            <div class="lgc-xp ${done ? "lgc-xp-earned" : ""}">+${a.xp} XP</div>
          </div>
          ${done ? '<div class="lgc-ribbon">✓</div>' : '<div class="lgc-lock">🔒</div>'}
        </div>`;
      })
      .join("");
  }

  // ── DETALLE de logro (tooltip modal) ─────────────────────────
  function showDetail(id) {
    const a = CATALOG.find((x) => x.id === id);
    if (!a) return;
    const earned = getEarned();
    const done = earned.has(a.id);

    // Quitar modal previo
    document.getElementById("achievement-modal")?.remove();

    const m = document.createElement("div");
    m.id = "achievement-modal";
    m.className = "ach-modal-backdrop";
    m.innerHTML = `
      <div class="ach-modal-box ${done ? "ach-earned" : ""}">
        <button class="ach-close" onclick="document.getElementById('achievement-modal').remove()">✕</button>
        <div class="ach-modal-ico ${done ? "ach-ico-glow" : ""}">${a.ico}</div>
        <div class="ach-modal-name">${a.name}</div>
        <div class="ach-modal-desc">${a.desc}</div>
        <div class="ach-modal-xp">+${a.xp} XP</div>
        <div class="ach-modal-status">
          ${
            done
              ? '<div class="ach-status-done">✅ ¡Logro desbloqueado!</div>'
              : '<div class="ach-status-locked">🔒 Aún no desbloqueado</div>'
          }
        </div>
        <div class="ach-modal-cat">Categoría: ${{ fisica: "⚡ Física", quimica: "🧪 Química", practica: "🎯 Práctica", social: "🌟 Social" }[a.cat] || a.cat}</div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => {
      if (e.target === m) m.remove();
    });
  }

  // ── NOTIFICAR nuevo logro desbloqueado ────────────────────────
  function notify(achievement) {
    const el = document.createElement("div");
    el.className = "ach-notif";
    el.innerHTML = `
      <div class="an-ico">${achievement.ico}</div>
      <div class="an-body">
        <div class="an-title">Achievement unlocked!</div>
        <div class="an-name">${achievement.name}</div>
        <div class="an-xp">+${achievement.xp} XP</div>
      </div>`;
    document.body.appendChild(el);
    // Sincronizar con Supabase
    if (typeof SupaSync !== "undefined")
      SupaSync.syncAchievement(achievement.id);
    setTimeout(() => {
      el.classList.add("an-out");
      setTimeout(() => el.remove(), 400);
    }, 4000);
  }

  // ── VERIFICAR nuevos logros (llamar después de cada actividad) ─
  function check() {
    const earned = getEarned();
    const prev = new Set(
      JSON.parse(localStorage.getItem("yl_prev_achievements") || "[]"),
    );
    const newOnes = [...earned].filter((id) => !prev.has(id));
    newOnes.forEach((id) => {
      const a = CATALOG.find((x) => x.id === id);
      if (a) setTimeout(() => notify(a), 800);
    });
    localStorage.setItem("yl_prev_achievements", JSON.stringify([...earned]));
    return newOnes;
  }

  function showCat(cat, btn) {
    currentCat = cat;
    document
      .querySelectorAll(".lg-tab")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    render();
  }

  function setText(id, val) {
    const e = document.getElementById(id);
    if (e) e.textContent = val;
  }

  return { render, check, showCat, showDetail, notify };
})();

/* ════════════════════════════════════════════════════════════
   PARTE 3 — HOOKS: conectar check de logros a eventos app
════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Registrar hora nocturna
  const hr = new Date().getHours();
  if (hr >= 22 || hr < 5) localStorage.setItem("yl_night_owl", "1");

  // Verificar logros al iniciar
  setTimeout(() => {
    if (typeof Achievements !== "undefined") Achievements.check();
  }, 2000);

  // Hook simuladores — guardar cuáles usó
  const origOpenSim = window.openSim;
  if (origOpenSim) {
    window.openSim = function (id) {
      origOpenSim(id);
      // Registrar sim usado
      const used = JSON.parse(localStorage.getItem("yl_used_sims") || "[]");
      if (!used.includes(id)) {
        used.push(id);
        localStorage.setItem("yl_used_sims", JSON.stringify(used));
      }
      // Verificar logros después
      setTimeout(() => Achievements.check(), 500);
    };
  }

  // Hook voz
  document.addEventListener("voiceUsed", () => {
    localStorage.setItem("yl_used_voice", "1");
    Achievements.check();
  });
});
