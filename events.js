/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — EVENTS.JS
   · Banner 1: Monthly Season Challenge
   · Banner 2: Evento/Noticia rotativa
   · Dynamic daily missions (renew at midnight)
═══════════════════════════════════════════════════════════════ */

const Events = (() => {
  /* ────────────────────────────────────────────────────────────
     CONFIGURACIÓN DE TEMPORADAS (una por mes)
  ──────────────────────────────────────────────────────────── */
  const SEASONS = {
    6: {
      id: "jun25",
      icon: "🔬",
      title: "Master Classical Physics",
      desc: "Complete 5 physics simulators and earn the month's exclusive badge",
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
      title: "Chemistry Master",
      desc: "Use all 5 chemistry simulators and prove your mastery",
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
      title: "Intensive Practice Week",
      desc: "Answer 30 correct questions in adaptive practice",
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
      title: "Talk to Yachay",
      desc: "Ask 20 questions to the AI Tutor and learn at your own pace",
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
      title: "Total Explorer",
      desc: "Open all 17 available simulators",
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
      title: "Unstoppable Streak",
      desc: "Maintain a 7-day activity streak",
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
      title: "STEM Year Finale",
      desc: "Accumulate 1000 XP before the end of the year",
      color: ["#F59E0B", "#EF4444"],
      goal: 1000,
      type: "xp",
      filter: null,
      xp: 1000,
      badge: "🏆",
    },
  };

  /* ────────────────────────────────────────────────────────────
     DAILY MISSION POOL (4 drawn per day)
  ──────────────────────────────────────────────────────────── */
  const MISSION_POOL = [
    // Simulatores
    {
      id: "m_sim_any",
      icon: "⚗️",
      cat: "lab",
      title: "Experiment",
      desc: "Open any simulator today",
      xp: 20,
      type: "sims",
      goal: 1,
      action: () => openSim("tiro"),
      actionLbl: "Open lab",
    },
    {
      id: "m_sim_2",
      icon: "🔬",
      cat: "lab",
      title: "Double experiment",
      desc: "Use 2 different simulators",
      xp: 40,
      type: "sims",
      goal: 2,
      action: () => openSim("pendulo"),
      actionLbl: "Go to lab",
    },
    {
      id: "m_sim_fisica",
      icon: "⚡",
      cat: "physics",
      title: "Physics in action",
      desc: "Complete a physics simulator",
      xp: 25,
      type: "sims",
      goal: 1,
      action: () => openSim("caida"),
      actionLbl: "Open physics",
    },
    {
      id: "m_sim_quimica",
      icon: "🧪",
      cat: "chemistry",
      title: "Chemistry lab",
      desc: "Use a chemistry simulator",
      xp: 25,
      type: "sims",
      goal: 1,
      action: () => openSim("ph"),
      actionLbl: "Open chemistry",
    },
    {
      id: "m_pendulo",
      icon: "⏱️",
      cat: "physics",
      title: "Newton's Pendulum",
      desc: "Experiment with the simple pendulum",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("pendulo"),
      actionLbl: "Open pendulum",
    },
    {
      id: "m_tiro",
      icon: "🎯",
      cat: "physics",
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
      cat: "chemistry",
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
      cat: "chemistry",
      title: "Ley de los gases",
      desc: "Simula el comportamiento de gases ideales",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("gases"),
      actionLbl: "Ver gases",
    },
    // Practice
    {
      id: "m_prac_3",
      icon: "🎯",
      cat: "practice",
      title: "Warm up",
      desc: "Answer 3 questions correctly",
      xp: 30,
      type: "pregs",
      goal: 3,
      action: () => go("practica"),
      actionLbl: "Practice",
    },
    {
      id: "m_prac_5",
      icon: "💪",
      cat: "practice",
      title: "In shape",
      desc: "Answer 5 questions correctly",
      xp: 50,
      type: "pregs",
      goal: 5,
      action: () => go("practica"),
      actionLbl: "Practice",
    },
    {
      id: "m_prac_10",
      icon: "🏆",
      cat: "practice",
      title: "Daily challenge",
      desc: "Answer 10 questions without giving up",
      xp: 100,
      type: "pregs",
      goal: 10,
      action: () => go("practica"),
      actionLbl: "Accept challenge",
    },
    {
      id: "m_prac_fisica",
      icon: "⚡",
      cat: "practice",
      title: "Physics of the day",
      desc: "Answer 3 Physics questions",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("f", null);
      },
      actionLbl: "Physics",
    },
    {
      id: "m_prac_quim",
      icon: "🧪",
      cat: "practice",
      title: "Chemistry of the day",
      desc: "Answer 3 Chemistry questions",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("q", null);
      },
      actionLbl: "Chemistry",
    },
    {
      id: "m_prac_mate",
      icon: "📐",
      cat: "practice",
      title: "Math of the day",
      desc: "Answer 3 Mathematics questions",
      xp: 35,
      type: "topic",
      goal: 3,
      action: () => {
        go("practica");
        setTopic && setTopic("m", null);
      },
      actionLbl: "Math",
    },
    // Tutor
    {
      id: "m_tutor_1",
      icon: "🤖",
      cat: "tutor",
      title: "Ask Yachay",
      desc: "Ask the AI Tutor one question",
      xp: 15,
      type: "tutor",
      goal: 1,
      action: () => go("tutor"),
      actionLbl: "Ask",
    },
    {
      id: "m_tutor_3",
      icon: "💬",
      cat: "tutor",
      title: "Deep conversation",
      desc: "Ask the AI Tutor 3 questions",
      xp: 30,
      type: "tutor",
      goal: 3,
      action: () => go("tutor"),
      actionLbl: "Open tutor",
    },
    {
      id: "m_voz",
      icon: "🎤",
      cat: "tutor",
      title: "Speak with Yachay",
      desc: "Use voice recognition once",
      xp: 25,
      type: "voice",
      goal: 1,
      action: () => go("tutor"),
      actionLbl: "Use voice",
    },
    // Racha y constancia
    {
      id: "m_login",
      icon: "📅",
      cat: "consistency",
      title: "Present!",
      desc: "Open Yachay Lab today",
      xp: 10,
      type: "login",
      goal: 1,
      action: null,
      actionLbl: null,
    },
    {
      id: "m_racha",
      icon: "🔥",
      cat: "consistency",
      title: "Keep the streak",
      desc: "Do any activity to keep your streak alive",
      xp: 20,
      type: "any",
      goal: 1,
      action: () => go("practica"),
      actionLbl: "Activity",
    },
    {
      id: "m_tabla",
      icon: "📋",
      cat: "lab",
      title: "Explore the elements",
      desc: "Open the interactive periodic table",
      xp: 10,
      type: "sim_id",
      goal: 1,
      action: () => openSim("tabla"),
      actionLbl: "View table",
    },
    {
      id: "m_ohm",
      icon: "⚡",
      cat: "physics",
      title: "Ohm's Law circuit",
      desc: "Run the Ohm's Law simulator",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("ohm"),
      actionLbl: "Open circuit",
    },
    {
      id: "m_energia",
      icon: "🌊",
      cat: "physics",
      title: "Energy conservation",
      desc: "Explore the Mechanical Energy simulator",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("energia"),
      actionLbl: "Open energy",
    },
    {
      id: "m_ondas",
      icon: "〰️",
      cat: "physics",
      title: "Wave explorer",
      desc: "Adjust frequency and amplitude in Waves",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("ondas"),
      actionLbl: "Open waves",
    },
    {
      id: "m_optica",
      icon: "🔭",
      cat: "physics",
      title: "Light and optics",
      desc: "Run the Optics simulator",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("optica"),
      actionLbl: "Open optics",
    },
    {
      id: "m_estatica",
      icon: "🏗️",
      cat: "physics",
      title: "Forces in balance",
      desc: "Explore Statics I — equilibrium of forces",
      xp: 20,
      type: "sim_id",
      goal: 1,
      action: () => openSim("estatica1"),
      actionLbl: "Open statics",
    },
    {
      id: "m_gases2",
      icon: "💨",
      cat: "chemistry",
      title: "Ideal gas law",
      desc: "Manipulate P, V and T in the gases sim",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("gases"),
      actionLbl: "Open gases",
    },
    {
      id: "m_titulacion",
      icon: "🧫",
      cat: "chemistry",
      title: "Titration point",
      desc: "Find the equivalence point in Titration",
      xp: 20,
      type: "sim_id",
      goal: 1,
      action: () => openSim("titulacion"),
      actionLbl: "Open titration",
    },
    {
      id: "m_reacciones",
      icon: "⚗️",
      cat: "chemistry",
      title: "Chemical reactions",
      desc: "Explore activation energy in Reactions",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("reacciones"),
      actionLbl: "Open reactions",
    },
    {
      id: "m_prac_7",
      icon: "🧠",
      cat: "practice",
      title: "Brain workout",
      desc: "Answer 7 questions without giving up",
      xp: 70,
      type: "pregs",
      goal: 7,
      action: () => go("practica"),
      actionLbl: "Practice",
    },
    {
      id: "m_prac_15",
      icon: "🏅",
      cat: "practice",
      title: "Champion round",
      desc: "Answer 15 questions in adaptive practice",
      xp: 150,
      type: "pregs",
      goal: 15,
      action: () => go("practica"),
      actionLbl: "Accept challenge",
    },
    {
      id: "m_exam",
      icon: "📝",
      cat: "practice",
      title: "Take an AI exam",
      desc: "Complete an AI-generated exam",
      xp: 80,
      type: "exam",
      goal: 1,
      action: () => go("examen"),
      actionLbl: "Open exam",
    },
    {
      id: "m_battle",
      icon: "⚔️",
      cat: "practice",
      title: "Enter a battle",
      desc: "Play a STEM battle against a friend",
      xp: 60,
      type: "battle",
      goal: 1,
      action: () => go("batalla"),
      actionLbl: "Battle!",
    },
    {
      id: "m_tutor_5",
      icon: "💬",
      cat: "tutor",
      title: "STEM conversation",
      desc: "Ask the AI Tutor 5 questions",
      xp: 50,
      type: "tutor",
      goal: 5,
      action: () => go("tutor"),
      actionLbl: "Open tutor",
    },
    {
      id: "m_mrua",
      icon: "🚀",
      cat: "physics",
      title: "MRUA in motion",
      desc: "Simulate uniformly accelerated motion",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("mrua"),
      actionLbl: "Open MRUA",
    },
    {
      id: "m_mru",
      icon: "➡️",
      cat: "physics",
      title: "Constant velocity",
      desc: "Explore URM — uniform rectilinear motion",
      xp: 10,
      type: "sim_id",
      goal: 1,
      action: () => openSim("mru"),
      actionLbl: "Open URM",
    },
    {
      id: "m_hooke",
      icon: "🔧",
      cat: "physics",
      title: "Spring force",
      desc: "Experiment with Hooke's Law",
      xp: 15,
      type: "sim_id",
      goal: 1,
      action: () => openSim("hooke"),
      actionLbl: "Open Hooke",
    },
    {
      id: "m_sim_3",
      icon: "🌟",
      cat: "lab",
      title: "Triple experiment",
      desc: "Use 3 different simulators today",
      xp: 60,
      type: "sims",
      goal: 3,
      action: () => openSim("tiro"),
      actionLbl: "Go to lab",
    },
  ];

  /* ────────────────────────────────────────────────────────────
     NEWS POOL (rotates daily)
  ──────────────────────────────────────────────────────────── */
  const NEWS_POOL = [
    {
      icon: "🎤",
      tag: "NEW",
      title: "Voice recognition available",
      desc: "Talk to Yachay AI without typing — try the microphone",
      cta: "Try it",
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
      tag: "ACHIEVEMENTS",
      title: "30 achievements to unlock",
      desc: "Complete missions and activities to earn XP and badges",
      cta: "View achievements",
      ctaFn: () => go("logros"),
    },
    {
      icon: "⚗️",
      tag: "LABORATORY",
      title: "17 simulators available",
      desc: "Physics and chemistry in real time — explore the lab",
      cta: "Explore",
      ctaFn: () => openSim("tiro"),
    },
    {
      icon: "🌿",
      tag: "TIP OF THE DAY",
      title: "Yachay uses the Socratic method",
      desc: "Never gives direct answers — it guides you to discover them",
      cta: "Ask",
      ctaFn: () => go("tutor"),
    },
    {
      icon: "🔥",
      tag: "STREAK",
      title: "Take care of your daily streak",
      desc: "Log in every day to maintain your consecutive days",
      cta: "View streak",
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
      tag: "TIP",
      title: "Practice 10 min a day",
      desc: "Consistency beats intense sporadic effort every time",
      cta: "Practice",
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
     SEASON CHALLENGE
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

    setText("season-badge", `🏆 ${monthName().toUpperCase()} CHALLENGE`);
    setText("season-title", season.title);
    setText("season-desc", season.desc);
    setText("season-ico", season.icon);
    setText("season-txt", `${prog} / ${season.goal} completed`);

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
        btn.textContent = "✅ Challenge completed!";
        btn.style.background = "rgba(255,255,255,.25)";
        btn.disabled = true;
      } else {
        btn.textContent = "▶ Continue challenge";
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
    const txt = d > 0 ? `⏳ Ends in ${d}d ${h}h` : `⏳ Ends in ${h}h`;
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
     NEWS BANNER
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
     DAILY MISSIONS
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
            <div class="dmc-prog-txt">${m.done ? "Completed!" : m.progress + " / " + m.goal}</div>
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
     COUNTDOWN TO MIDNIGHT
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
    return new Date().toLocaleDateString("en-US", { month: "long" });
  }
  function formatDate(d) {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  // Simple hash for daily seed
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

    // Hook simulators
    const origOpenSim = window.openSim;
    if (origOpenSim) {
      window.openSim = function (id) {
        origOpenSim(id);
        setTimeout(() => recordProgress("sim", 1), 500);
      };
    }

    // Hook correct answers (listen to custom event)
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
