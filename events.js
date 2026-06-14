/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — EVENTS.JS
   · Banner 1: Reto de Temporada (mensual)
   · Banner 2: Evento/Noticia rotativa
   · Misiones diarias dinámicas (se renuevan a medianoche)
═══════════════════════════════════════════════════════════════ */

const Events = (() => {
  /* ────────────────────────────────────────────────────────────
     CONFIGURACIÓN DE TEMPORADAS (una por mes)
  ──────────────────────────────────────────────────────────── */
  const SEASONS = {
    6: {
      id: "jun25",
      icon: "🔬",
      title: "Domina la Física Clásica",
      desc: "Completa 5 simuladores de física y gana el badge del mes",
      color: ["#6366F1", "#8B5CF6"],
      goal: 5,
      type: "sims",
      filter: "fisica",
      xp: 500,
      badge: "🏅",
    },
    7: {
      id: "jul25",
      icon: "🧪",
      title: "Maestro de la Química",
      desc: "Usa los 5 simuladores de química y demuestra tu dominio",
      color: ["#10B981", "#0EA5E9"],
      goal: 5,
      type: "sims",
      filter: "quimica",
      xp: 500,
      badge: "⚗️",
    },
    8: {
      id: "ago25",
      icon: "🎯",
      title: "Semana de Práctica Intensiva",
      desc: "Responde 30 preguntas correctas en práctica adaptativa",
      color: ["#F59E0B", "#EF4444"],
      goal: 30,
      type: "pregs",
      filter: null,
      xp: 600,
      badge: "🎯",
    },
    9: {
      id: "sep25",
      icon: "🤖",
      title: "Conversa con Yachay",
      desc: "Haz 20 preguntas al Tutor IA y aprende a tu ritmo",
      color: ["#8B5CF6", "#EC4899"],
      goal: 20,
      type: "tutor",
      filter: null,
      xp: 400,
      badge: "🤖",
    },
    10: {
      id: "oct25",
      icon: "🌌",
      title: "Explorador Total",
      desc: "Abre todos los 15 simuladores disponibles",
      color: ["#0EA5E9", "#6366F1"],
      goal: 15,
      type: "all_sims",
      filter: null,
      xp: 750,
      badge: "🌌",
    },
    11: {
      id: "nov25",
      icon: "🔥",
      title: "Racha Imparable",
      desc: "Mantén una racha de 7 días seguidos de actividad",
      color: ["#EF4444", "#F59E0B"],
      goal: 7,
      type: "racha",
      filter: null,
      xp: 700,
      badge: "👑",
    },
    12: {
      id: "dic25",
      icon: "⭐",
      title: "Cierre del Año STEM",
      desc: "Acumula 1000 XP antes del fin de año",
      color: ["#F59E0B", "#EF4444"],
      goal: 1000,
      type: "xp",
      filter: null,
      xp: 1000,
      badge: "🏆",
    },
  };

  /* ────────────────────────────────────────────────────────────
     BANCO DE MISIONES DIARIAS (se sortean 4 cada día)
  ──────────────────────────────────────────────────────────── */
  const MISSION_POOL = [
    // Simuladores
    {
      id: "m_sim_any",
      icon: "⚗️",
      cat: "laboratorio",
      title: "Experimenta",
      desc: "Abre cualquier simulador hoy",
      xp: 20,
      type: "sims",
      goal: 1,
      action: () => openSim("tiro"),
      actionLbl: "Abrir lab",
    },
    {
      id: "m_sim_2",
      icon: "🔬",
      cat: "laboratorio",
      title: "Doble experimento",
      desc: "Usa 2 simuladores distintos",
      xp: 40,
      type: "sims",
      goal: 2,
      action: () => openSim("pendulo"),
      actionLbl: "Ir al lab",
    },
    {
      id: "m_sim_fisica",
      icon: "⚡",
      cat: "física",
      title: "Física en acción",
      desc: "Completa un simulador de física",
      xp: 25,
      type: "sims",
      goal: 1,
      action: () => openSim("caida"),
      actionLbl: "Abrir física",
    },
    {
      id: "m_sim_quimica",
      icon: "🧪",
      cat: "química",
      title: "Laboratorio químico",
      desc: "Usa un simulador de química",
      xp: 25,
      type: "sims",
      goal: 1,
      action: () => openSim("ph"),
      actionLbl: "Abrir química",
    },
    {
      id: "m_pendulo",
      icon: "⏱️",
      cat: "física",
      title: "El péndulo de Newton",
      desc: "Experimenta con el péndulo simple",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("pendulo"),
      actionLbl: "Abrir péndulo",
    },
    {
      id: "m_tiro",
      icon: "🎯",
      cat: "física",
      title: "¡Fuego!",
      desc: "Lanza un proyectil parabólico",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("tiro"),
      actionLbl: "Lanzar",
    },
    {
      id: "m_ph",
      icon: "💧",
      cat: "química",
      title: "Mundo ácido-base",
      desc: "Explora la escala de pH completa",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("ph"),
      actionLbl: "Ver pH",
    },
    {
      id: "m_gases",
      icon: "💨",
      cat: "química",
      title: "Ley de los gases",
      desc: "Simula el comportamiento de gases ideales",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("gases"),
      actionLbl: "Ver gases",
    },
    // Práctica
    {
      id: "m_prac_3",
      icon: "🎯",
      cat: "práctica",
      title: "Calentamiento",
      desc: "Responde 3 preguntas correctas",
      xp: 30,
      type: "pregs",
      goal: 3,
      action: () => go("practica"),
      actionLbl: "Practicar",
    },
    {
      id: "m_prac_5",
      icon: "💪",
      cat: "práctica",
      title: "En forma",
      desc: "Responde 5 preguntas correctas",
      xp: 50,
      type: "pregs",
      goal: 5,
      action: () => go("practica"),
      actionLbl: "Practicar",
    },
    {
      id: "m_prac_10",
      icon: "🏆",
      cat: "práctica",
      title: "Desafío del día",
      desc: "Responde 10 preguntas sin rendirse",
      xp: 100,
      type: "pregs",
      goal: 10,
      action: () => go("practica"),
      actionLbl: "Aceptar reto",
    },
    {
      id: "m_prac_fisica",
      icon: "⚡",
      cat: "práctica",
      title: "Físico del día",
      desc: "Responde 3 preguntas de Física",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("f", null);
      },
      actionLbl: "Física",
    },
    {
      id: "m_prac_quim",
      icon: "🧪",
      cat: "práctica",
      title: "Químico del día",
      desc: "Responde 3 preguntas de Química",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("q", null);
      },
      actionLbl: "Química",
    },
    {
      id: "m_prac_mate",
      icon: "📐",
      cat: "práctica",
      title: "Matemático del día",
      desc: "Responde 3 preguntas de Matemáticas",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("m", null);
      },
      actionLbl: "Mates",
    },
    // Tutor
    {
      id: "m_tutor_1",
      icon: "🤖",
      cat: "tutor",
      title: "Pregunta a Yachay",
      desc: "Haz una pregunta al Tutor IA",
      xp: 15,
      type: "tutor",
      goal: 1,
      action: () => go("tutor"),
      actionLbl: "Preguntar",
    },
    {
      id: "m_tutor_3",
      icon: "💬",
      cat: "tutor",
      title: "Conversación profunda",
      desc: "Haz 3 preguntas al Tutor IA",
      xp: 30,
      type: "tutor",
      goal: 3,
      action: () => go("tutor"),
      actionLbl: "Abrir tutor",
    },
    {
      id: "m_voz",
      icon: "🎤",
      cat: "tutor",
      title: "Habla con Yachay",
      desc: "Usa el reconocimiento de voz una vez",
      xp: 25,
      type: "voice",
      goal: 1,
      action: () => go("tutor"),
      actionLbl: "Usar voz",
    },
    // Racha y constancia
    {
      id: "m_login",
      icon: "📅",
      cat: "constancia",
      title: "¡Presente!",
      desc: "Entra a Yachay Lab hoy",
      xp: 10,
      type: "login",
      goal: 1,
      action: null,
      actionLbl: null,
    },
    {
      id: "m_racha",
      icon: "🔥",
      cat: "constancia",
      title: "Mantén la racha",
      desc: "Haz cualquier actividad para mantener tu racha",
      xp: 20,
      type: "any",
      goal: 1,
      action: () => go("practica"),
      actionLbl: "Actividad",
    },
    {
      id: "m_tabla",
      icon: "📋",
      cat: "laboratorio",
      title: "Explora los elementos",
      desc: "Abre la tabla periódica interactiva",
      xp: 10,
      type: "sim_id",
      goal: 1,
      action: () => openSim("tabla"),
      actionLbl: "Ver tabla",
    },
  ];

  /* ────────────────────────────────────────────────────────────
     BANCO DE NOTICIAS (rotan)
  ──────────────────────────────────────────────────────────── */
  const NEWS_POOL = [
    {
      icon: "🎤",
      tag: "NUEVO",
      title: "Reconocimiento de voz activo",
      desc: "Habla con Yachay IA sin escribir — prueba el micrófono",
      cta: "Probar",
      ctaFn: () => go("tutor"),
    },
    {
      icon: "🏆",
      tag: "RANKING",
      title: "¿Estás en el top 10?",
      desc: "El ranking global ya está disponible — compara tu Elo",
      cta: "Ver ranking",
      ctaFn: () => go("ranking"),
    },
    {
      icon: "🎖️",
      tag: "LOGROS",
      title: "30 logros por desbloquear",
      desc: "Completa misiones y actividades para ganar XP y badges",
      cta: "Ver logros",
      ctaFn: () => go("logros"),
    },
    {
      icon: "⚗️",
      tag: "LABORATORIO",
      title: "15 simuladores disponibles",
      desc: "Física y química en tiempo real — explora el laboratorio",
      cta: "Explorar",
      ctaFn: () => openSim("tiro"),
    },
    {
      icon: "🌿",
      tag: "TIP DEL DÍA",
      title: "Yachay usa el método socrático",
      desc: "Nunca da respuestas directas — te guía a descubrirlas",
      cta: "Preguntar",
      ctaFn: () => go("tutor"),
    },
    {
      icon: "🔥",
      tag: "RACHA",
      title: "Cuida tu racha diaria",
      desc: "Entra todos los días para mantener tus días consecutivos",
      cta: "Ver racha",
      ctaFn: () => typeof Streak !== "undefined" && Streak.openPanel(),
    },
    {
      icon: "📐",
      tag: "SABÍAS QUE",
      title: "T = 2π√(L/g)",
      desc: "El período del péndulo no depende de su masa — pruébalo",
      cta: "Simular",
      ctaFn: () => openSim("pendulo"),
    },
    {
      icon: "💡",
      tag: "CONSEJO",
      title: "Practica 10 min al día",
      desc: "La constancia supera al esfuerzo intenso esporádico",
      cta: "Practicar",
      ctaFn: () => go("practica"),
    },
  ];

  /* ────────────────────────────────────────────────────────────
     ESTADO
  ──────────────────────────────────────────────────────────── */
  const KEY_MISSIONS = "yl_daily_missions";
  const KEY_NEWS_IDX = "yl_news_idx";
  const KEY_NEWS_DIS = "yl_news_dismissed";
  let countdownInterval = null;

  /* ────────────────────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────────────────────── */
  function init() {
    renderSeason();
    renderNews();
    renderMissions();
    startCountdown();
  }

  /* ════════════════════════════════════════════════════════════
     RETO DE TEMPORADA
  ════════════════════════════════════════════════════════════ */
  function renderSeason() {
    const month = new Date().getMonth() + 1;
    const season = SEASONS[month] || SEASONS[6];
    const prog = getSeasonProgress(season);
    const pct = Math.min(100, (prog / season.goal) * 100);

    // Gradiente del banner
    const el = document.getElementById("banner-season");
    if (!el) return;
    el.style.background = `linear-gradient(135deg, ${season.color[0]}, ${season.color[1]})`;

    setText("season-badge", `🏆 RETO DE ${monthName().toUpperCase()}`);
    setText("season-title", season.title);
    setText("season-desc", season.desc);
    setText("season-ico", season.icon);
    setText("season-txt", `${prog} / ${season.goal} completados`);

    const fill = document.getElementById("season-fill");
    if (fill) {
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = pct + "%";
      }, 200);
    }

    // Timer hasta fin de mes
    updateSeasonTimer();

    // Botón: si ya completó, mostrar badge ganado
    const btn = el.querySelector(".evb-btn-pri");
    if (btn) {
      if (pct >= 100) {
        btn.textContent = "✅ ¡Reto completado!";
        btn.style.background = "rgba(255,255,255,.25)";
        btn.disabled = true;
      } else {
        btn.textContent = "▶ Continuar reto";
        btn.disabled = false;
      }
    }
  }

  function getSeasonProgress(season) {
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    const used = JSON.parse(localStorage.getItem("yl_used_sims") || "[]");
    if (season.type === "sims") {
      const fis = [
        "mru",
        "mrua",
        "caida",
        "tiro",
        "pendulo",
        "hooke",
        "ondas",
        "ohm",
        "optica",
        "energia",
      ];
      const qui = ["ph", "gases", "reacciones", "titulacion", "tabla"];
      if (season.filter === "fisica")
        return used.filter((s) => fis.includes(s)).length;
      if (season.filter === "quimica")
        return used.filter((s) => qui.includes(s)).length;
      return used.length;
    }
    if (season.type === "all_sims") return used.length;
    if (season.type === "pregs") return ps.pregs || 0;
    if (season.type === "racha") return st.best || 0;
    if (season.type === "xp") return st.xp || 0;
    if (season.type === "tutor") return ps.pregs || 0;
    return 0;
  }

  function updateSeasonTimer() {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diff = end - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const txt = d > 0 ? `⏳ Termina en ${d}d ${h}h` : `⏳ Termina en ${h}h`;
    setText("season-timer", txt);
  }

  function startSeason() {
    const month = new Date().getMonth() + 1;
    const season = SEASONS[month] || SEASONS[6];
    if (season.filter === "fisica") openSim("tiro");
    else if (season.filter === "quimica") openSim("ph");
    else go("practica");
  }

  /* ════════════════════════════════════════════════════════════
     BANNER DE NOTICIAS
  ════════════════════════════════════════════════════════════ */
  function renderNews() {
    const el = document.getElementById("banner-news");
    if (!el) return;

    // Si fue descartado hoy, ocultar
    const dismissed = localStorage.getItem(KEY_NEWS_DIS);
    if (dismissed === today()) {
      el.style.display = "none";
      return;
    }
    el.style.display = "flex";

    // Rotar noticias (una diferente cada día)
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
    );
    const news = NEWS_POOL[dayOfYear % NEWS_POOL.length];

    setText("news-ico", news.icon);
    setText("news-tag", news.tag);
    setText("news-title", news.title);
    setText("news-desc", news.desc);
    const cta = document.getElementById("news-cta");
    if (cta) {
      cta.textContent = news.cta + " →";
      cta.onclick = () => {
        news.ctaFn && news.ctaFn();
      };
    }
  }

  function dismissNews() {
    localStorage.setItem(KEY_NEWS_DIS, today());
    const el = document.getElementById("banner-news");
    if (el) {
      el.style.animation = "slideOutRight .3s ease forwards";
      setTimeout(() => (el.style.display = "none"), 300);
    }
  }

  function newsCta() {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000,
    );
    const news = NEWS_POOL[dayOfYear % NEWS_POOL.length];
    news.ctaFn && news.ctaFn();
  }

  /* ════════════════════════════════════════════════════════════
     MISIONES DIARIAS
  ════════════════════════════════════════════════════════════ */
  function getTodayMissions() {
    const stored = JSON.parse(localStorage.getItem(KEY_MISSIONS) || "{}");
    if (stored.date === today()) return stored;
    // Nuevo día → generar 4 misiones nuevas
    const seed = hashDay(today());
    const shuffled = [...MISSION_POOL].sort(
      (a, b) => seededRand(seed + a.id) - seededRand(seed + b.id),
    );
    // Garantizar variedad: 1 sim, 1 práctica, 1 tutor, 1 comodín
    const cats = ["laboratorio", "práctica", "tutor"];
    const selected = [];
    cats.forEach((cat) => {
      const m = shuffled.find(
        (x) => x.cat === cat && !selected.find((s) => s.id === x.id),
      );
      if (m) selected.push(m);
    });
    // Rellenar hasta 4
    shuffled.forEach((m) => {
      if (selected.length < 4 && !selected.find((s) => s.id === m.id))
        selected.push(m);
    });

    const data = {
      date: today(),
      missions: selected
        .slice(0, 4)
        .map((m) => ({ ...m, progress: 0, done: false, action: null })),
    };
    localStorage.setItem(KEY_MISSIONS, JSON.stringify(data));
    return data;
  }

  function renderMissions() {
    const data = getTodayMissions();
    const grid = document.getElementById("dm-grid");
    const mis = data.missions;
    if (!grid) return;

    // Header stats
    const totalXP = mis.reduce((a, m) => a + m.xp, 0);
    const earnedXP = mis.filter((m) => m.done).reduce((a, m) => a + m.xp, 0);
    setText("dm-xp-earned", earnedXP);
    setText("dm-xp-total", totalXP);
    setText("dm-date", formatDate(new Date()));

    // Racha
    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    setText("dm-streak", st.current || 0);

    // Renderizar cards
    grid.innerHTML = mis
      .map((m, i) => {
        const pct = m.done
          ? 100
          : Math.min(100, Math.round((m.progress / m.goal) * 100));
        return `
        <div class="dm-card ${m.done ? "dm-done" : ""}" id="dm-card-${i}" style="animation-delay:${i * 80}ms">
          <div class="dmc-top">
            <div class="dmc-ico-wrap ${m.done ? "dmc-ico-done" : ""}">
              <span class="dmc-ico">${m.icon}</span>
              ${m.done ? '<div class="dmc-check">✓</div>' : ""}
            </div>
            <div class="dmc-cat">${m.cat}</div>
            ${m.done ? '<div class="dmc-badge-done">+' + m.xp + " XP ✓</div>" : '<div class="dmc-xp">+' + m.xp + " XP</div>"}
          </div>
          <div class="dmc-title">${m.title}</div>
          <div class="dmc-desc">${m.desc}</div>
          <div class="dmc-prog-wrap">
            <div class="dmc-prog-bar">
              <div class="dmc-prog-fill ${m.done ? "dmc-fill-done" : ""}" style="width:${pct}%"></div>
            </div>
            <div class="dmc-prog-txt">${m.done ? "¡Completado!" : m.progress + " / " + m.goal}</div>
          </div>
          ${!m.done && m.actionLbl ? `<button class="dmc-btn" onclick="Events.doMission(${i})">${m.actionLbl} →</button>` : ""}
        </div>`;
      })
      .join("");
  }

  function doMission(idx) {
    const data = getTodayMissions();
    const m = data.missions[idx];
    if (!m || m.done) return;
    // Ejecutar acción
    const poolM = MISSION_POOL.find((x) => x.id === m.id);
    if (poolM?.action) poolM.action();
  }

  // Registrar progreso en una misión según tipo
  function recordProgress(type, amount = 1) {
    const data = getTodayMissions();
    let changed = false;
    data.missions.forEach((m, i) => {
      if (m.done) return;
      let matches = false;
      if (type === "sim" && (m.type === "sims" || m.type === "any"))
        matches = true;
      if (type === "sim" && m.type === "sim_id") matches = true;
      if (
        type === "preg" &&
        (m.type === "pregs" || m.type === "topic" || m.type === "any")
      )
        matches = true;
      if (type === "tutor" && (m.type === "tutor" || m.type === "any"))
        matches = true;
      if (type === "voice" && m.type === "voice") matches = true;
      if (type === "login" && (m.type === "login" || m.type === "any"))
        matches = true;
      if (!matches) return;
      m.progress = Math.min(m.goal, (m.progress || 0) + amount);
      if (m.progress >= m.goal && !m.done) {
        m.done = true;
        changed = true;
        showMissionComplete(m);
      }
    });
    if (changed) {
      data.date = today();
      localStorage.setItem(KEY_MISSIONS, JSON.stringify(data));
      renderMissions();
    } else {
      data.date = today();
      localStorage.setItem(KEY_MISSIONS, JSON.stringify(data));
    }
  }

  function showMissionComplete(m) {
    const el = document.createElement("div");
    el.className = "mission-complete-toast";
    el.innerHTML = `
      <div class="mct-ico">${m.icon}</div>
      <div class="mct-body">
        <div class="mct-title">¡Misión completada!</div>
        <div class="mct-name">${m.title}</div>
        <div class="mct-xp">+${m.xp} XP ganados</div>
      </div>`;
    document.body.appendChild(el);
    // XP al streak
    if (typeof Streak !== "undefined")
      Streak.register("practica", {
        label: `🎯 Misión: ${m.title}`,
        correct: true,
      });
    setTimeout(() => {
      el.classList.add("mct-out");
      setTimeout(() => el.remove(), 400);
    }, 4000);
  }

  /* ════════════════════════════════════════════════════════════
     COUNTDOWN HASTA MEDIANOCHE
  ════════════════════════════════════════════════════════════ */
  function startCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  function updateCountdown() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    setText("dm-countdown", `${h}:${m}:${s}`);
    updateSeasonTimer();
  }

  /* ════════════════════════════════════════════════════════════
     UTILIDADES
  ════════════════════════════════════════════════════════════ */
  function today() {
    return new Date().toISOString().slice(0, 10);
  }
  function setText(id, v) {
    const e = document.getElementById(id);
    if (e) e.textContent = v;
  }
  function monthName() {
    return new Date().toLocaleDateString("es-PE", { month: "long" });
  }
  function formatDate(d) {
    return d.toLocaleDateString("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  // Hash simple para seed diaria
  function hashDay(str) {
    let h = 0;
    for (let c of str) {
      h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
    }
    return Math.abs(h);
  }
  function seededRand(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  /* ════════════════════════════════════════════════════════════
     HOOKS a eventos de la app principal
  ════════════════════════════════════════════════════════════ */
  document.addEventListener("DOMContentLoaded", () => {
    // Login diario
    setTimeout(() => recordProgress("login", 1), 1000);

    // Hook simuladores
    const origOpenSim = window.openSim;
    if (origOpenSim) {
      window.openSim = function (id) {
        origOpenSim(id);
        setTimeout(() => recordProgress("sim", 1), 500);
      };
    }

    // Hook preguntas correctas (escuchar evento custom)
    document.addEventListener("missionProgress", (e) => {
      if (e.detail) recordProgress(e.detail.type, e.detail.amount || 1);
    });

    // Hook voz
    document.addEventListener("voiceUsed", () => recordProgress("voice", 1));
  });

  /* ── API pública ─────────────────────────────────────────── */
  return { init, startSeason, dismissNews, newsCta, doMission, recordProgress };
})();

/* ════════════════════════════════════════════════════════════
   DISPATCH desde práctica (llamar cuando responden correcto)
════════════════════════════════════════════════════════════ */
function dispatchMissionProgress(type, amount = 1) {
  document.dispatchEvent(
    new CustomEvent("missionProgress", { detail: { type, amount } }),
  );
}
