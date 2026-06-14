/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — NOTIFICATIONS.JS
   Notificaciones push para recordar la racha diaria.
   Usa la Notifications API del navegador + localStorage.
═══════════════════════════════════════════════════════════════ */

const YachayNotifs = (() => {
  const KEY_PERM = "yl_notif_permission";
  const KEY_SCHED = "yl_notif_schedule";
  const KEY_LAST = "yl_notif_last_sent";
  const DEFAULT_HOUR = 19; // 7pm

  /* ── Verificar soporte ── */
  const supported = "Notification" in window && "serviceWorker" in navigator;

  /* ── Pedir permiso ── */
  async function requestPermission() {
    if (!supported) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;

    const result = await Notification.requestPermission();
    localStorage.setItem(KEY_PERM, result);
    return result === "granted";
  }

  /* ── Enviar notificación inmediata ── */
  function send(title, body, icon = "⚗️", tag = "yachay") {
    if (!supported || Notification.permission !== "granted") return;

    const n = new Notification(title, {
      body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      tag,
      requireInteraction: false,
      silent: false,
    });

    n.onclick = () => {
      window.focus();
      n.close();
    };

    return n;
  }

  /* ── Programar recordatorio diario ── */
  function scheduleDailyReminder(hour = DEFAULT_HOUR) {
    localStorage.setItem(KEY_SCHED, JSON.stringify({ hour, enabled: true }));
    checkAndSchedule();
    showToast(`🔔 Daily reminder set for ${hour}:00`, 3000);
  }

  function cancelReminder() {
    const s = JSON.parse(localStorage.getItem(KEY_SCHED) || "{}");
    s.enabled = false;
    localStorage.setItem(KEY_SCHED, JSON.stringify(s));
    showToast("🔕 Reminders cancelled", 2500);
  }

  /* ── Verificar si toca enviar el recordatorio ── */
  function checkAndSchedule() {
    const sched = JSON.parse(localStorage.getItem(KEY_SCHED) || "{}");
    if (!sched.enabled) return;

    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const lastSent = localStorage.getItem(KEY_LAST) || "";
    const hour = sched.hour ?? DEFAULT_HOUR;

    // Ya se envió hoy → no volver a enviar
    if (lastSent === today) return;

    // Si ya pasó la hora del día → enviar
    if (now.getHours() >= hour) {
      fireReminder();
      localStorage.setItem(KEY_LAST, today);
    } else {
      // Programar para dentro de X ms
      const target = new Date(now);
      target.setHours(hour, 0, 0, 0);
      const ms = target - now;
      if (ms > 0 && ms < 86400000) {
        setTimeout(() => {
          fireReminder();
          localStorage.setItem(KEY_LAST, today);
        }, ms);
      }
    }
  }

  /* ── Mensajes de recordatorio según racha ── */
  function fireReminder() {
    if (Notification.permission !== "granted") return;
    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    const racha = st.current || 0;
    const best = st.best || 0;
    const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
    const name = ses.name?.split(" ")[0] || "Student";

    let title, body;

    if (racha === 0) {
      title = `📚 ${name}, start your streak today!`;
      body =
        "Open Yachay Lab and complete a simulator or practice question to begin your streak.";
    } else if (racha >= best && racha > 0) {
      title = `🔥 ${racha}-day streak! Keep it up, ${name}!`;
      body = `You're at your personal best! Don't break the streak — do at least one activity today.`;
    } else if (racha >= 5) {
      title = `⚡ ${racha} days in a row, ${name}!`;
      body = `Amazing dedication! Complete today's daily missions to keep your streak alive.`;
    } else {
      title = `🌿 Don't forget Yachay Lab today, ${name}!`;
      body = `Your ${racha}-day streak is waiting. Open a simulator and keep learning!`;
    }

    send(title, body, "⚗️", "streak-reminder");
  }

  /* ── Notificación de hito de racha ── */
  function notifyStreakMilestone(days) {
    const msgs = {
      3: {
        title: "🔥 3-day streak!",
        body: "You're on a roll! Keep practicing daily on Yachay Lab.",
      },
      5: {
        title: "⚡ 5-day streak!",
        body: "One week almost done! Don't stop now.",
      },
      7: {
        title: "🌟 One full week!",
        body: "7 days in a row — incredible dedication!",
      },
      10: {
        title: "💎 10-day streak!",
        body: "You're a STEM champion. Keep going!",
      },
      14: {
        title: "👑 Two weeks!",
        body: "14 consecutive days — you're unstoppable!",
      },
      30: {
        title: "🏆 30-day streak!",
        body: "A full month of daily learning. Legend status!",
      },
    };
    const m = msgs[days];
    if (m) send(m.title, m.body, "⚗️", "streak-milestone");
  }

  /* ── UI: Panel de configuración de notificaciones ── */
  async function showNotifPanel() {
    const hasPermission = Notification.permission === "granted";
    const sched = JSON.parse(localStorage.getItem(KEY_SCHED) || "{}");
    const enabled = !!sched.enabled;
    const hour = sched.hour ?? DEFAULT_HOUR;

    // Quitar panel previo
    document.getElementById("notif-panel")?.remove();

    const panel = document.createElement("div");
    panel.id = "notif-panel";
    panel.className = "notif-panel";
    panel.innerHTML = `
      <div class="np-header">
        <div class="np-title">🔔 Streak Reminders</div>
        <button class="np-close" onclick="document.getElementById('notif-panel').remove()">✕</button>
      </div>

      ${
        !supported
          ? `
        <div class="np-unsupported">
          ⚠️ Your browser doesn't support notifications. Try Chrome or Edge.
        </div>`
          : !hasPermission
            ? `
        <div class="np-request">
          <div class="np-req-icon">🔔</div>
          <div class="np-req-text">Allow notifications to get daily streak reminders</div>
          <button class="np-allow-btn" onclick="YachayNotifs.enable()">Allow notifications</button>
        </div>`
            : `
        <div class="np-enabled">
          <div class="np-status ${enabled ? "np-on" : "np-off"}">
            <span>${enabled ? "✅ Reminders ON" : "⏸️ Reminders OFF"}</span>
          </div>
          <div class="np-time-row">
            <label class="np-time-label">Remind me at:</label>
            <input type="number" class="np-time-input" id="np-hour" min="6" max="22" value="${hour}">
            <span class="np-time-lbl">:00</span>
          </div>
          <div class="np-actions">
            <button class="np-save-btn" onclick="YachayNotifs.saveSettings()">💾 Save</button>
            ${
              enabled
                ? `<button class="np-cancel-btn" onclick="YachayNotifs.cancelReminder()">🔕 Turn off</button>`
                : `<button class="np-enable-btn" onclick="YachayNotifs.saveSettings()">🔔 Turn on</button>`
            }
          </div>
          <button class="np-test-btn" onclick="YachayNotifs.testNotification()">🧪 Test notification now</button>
        </div>`
      }
    `;

    document.body.appendChild(panel);
    setTimeout(() => {
      document.addEventListener("click", function outside(e) {
        if (
          !panel.contains(e.target) &&
          !e.target.closest('[onclick*="showNotifPanel"]')
        ) {
          panel.remove();
          document.removeEventListener("click", outside);
        }
      });
    }, 100);
  }

  async function enable() {
    const ok = await requestPermission();
    if (ok) {
      showNotifPanel();
      showToast("🔔 Notifications enabled!", 3000);
    } else {
      showToast("❌ Permission denied. Enable in browser settings.", 4000);
    }
  }

  function saveSettings() {
    const hourEl = document.getElementById("np-hour");
    const hour = parseInt(hourEl?.value || DEFAULT_HOUR);
    scheduleDailyReminder(hour);
    document.getElementById("notif-panel")?.remove();
  }

  function testNotification() {
    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    send(
      `🔥 Test — ${st.current || 0} day streak!`,
      "This is how your daily reminder will look. See you tomorrow! 🌿",
      "⚗️",
      "test",
    );
    showToast("🧪 Test notification sent!", 2500);
  }

  function showToast(msg, ms = 3000) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._nt);
    el._nt = setTimeout(() => (el.style.display = "none"), ms);
  }

  /* ── Agregar botón 🔔 en el topbar ── */
  function injectTopbarBtn() {
    const tbRight = document.querySelector(".tb-right");
    if (!tbRight || document.getElementById("notif-topbar-btn")) return;

    const btn = document.createElement("button");
    btn.id = "notif-topbar-btn";
    btn.className = "notif-topbar-btn";
    btn.title = "Streak reminders";
    btn.onclick = () => showNotifPanel();

    const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
    const racha = st.current || 0;
    btn.innerHTML = `
      <span class="ntb-icon">🔔</span>
      ${racha > 0 ? `<span class="ntb-badge">${racha}🔥</span>` : ""}`;

    tbRight.insertBefore(btn, tbRight.firstChild);
  }

  /* ── INIT ── */
  function init() {
    if (!supported) return;
    injectTopbarBtn();
    // Verificar si toca enviar recordatorio
    if (Notification.permission === "granted") {
      checkAndSchedule();
    }
    // Escuchar hitos de racha del sistema de streaks
    document.addEventListener("streakMilestone", (e) => {
      if (e.detail?.days) notifyStreakMilestone(e.detail.days);
    });
  }

  return {
    init,
    enable,
    requestPermission,
    scheduleDailyReminder,
    cancelReminder,
    saveSettings,
    testNotification,
    showNotifPanel,
    notifyStreakMilestone,
    send,
  };
})();

/* ── Inicializar cuando la app cargue ── */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof YachayNotifs !== "undefined") YachayNotifs.init();
  }, 1500);
});
