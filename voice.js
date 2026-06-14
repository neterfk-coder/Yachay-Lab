/* ═══════════════════════════════════════════════════════════
   YACHAY LAB — SISTEMA DE VOZ (voice.js)
   Web Speech API: reconocimiento + síntesis de voz
   Compatible: Chrome, Edge, Safari 14+
═══════════════════════════════════════════════════════════ */

const Voice = (() => {
  // ── ESTADO ──────────────────────────────────────────────────
  let recognition = null; // SpeechRecognition instance
  let synthesis = window.speechSynthesis;
  let isListening = false;
  let isSpeaking = false;
  let autoSend = true; // Enviar automáticamente al terminar
  let currentUtter = null; // Utterance actual
  let silenceTimer = null; // Timer para detectar silencio
  let animRaf = null; // RAF para animación de ondas

  // ── SOPORTE ─────────────────────────────────────────────────
  const hasSpeechRec =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  const hasSynthesis = "speechSynthesis" in window;

  // ── INICIALIZAR SpeechRecognition ───────────────────────────
  function initRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;

    const r = new SR();
    r.continuous = true; // Sigue escuchando hasta detenerlo
    r.interimResults = true; // Mostrar texto mientras habla
    r.maxAlternatives = 1;
    r.lang =
      document.getElementById("html-root")?.lang === "en" ? "en-US" : "es-PE";

    // Texto parcial (mientras habla)
    r.onresult = (e) => {
      let interim = "";
      let final_ = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final_ += t;
        else interim += t;
      }

      // Mostrar transcripción en tiempo real
      const tr = document.getElementById("voice-transcript");
      if (tr) {
        tr.textContent = final_ || interim;
        tr.style.display = final_ || interim ? "block" : "none";
      }

      // Si hay texto final → meter en el input
      if (final_) {
        const inp = document.getElementById("chat-input");
        if (inp) inp.value = (inp.value + " " + final_).trim();
        // Reiniciar timer de silencio
        clearTimeout(silenceTimer);
        silenceTimer = setTimeout(() => {
          if (isListening && autoSend) finalize();
        }, 1800); // 1.8s de silencio → enviar
      }

      animateWave();
    };

    r.onerror = (e) => {
      const msgs = {
        "not-allowed":
          "🎤 Permiso de micrófono denegado. Ve a Configuración del navegador.",
        "no-speech": "🔇 No detecté voz. Intenta de nuevo.",
        network: "📡 Error de red. Verifica tu conexión.",
        aborted: null,
      };
      const msg = msgs[e.error];
      if (msg) showVoiceToast(msg, "error");
      stop();
    };

    r.onend = () => {
      // Si sigue en modo escucha, reiniciar (Chrome lo detiene automáticamente)
      if (isListening) {
        try {
          r.start();
        } catch (_) {}
      }
    };

    return r;
  }

  // ── TOGGLE (botón principal) ─────────────────────────────────
  function toggle() {
    if (!hasSpeechRec) {
      showVoiceToast(
        "🎤 Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.",
        "error",
      );
      return;
    }
    // Detener síntesis si está hablando
    if (isSpeaking) stopSpeech();

    isListening ? stop() : start();
  }

  // ── START ────────────────────────────────────────────────────
  function start() {
    if (isListening) return;

    // Crear recognition si no existe
    if (!recognition) recognition = initRecognition();
    if (!recognition) {
      showVoiceToast("❌ Error al iniciar reconocimiento de voz", "error");
      return;
    }

    // Actualizar idioma según la app
    recognition.lang =
      document.getElementById("html-root")?.lang === "en" ? "en-US" : "es-PE";

    try {
      recognition.start();
      isListening = true;
      setVoiceUI("listening");
      showVoiceToast("🎤 Escuchando... Habla tu pregunta", "info");
    } catch (e) {
      showVoiceToast("🎤 Error al activar el micrófono", "error");
    }
  }

  // ── STOP ─────────────────────────────────────────────────────
  function stop() {
    isListening = false;
    clearTimeout(silenceTimer);
    cancelAnimationFrame(animRaf);

    if (recognition) {
      try {
        recognition.stop();
      } catch (_) {}
    }

    setVoiceUI("idle");
    hideTranscript();
  }

  // ── FINALIZAR y enviar ───────────────────────────────────────
  function finalize() {
    const inp = document.getElementById("chat-input");
    const text = inp ? inp.value.trim() : "";
    stop();
    if (text && typeof sendChat === "function") {
      setTimeout(sendChat, 200);
    }
  }

  // ── UI DEL BOTÓN ─────────────────────────────────────────────
  function setVoiceUI(state) {
    const btn = document.getElementById("voice-btn");
    const wave = document.getElementById("voice-wave-bar");
    const row = document.getElementById("chat-input-row");

    if (!btn) return;

    if (state === "listening") {
      btn.classList.add("voice-active");
      if (wave) wave.style.display = "flex";
      if (row) row.style.display = "none";
    } else {
      btn.classList.remove("voice-active");
      if (wave) wave.style.display = "none";
      if (row) row.style.display = "flex";
    }
  }

  function hideTranscript() {
    const tr = document.getElementById("voice-transcript");
    if (tr) {
      tr.style.display = "none";
      tr.textContent = "";
    }
  }

  // ── ANIMACIÓN DE ONDAS ───────────────────────────────────────
  function animateWave() {
    const dots = document.querySelectorAll(".vw-dots span");
    dots.forEach((d, i) => {
      const h = Math.random() * 20 + 4;
      d.style.height = h + "px";
    });
  }

  // ── SÍNTESIS DE VOZ (Yachay habla) ──────────────────────────
  function speak(text, lang) {
    if (!hasSynthesis) return;

    // Limpiar texto (quitar emojis, HTML, markdown)
    const clean = text
      .replace(/<[^>]*>/g, "")
      .replace(/[🌿🤖⚗️🧪💨⏱️🍎🎯⚡🔧〰️🔭🌡️🔬📚💡✓✅❌⚖️🌊🔥]/gu, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .trim()
      .slice(0, 400); // máx 400 chars para no hablar eternamente

    if (!clean) return;

    // Cancelar síntesis anterior
    if (isSpeaking) synthesis.cancel();

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang =
      lang ||
      (document.getElementById("html-root")?.lang === "en" ? "en-US" : "es-PE");
    utter.rate = 0.95; // Un poco más lento para que se entienda
    utter.pitch = 1.0;
    utter.volume = Voice._volume !== undefined ? Voice._volume : 0.9;

    // Intentar usar una voz en español de calidad
    const voices = synthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        (v.lang.startsWith("es") && v.name.includes("Google")) ||
        (v.lang.startsWith("es") && v.localService) ||
        v.lang.startsWith("es"),
    );
    if (preferred) utter.voice = preferred;

    utter.onstart = () => {
      isSpeaking = true;
      setSpeakUI(true);
    };
    utter.onend = () => {
      isSpeaking = false;
      setSpeakUI(false);
    };
    utter.onerror = () => {
      isSpeaking = false;
      setSpeakUI(false);
    };

    currentUtter = utter;
    synthesis.speak(utter);
  }

  function stopSpeech() {
    if (synthesis) synthesis.cancel();
    isSpeaking = false;
    setSpeakUI(false);
  }

  function setSpeakUI(active) {
    const btn = document.getElementById("yachay-speak-btn");
    if (btn) btn.classList.toggle("speaking", active);
    const avatar = document.querySelector(".tutor-avatar");
    if (avatar) avatar.classList.toggle("avatar-speaking", active);
  }

  // ── TOAST de voz ────────────────────────────────────────────
  function showVoiceToast(msg, type = "info") {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.className = `toast-notif toast-${type}`;
    el.style.display = "block";
    clearTimeout(el._vt);
    el._vt = setTimeout(() => {
      el.style.display = "none";
    }, 3000);
  }

  // ── EXPONER API pública ──────────────────────────────────────
  return {
    toggle,
    start,
    stop,
    speak,
    stopSpeech,
    isListening: () => isListening,
    isSpeaking: () => isSpeaking,
    supported: () => ({ rec: hasSpeechRec, synth: hasSynthesis }),
  };
})();

