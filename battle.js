/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — BATTLE.JS
   Batalla multijugador STEM en tiempo real.
   
   ESTADO ACTUAL: Modo LOCAL (Supabase desactivado)
   Para activar Supabase: busca "TODO: SUPABASE" y sigue los pasos.
   
   Flujo:
   1. Lobby → crear/unirse a sala
   2. Sala de espera → ambos jugadores listos
   3. Batalla → 5 rondas, 15s por pregunta
   4. Resultados → ganador, XP, historial
═══════════════════════════════════════════════════════════════ */

const Battle = (() => {
  /* ────────────────────────────────────────────────────────────
     TODO: SUPABASE — descomenta cuando tengas las credenciales
     
     import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
     const supabase = createClient('TU_SUPABASE_URL', 'TU_SUPABASE_ANON_KEY')
     
     Tabla necesaria en Supabase:
     create table battles (
       id text primary key,
       host_id text, guest_id text,
       host_name text, guest_name text,
       host_avatar text, guest_avatar text,
       topic text, rounds int,
       status text default 'waiting',
       questions jsonb, answers jsonb default '{}',
       scores jsonb default '{"host":0,"guest":0}',
       current_round int default 0,
       created_at timestamptz default now()
     );
     alter table battles enable row level security;
     create policy "public read" on battles for select using (true);
     create policy "public write" on battles for all using (true);
  ──────────────────────────────────────────────────────────── */
  const SUPABASE_ACTIVE = false; // ← cambia a true cuando conectes Supabase

  /* ────────────────────────────────────────────────────────────
     BANCO DE PREGUNTAS DE BATALLA
  ──────────────────────────────────────────────────────────── */
  const QUESTIONS = {
    fis: [
      {
        q: "¿Cuál es la fórmula del Movimiento Rectilíneo Uniforme?",
        opts: ["x = v·t", "F = m·a", "E = mc²", "PV = nRT"],
        ans: 0,
        xp: 10,
      },
      {
        q: "En caída libre, ¿qué valor tiene g en la Tierra?",
        opts: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "7.8 m/s²"],
        ans: 0,
        xp: 10,
      },
      {
        q: "¿De qué depende el período de un péndulo simple?",
        opts: [
          "Solo de su longitud",
          "De su masa",
          "De la amplitud",
          "De la densidad",
        ],
        ans: 0,
        xp: 15,
      },
      {
        q: "La Ley de Hooke establece que F es proporcional a:",
        opts: ["La deformación x", "La masa", "La velocidad", "La aceleración"],
        ans: 0,
        xp: 10,
      },
      {
        q: "¿Cuánto mide la velocidad de la luz?",
        opts: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
        ans: 0,
        xp: 15,
      },
      {
        q: "La Segunda Ley de Newton establece:",
        opts: ["F = m·a", "E = m·c²", "V = I·R", "P = m·v"],
        ans: 0,
        xp: 10,
      },
      {
        q: "¿Cuál es la unidad de fuerza en el SI?",
        opts: ["Newton", "Joule", "Pascal", "Watt"],
        ans: 0,
        xp: 8,
      },
      {
        q: "En el tiro parabólico, ¿qué componente de la velocidad es constante?",
        opts: ["La horizontal", "La vertical", "Ambas", "Ninguna"],
        ans: 0,
        xp: 15,
      },
      {
        q: "La energía cinética se calcula como:",
        opts: ["½mv²", "mgh", "mv", "Fd"],
        ans: 0,
        xp: 12,
      },
      {
        q: "¿Qué ley describe V = I·R?",
        opts: ["Ley de Ohm", "Ley de Faraday", "Ley de Newton", "Ley de Hooke"],
        ans: 0,
        xp: 10,
      },
    ],
    quim: [
      {
        q: "¿Cuántos electrones tiene el oxígeno?",
        opts: ["8", "6", "10", "16"],
        ans: 0,
        xp: 8,
      },
      {
        q: "El pH del agua pura es:",
        opts: ["7", "1", "14", "0"],
        ans: 0,
        xp: 8,
      },
      {
        q: "¿Qué indica un pH menor a 7?",
        opts: [
          "Solución ácida",
          "Solución básica",
          "Solución neutra",
          "Solución salina",
        ],
        ans: 0,
        xp: 10,
      },
      {
        q: "La fórmula de los gases ideales es:",
        opts: ["PV = nRT", "E = mc²", "F = ma", "V = IR"],
        ans: 0,
        xp: 12,
      },
      {
        q: "¿Cuál es el número atómico del hidrógeno?",
        opts: ["1", "2", "8", "6"],
        ans: 0,
        xp: 8,
      },
      {
        q: "¿Qué tipo de enlace comparten los átomos de NaCl?",
        opts: ["Iónico", "Covalente", "Metálico", "Van der Waals"],
        ans: 0,
        xp: 15,
      },
      {
        q: "¿Cuántos protones tiene el carbono?",
        opts: ["6", "8", "12", "4"],
        ans: 0,
        xp: 8,
      },
      {
        q: "El símbolo del oro en la tabla periódica es:",
        opts: ["Au", "Go", "Or", "Ag"],
        ans: 0,
        xp: 10,
      },
      {
        q: "Una reacción que libera calor se llama:",
        opts: ["Exotérmica", "Endotérmica", "Catalítica", "Redox"],
        ans: 0,
        xp: 12,
      },
      {
        q: "¿Cuál es el gas más abundante en la atmósfera?",
        opts: ["Nitrógeno", "Oxígeno", "CO₂", "Argón"],
        ans: 0,
        xp: 10,
      },
    ],
    mate: [
      { q: "¿Cuánto es √144?", opts: ["12", "11", "13", "14"], ans: 0, xp: 8 },
      { q: "¿Cuánto es 2³?", opts: ["8", "6", "9", "4"], ans: 0, xp: 8 },
      {
        q: "El área de un círculo es:",
        opts: ["πr²", "2πr", "πd", "r²"],
        ans: 0,
        xp: 10,
      },
      {
        q: "¿Cuánto es log₁₀(1000)?",
        opts: ["3", "2", "4", "10"],
        ans: 0,
        xp: 12,
      },
      {
        q: "La derivada de x² es:",
        opts: ["2x", "x²", "2", "x"],
        ans: 0,
        xp: 15,
      },
      {
        q: "¿Cuánto es sen(90°)?",
        opts: ["1", "0", "√2/2", "∞"],
        ans: 0,
        xp: 10,
      },
      {
        q: "¿Cuánto es 5! (factorial)?",
        opts: ["120", "60", "24", "100"],
        ans: 0,
        xp: 10,
      },
      {
        q: "La suma de ángulos de un triángulo es:",
        opts: ["180°", "360°", "90°", "270°"],
        ans: 0,
        xp: 8,
      },
      {
        q: "¿Cuánto es 15% de 200?",
        opts: ["30", "20", "25", "15"],
        ans: 0,
        xp: 8,
      },
      {
        q: "El teorema de Pitágoras establece: a²+b²=",
        opts: ["c²", "ab", "2c", "c³"],
        ans: 0,
        xp: 10,
      },
    ],
  };

  /* ────────────────────────────────────────────────────────────
     ESTADO INTERNO
  ──────────────────────────────────────────────────────────── */
  let state = {
    screen: "lobby", // lobby | waiting | game | results
    roomCode: null,
    isHost: false,
    topic: "mix",
    rounds: 5,
    currentRound: 0,
    scores: { me: 0, opp: 0 },
    questions: [],
    answers: [], // { round, meCorrect, oppCorrect, meFast, oppFast }
    timerVal: 15,
    timerInterval: null,
    answered: false,
    oppAnswered: false,
    opponent: null,
    channel: null, // Supabase Realtime channel
  };

  const HISTORY_KEY = "yl_battle_history";

  /* ────────────────────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────────────────────── */
  function init() {
    showScreen("lobby");
    loadHistory();
    updateOnlineCount();
  }

  /* ────────────────────────────────────────────────────────────
     CONFIGURACIÓN
  ──────────────────────────────────────────────────────────── */
  function setTopic(t, btn) {
    state.topic = t;
    document
      .querySelectorAll("[data-topic]")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  function setRounds(r, btn) {
    state.rounds = r;
    document
      .querySelectorAll("[data-rounds]")
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  /* ────────────────────────────────────────────────────────────
     CREAR SALA
  ──────────────────────────────────────────────────────────── */
  function createRoom() {
    const code = genCode();
    state.roomCode = code;
    state.isHost = true;

    // Obtener datos del usuario actual
    const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
    const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    state.me = {
      name: prof.name || ses.name || "Tú",
      avatar: prof.avatar || ses.flag || "👤",
      elo: ps.maxElo || 1000,
    };

    // Guardar sala en localStorage (simulando BD)
    const room = {
      id: code,
      host: state.me,
      guest: null,
      topic: state.topic,
      rounds: state.rounds,
      status: "waiting",
      questions: [],
      scores: { host: 0, guest: 0 },
    };
    localStorage.setItem("yl_room_" + code, JSON.stringify(room));

    // TODO: SUPABASE — cuando actives, sube la sala aquí:
    // await supabase.from('battles').insert(room)
    // subscribeRoom(code)

    showScreen("waiting");
    setText("bt-room-code", code);
    setText("bt-my-avatar", state.me.avatar);
    setText("bt-my-name", state.me.name);
    setText("bt-my-elo", "Elo " + state.me.elo);

    showToast("🏟️ Sala creada — código: " + code, 4000);

    // Simular rival que se une (demo local)
    setTimeout(simulateOpponentJoin, 2000);
  }

  /* ────────────────────────────────────────────────────────────
     UNIRSE A SALA
  ──────────────────────────────────────────────────────────── */
  function joinRoom() {
    const code = (document.getElementById("bt-code-input")?.value || "")
      .trim()
      .toUpperCase();
    if (code.length !== 6) {
      showToast("❌ El código debe tener 6 caracteres", 2500);
      return;
    }

    // TODO: SUPABASE — cuando actives:
    // const { data } = await supabase.from('battles').select().eq('id', code).single()
    // if(!data) { showToast('❌ Sala no encontrada'); return; }
    // subscribeRoom(code)

    // MODO LOCAL: buscar en localStorage
    const room = JSON.parse(localStorage.getItem("yl_room_" + code) || "null");
    if (!room) {
      showToast("❌ Sala no encontrada. Verifica el código.", 2500);
      return;
    }
    if (room.status !== "waiting") {
      showToast("⚠️ La sala ya está en juego", 2500);
      return;
    }

    state.roomCode = code;
    state.isHost = false;
    const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
    const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    state.me = {
      name: prof.name || ses.name || "Tú",
      avatar: prof.avatar || ses.flag || "👤",
      elo: ps.maxElo || 1000,
    };
    state.opponent = room.host;
    state.topic = room.topic;
    state.rounds = room.rounds;

    showScreen("waiting");
    setText("bt-room-code", code);
    setText("bt-my-avatar", state.me.avatar);
    setText("bt-my-name", state.me.name);
    setText("bt-my-elo", "Elo " + state.me.elo);
    setText("bt-opp-avatar", state.opponent.avatar);
    setText("bt-opp-name", state.opponent.name);
    setText("bt-opp-elo", "Elo " + state.opponent.elo);
    setText("bt-opp-ready", "✓ Listo");

    // Habilitar botón de inicio
    const btn = document.getElementById("bt-start-btn");
    if (btn) {
      btn.disabled = false;
    }

    showToast("✅ Te uniste a la sala de " + state.opponent.name, 3000);
  }

  /* ────────────────────────────────────────────────────────────
     SIMULAR RIVAL (modo local demo)
  ──────────────────────────────────────────────────────────── */
  const DEMO_OPPONENTS = [
    { name: "Valentina R.", avatar: "👩‍🔬", elo: 1180 },
    { name: "Carlos M.", avatar: "👨‍💻", elo: 1240 },
    { name: "Sofía L.", avatar: "🦋", elo: 1095 },
    { name: "Andrés T.", avatar: "🚀", elo: 1320 },
  ];

  function simulateOpponentJoin() {
    const opp =
      DEMO_OPPONENTS[Math.floor(Math.random() * DEMO_OPPONENTS.length)];
    state.opponent = opp;
    setText("bt-opp-avatar", opp.avatar);
    setText("bt-opp-name", opp.name);
    setText("bt-opp-elo", "Elo " + opp.elo);
    setText("bt-opp-ready", "✓ Listo");
    const btn = document.getElementById("bt-start-btn");
    if (btn) {
      btn.disabled = false;
    }
    showToast("⚔️ " + opp.name + " se unió a tu sala!", 3000);
  }

  /* ────────────────────────────────────────────────────────────
     INICIAR BATALLA
  ──────────────────────────────────────────────────────────── */
  function startBattle() {
    // Armar preguntas según el tema
    state.questions = buildQuestions(state.topic, state.rounds);
    state.currentRound = 0;
    state.scores = { me: 0, opp: 0 };
    state.answers = [];

    showScreen("game");

    // Header
    setText("bt-gmy-avatar", state.me?.avatar || "👤");
    setText("bt-gmy-name", state.me?.name || "Tú");
    setText("bt-gopp-avatar", state.opponent?.avatar || "👤");
    setText("bt-gopp-name", state.opponent?.name || "Rival");
    setText("bt-round-total", state.rounds);

    nextRound();
  }

  function buildQuestions(topic, count) {
    let pool = [];
    if (topic === "mix") {
      pool = [...QUESTIONS.fis, ...QUESTIONS.quim, ...QUESTIONS.mate];
    } else {
      pool = [...(QUESTIONS[topic] || QUESTIONS.fis)];
    }
    // Mezclar
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  /* ────────────────────────────────────────────────────────────
     RONDA
  ──────────────────────────────────────────────────────────── */
  function nextRound() {
    if (state.currentRound >= state.rounds) {
      endBattle();
      return;
    }

    const q = state.questions[state.currentRound];
    state.answered = false;
    state.oppAnswered = false;
    state.timerVal = 15;

    // Renderizar pregunta
    setText("bt-round-num", state.currentRound + 1);
    setText("bt-question", q.q);
    setText("bt-gmy-score", state.scores.me);
    setText("bt-gopp-score", state.scores.opp);

    // Detectar tema de la pregunta
    const topicMap = {
      fis: "⚡ Física",
      quim: "🧪 Química",
      mate: "📐 Matemáticas",
    };
    const topicKey = QUESTIONS.fis.includes(q)
      ? "fis"
      : QUESTIONS.quim.includes(q)
        ? "quim"
        : "mate";
    setText("bt-topic-badge", topicMap[topicKey] || "🎲 Mixto");

    // Renderizar opciones
    const opts = document.getElementById("bt-options");
    if (opts) {
      opts.innerHTML = q.opts
        .map(
          (o, i) => `
        <button class="bt-opt" id="bt-opt-${i}" onclick="Battle.answer(${i})">
          <span class="bt-opt-letter">${["A", "B", "C", "D"][i]}</span>
          <span class="bt-opt-text">${o}</span>
        </button>`,
        )
        .join("");
    }

    // Limpiar feedback
    setText("bt-answer-feedback", "");
    setText("bt-rival-txt", state.opponent?.name + " pensando...");
    const rdot = document.querySelector(".bt-rival-dot");
    if (rdot) {
      rdot.className = "bt-rival-dot bt-rival-thinking";
    }

    // Timer
    clearInterval(state.timerInterval);
    updateTimerRing(15, 15);
    state.timerInterval = setInterval(() => {
      state.timerVal--;
      setText("bt-timer-num", state.timerVal);
      updateTimerRing(state.timerVal, 15);
      if (state.timerVal <= 0) {
        clearInterval(state.timerInterval);
        if (!state.answered) timeOut();
      }
    }, 1000);

    // Simular respuesta del rival (modo local)
    simulateOpponentAnswer(q);
  }

  function updateTimerRing(val, max) {
    const ring = document.getElementById("bt-timer-ring");
    if (!ring) return;
    const pct = val / max;
    const circ = 163;
    ring.style.strokeDashoffset = circ * (1 - pct);
    ring.style.stroke =
      val <= 5 ? "#EF4444" : val <= 10 ? "#F59E0B" : "#5A5FE0";
    const numEl = document.getElementById("bt-timer-num");
    if (numEl)
      numEl.style.color = val <= 5 ? "#EF4444" : val <= 10 ? "#F59E0B" : "#fff";
  }

  /* ────────────────────────────────────────────────────────────
     RESPONDER
  ──────────────────────────────────────────────────────────── */
  function answer(idx) {
    if (state.answered) return;
    state.answered = true;
    clearInterval(state.timerInterval);

    const q = state.questions[state.currentRound];
    const correct = idx === q.ans;
    const timeBonus = Math.max(0, state.timerVal);

    // Colorear opciones
    document.querySelectorAll(".bt-opt").forEach((b, i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add("bt-opt-correct");
      else if (i === idx && !correct) b.classList.add("bt-opt-wrong");
    });

    // Feedback
    const fb = document.getElementById("bt-answer-feedback");
    if (fb) {
      if (correct) {
        const pts = q.xp + Math.floor(timeBonus / 3);
        state.scores.me += pts;
        fb.innerHTML = `<span class="bt-fb-correct">✅ ¡Correcto! +${pts} pts</span>`;
      } else {
        fb.innerHTML = `<span class="bt-fb-wrong">❌ Incorrecto — era: ${q.opts[q.ans]}</span>`;
      }
    }

    // TODO: SUPABASE — enviar respuesta al canal en tiempo real:
    // channel.send({ type:'broadcast', event:'answer', payload:{ round:state.currentRound, idx, correct, time: state.timerVal } })

    // Avanzar después de ver el resultado
    setTimeout(() => {
      state.currentRound++;
      nextRound();
    }, 2200);
  }

  function timeOut() {
    if (state.answered) return;
    state.answered = true;
    const q = state.questions[state.currentRound];
    document.querySelectorAll(".bt-opt").forEach((b, i) => {
      b.disabled = true;
      if (i === q.ans) b.classList.add("bt-opt-correct");
    });
    const fb = document.getElementById("bt-answer-feedback");
    if (fb)
      fb.innerHTML = `<span class="bt-fb-wrong">⏰ Tiempo agotado — era: ${q.opts[q.ans]}</span>`;
    setTimeout(() => {
      state.currentRound++;
      nextRound();
    }, 2000);
  }

  /* ────────────────────────────────────────────────────────────
     SIMULAR RIVAL (local)
  ──────────────────────────────────────────────────────────── */
  function simulateOpponentAnswer(q) {
    // El rival tiene entre 60-90% de probabilidad de acertar según dificultad
    const delay = 2000 + Math.random() * 8000;
    const accuracy = 0.6 + (state.opponent?.elo > 1200 ? 0.2 : 0);
    const correct = Math.random() < accuracy;

    setTimeout(() => {
      if (!state.answered && state.timerVal > 0) {
        // Rival respondió primero
        state.oppAnswered = true;
        const rdot = document.querySelector(".bt-rival-dot");
        const rtxt = document.getElementById("bt-rival-txt");
        if (rdot)
          rdot.className =
            "bt-rival-dot " + (correct ? "bt-rival-correct" : "bt-rival-wrong");
        if (rtxt)
          rtxt.textContent =
            state.opponent?.name +
            (correct ? " ✅ respondió" : " ❌ respondió");
        if (correct) {
          const pts = q.xp + Math.floor(Math.random() * 5);
          state.scores.opp += pts;
        }
      }
    }, delay);
  }

  /* ────────────────────────────────────────────────────────────
     FIN DE BATALLA
  ──────────────────────────────────────────────────────────── */
  function endBattle() {
    clearInterval(state.timerInterval);
    const win = state.scores.me > state.scores.opp;
    const tie = state.scores.me === state.scores.opp;

    showScreen("results");

    const banner = document.getElementById("bt-result-banner");
    const icon = document.getElementById("bt-result-icon");
    const title = document.getElementById("bt-result-title");
    const sub = document.getElementById("bt-result-sub");

    if (tie) {
      if (banner) banner.className = "bt-result-banner bt-result-tie";
      setText("bt-result-icon", "🤝");
      setText("bt-result-title", "¡Empate!");
      setText("bt-result-sub", "Los dos son excelentes — ¡revancha!");
    } else if (win) {
      if (banner) banner.className = "bt-result-banner bt-result-win";
      setText("bt-result-icon", "🏆");
      setText("bt-result-title", "¡Ganaste!");
      setText("bt-result-sub", "¡Increíble rendimiento STEM!");
    } else {
      if (banner) banner.className = "bt-result-banner bt-result-lose";
      setText("bt-result-icon", "💪");
      setText("bt-result-title", "¡Derrota!");
      setText("bt-result-sub", "¡Sigue practicando, la revancha es tuya!");
    }

    // Puntajes finales
    setText("bt-res-my-avatar", state.me?.avatar || "👤");
    setText("bt-res-my-name", state.me?.name || "Tú");
    setText("bt-res-my-score", state.scores.me);
    setText("bt-res-opp-avatar", state.opponent?.avatar || "👤");
    setText("bt-res-opp-name", state.opponent?.name || "Rival");
    setText("bt-res-opp-score", state.scores.opp);

    // XP ganada
    const xpGained = win ? 80 : tie ? 40 : 20;
    setText(
      "bt-xp-gained",
      `+${xpGained} XP ${win ? "por victoria" : "ganadas"}`,
    );

    // Guardar en historial
    saveHistory({
      win,
      tie,
      me: state.scores.me,
      opp: state.scores.opp,
      opponent: state.opponent,
      topic: state.topic,
      rounds: state.rounds,
      date: new Date().toISOString(),
    });

    // Registrar en streak
    if (typeof Streak !== "undefined") {
      Streak.register("practica", {
        label: `⚔️ Batalla STEM ${win ? "ganada" : "completada"}`,
        correct: win,
      });
    }

    // Limpiar sala
    if (state.roomCode) localStorage.removeItem("yl_room_" + state.roomCode);

    // TODO: SUPABASE — actualizar estado de la batalla:
    // await supabase.from('battles').update({ status:'finished', scores: state.scores }).eq('id', state.roomCode)
  }

  /* ────────────────────────────────────────────────────────────
     HISTORIAL
  ──────────────────────────────────────────────────────────── */
  function saveHistory(result) {
    const h = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    h.unshift(result);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 10)));
  }

  function loadHistory() {
    const h = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const el = document.getElementById("bt-history-list");
    if (!el) return;
    if (!h.length) {
      el.innerHTML =
        '<div class="bt-no-history">Aún no tienes batallas — ¡crea una sala!</div>';
      return;
    }
    el.innerHTML = h
      .map(
        (r) => `
      <div class="bt-hist-row">
        <div class="bt-hist-result ${r.win ? "bhr-win" : r.tie ? "bhr-tie" : "bhr-lose"}">
          ${r.win ? "Victoria" : r.tie ? "Empate" : "Derrota"}
        </div>
        <div class="bt-hist-info">
          <span class="bt-hist-opp">${r.opponent?.avatar || "👤"} ${r.opponent?.name || "Rival"}</span>
          <span class="bt-hist-score">${r.me} - ${r.opp}</span>
        </div>
        <div class="bt-hist-date">${new Date(r.date).toLocaleDateString()}</div>
      </div>`,
      )
      .join("");
  }

  /* ────────────────────────────────────────────────────────────
     QUICK MATCH (local — simula búsqueda)
  ──────────────────────────────────────────────────────────── */
  function quickMatch() {
    const btn = document.querySelector(".bt-btn-quick");
    if (btn) {
      btn.textContent = "⏳ Buscando...";
      btn.disabled = true;
    }

    // TODO: SUPABASE — buscar sala disponible:
    // const { data } = await supabase.from('battles').select().eq('status','waiting').is('guest_id',null).limit(1)
    // if(data.length) joinRoom(data[0].id) else createRoom()

    setTimeout(() => {
      if (btn) {
        btn.textContent = "Buscar rival →";
        btn.disabled = false;
      }
      createRoom(); // demo: crear sala y esperar
    }, 2000);
  }

  /* ────────────────────────────────────────────────────────────
     HELPERS UI
  ──────────────────────────────────────────────────────────── */
  function showScreen(name) {
    state.screen = name;
    ["lobby", "waiting", "game", "results"].forEach((s) => {
      const el = document.getElementById("bt-" + s);
      if (el) el.classList.toggle("active", s === name);
    });
  }

  function cancelRoom() {
    if (state.roomCode) localStorage.removeItem("yl_room_" + state.roomCode);
    state.roomCode = null;
    showScreen("lobby");
    loadHistory();
  }

  function goLobby() {
    clearInterval(state.timerInterval);
    state = {
      ...state,
      screen: "lobby",
      roomCode: null,
      currentRound: 0,
      scores: { me: 0, opp: 0 },
      questions: [],
      answered: false,
    };
    showScreen("lobby");
    loadHistory();
  }

  function rematch() {
    state.currentRound = 0;
    state.scores = { me: 0, opp: 0 };
    state.answers = [];
    startBattle();
  }

  function copyCode() {
    if (!state.roomCode) return;
    navigator.clipboard?.writeText(state.roomCode).then(() => {
      setText("bt-copy-btn", "✅ ¡Copiado!");
      setTimeout(() => setText("bt-copy-btn", "📋 Copiar código"), 2000);
    });
  }

  function updateOnlineCount() {
    // TODO: SUPABASE — contar usuarios conectados via Presence
    const nums = [3, 4, 5, 6, 7, 8];
    setText(
      "bt-online",
      nums[Math.floor(Math.random() * nums.length)] + " jugadores en línea",
    );
  }

  function genCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  }

  function setText(id, v) {
    const e = document.getElementById(id);
    if (e) e.textContent = v;
  }

  function showToast(msg, ms = 3000) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._bt);
    el._bt = setTimeout(() => (el.style.display = "none"), ms);
  }

  return {
    init,
    setTopic,
    setRounds,
    createRoom,
    joinRoom,
    quickMatch,
    startBattle,
    answer,
    cancelRoom,
    goLobby,
    rematch,
    copyCode,
  };
})();
