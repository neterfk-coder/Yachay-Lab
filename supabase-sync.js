/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — SUPABASE SYNC (supabase-sync.js)
   Sincroniza en tiempo real:
   · Perfil de usuario (stats, Elo, racha, XP)
   · Ranking global desde Supabase
   · Battles multijugador en tiempo real
   · Sesiones de invitado con geo
   · Achievements desbloqueados
═══════════════════════════════════════════════════════════════ */

const SupaSync = (() => {
  /* ── Esperar a que Supabase esté listo ──────────────────── */
  function ready(cb) {
    if (window._supa) cb();
    else document.addEventListener("supabase:ready", cb, { once: true });
  }

  /* ════════════════════════════════════════════════════════════
     PERFIL — upsert cada vez que cambian los stats
  ════════════════════════════════════════════════════════════ */
  async function syncProfile() {
    ready(async () => {
      const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
      const prof = JSON.parse(localStorage.getItem("yl_profile") || "{}");
      const ps = JSON.parse(localStorage.getItem("yl_pstats") || "{}");
      const st = JSON.parse(localStorage.getItem("yl_streak_v2") || "{}");
      if (!ses || (!ses.email && !ses.guestId)) return;

      const id = ses.email || ses.guestId;
      const row = {
        id,
        name: prof.name || ses.name || "Guest",
        avatar: prof.avatar || ses.flag || "👤",
        flag: ses.flag || "🌐",
        country: ses.country || prof.country || "",
        city: ses.city || prof.city || "",
        timezone: ses.timezone || "",
        is_guest: !!ses.guest,
        max_elo: ps.maxElo || 1000,
        sims: ps.sims || 0,
        pregs: ps.pregs || 0,
        xp: st.xp || 0,
        streak: st.current || 0,
        best_streak: st.best || 0,
        last_active: new Date().toISOString(),
      };

      const { error } = await db()
        .from("profiles")
        .upsert(row, { onConflict: "id" });

      if (error) console.warn("SupaSync profile error:", error.message);
      else console.log("✅ Profile synced to Supabase");
    });
  }

  /* ════════════════════════════════════════════════════════════
     SESIÓN INVITADO — guardar geo en Supabase
  ════════════════════════════════════════════════════════════ */
  async function syncGuestSession(session) {
    ready(async () => {
      if (!session?.guest || !session?.guestId) return;
      const { error } = await db()
        .from("guest_sessions")
        .upsert(
          {
            guest_id: session.guestId,
            ip: session.ip || "",
            city: session.city || "",
            country: session.country || "",
            flag: session.flag || "🌐",
            timezone: session.timezone || "",
            login_count: session.loginCount || 1,
            last_login: new Date().toISOString(),
          },
          { onConflict: "guest_id" },
        );
      if (error) console.warn("SupaSync guest error:", error.message);
      else console.log("✅ Guest session synced");
    });
  }

  /* ════════════════════════════════════════════════════════════
     RANKING — cargar desde Supabase en tiempo real
  ════════════════════════════════════════════════════════════ */
  async function fetchRanking(filter = "elo", limit = 50) {
    return new Promise((resolve) => {
      ready(async () => {
        const colMap = {
          elo: "max_elo",
          racha: "streak",
          xp: "xp",
          sims: "sims",
        };
        const col = colMap[filter] || "max_elo";
        const { data, error } = await db()
          .from("profiles")
          .select(
            "id,name,avatar,flag,country,city,max_elo,streak,xp,sims,pregs,last_active",
          )
          .order(col, { ascending: false })
          .limit(limit);

        if (error) {
          console.warn("SupaSync ranking error:", error.message);
          resolve(null);
          return;
        }
        resolve(data || []);
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     LOGROS — guardar en Supabase cuando se desbloquean
  ════════════════════════════════════════════════════════════ */
  async function syncAchievement(achievementId) {
    ready(async () => {
      const ses = JSON.parse(localStorage.getItem("yl_session") || "{}");
      const userId = ses.email || ses.guestId;
      if (!userId) return;
      const { error } = await db()
        .from("achievements")
        .upsert(
          { id: achievementId, user_id: userId },
          { onConflict: "id,user_id" },
        );
      if (error) console.warn("SupaSync achievement error:", error.message);
    });
  }

  /* ════════════════════════════════════════════════════════════
     BATALLA — crear sala en Supabase
  ════════════════════════════════════════════════════════════ */
  async function createBattle(room) {
    return new Promise((resolve) => {
      ready(async () => {
        const { data, error } = await db()
          .from("battles")
          .insert(room)
          .select()
          .single();
        if (error) {
          console.warn("SupaSync battle create error:", error.message);
          resolve(null);
          return;
        }
        resolve(data);
      });
    });
  }

  async function joinBattle(roomCode, guestData) {
    return new Promise((resolve) => {
      ready(async () => {
        const { data, error } = await db()
          .from("battles")
          .update({
            guest_id: guestData.id,
            guest_name: guestData.name,
            guest_avatar: guestData.avatar,
            status: "ready",
          })
          .eq("id", roomCode)
          .eq("status", "waiting")
          .select()
          .single();
        if (error) {
          console.warn("SupaSync battle join error:", error.message);
          resolve(null);
          return;
        }
        resolve(data);
      });
    });
  }

  async function getBattle(roomCode) {
    return new Promise((resolve) => {
      ready(async () => {
        const { data, error } = await db()
          .from("battles")
          .select("*")
          .eq("id", roomCode)
          .single();
        if (error) {
          resolve(null);
          return;
        }
        resolve(data);
      });
    });
  }

  async function updateBattle(roomCode, updates) {
    ready(async () => {
      const { error } = await db()
        .from("battles")
        .update(updates)
        .eq("id", roomCode);
      if (error) console.warn("SupaSync battle update error:", error.message);
    });
  }

  /* ── Suscribirse a cambios en tiempo real de una batalla ── */
  function subscribeBattle(roomCode, onChange) {
    let channel = null;
    ready(() => {
      channel = db()
        .channel("battle:" + roomCode)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "battles",
            filter: `id=eq.${roomCode}`,
          },
          (payload) => onChange(payload.new),
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED")
            console.log("✅ Battle channel subscribed:", roomCode);
        });
    });
    return { unsubscribe: () => channel && db().removeChannel(channel) };
  }

  /* ── Suscribirse al ranking en tiempo real ── */
  function subscribeRanking(onChange) {
    let channel = null;
    ready(() => {
      channel = db()
        .channel("ranking:global")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
          },
          () => onChange(),
        )
        .subscribe();
    });
    return { unsubscribe: () => channel && db().removeChannel(channel) };
  }

  /* ════════════════════════════════════════════════════════════
     AUTO-SYNC — sincronizar automáticamente al detectar cambios
  ════════════════════════════════════════════════════════════ */
  let syncTimer = null;
  function scheduleSync() {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(syncProfile, 3000); // Debounce 3s
  }

  /* ── Inicializar y conectar hooks ── */
  function init() {
    // Sincronizar perfil al inicio
    syncProfile();

    // Sincronizar cuando cambian los stats
    ["yl_pstats", "yl_streak_v2", "yl_profile"].forEach((key) => {
      const orig = localStorage.setItem.bind(localStorage);
      Object.defineProperty(localStorage, "setItem", {
        value: function (k, v) {
          orig(k, v);
          if (k === key) scheduleSync();
        },
        configurable: true,
      });
    });

    // Sincronizar al abrir la app
    document.addEventListener("supabase:ready", () => {
      console.log("🌐 Supabase ready — syncing profile...");
      syncProfile();
    });

    console.log("✅ SupaSync initialized");
  }

  return {
    init,
    syncProfile,
    syncGuestSession,
    syncAchievement,
    fetchRanking,
    createBattle,
    joinBattle,
    getBattle,
    updateBattle,
    subscribeBattle,
    subscribeRanking,
  };
})();

/* ── Inicializar automáticamente ── */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => SupaSync.init(), 1000);
});