/* ═══════════════════════════════════════════════════════════
   INTEGRACIÓN CON EL CHAT
   Sobrescribir addMsg para que Yachay hable las respuestas
═══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Esperar a que app.js cargue addMsg
  const waitForApp = setInterval(() => {
    if (typeof addMsg !== "undefined") {
      clearInterval(waitForApp);

      // Guardar el addMsg original
      const _origAddMsg = addMsg;

      // Sobrescribir para que Yachay hable sus respuestas
      window.addMsg = function (role, text) {
        _origAddMsg(role, text);

        // Solo leer las respuestas del asistente, no las del usuario
        if (role === "a" || role === "assistant") {
          // Pequeño delay para que el texto aparezca primero
          setTimeout(() => {
            Voice.speak(text);
          }, 300);

          // Agregar botón de reproducir/parar junto al mensaje
          const msgs = document.getElementById("chat-msgs");
          const last = msgs?.lastElementChild;
          if (last) {
            const ctrl = document.createElement("div");
            ctrl.className = "msg-voice-ctrl";
            ctrl.innerHTML = `
              <button class="mvc-btn" id="yachay-speak-btn" onclick="Voice.isSpeaking() ? Voice.stopSpeech() : Voice.speak(\`${text.replace(/`/g, "\\`").replace(/\n/g, " ").slice(0, 300)}\`)">
                <svg class="mvc-play" width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1l9 5-9 5V1z"/></svg>
                <svg class="mvc-stop" width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="3" height="8" rx="1"/><rect x="7" y="2" width="3" height="8" rx="1"/></svg>
                <span class="mvc-lbl">Escuchar</span>
              </button>`;
            last.appendChild(ctrl);
          }
        }
      };

      // Mostrar/ocultar botón de voz según soporte
      const voiceBtn = document.getElementById("voice-btn");
      if (voiceBtn) {
        if (!Voice.supported().rec) {
          voiceBtn.style.display = "none";
          voiceBtn.title =
            "Reconocimiento de voz no disponible en este navegador";
        }
      }

      // Cargar voces disponibles (asíncrono en algunos navegadores)
      if ("speechSynthesis" in window) {
        speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
        speechSynthesis.getVoices();
      }
    }
  }, 200);
});
/* ── CONTROL DE VOLUMEN ─────────────────────────────────── */
Voice._volume = parseFloat(localStorage.getItem("yl_voice_vol") ?? "0.9");

