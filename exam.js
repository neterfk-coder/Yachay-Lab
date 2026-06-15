/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — EXAM.JS
   Generador de exámenes con Groq + LLaMA 3.3.
   Crea preguntas personalizadas según el nivel Elo del estudiante,
   califica automáticamente y genera certificado descargable.
═══════════════════════════════════════════════════════════════ */

const Exam = (() => {
  /* ── CONFIGURACIÓN ── */
  const GROQ_KEY = ""; // ← se toma del app.js automáticamente
  const GROQ_MODEL = "llama-3.3-70b-versatile";
  const EXAM_KEY = "yl_exam_history";

  /* ── ESTADO ── */
  let cfg = {
    subject: "physics",
    diff: "medium",
    count: 10,
  };
  let exam = {
    questions: [],
    answers: [],
    current: 0,
    score: 0,
    startTime: null,
    elapsed: 0,
    timerInterval: null,
  };

  /* ═══════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════ */
  function init() {
    showScreen("config");
    loadEloInfo();
    loadHistory();
    // Pre-rellenar nombre
    const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
    const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
    const inp = document.getElementById("exam-student-name");
    if (inp && !inp.value) inp.value = prof.name || ses.name || "";
  }

  function loadEloInfo() {
    const S = JSON.parse(localStorage.getItem("yl_elo") || "{}");
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    const maxElo = Math.max(
      S.f || 1000,
      S.q || 1000,
      S.m || 1000,
      ps.maxElo || 1000,
    );
    setText("exam-elo-num", maxElo);
    const level =
      maxElo >= 1300
        ? "💎 Diamond"
        : maxElo >= 1200
          ? "🥇 Gold"
          : maxElo >= 1100
            ? "🥈 Silver"
            : maxElo >= 1050
              ? "🥉 Bronze"
              : "🌱 Beginner";
    setText("exam-elo-level", level);
  }

  /* ═══════════════════════════════════════════════════════════
     CONFIGURAR
  ═══════════════════════════════════════════════════════════ */
  function setOpt(field, val, btn) {
    cfg[field] = val;
    const group = {
      subject: "exam-subject-opts",
      diff: "exam-diff-opts",
      count: "exam-count-opts",
    }[field];
    document
      .querySelectorAll(`#${group} .exam-opt`)
      .forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
  }

  /* ═══════════════════════════════════════════════════════════
     GENERAR EXAMEN CON GROQ
  ═══════════════════════════════════════════════════════════ */
  async function generate() {
    const S = JSON.parse(localStorage.getItem("yl_elo") || "{}");
    const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
    const maxElo = Math.max(
      S.f || 1000,
      S.q || 1000,
      S.m || 1000,
      ps.maxElo || 1000,
    );

    // Determinar dificultad automática
    let difficulty = cfg.diff;
    if (difficulty === "auto") {
      difficulty = maxElo >= 1200 ? "hard" : maxElo >= 1100 ? "medium" : "easy";
    }

    showScreen("loading");
    animateLoadingSteps();

    // Obtener clave Groq
    const key = (typeof GROQ_KEY !== "undefined" && GROQ_KEY) || "";
    const appKey =
      typeof window.GROQ_KEY_APP !== "undefined" ? window.GROQ_KEY_APP : "";
    const finalKey = key || appKey || "";

    const subjectMap = {
      physics:
        "Physics (kinematics, forces, energy, waves, electromagnetism, optics, statics)",
      chemistry:
        "Chemistry (periodic table, acids/bases, chemical reactions, ideal gases, thermochemistry)",
      math: "Mathematics (algebra, trigonometry, calculus basics, statistics)",
      mixed: "Physics, Chemistry and Mathematics combined",
    };

    const diffMap = {
      easy: "basic high school level, straightforward concepts, simple calculations",
      medium:
        "intermediate high school level, moderate calculations, requires understanding",
      hard: "advanced high school / pre-university level, complex problems, multi-step solutions",
    };

    const prompt = `You are a STEM teacher creating a ${cfg.count}-question multiple choice exam.

Subject: ${subjectMap[cfg.subject]}
Difficulty: ${diffMap[difficulty]}
Student Elo level: ${maxElo} (adjust complexity accordingly)

Generate EXACTLY ${cfg.count} questions. Return ONLY valid JSON, no markdown, no explanation.

Format:
{
  "title": "exam title",
  "subject": "${cfg.subject}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "question text with formula if needed",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correct": 0,
      "explanation": "brief explanation of why the answer is correct",
      "topic": "specific topic name",
      "points": 10
    }
  ]
}

Rules:
- correct is the 0-based index of the correct option
- All options must be plausible (no obviously wrong options)
- Include formulas where relevant using Unicode: ² ³ √ π θ α β Δ
- Explanation must be educational and concise (max 2 sentences)
- Vary the topics within the subject
- ${difficulty === "hard" ? "Include calculation problems that require multiple steps" : ""}`;

    try {
      let questions = null;

      if (finalKey && finalKey.startsWith("gsk_")) {
        const res = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + finalKey,
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              max_tokens: 4000,
              temperature: 0.7,
              messages: [{ role: "user", content: prompt }],
            }),
          },
        );
        const data = await res.json();
        const raw = data?.choices?.[0]?.message?.content?.trim();
        if (raw) {
          const clean = raw.replace(/```json|```/g, "").trim();
          questions = JSON.parse(clean);
        }
      }

      // Fallback: preguntas locales si no hay Groq
      if (!questions || !questions.questions?.length) {
        questions = generateLocalExam(
          cfg.subject,
          difficulty,
          parseInt(cfg.count),
        );
      }

      exam.questions = questions.questions;
      exam.answers = new Array(exam.questions.length).fill(null);
      exam.current = 0;
      exam.score = 0;
      exam.startTime = Date.now();
      exam.title = questions.title || "STEM Exam";
      exam.subject = cfg.subject;
      exam.difficulty = difficulty;
      exam.studentName =
        document.getElementById("exam-student-name")?.value?.trim() || "";

      showScreen("game");
      startTimer();
      renderQuestion();
    } catch (err) {
      console.error("Exam generation error:", err);
      // Fallback garantizado
      const fb = generateLocalExam(
        cfg.subject,
        difficulty,
        parseInt(cfg.count),
      );
      exam.questions = fb.questions;
      exam.answers = new Array(fb.questions.length).fill(null);
      exam.current = 0;
      exam.score = 0;
      exam.startTime = Date.now();
      exam.title = fb.title;
      exam.subject = cfg.subject;
      exam.difficulty = difficulty;
      exam.studentName =
        document.getElementById("exam-student-name")?.value?.trim() || "";
      showScreen("game");
      startTimer();
      renderQuestion();
    }
  }

  /* ── Animación de pasos de carga ── */
  function animateLoadingSteps() {
    const steps = ["els-1", "els-2", "els-3"];
    steps.forEach((id, i) => {
      setTimeout(() => {
        document
          .querySelectorAll(".el-step")
          .forEach((s) => s.classList.remove("el-active"));
        const el = document.getElementById(id);
        if (el) el.classList.add("el-active");
      }, i * 1200);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     PREGUNTAS LOCALES (fallback sin Groq)
  ═══════════════════════════════════════════════════════════ */
  function generateLocalExam(subject, diff, count) {
    const POOL = {
      physics: [
        {
          question: "What is the formula for Uniform Rectilinear Motion?",
          options: ["A) x = v·t", "B) F = m·a", "C) E = mc²", "D) PV = nRT"],
          correct: 0,
          explanation:
            "URM formula is x = v·t, where x is position, v is constant velocity and t is time.",
          topic: "Kinematics",
          points: 10,
        },
        {
          question: "In free fall, which quantity is constant?",
          options: [
            "A) Velocity",
            "B) Acceleration (g)",
            "C) Position",
            "D) Momentum",
          ],
          correct: 1,
          explanation:
            "In free fall, only gravitational acceleration g = 9.8 m/s² is constant.",
          topic: "Free Fall",
          points: 10,
        },
        {
          question: "What does Newton's Second Law state?",
          options: ["A) F = m·a", "B) E = mc²", "C) PV = nRT", "D) v = d/t"],
          correct: 0,
          explanation: "F = m·a: The net force equals mass times acceleration.",
          topic: "Newton's Laws",
          points: 10,
        },
        {
          question: "The period of a simple pendulum depends on:",
          options: [
            "A) Its mass",
            "B) Its length and gravity",
            "C) Its amplitude",
            "D) Its color",
          ],
          correct: 1,
          explanation:
            "T = 2π√(L/g) — period depends only on length L and gravitational acceleration g.",
          topic: "Pendulum",
          points: 10,
        },
        {
          question: "Hooke's Law states that F = k·x. If x doubles, F:",
          options: [
            "A) Doubles",
            "B) Halves",
            "C) Stays the same",
            "D) Quadruples",
          ],
          correct: 0,
          explanation:
            "Since F is directly proportional to x, doubling x doubles the force.",
          topic: "Hooke's Law",
          points: 10,
        },
        {
          question: "Ohm's Law relates:",
          options: ["A) V = I·R", "B) F = m·a", "C) E = mc²", "D) PV = nRT"],
          correct: 0,
          explanation: "V = I·R: Voltage equals current times resistance.",
          topic: "Ohm's Law",
          points: 10,
        },
        {
          question: "Mechanical energy conservation means:",
          options: [
            "A) Ep + Ec = constant",
            "B) F = m·a",
            "C) V = I·R",
            "D) PV = nRT",
          ],
          correct: 0,
          explanation:
            "Total mechanical energy (potential + kinetic) remains constant in a conservative system.",
          topic: "Energy",
          points: 10,
        },
        {
          question: "For equilibrium, ΣF must equal:",
          options: ["A) Zero", "B) m·a", "C) 10 N", "D) mg"],
          correct: 0,
          explanation:
            "For static equilibrium, the sum of all forces must equal zero (ΣF = 0).",
          topic: "Statics",
          points: 10,
        },
        {
          question: "What is the unit of force in SI?",
          options: ["A) Newton", "B) Joule", "C) Watt", "D) Pascal"],
          correct: 0,
          explanation:
            "The Newton (N) is the SI unit of force, equivalent to kg·m/s².",
          topic: "Units",
          points: 10,
        },
        {
          question: "In projectile motion, horizontal velocity is:",
          options: ["A) Constant", "B) Increasing", "C) Decreasing", "D) Zero"],
          correct: 0,
          explanation:
            "Horizontal velocity remains constant (no horizontal force), only vertical velocity changes due to gravity.",
          topic: "Projectile Motion",
          points: 10,
        },
      ],
      chemistry: [
        {
          question: "The pH of pure water at 25°C is:",
          options: ["A) 7", "B) 1", "C) 14", "D) 0"],
          correct: 0,
          explanation:
            "Pure water is neutral with pH = 7, meaning [H⁺] = [OH⁻] = 10⁻⁷ mol/L.",
          topic: "pH",
          points: 10,
        },
        {
          question: "A solution with pH < 7 is:",
          options: ["A) Acidic", "B) Basic", "C) Neutral", "D) Alkaline"],
          correct: 0,
          explanation:
            "pH < 7 indicates more H⁺ ions than OH⁻, making the solution acidic.",
          topic: "Acid-Base",
          points: 10,
        },
        {
          question: "The ideal gas law is:",
          options: ["A) PV = nRT", "B) F = ma", "C) E = mc²", "D) V = IR"],
          correct: 0,
          explanation:
            "PV = nRT relates pressure, volume, moles, gas constant R, and temperature.",
          topic: "Ideal Gases",
          points: 10,
        },
        {
          question: "How many electrons does oxygen have?",
          options: ["A) 8", "B) 6", "C) 16", "D) 12"],
          correct: 0,
          explanation:
            "Oxygen has atomic number 8, meaning it has 8 protons and 8 electrons.",
          topic: "Periodic Table",
          points: 10,
        },
        {
          question: "The symbol for gold in the periodic table is:",
          options: ["A) Au", "B) Go", "C) Or", "D) Ag"],
          correct: 0,
          explanation: 'Gold\'s symbol Au comes from the Latin word "Aurum".',
          topic: "Periodic Table",
          points: 10,
        },
        {
          question: "An exothermic reaction:",
          options: [
            "A) Releases heat",
            "B) Absorbs heat",
            "C) Has no heat change",
            "D) Only occurs at high temperature",
          ],
          correct: 0,
          explanation:
            "Exothermic reactions release energy to the surroundings (ΔH < 0).",
          topic: "Thermochemistry",
          points: 10,
        },
        {
          question: "pH = -log[H⁺]. If [H⁺] = 0.001 mol/L, pH =",
          options: ["A) 3", "B) -3", "C) 0.001", "D) 7"],
          correct: 0,
          explanation: "pH = -log(10⁻³) = -(-3) = 3. The solution is acidic.",
          topic: "pH Calculations",
          points: 10,
        },
        {
          question: "Which bond type forms NaCl?",
          options: ["A) Ionic", "B) Covalent", "C) Metallic", "D) Hydrogen"],
          correct: 0,
          explanation:
            "NaCl forms via ionic bonds — Na donates an electron to Cl, creating oppositely charged ions.",
          topic: "Chemical Bonds",
          points: 10,
        },
        {
          question: "At the equivalence point in titration:",
          options: [
            "A) moles acid = moles base",
            "B) pH = 0",
            "C) pH = 14",
            "D) concentration = 0",
          ],
          correct: 0,
          explanation:
            "At the equivalence point, moles of acid exactly equal moles of base (n_acid = n_base).",
          topic: "Titration",
          points: 10,
        },
        {
          question: "The most abundant gas in Earth's atmosphere is:",
          options: ["A) Nitrogen", "B) Oxygen", "C) CO₂", "D) Argon"],
          correct: 0,
          explanation:
            "Nitrogen (N₂) makes up approximately 78% of Earth's atmosphere.",
          topic: "Atmospheric Chemistry",
          points: 10,
        },
      ],
      math: [
        {
          question: "What is √144?",
          options: ["A) 12", "B) 11", "C) 13", "D) 14"],
          correct: 0,
          explanation: "12² = 144, so √144 = 12.",
          topic: "Square Roots",
          points: 10,
        },
        {
          question: "What is 2³?",
          options: ["A) 8", "B) 6", "C) 9", "D) 4"],
          correct: 0,
          explanation: "2³ = 2 × 2 × 2 = 8.",
          topic: "Exponents",
          points: 10,
        },
        {
          question: "The area of a circle with radius r is:",
          options: ["A) πr²", "B) 2πr", "C) πd", "D) r²"],
          correct: 0,
          explanation: "Area = πr². The circumference (perimeter) is 2πr.",
          topic: "Geometry",
          points: 10,
        },
        {
          question: "log₁₀(1000) =",
          options: ["A) 3", "B) 2", "C) 4", "D) 10"],
          correct: 0,
          explanation: "log₁₀(1000) = log₁₀(10³) = 3.",
          topic: "Logarithms",
          points: 10,
        },
        {
          question: "The derivative of x² is:",
          options: ["A) 2x", "B) x²", "C) 2", "D) x"],
          correct: 0,
          explanation:
            "Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹, so d/dx(x²) = 2x.",
          topic: "Calculus",
          points: 10,
        },
        {
          question: "sin(90°) =",
          options: ["A) 1", "B) 0", "C) √2/2", "D) ∞"],
          correct: 0,
          explanation:
            "At 90°, the sine function reaches its maximum value of 1.",
          topic: "Trigonometry",
          points: 10,
        },
        {
          question: "5! (5 factorial) =",
          options: ["A) 120", "B) 60", "C) 24", "D) 100"],
          correct: 0,
          explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120.",
          topic: "Combinatorics",
          points: 10,
        },
        {
          question: "The sum of angles in a triangle is:",
          options: ["A) 180°", "B) 360°", "C) 90°", "D) 270°"],
          correct: 0,
          explanation:
            "The interior angles of any triangle always sum to 180°.",
          topic: "Geometry",
          points: 10,
        },
        {
          question: "15% of 200 is:",
          options: ["A) 30", "B) 20", "C) 25", "D) 15"],
          correct: 0,
          explanation: "15% × 200 = 0.15 × 200 = 30.",
          topic: "Percentages",
          points: 10,
        },
        {
          question: "Pythagorean theorem: a² + b² =",
          options: ["A) c²", "B) ab", "C) 2c", "D) c³"],
          correct: 0,
          explanation:
            "In a right triangle: a² + b² = c², where c is the hypotenuse.",
          topic: "Pythagorean Theorem",
          points: 10,
        },
      ],
    };

    const pool =
      subject === "mixed"
        ? [...POOL.physics, ...POOL.chemistry, ...POOL.math]
        : POOL[subject] || POOL.physics;

    // Mezclar
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    // Agregar IDs
    selected.forEach((q, i) => {
      q.id = i + 1;
    });

    const titles = {
      physics: "Physics Exam",
      chemistry: "Chemistry Exam",
      math: "Mathematics Exam",
      mixed: "Mixed STEM Exam",
    };

    return {
      title: titles[subject] || "STEM Exam",
      subject,
      difficulty: diff,
      questions: selected,
    };
  }

  /* ═══════════════════════════════════════════════════════════
     RENDERIZAR PREGUNTA
  ═══════════════════════════════════════════════════════════ */
  function renderQuestion() {
    const q = exam.questions[exam.current];
    const tot = exam.questions.length;

    setText("exh-curr", exam.current + 1);
    setText("exh-total", tot);
    setText("eqa-num", `Question ${exam.current + 1} of ${tot}`);
    setText("eqa-text", q.question);
    setText("exh-score", exam.score);
    setText("exh-title", exam.title || "Exam");

    // Barra de progreso
    const fill = document.getElementById("exh-fill");
    if (fill) fill.style.width = (exam.current / tot) * 100 + "%";

    // Limpiar feedback
    setText("eqa-feedback", "");
    setText("eqa-explanation", "");

    // Opciones
    const opts = document.getElementById("eqa-opts");
    if (opts) {
      opts.innerHTML = q.options
        .map(
          (o, i) => `
        <button class="eqa-opt" id="eopt-${i}" onclick="Exam.answer(${i})">
          <span class="eopt-letter">${["A", "B", "C", "D"][i]}</span>
          <span class="eopt-text">${o.replace(/^[ABCD]\)\s*/, "")}</span>
        </button>`,
        )
        .join("");
    }

    // Reset botones nav
    const skip = document.getElementById("exam-skip");
    const next = document.getElementById("exam-next");
    if (skip) skip.style.display = "flex";
    if (next) next.style.display = "none";
  }

  /* ═══════════════════════════════════════════════════════════
     RESPONDER
  ═══════════════════════════════════════════════════════════ */
  function answer(idx) {
    // Bloquear doble respuesta
    document.querySelectorAll(".eqa-opt").forEach((b) => (b.disabled = true));

    const q = exam.questions[exam.current];
    const correct = idx === q.correct;
    exam.answers[exam.current] = { chosen: idx, correct };
    if (correct) exam.score += q.points || 10;

    // Colorear opciones
    document.querySelectorAll(".eqa-opt").forEach((b, i) => {
      if (i === q.correct) b.classList.add("eopt-correct");
      else if (i === idx && !correct) b.classList.add("eopt-wrong");
    });

    // Feedback
    const fb = document.getElementById("eqa-feedback");
    if (fb) {
      fb.textContent = correct ? "✅ Correct!" : "❌ Incorrect";
      fb.style.color = correct ? "#059669" : "#DC2626";
    }

    // Explicación
    setText("eqa-explanation", q.explanation || "");

    // Botones nav
    const skip = document.getElementById("exam-skip");
    const next = document.getElementById("exam-next");
    const isLast = exam.current >= exam.questions.length - 1;
    if (skip) skip.style.display = "none";
    if (next) {
      next.style.display = "flex";
      next.textContent = isLast ? "View results 🏆" : "Next question →";
    }

    // Registrar en streak
    if (typeof Streak !== "undefined") {
      Streak.register("practica", {
        label: `📝 Exam: ${q.topic || "STEM"}`,
        correct,
      });
    }
  }

  function skip() {
    exam.answers[exam.current] = { chosen: -1, correct: false };
    next();
  }

  function next() {
    if (exam.current >= exam.questions.length - 1) {
      endExam();
      return;
    }
    exam.current++;
    renderQuestion();
  }

  /* ═══════════════════════════════════════════════════════════
     FIN DEL EXAMEN
  ═══════════════════════════════════════════════════════════ */
  function endExam() {
    clearInterval(exam.timerInterval);
    exam.elapsed = Math.floor((Date.now() - exam.startTime) / 1000);
    showScreen("results");

    const total = exam.questions.length;
    const correct = exam.answers.filter((a) => a?.correct).length;
    const wrong = total - correct;
    const pct = Math.round((correct / total) * 100);
    const xp = correct * 15 + (pct >= 70 ? 50 : 0);

    // Grade
    const grade =
      pct >= 90
        ? "A+"
        : pct >= 80
          ? "A"
          : pct >= 70
            ? "B"
            : pct >= 60
              ? "C"
              : pct >= 50
                ? "D"
                : "F";
    const msg =
      pct >= 90
        ? "Excellent! 🌟"
        : pct >= 70
          ? "Well done! 👏"
          : pct >= 50
            ? "Good effort 💪"
            : "Keep practicing 📚";
    const color =
      pct >= 70
        ? "var(--grn,#10B981)"
        : pct >= 50
          ? "var(--amb,#F0A000)"
          : "var(--red,#E84545)";

    // Banner
    const banner = document.getElementById("exr-banner");
    if (banner) banner.style.borderColor = color;
    setText("exr-grade", grade);
    setText("exr-score-big", `${correct}/${total}`);
    setText("exr-label", msg);
    setText("exr-pct", `${pct}%`);
    document.getElementById("exr-grade").style.color = color;

    // Stats
    const mm = String(Math.floor(exam.elapsed / 60)).padStart(2, "0");
    const ss = String(exam.elapsed % 60).padStart(2, "0");
    setText("exrs-correct", correct);
    setText("exrs-wrong", wrong);
    setText("exrs-time", `${mm}:${ss}`);
    setText("exrs-xp", `+${xp}`);

    // Answer review
    renderReview();

    // Save en historial
    saveHistory({
      date: new Date().toISOString(),
      subject: exam.subject,
      difficulty: exam.difficulty,
      score: correct,
      total,
      pct,
      grade,
      xp,
      elapsed: exam.elapsed,
    });

    // XP al streak
    if (typeof Streak !== "undefined" && xp > 0) {
      Streak.register("practica", {
        label: `📝 Exam completed: ${grade}`,
        correct: pct >= 50,
      });
    }

    // Generar certificado
    setTimeout(() => generateCert(grade, correct, total, pct), 300);
  }

  function renderReview() {
    const list = document.getElementById("exr-review-list");
    if (!list) return;
    list.innerHTML = exam.questions
      .map((q, i) => {
        const a = exam.answers[i];
        const ok = a?.correct;
        const skipped = a?.chosen === -1;
        return `
        <div class="exr-item ${ok ? "exr-ok" : skipped ? "exr-skip" : "exr-wrong"}">
          <div class="exri-top">
            <span class="exri-num">${i + 1}</span>
            <span class="exri-q">${q.question.slice(0, 80)}${q.question.length > 80 ? "..." : ""}</span>
            <span class="exri-icon">${skipped ? "⏭️" : ok ? "✅" : "❌"}</span>
          </div>
          ${!ok && !skipped ? `<div class="exri-correct">Correct: ${q.options[q.correct]}</div>` : ""}
          <div class="exri-exp">${q.explanation || ""}</div>
        </div>`;
      })
      .join("");
  }

  /* ═══════════════════════════════════════════════════════════
     CERTIFICADO (Canvas API)
  ═══════════════════════════════════════════════════════════ */
  function generateCert(grade, correct, total, pct) {
    const cv = document.getElementById("cert-canvas");
    if (!cv) return;
    const W = 800,
      H = 560;
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d");

    // Fondo
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#080D1E");
    bg.addColorStop(0.5, "#0F1735");
    bg.addColorStop(1, "#080D1E");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Marco decorativo exterior
    ctx.strokeStyle = "rgba(90,95,224,.5)";
    ctx.lineWidth = 3;
    roundRectCtx(ctx, 10, 10, W - 20, H - 20, 16);
    ctx.stroke();
    ctx.strokeStyle = "rgba(245,158,11,.3)";
    ctx.lineWidth = 1;
    roundRectCtx(ctx, 18, 18, W - 36, H - 36, 12);
    ctx.stroke();

    // Esquinas decorativas
    const corners = [
      [28, 28],
      [W - 28, 28],
      [28, H - 28],
      [W - 28, H - 28],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = "rgba(245,158,11,.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header
    ctx.fillStyle = "rgba(90,95,224,.15)";
    ctx.fillRect(0, 0, W, 90);

    // Logo
    ctx.font = "bold 22px Plus Jakarta Sans,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.textAlign = "center";
    ctx.fillText("⚗️  YACHAY LAB", W / 2, 36);
    ctx.font = "12px Plus Jakarta Sans,sans-serif";
    ctx.fillStyle = "rgba(165,180,255,.6)";
    ctx.fillText("Virtual STEM Laboratory · Powered by AI", W / 2, 58);
    ctx.fillStyle = "rgba(255,255,255,.15)";
    ctx.fillRect(50, 70, W - 100, 1);

    // Título certificado
    ctx.fillStyle = "rgba(245,158,11,.9)";
    ctx.font = "bold 13px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("C E R T I F I C A T E  O F  C O M P L E T I O N", W / 2, 108);

    // Nombre del estudiante
    const name = exam.studentName || "Student";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 34px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name, W / 2, 172);
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.fillRect(W / 2 - 180, 182, 360, 1.5);

    // Texto certificado
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.font = "15px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("has successfully completed the", W / 2, 212);

    // Nombre del examen
    const subjectNames = {
      physics: "Physics",
      chemistry: "Chemistry",
      math: "Mathematics",
      mixed: "Mixed STEM",
    };
    ctx.fillStyle = "#A5B4FF";
    ctx.font = "bold 22px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `${subjectNames[exam.subject] || "STEM"} Exam — ${exam.difficulty?.toUpperCase() || "MEDIUM"}`,
      W / 2,
      248,
    );

    // Grade grande
    const gradeColor =
      pct >= 90
        ? "#10B981"
        : pct >= 70
          ? "#F59E0B"
          : pct >= 50
            ? "#6366F1"
            : "#EF4444";
    ctx.fillStyle = gradeColor;
    ctx.font = "bold 72px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(grade, W / 2, 342);

    // Score
    ctx.fillStyle = "rgba(255,255,255,.7)";
    ctx.font = "bold 16px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${correct} / ${total} correct  ·  ${pct}%`, W / 2, 378);

    // Fecha
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.font = "13px Plus Jakarta Sans,sans-serif";
    ctx.textAlign = "center";
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillText(`Issued on ${dateStr}`, W / 2, 420);

    // Sello
    ctx.fillStyle = "rgba(90,95,224,.2)";
    ctx.beginPath();
    ctx.arc(W - 90, H - 80, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(90,95,224,.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W - 90, H - 80, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.font = "bold 20px serif";
    ctx.textAlign = "center";
    ctx.fillText("✓", W - 90, H - 74);
    ctx.fillStyle = "rgba(255,255,255,.4)";
    ctx.font = "bold 9px Plus Jakarta Sans,sans-serif";
    ctx.fillText("VERIFIED", W - 90, H - 55);
  }

  function roundRectCtx(ctx, x, y, w, h, r) {
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

  function downloadCert() {
    const cv = document.getElementById("cert-canvas");
    if (!cv) {
      showToast("Generate an exam first", "error");
      return;
    }
    const a = document.createElement("a");
    a.href = cv.toDataURL("image/png");
    a.download = `yachay-certificate-${exam.subject}-${Date.now()}.png`;
    a.click();
    showToast("📥 Certificate downloaded!", 3000);
  }

  function shareCert() {
    const cv = document.getElementById("cert-canvas");
    if (!cv) return;
    if (navigator.share) {
      cv.toBlob(async (blob) => {
        const file = new File([blob], "yachay-certificate.png", {
          type: "image/png",
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "My Yachay Lab Certificate",
            files: [file],
          });
          return;
        }
        downloadCert();
      });
    } else {
      downloadCert();
    }
  }

  /* ═══════════════════════════════════════════════════════════
     TIMER
  ═══════════════════════════════════════════════════════════ */
  function startTimer() {
    clearInterval(exam.timerInterval);
    exam.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - exam.startTime) / 1000);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const ss = String(elapsed % 60).padStart(2, "0");
      setText("exh-time", `${mm}:${ss}`);
    }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════
     HISTORIAL
  ═══════════════════════════════════════════════════════════ */
  function saveHistory(entry) {
    const h = JSON.parse(localStorage.getItem(EXAM_KEY) || "[]");
    h.unshift(entry);
    localStorage.setItem(EXAM_KEY, JSON.stringify(h.slice(0, 10)));
    loadHistory();
  }

  function loadHistory() {
    const list = document.getElementById("eh-list");
    if (!list) return;
    const h = JSON.parse(localStorage.getItem(EXAM_KEY) || "[]");
    if (!h.length) {
      list.innerHTML =
        '<div class="eh-empty">No exams yet — generate one!</div>';
      return;
    }
    list.innerHTML = h
      .slice(0, 5)
      .map(
        (e) => `
      <div class="eh-item">
        <div class="eh-grade" style="color:${e.pct >= 70 ? "#10B981" : e.pct >= 50 ? "#F59E0B" : "#EF4444"}">${e.grade}</div>
        <div class="eh-info">
          <div class="eh-subject">${e.subject} · ${e.difficulty}</div>
          <div class="eh-date">${new Date(e.date).toLocaleDateString()}</div>
        </div>
        <div class="eh-score">${e.score}/${e.total} · ${e.pct}%</div>
      </div>`,
      )
      .join("");
  }

  /* ═══════════════════════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════════════════════ */
  function showScreen(name) {
    ["config", "loading", "game", "results"].forEach((s) => {
      const el = document.getElementById(`exam-${s}`);
      if (el) el.classList.toggle("active", s === name);
    });
  }

  function retry() {
    showScreen("config");
    loadHistory();
  }
  function goConfig() {
    clearInterval(exam.timerInterval);
    showScreen("config");
    loadHistory();
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
    clearTimeout(el._et);
    el._et = setTimeout(() => (el.style.display = "none"), ms);
  }

  return {
    init,
    setOpt,
    generate,
    answer,
    skip,
    next,
    downloadCert,
    shareCert,
    retry,
    goConfig,
  };
})();