Voice.setVolume = function (v) {
  Voice._volume = Math.max(0, Math.min(1, parseFloat(v)));
  localStorage.setItem("yl_voice_vol", Voice._volume);
  // Actualizar slider si está abierto
  const sl = document.getElementById("vol-slider");
  if (sl) sl.value = Math.round(Voice._volume * 100);
  const lbl = document.getElementById("vol-label");
  if (lbl) lbl.textContent = Math.round(Voice._volume * 100) + "%";
  const ico = document.getElementById("vol-icon");
  if (ico)
    ico.textContent =
      Voice._volume === 0
        ? "🔇"
        : Voice._volume < 0.4
          ? "🔈"
          : Voice._volume < 0.7
            ? "🔉"
            : "🔊";
};

Voice.toggleVolumePanel = function () {
  let panel = document.getElementById("vol-panel");
  if (panel) {
    panel.remove();
    return;
  }

  panel = document.createElement("div");
  panel.id = "vol-panel";
  panel.innerHTML = `
    <div class="vol-panel-inner">
      <div class="vol-top">
        <span id="vol-icon" class="vol-ico">${Voice._volume === 0 ? "🔇" : Voice._volume < 0.4 ? "🔈" : Voice._volume < 0.7 ? "🔉" : "🔊"}</span>
        <span class="vol-title">Volumen de voz</span>
        <button class="vol-close" onclick="document.getElementById('vol-panel').remove()">✕</button>
      </div>
      <div class="vol-slider-row">
        <button class="vol-step" onclick="Voice.setVolume(Voice._volume - 0.1)">−</button>
        <input id="vol-slider" class="vol-slider" type="range" min="0" max="100"
          value="${Math.round(Voice._volume * 100)}"
          oninput="Voice.setVolume(this.value / 100)">
        <button class="vol-step" onclick="Voice.setVolume(Voice._volume + 0.1)">+</button>
      </div>
      <div class="vol-pct-row">
        <span id="vol-label">${Math.round(Voice._volume * 100)}%</span>
      </div>
      <div class="vol-presets">
        <button onclick="Voice.setVolume(0)"   class="vp-btn">🔇 Mudo</button>
        <button onclick="Voice.setVolume(0.3)" class="vp-btn">🔈 Bajo</button>
        <button onclick="Voice.setVolume(0.6)" class="vp-btn">🔉 Medio</button>
        <button onclick="Voice.setVolume(1.0)" class="vp-btn">🔊 Alto</button>
      </div>
    </div>`;
  // Posicionar encima del botón
  const btn = document.getElementById("vol-btn");
  const rect = btn?.getBoundingClientRect();
  panel.style.cssText = `
    position:fixed;
    bottom:${window.innerHeight - (rect?.top ?? 300) + 8}px;
    right:${window.innerWidth - (rect?.right ?? 100) + 0}px;
    z-index:5000;`;
  document.body.appendChild(panel);
  // Cerrar al click fuera
  setTimeout(() => {
    document.addEventListener("click", function outside(e) {
      if (!panel.contains(e.target) && e.target.id !== "vol-btn") {
        panel.remove();
        document.removeEventListener("click", outside);
      }
    });
  }, 100);
};

// Inyectar botón de volumen en el header del tutor cuando cargue
document.addEventListener("DOMContentLoaded", () => {
  const waitForHead = setInterval(() => {
    const head = document.querySelector(".tutor-head");
    if (head && !document.getElementById("vol-btn")) {
      clearInterval(waitForHead);
      const btn = document.createElement("button");
      btn.id = "vol-btn";
      btn.className = "vol-toggle-btn";
      btn.title = "Control de volumen";
      btn.onclick = () => Voice.toggleVolumePanel();
      btn.innerHTML = `<span id="vol-btn-ico">${Voice._volume === 0 ? "🔇" : "🔊"}</span>`;
      // Insertarlo antes del botón de limpiar chat
      const clearBtn = head.querySelector(".tutor-clear");
      if (clearBtn) head.insertBefore(btn, clearBtn);
      else head.appendChild(btn);
      // Sincronizar ícono del botón cuando cambia volumen
      const origSet = Voice.setVolume.bind(Voice);
      Voice.setVolume = function (v) {
        origSet(v);
        const ico = document.getElementById("vol-btn-ico");
        if (ico)
          ico.textContent =
            Voice._volume === 0
              ? "🔇"
              : Voice._volume < 0.4
                ? "🔈"
                : Voice._volume < 0.7
                  ? "🔉"
                  : "🔊";
      };
    }
  }, 300);
});
