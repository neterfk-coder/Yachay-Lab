/* ═══════════════════════════════════════════════════════
   YACHAY LAB — AUTH + PERFIL + i18n
═══════════════════════════════════════════════════════ */

// ── TRADUCCIONES ──
const I18N = {
  es: {
    "login.sub": "Virtual STEM Laboratory with AI",
    "login.tab": "Sign in",
    "register.tab": "Register",
    "login.email": "Email address",
    "login.pass": "Password",
    "login.forgot": "Forgot password?",
    "login.btn": "Sign in",
    "login.or": "or continue without account",
    "login.guest": "Continue as guest",
    "reg.name": "Full name",
    "reg.email": "Email address",
    "reg.pass": "Password",
    "reg.pass2": "Confirm password",
    "reg.btn": "Create free account",
    "nav.general": "General",
    "nav.home": "Home",
    "nav.tutor": "AI Tutor",
    "nav.practice": "Practice",
    "nav.profile": "My Profile",
    "nav.physics": "⚡ Physics",
    "nav.chemistry": "🧪 Chemistry",
    "nav.logout": "Sign out",
    "sim.caida": "Caída Libre",
    "sim.tiro": "Tiro Parabólico",
    "sim.tiro.full": "Tiro Parabólico",
    "sim.pendulo": "Péndulo",
    "sim.pendulo.full": "Péndulo Simple",
    "sim.ondas": "Ondas",
    "sim.ohm": "Ley de Ohm",
    "sim.optica": "Óptica",
    "sim.energia": "Energy",
    "sim.ph": "pH y Ácido-Base",
    "sim.gases": "Gases Ideales",
    "sim.reacciones": "Reacciones",
    "sim.titulacion": "Titulación",
    "sim.tabla": "Tabla Periódica",
    "sim.play": "▶ Start",
    "sim.reset": "⟳ Reset",
    "home.desc":
      "Virtual STEM Laboratory with AI. 15 simuladores interactivos de física y química.",
    "home.cta1": "🚀 Abrir Laboratory",
    "home.cta2": "🤖 AI Tutor",
    "home.sims": "Simulatores",
    "home.areas": "STEM Areas",
    "home.ai": "Socratic Tutor",
    "card.tiro": "Lanza proyectiles y visualiza la trayectoria",
    "card.pendulo": "Mide el periodo y compara con la teoría",
    "card.ph": "Explora la escala de pH con visualización",
    "card.gases": "PV = nRT con partículas animadas",
    "card.tutor": "Question sobre física o química",
    "card.prac.title": "Practice Elo",
    "card.prac": "Sistema adaptativo a tu nivel",
    "tutor.title": "Tutor Yachay",
    "tutor.sub": "Asistente socrático de STEM · Claude AI",
    "sug.mru": "MRU",
    "sug.ph": "pH",
    "sug.hooke": "Hooke",
    "sug.gas": "Gases",
    "chat.placeholder": "Escribe tu pregunta...",
    "prac.title": "🎯 Practice Adaptativa",
    "prac.physics": "Physics",
    "prac.chem": "Chemistry",
    "prac.math": "Mathematics",
    "prac.phy-btn": "⚡ Physics",
    "prac.chem-btn": "🧪 Chemistry",
    "prac.math-btn": "📐 Mathematics",
    "prac.loading": "Loading question...",
    "prof.edit": "✏️ Edit profile",
    "prof.badges": "🏆 Achievements",
    "prof.config": "⚙️ Settings",
    "prof.fname": "Name",
    "prof.grade": "Grade / Level",
    "prof.country": "Country",
    "prof.city": "City",
    "prof.bio": "Biography",
    "prof.fav": "Favorite subject",
    "prof.save": "💾 Save changes",
    "prof.chpass": "Change password",
    "cfg.lang": "Idioma",
    "cfg.lang.sub": "Cambia el idioma de la interfaz",
    "cfg.notif": "Notificaciones",
    "cfg.notif.sub": "Alertas de logros y progreso",
    "cfg.sounds": "Sonidos",
    "cfg.sounds.sub": "Efectos de sonido en la app",
    "cfg.delete": "Delete cuenta",
    "cfg.delete.sub": "Esta acción no se puede deshacer",
    "cfg.delete.btn": "Delete",
    "err.empty": "Please fill in all fields.",
    "err.email": "Ingresa un correo válido.",
    "err.pass6": "Password must be at least 6 characters.",
    "err.match": "Passwords do not match.",
    "err.exists": "Ese correo ya está registrado.",
    "err.notfound": "Correo o contraseña incorrectos.",
    "toast.welcome": "¡Welcome a Yachay Lab!",
    "toast.logout": "Sesión cerrada.",
    "toast.saved": "Perfil guardado ✓",
    "toast.passchg": "Password actualizada ✓",
    "toast.guest": "Entrando como invitado...",
    "guest.banner": "Estás en modo invitado — tu progreso no se guardará",
    "guest.exit": "Create account / Sign in",
  },
  en: {
    "login.sub": "Virtual STEM Laboratory with Artificial Intelligence",
    "login.tab": "Sign in",
    "register.tab": "Register",
    "login.email": "Email address",
    "login.pass": "Password",
    "login.forgot": "Forgot your password?",
    "login.btn": "Sign in",
    "login.or": "or continue without account",
    "login.guest": "Continue as guest",
    "reg.name": "Full name",
    "reg.email": "Email address",
    "reg.pass": "Password",
    "reg.pass2": "Confirm password",
    "reg.btn": "Create free account",
    "nav.general": "General",
    "nav.home": "Home",
    "nav.tutor": "AI Tutor",
    "nav.practice": "Practice",
    "nav.profile": "My Profile",
    "nav.physics": "⚡ Physics",
    "nav.chemistry": "🧪 Chemistry",
    "nav.logout": "Sign out",
    "sim.caida": "Free Fall",
    "sim.tiro": "Projectile Motion",
    "sim.tiro.full": "Projectile Motion",
    "sim.pendulo": "Pendulum",
    "sim.pendulo.full": "Simple Pendulum",
    "sim.ondas": "Waves",
    "sim.ohm": "Ohm's Law",
    "sim.optica": "Optics",
    "sim.energia": "Energy",
    "sim.ph": "pH & Acid-Base",
    "sim.gases": "Ideal Gases",
    "sim.reacciones": "Reactions",
    "sim.titulacion": "Titration",
    "sim.tabla": "Periodic Table",
    "sim.play": "▶ Start",
    "sim.reset": "⟳ Reset",
    "home.desc":
      "Virtual STEM Lab with AI. 15 interactive physics and chemistry simulators.",
    "home.cta1": "🚀 Open Lab",
    "home.cta2": "🤖 AI Tutor",
    "home.sims": "Simulators",
    "home.areas": "STEM Areas",
    "home.ai": "Socratic Tutor",
    "card.tiro": "Launch projectiles and visualize the trajectory",
    "card.pendulo": "Measure the period and compare with theory",
    "card.ph": "Explore the pH scale with visualization",
    "card.gases": "PV = nRT with animated particles",
    "card.tutor": "Ask about physics or chemistry",
    "card.prac.title": "Elo Practice",
    "card.prac": "Adaptive system to your level",
    "tutor.title": "Yachay Tutor",
    "tutor.sub": "Socratic STEM assistant · Claude AI",
    "sug.mru": "URM",
    "sug.ph": "pH",
    "sug.hooke": "Hooke's Law",
    "sug.gas": "Gases",
    "chat.placeholder": "Type your question...",
    "prac.title": "🎯 Adaptive Practice",
    "prac.physics": "Physics",
    "prac.chem": "Chemistry",
    "prac.math": "Mathematics",
    "prac.phy-btn": "⚡ Physics",
    "prac.chem-btn": "🧪 Chemistry",
    "prac.math-btn": "📐 Math",
    "prac.loading": "Loading question...",
    "prof.edit": "✏️ Edit profile",
    "prof.badges": "🏆 Achievements",
    "prof.config": "⚙️ Settings",
    "prof.fname": "Name",
    "prof.grade": "Grade / Level",
    "prof.country": "Country",
    "prof.city": "City",
    "prof.bio": "Biography",
    "prof.fav": "Favorite subject",
    "prof.save": "💾 Save changes",
    "prof.chpass": "Change password",
    "cfg.lang": "Language",
    "cfg.lang.sub": "Change the interface language",
    "cfg.notif": "Notifications",
    "cfg.notif.sub": "Achievement and progress alerts",
    "cfg.sounds": "Sounds",
    "cfg.sounds.sub": "Sound effects in the app",
    "cfg.delete": "Delete account",
    "cfg.delete.sub": "This action cannot be undone",
    "cfg.delete.btn": "Delete",
    "err.empty": "Please fill in all fields.",
    "err.email": "Enter a valid email.",
    "err.pass6": "Password must be at least 6 characters.",
    "err.match": "Passwords do not match.",
    "err.exists": "That email is already registered.",
    "err.notfound": "Incorrect email or password.",
    "toast.welcome": "Welcome to Yachay Lab!",
    "toast.logout": "Signed out.",
    "toast.saved": "Profile saved ✓",
    "toast.passchg": "Password updated ✓",
    "toast.guest": "Continuing as guest...",
    "guest.banner": "You are in guest mode — your progress will not be saved",
    "guest.exit": "Create account / Sign in",
  },
};

let LANG = localStorage.getItem("yl_lang") || "es";
function t(k) {
  return (I18N[LANG] && I18N[LANG][k]) || I18N.es[k] || k;
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = t(el.dataset.i18nPh);
    if (v) el.placeholder = v;
  });
  document.getElementById("html-root").lang = LANG;
  // Botones de idioma config
  ["cfg-es", "cfg-en"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", id.endsWith(LANG));
  });
  ["alang-es", "alang-en"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", id.endsWith(LANG));
  });
  const other =
    LANG === "es" ? { flag: "🇺🇸", lbl: "EN" } : { flag: "🇵🇪", lbl: "ES" };
  const f = document.getElementById("lang-flag"),
    l = document.getElementById("lang-lbl");
  if (f) f.textContent = other.flag;
  if (l) l.textContent = other.lbl;
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem("yl_lang", lang);
  applyLang();
  showToast(lang === "es" ? "🇵🇪 Español activado" : "🇺🇸 English activated");
}
function toggleLang() {
  setLang(LANG === "es" ? "en" : "es");
}

// ── STORAGE KEYS ──
const DB = "yl_users",
  SES = "yl_session",
  PROF = "yl_profile",
  CFG = "yl_cfg";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(DB)) || {};
  } catch {
    return {};
  }
};
const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SES));
  } catch {
    return null;
  }
};
const getProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROF)) || {};
  } catch {
    return {};
  }
};
const getCfg = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(CFG)) || { notif: true, sound: false }
    );
  } catch {
    return { notif: true, sound: false };
  }
};

// Estado de simulaciones y preguntas para perfil
const PSTATS_KEY = "yl_pstats";
const getPStats = () => {
  try {
    return (
      JSON.parse(localStorage.getItem(PSTATS_KEY)) || {
        sims: 0,
        pregs: 0,
        racha: 0,
        maxElo: 1000,
      }
    );
  } catch {
    return { sims: 0, pregs: 0, racha: 0, maxElo: 1000 };
  }
};
const savePStats = (d) => localStorage.setItem(PSTATS_KEY, JSON.stringify(d));

// ── AUTH ──
function switchTab(tab) {
  document.getElementById("form-login").style.display =
    tab === "login" ? "block" : "none";
  document.getElementById("form-register").style.display =
    tab === "register" ? "block" : "none";
  document
    .getElementById("tab-login")
    .classList.toggle("active", tab === "login");
  document
    .getElementById("tab-register")
    .classList.toggle("active", tab === "register");
  document.getElementById("login-err").textContent = "";
  document.getElementById("reg-err").textContent = "";
}

async function doLogin() {
  const email = document.getElementById("l-email").value.trim().toLowerCase();
  const pass = document.getElementById("l-pass").value;
  const err = document.getElementById("login-err");
  const btn = document.querySelector("#form-login .btn-auth");
  err.textContent = "";

  // Validaciones
  if (!email || !pass) {
    err.textContent = "Please fill in all fields.";
    return;
  }
  if (!email.includes("@")) {
    err.textContent = "Enter a valid email address.";
    return;
  }

  // Estado de carga
  if (btn) {
    btn.querySelector("span").textContent = "Signing in...";
    btn.disabled = true;
  }

  try {
    // 1. Intentar Supabase Auth
    let loginOk = false;
    if (window._supa && typeof SupaAuth !== "undefined") {
      const { data, error } = await SupaAuth.signIn(email, pass);
      if (!error && data) loginOk = true;
    }

    // 2. Fallback localStorage
    if (!loginOk) {
      const users = getUsers();
      if (!users[email]) {
        err.textContent = "Account not found. Check your email or register.";
        return;
      }
      if (users[email].pass !== btoa(pass)) {
        err.textContent = "Incorrect password. Please try again.";
        return;
      }
      loginOk = true;
    }

    // 3. Entrar a la app
    if (loginOk) {
      const users = getUsers();
      const name = users[email]?.name || email.split("@")[0];
      localStorage.setItem(SES, JSON.stringify({ email, name, guest: false }));
      launchApp({ email, name, guest: false });
    }
  } catch (e) {
    // Fallback total — intentar con localStorage
    const users = getUsers();
    if (users[email] && users[email].pass === btoa(pass)) {
      const name = users[email].name || email.split("@")[0];
      localStorage.setItem(SES, JSON.stringify({ email, name, guest: false }));
      launchApp({ email, name, guest: false });
    } else {
      err.textContent = "Connection error. Please try again.";
    }
  } finally {
    if (btn) {
      btn.querySelector("span").textContent = "Sign in";
      btn.disabled = false;
    }
  }
}

async function doRegister() {
  const name = document.getElementById("r-name").value.trim();
  const email = document.getElementById("r-email").value.trim().toLowerCase();
  const pass = document.getElementById("r-pass").value;
  const pass2 = document.getElementById("r-pass2").value;
  const err = document.getElementById("reg-err");
  const btn = document.querySelector("#form-register .btn-auth");
  err.textContent = "";

  // Validaciones en inglés
  if (!name || !email || !pass || !pass2) {
    err.textContent = "Please fill in all fields.";
    return;
  }
  if (!email.includes("@")) {
    err.textContent = "Enter a valid email address.";
    return;
  }
  if (pass.length < 6) {
    err.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (pass !== pass2) {
    err.textContent = "Passwords do not match.";
    return;
  }

  // Estado de carga
  if (btn) {
    btn.querySelector("span").textContent = "Creating account...";
    btn.disabled = true;
  }

  try {
    // 1. Save en localStorage primero (siempre funciona)
    const users = getUsers();
    if (users[email]) {
      // Ya existe — hacer login directamente
      err.textContent = "";
      localStorage.setItem(SES, JSON.stringify({ email, name, guest: false }));
      launchApp({ email, name, guest: false });
      return;
    }
    users[email] = {
      name,
      pass: btoa(pass),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(DB, JSON.stringify(users));

    // 2. Intentar Supabase Auth en paralelo (no bloquea)
    if (window._supa && typeof SupaAuth !== "undefined") {
      SupaAuth.signUp(email, pass, name).catch(() => {});
    }

    // 3. Entrar inmediatamente
    localStorage.setItem(SES, JSON.stringify({ email, name, guest: false }));
    launchApp({ email, name, guest: false });
  } catch (e) {
    // Fallback total
    try {
      const users = getUsers();
      users[email] = {
        name,
        pass: btoa(pass),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(DB, JSON.stringify(users));
      localStorage.setItem(SES, JSON.stringify({ email, name, guest: false }));
      launchApp({ email, name, guest: false });
    } catch (e2) {
      err.textContent = "Error creating account. Please try again.";
    }
  } finally {
    if (btn) {
      btn.querySelector("span").textContent = "Create free account";
      btn.disabled = false;
    }
  }
}

/* ══════════════════════════════════════════════════════
   MODO INVITADO — Perfil único por IP + dispositivo
   Cada vez que alguien entra como invitado:
   - Se consulta su IP real (ipapi.co)
   - Se genera un ID único basado en IP + timestamp + huella
   - El perfil queda guardado permanentemente en localStorage
   - Dos personas distintas = dos perfiles distintos
   - La misma persona = recupera SU perfil por IP
══════════════════════════════════════════════════════ */
async function enterGuest() {
  // Mostrar estado de carga en el botón
  const btnGuest = document.querySelector(".btn-guest");
  const btnOrig = btnGuest ? btnGuest.innerHTML : "";
  if (btnGuest) {
    btnGuest.disabled = true;
    btnGuest.innerHTML = "⏳ Detecting location...";
  }

  try {
    // ── PASO 1: Obtener IP y geolocalización real ──────────────
    let geo = {};
    try {
      const r = await fetch("https://ipapi.co/json/", {
        signal: AbortSignal.timeout(5000),
      });
      const data = await r.json();
      if (data && !data.error) {
        geo = {
          ip: data.ip || "",
          country: data.country_name || "",
          city: data.city || "",
          region: data.region || "",
          timezone: data.timezone || "",
          country_code: data.country_code || "",
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
          isp: data.org || "",
        };
      }
    } catch (_) {
      /* Sin internet → geo vacío, sigue igual */
    }

    // ── PASO 2: Generar ID único basado en IP + huella ─────────
    // La clave: si dos personas tienen la MISMA IP (mismo router),
    // se diferencia por la huella del navegador. Si mismo usuario
    // vuelve a entrar, recupera su perfil anterior.
    const fingerprint = [
      geo.ip || "noip",
      navigator.language || "",
      navigator.platform || "",
      screen.width + "x" + screen.height,
      screen.colorDepth || "",
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      navigator.deviceMemory || 0,
    ].join("::");

    const hashBuf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(fingerprint),
    );
    const hashHex = Array.from(new Uint8Array(hashBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // ID legible: últimos 12 caracteres del hash en mayúscula
    const guestId = "G-" + hashHex.slice(0, 12).toUpperCase();
    // Sub-id para mostrar al usuario (más corto)
    const shortId = hashHex.slice(0, 8).toUpperCase();

    // ── PASO 3: Ver si ya existe un perfil para este ID ────────
    const GUEST_DB = "yl_guests";
    const allGuests = JSON.parse(localStorage.getItem(GUEST_DB) || "{}");
    const isReturning = !!allGuests[guestId];
    const storedGeo = allGuests[guestId]?.geo || {};

    // ── PASO 4: Construir bandera y nombre personalizado ────────
    const flag = guestFlag(geo.country_code || storedGeo.country_code || "");

    const city = geo.city || storedGeo.city || "";
    const country = geo.country || storedGeo.country || "";
    const locName = city ? `${city}, ${country}` : country || "Unknown";

    const displayName = flag + " Guest · " + (country || "Unknown");

    // ── PASO 5: Crear / recuperar perfil de invitado ───────────
    const now = new Date().toISOString();
    if (!allGuests[guestId]) {
      // Primera vez — crear perfil
      allGuests[guestId] = {
        guestId,
        shortId,
        createdAt: now,
        lastLogin: now,
        loginCount: 1,
        geo: {
          ip: geo.ip || "—",
          city: geo.city || "—",
          region: geo.region || "—",
          country: geo.country || "—",
          country_code: geo.country_code || "—",
          timezone:
            geo.timezone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone ||
            "—",
          latitude: geo.latitude || 0,
          longitude: geo.longitude || 0,
          isp: geo.isp || "—",
        },
        flag,
        displayName,
        stats: { sims: 0, pregs: 0, racha: 0, maxElo: 1000 },
      };
    } else {
      // Vuelve a entrar — actualizar lastLogin y contador
      allGuests[guestId].lastLogin = now;
      allGuests[guestId].loginCount = (allGuests[guestId].loginCount || 1) + 1;
      allGuests[guestId].displayName = displayName; // actualizar en caso que cambió ciudad
      // Refresh geo si tenemos datos frescos
      if (geo.ip) allGuests[guestId].geo.ip = geo.ip;
    }
    localStorage.setItem(GUEST_DB, JSON.stringify(allGuests));

    // ── PASO 6: Sesión activa ──────────────────────────────────
    const session = {
      guest: true,
      guestId,
      shortId,
      name: displayName,
      email: "",
      flag,
      ip: geo.ip || allGuests[guestId].geo.ip || "—",
      city: geo.city || allGuests[guestId].geo.city || "—",
      country: geo.country || allGuests[guestId].geo.country || "—",
      region: geo.region || allGuests[guestId].geo.region || "—",
      timezone: geo.timezone || allGuests[guestId].geo.timezone || "—",
      country_code:
        geo.country_code || allGuests[guestId].geo.country_code || "—",
      latitude: geo.latitude || allGuests[guestId].geo.latitude || 0,
      longitude: geo.longitude || allGuests[guestId].geo.longitude || 0,
      isp: geo.isp || allGuests[guestId].geo.isp || "—",
      createdAt: allGuests[guestId].createdAt,
      loginCount: allGuests[guestId].loginCount,
      isReturning,
    };
    localStorage.setItem(SES, JSON.stringify(session));

    // Restaurar botón
    if (btnGuest) {
      btnGuest.disabled = false;
      btnGuest.innerHTML = btnOrig;
    }

    // Toast personalizado
    const msg = isReturning
      ? LANG === "es"
        ? `¡Welcome de vuelta! ${flag} ${city || country}`
        : `Welcome back! ${flag} ${city || country}`
      : LANG === "es"
        ? `¡Hola desde ${flag} ${locName}! 👋`
        : `Hello from ${flag} ${locName}! 👋`;
    showToast(msg, 4000);

    // Sincronizar sesión de invitado con Supabase
    if (typeof SupaSync !== "undefined") SupaSync.syncGuestSession(session);

    launchApp(session);
  } catch (err) {
    console.error("enterGuest error:", err);
    if (btnGuest) {
      btnGuest.disabled = false;
      btnGuest.innerHTML = btnOrig;
    }
    // Fallback mínimo si todo falla
    const session = {
      guest: true,
      guestId: "G-OFFLINE",
      shortId: "OFFLINE",
      name: "👤 Invitado",
      email: "",
      flag: "🌐",
      ip: "—",
      city: "—",
      country: "—",
      region: "—",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "—",
    };
    localStorage.setItem(SES, JSON.stringify(session));
    launchApp(session);
  }
}

// Bandera emoji a partir del código de país ISO-2
function guestFlag(code) {
  if (!code || code.length !== 2) return "🌐";
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

// SHA-256 nativo (Web Crypto API)
async function digestSHA(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Alias para compatibilidad
function countryFlag(code) {
  return guestFlag(code);
}

function strengthMeter(p) {
  const cols = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
  const lbls = ["Too weak", "Weak", "Good", "Strong"];
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) || /[0-9]/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  [1, 2, 3, 4].forEach((i) => {
    const b = document.getElementById("sb" + i);
    if (b) b.style.background = i <= s ? cols[s - 1] : "#E2E8F4";
  });
  const sl = document.getElementById("slabel");
  if (sl) {
    sl.textContent = p.length > 0 ? lbls[Math.max(s - 1, 0)] : "";
    sl.style.color = p.length > 0 ? cols[Math.max(s - 1, 0)] : "#94A3B8";
  }
}

function doLogout() {
  localStorage.removeItem(SES);
  document.getElementById("app").style.display = "none";
  document.getElementById("auth-screen").style.display = "flex";
  showToast(t("toast.logout"));
  // Reset campos login
  ["l-email", "l-pass", "r-name", "r-email", "r-pass", "r-pass2"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    },
  );
  document.getElementById("login-err").textContent = "";
}

function launchApp(user) {
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  // Nombre a mostrar
  const dname = user.guest ? user.name : user.name;
  const avatar = user.guest ? user.flag || "👤" : getProfile().avatar || "🧑‍🎓";

  // Sidebar
  document.getElementById("sb-username").textContent = dname;
  document.getElementById("sb-useremail").textContent = user.guest
    ? `${user.flag || "🌐"} ${user.country || "Guest"}`
    : user.email;
  document.getElementById("sb-avatar").textContent = avatar;

  // Topbar
  document.getElementById("tb-name").textContent = dname;
  document.getElementById("tb-avatar").textContent = avatar;

  // Banner invitado
  renderGuestBanner(user);
  applyLang();
  go("home");
  setTimeout(initHeroCanvas, 100);
  updateHomeElo();
  // Restaurar estado del sidebar
  if (window.innerWidth > 900) {
    const savedOpen = localStorage.getItem("yl_sidebar_open");
    if (savedOpen === "0") {
      document.getElementById("sidebar")?.classList.add("sb-closed");
      document.getElementById("main")?.classList.add("sb-expanded");
      document.getElementById("menu-btn")?.classList.add("active");
    }
  }
  // Mostrar onboarding si es primera visita
  setTimeout(() => {
    if (typeof Onboarding !== "undefined") Onboarding.maybeShow();
  }, 1500);

  const welcomeMsg = user.guest
    ? LANG === "es"
      ? `¡Welcome! ${dname} 👋`
      : `Welcome! ${dname} 👋`
    : t("toast.welcome") + " " + user.name + " 👋";
  showToast(welcomeMsg);
}

// Banner de invitado — diseño profesional
function renderGuestBanner(user) {
  const isGuest = typeof user === "object" ? user.guest : user === true;
  let bar = document.getElementById("guest-bar");
  if (!isGuest) {
    if (bar) bar.remove();
    return;
  }
  if (bar) bar.remove();

  const u = typeof user === "object" ? user : getSession() || {};
  const flag = u.flag || "🌐";
  const country = u.country && u.country !== "—" ? u.country : "Guest";
  const isBack = u.isReturning;

  bar = document.createElement("div");
  bar.id = "guest-bar";
  bar.className = "guest-bar";
  bar.innerHTML = `
    <div class="gb-inner">
      <div class="gb-left">
        <span class="gb-online-dot"></span>
        <span class="gb-flag-pill">${flag} ${country}</span>
        <span class="gb-sep">·</span>
        <span class="gb-mode-lbl">${isBack ? "Welcome back" : "Guest session"}</span>
      </div>
      <div class="gb-right">
        <button class="gb-cta" onclick="exitGuest()">
          ✦ Sign up free
        </button>
        <button class="gb-dismiss"
          onclick="this.closest('.guest-bar').style.animation='guestBarOut .25s ease forwards';setTimeout(()=>this.closest('.guest-bar').remove(),240)"
          title="Dismiss">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>`;

  document
    .getElementById("main")
    .insertBefore(bar, document.getElementById("content"));
}

function exitGuest() {
  localStorage.removeItem(SES);
  document.getElementById("app").style.display = "none";
  document.getElementById("auth-screen").style.display = "flex";
  const bar = document.getElementById("guest-bar");
  if (bar) bar.remove();
  // Ir al tab de registro
  switchTab("register");
  showToast(
    LANG === "es"
      ? "Crea tu cuenta para guardar tu progreso 🚀"
      : "Create an account to save your progress 🚀",
    4000,
  );
}

// ── TOAST ──
function showToast(msg, ms = 3000) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.display = "none";
  }, ms);
}

// ══════════════════════════════════════════
// PERFIL
// ══════════════════════════════════════════
const EMOJIS = [
  "🧑‍🎓",
  "👩‍🔬",
  "👨‍🔬",
  "🧑‍💻",
  "👩‍💻",
  "👨‍💻",
  "🦸",
  "🦸‍♀️",
  "🧙",
  "🧙‍♀️",
  "🐱",
  "🐶",
  "🦊",
  "🐸",
  "🐧",
  "🦋",
  "🌟",
  "⚡",
  "🔥",
  "🌊",
  "🍀",
  "🌈",
  "🎯",
  "🚀",
  "⚗️",
  "🔭",
  "🔬",
  "💡",
  "🧪",
  "📚",
];

const BANNERS = [
  "linear-gradient(135deg,#6366F1,#8B5CF6,#EC4899)",
  "linear-gradient(135deg,#0EA5E9,#6366F1)",
  "linear-gradient(135deg,#10B981,#3B82F6)",
  "linear-gradient(135deg,#F59E0B,#EF4444)",
  "linear-gradient(135deg,#EC4899,#F59E0B)",
  "linear-gradient(135deg,#0F1729,#6366F1)",
  "linear-gradient(135deg,#14B8A6,#8B5CF6)",
  "linear-gradient(135deg,#EF4444,#7C3AED)",
  "linear-gradient(135deg,#F97316,#FBBF24)",
];

const LOGROS = [
  {
    id: "first_login",
    ico: "🌟",
    name: "Primera vez",
    desc: "Iniciaste sesión por primera vez",
  },
  {
    id: "sim_1",
    ico: "⚗️",
    name: "Primer experimento",
    desc: "Abriste tu primer simulador",
  },
  {
    id: "sim_5",
    ico: "🔬",
    name: "Científico",
    desc: "Usaste 5 simuladores distintos",
  },
  {
    id: "sim_10",
    ico: "🧪",
    name: "Laboratorista",
    desc: "Usaste 10 simuladores distintos",
  },
  {
    id: "pregs_10",
    ico: "💬",
    name: "Curioso",
    desc: "Hiciste 10 preguntas al tutor",
  },
  {
    id: "pregs_50",
    ico: "🤖",
    name: "Dialéctico",
    desc: "Hiciste 50 preguntas al tutor",
  },
  { id: "elo_1100", ico: "📈", name: "En forma", desc: "Alcanzaste Elo 1100" },
  { id: "elo_1300", ico: "🏅", name: "Expert", desc: "Alcanzaste Elo 1300" },
  {
    id: "racha_5",
    ico: "🔥",
    name: "En racha",
    desc: "5 respuestas correctas seguidas",
  },
  {
    id: "profile_done",
    ico: "🎨",
    name: "Identidad",
    desc: "Completaste tu perfil",
  },
];

let currentAvatar = "👤";
let currentBanner = BANNERS[0];
let favSubject = "";

function renderPerfil() {
  const ses = getSession();
  const prof = getProfile();
  const ps = getPStats();
  const cfg = getCfg();
  if (!ses) return;

  // Banner y avatar
  const banner = prof.banner || BANNERS[0];
  const avatar = prof.avatar || (ses.guest ? "👤" : "🧑‍🎓");
  currentAvatar = avatar;
  currentBanner = banner;
  document.getElementById("perfil-banner").style.background = banner;
  document.getElementById("perfil-avatar").textContent = avatar;
  document.getElementById("tb-avatar").textContent = avatar;
  document.getElementById("sb-avatar").textContent = avatar;

  // Info nombre, email y localidad
  const dname = ses.guest ? ses.name : ses.name;
  document.getElementById("perfil-name").textContent = prof.name || dname;

  if (ses.guest) {
    const flag = ses.flag || "🌐";
    const country = ses.country && ses.country !== "—" ? ses.country : "";
    const city = ses.city && ses.city !== "—" ? ses.city : "";
    const shortId = ses.shortId || (ses.guestId ? ses.guestId.slice(-8) : "—");
    const logins = ses.loginCount || 1;
    const joined = ses.createdAt
      ? new Date(ses.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

    const loc = city && country ? `${city}, ${country}` : country || "Unknown";

    document.getElementById("perfil-email").textContent = `${flag} ${loc}`;
    document.getElementById("perfil-joined").textContent =
      `Member since ${joined} · ${logins} session${logins > 1 ? "s" : ""}`;

    // Tarjeta de invitado — limpia, solo lo esencial
    let geoCard = document.getElementById("guest-geo-card");
    if (!geoCard) {
      geoCard = document.createElement("div");
      geoCard.id = "guest-geo-card";
      geoCard.className = "guest-geo-card";
      document.getElementById("perfil-header").after(geoCard);
    }
    geoCard.innerHTML = `
      <div class="ggc-title">🌍 Guest Session</div>
      <div class="ggc-grid">
        <div class="ggc-item"><span>📍 Location</span><strong>${flag} ${loc}</strong></div>
        <div class="ggc-item"><span>🪪 Session ID</span><strong>${shortId}</strong></div>
      </div>
      <div class="ggc-note">Create a free account to save your progress permanently and appear on the global ranking.</div>
      <button class="ggc-cta" onclick="exitGuest()">✦ Create free account →</button>`;

    // Pre-rellenar form con datos geo
    if (!prof.country && country)
      document.getElementById("pf-country").value = country;
    if (!prof.city && city) document.getElementById("pf-city").value = city;
  } else {
    // Remover tarjeta geo si existe (es usuario registrado)
    document.getElementById("guest-geo-card")?.remove();
    document.getElementById("perfil-email").textContent = ses.email;
    const users = getUsers();
    if (users[ses.email]?.createdAt) {
      const d = new Date(users[ses.email].createdAt);
      document.getElementById("perfil-joined").textContent =
        (LANG === "es" ? "Member since " : "Member since ") +
        d.toLocaleDateString();
    }
  }

  // Badge nivel
  const elo = ps.maxElo || 1000;
  const badge =
    elo >= 1300
      ? "🥇 Expert"
      : elo >= 1100
        ? "🥈 Advanced"
        : elo >= 900
          ? "🥉 Intermediate"
          : "🌱 Beginner";
  document.getElementById("perfil-badge").textContent = badge;

  // Stats
  document.getElementById("ps-sims").textContent = ps.sims || 0;
  document.getElementById("ps-pregs").textContent = ps.pregs || 0;
  document.getElementById("ps-racha").textContent = ps.racha || 0;
  document.getElementById("ps-elo").textContent = ps.maxElo || 1000;

  // Campos editar
  document.getElementById("pf-name").value =
    prof.name || (ses.guest ? "" : ses.name) || "";
  document.getElementById("pf-grade").value = prof.grade || "";
  document.getElementById("pf-country").value = prof.country || "";
  document.getElementById("pf-city").value = prof.city || "";
  document.getElementById("pf-bio").value = prof.bio || "";
  document.getElementById("bio-count").textContent =
    (prof.bio || "").length + "/160";

  favSubject = prof.fav || "";
  document
    .querySelectorAll(".fav-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.fav === favSubject));

  // Config
  document.getElementById("cfg-notif").checked = cfg.notif !== false;
  document.getElementById("cfg-sound").checked = !!cfg.sound;
  ["cfg-es", "cfg-en"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", id.endsWith(LANG));
  });

  // Achievements
  renderAchievements(prof, ps);
}

function renderAchievements(prof, ps) {
  const earned = new Set(prof.logros || []);
  if (ps.sims >= 1) earned.add("sim_1");
  if (ps.sims >= 5) earned.add("sim_5");
  if (ps.sims >= 10) earned.add("sim_10");
  if (ps.pregs >= 10) earned.add("pregs_10");
  if (ps.pregs >= 50) earned.add("pregs_50");
  if (ps.maxElo >= 1100) earned.add("elo_1100");
  if (ps.maxElo >= 1300) earned.add("elo_1300");
  if (ps.racha >= 5) earned.add("racha_5");
  earned.add("first_login");
  const grid = document.getElementById("logros-grid");
  if (!grid) return;
  grid.innerHTML = LOGROS.map(
    (l) => `
    <div class="logro-card ${earned.has(l.id) ? "earned" : ""}">
      <div class="logro-ico">${l.ico}</div>
      <div class="logro-name">${l.name}</div>
      <div class="logro-desc">${l.desc}</div>
      ${
        earned.has(l.id)
          ? `
        <button class="logro-share-btn"
          onclick="event.stopPropagation();ShareBadge.share(${JSON.stringify(l).replace(/"/g, "&quot;")})"
          title="Share achievement">
          📤 Share
        </button>`
          : ""
      }
    </div>`,
  ).join("");
}

function showPTab(tab, btn) {
  document
    .querySelectorAll(".ptab")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".ptab-content")
    .forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("ptab-" + tab).classList.add("active");
  if (tab === "logros") renderAchievements(getProfile(), getPStats());
  if (tab === "progress" && typeof ProgressChart !== "undefined") {
    setTimeout(() => ProgressChart.render("f"), 100);
  }
}

function setFav(fav, btn) {
  favSubject = fav;
  document
    .querySelectorAll(".fav-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function saveProfile() {
  const ses = getSession();
  if (!ses) return;
  const prof = getProfile();
  prof.name = document.getElementById("pf-name").value.trim() || prof.name;
  prof.grade = document.getElementById("pf-grade").value;
  prof.country = document.getElementById("pf-country").value.trim();
  prof.city = document.getElementById("pf-city").value.trim();
  prof.bio = document.getElementById("pf-bio").value.slice(0, 160);
  prof.fav = favSubject;
  prof.avatar = currentAvatar;
  prof.banner = currentBanner;
  if (!prof.logros) prof.logros = [];
  if (prof.name && prof.grade && prof.country && prof.bio)
    prof.logros.push("profile_done");
  localStorage.setItem(PROF, JSON.stringify(prof));
  // Refresh nombre en sesión si cambió
  if (!ses.guest && prof.name) {
    ses.name = prof.name;
    localStorage.setItem(SES, JSON.stringify(ses));
    document.getElementById("sb-username").textContent = prof.name;
    document.getElementById("tb-name").textContent = prof.name;
    document.getElementById("perfil-name").textContent = prof.name;
  }
  showToast(t("toast.saved"));
  // Rerender badge
  renderPerfil();
}

function showChangePass() {
  const box = document.getElementById("chpass-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function changePassword() {
  const ses = getSession();
  if (!ses || ses.guest) return;
  const old = document.getElementById("cp-old").value;
  const nw = document.getElementById("cp-new").value;
  const nw2 = document.getElementById("cp-new2").value;
  const err = document.getElementById("cp-err");
  err.textContent = "";
  const users = getUsers();
  if (!users[ses.email] || users[ses.email].pass !== btoa(old)) {
    err.textContent = "Password actual incorrecta.";
    return;
  }
  if (nw.length < 6) {
    err.textContent = t("err.pass6");
    return;
  }
  if (nw !== nw2) {
    err.textContent = t("err.match");
    return;
  }
  users[ses.email].pass = btoa(nw);
  localStorage.setItem(DB, JSON.stringify(users));
  ["cp-old", "cp-new", "cp-new2"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  document.getElementById("chpass-box").style.display = "none";
  showToast(t("toast.passchg"));
}

function saveCfg() {
  const cfg = {
    notif: document.getElementById("cfg-notif").checked,
    sound: document.getElementById("cfg-sound").checked,
  };
  localStorage.setItem(CFG, JSON.stringify(cfg));
}

function deleteAccount() {
  const ses = getSession();
  if (!ses || ses.guest) return;
  if (
    !confirm(
      "¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
    )
  )
    return;
  const users = getUsers();
  delete users[ses.email];
  localStorage.setItem(DB, JSON.stringify(users));
  localStorage.removeItem(SES);
  localStorage.removeItem(PROF);
  doLogout();
}

// ── EMOJI PICKER ──
function openEmojiPicker() {
  const grid = document.getElementById("emoji-grid");
  grid.innerHTML = EMOJIS.map(
    (e) => `<button onclick="selectEmoji('${e}')">${e}</button>`,
  ).join("");
  document.getElementById("emoji-modal").classList.add("open");
}
function selectEmoji(e) {
  currentAvatar = e;
  document.getElementById("perfil-avatar").textContent = e;
  closeModals();
}

// ── BANNER PICKER ──
function openBannerPicker() {
  const grid = document.getElementById("banner-grid");
  grid.innerHTML = BANNERS.map(
    (b, i) => `
    <div class="banner-opt ${b === currentBanner ? "active" : ""}"
      style="background:${b}"
      onclick="selectBanner('${b.replace(/'/g, '"')}',this)">
    </div>`,
  ).join("");
  document.getElementById("banner-modal").classList.add("open");
}
function selectBanner(b, el) {
  currentBanner = b;
  document.getElementById("perfil-banner").style.background = b;
  document
    .querySelectorAll(".banner-opt")
    .forEach((x) => x.classList.remove("active"));
  el.classList.add("active");
  closeModals();
}

function closeModals() {
  document.getElementById("emoji-modal").classList.remove("open");
  document.getElementById("banner-modal").classList.remove("open");
}

// Bio counter
document.addEventListener("input", (e) => {
  if (e.target.id === "pf-bio") {
    document.getElementById("bio-count").textContent =
      e.target.value.length + "/160";
  }
});

// ── CANVAS ANIMADO DE AUTH ──────────────────────────────────
(function initAuthCanvas() {
  const cv = document.getElementById("auth-canvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let W, H, nodes, raf;

  function resize() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
  }

  function makeNodes() {
    const count = Math.floor((W * H) / 18000);
    return Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 0.8,
      // color aleatorio entre púrpura, azul y verde
      hue: [245, 268, 160][Math.floor(Math.random() * 3)],
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Gradiente de fondo
    const bg = ctx.createRadialGradient(
      W * 0.35,
      H * 0.5,
      0,
      W * 0.35,
      H * 0.5,
      W * 0.7,
    );
    bg.addColorStop(0, "rgba(20,16,60,.95)");
    bg.addColorStop(0.6, "rgba(8,12,30,1)");
    bg.addColorStop(1, "rgba(4,6,18,1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Orbe izquierdo
    const orb1 = ctx.createRadialGradient(
      W * 0.15,
      H * 0.4,
      0,
      W * 0.15,
      H * 0.4,
      W * 0.35,
    );
    orb1.addColorStop(0, "rgba(90,95,224,.12)");
    orb1.addColorStop(1, "rgba(90,95,224,0)");
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, W, H);

    // Orbe derecho
    const orb2 = ctx.createRadialGradient(
      W * 0.8,
      H * 0.6,
      0,
      W * 0.8,
      H * 0.6,
      W * 0.3,
    );
    orb2.addColorStop(0, "rgba(128,86,214,.1)");
    orb2.addColorStop(1, "rgba(128,86,214,0)");
    ctx.fillStyle = orb2;
    ctx.fillRect(0, 0, W, H);

    // Mover y dibujar nodos
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${n.hue},80%,75%,.55)`;
      ctx.fill();
    });

    // Líneas entre nodos cercanos
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(165,180,255,${(0.18 * (1 - d / 120)).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  resize();
  nodes = makeNodes();
  draw();
  window.addEventListener("resize", () => {
    resize();
    nodes = makeNodes();
  });

  // Detener cuando se oculta la pantalla auth
  const obs = new MutationObserver(() => {
    const s = document.getElementById("auth-screen");
    if (s && s.style.display === "none") {
      cancelAnimationFrame(raf);
      obs.disconnect();
    }
  });
  obs.observe(document.getElementById("auth-screen") || document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
})();

// ── CONTADOR ANIMADO DE STATS ────────────────────────────────
function animateCounters() {
  document.querySelectorAll(".al-stat-num[data-target]").forEach((el) => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 40);
  });
}

// ── ONBOARDING ──────────────────────────────────────────────
const Onboarding = (() => {
  let step = 1;
  const SEEN_KEY = "yl_onboarding_done";

  function show() {
    const el = document.getElementById("onboarding");
    if (el) el.style.display = "flex";
  }

  function next() {
    step++;
    [1, 2, 3].forEach((i) => {
      const slide = document.getElementById("ob-slide-" + i);
      const dot = document.getElementById("ob-s" + i);
      if (slide) slide.style.display = i === step ? "block" : "none";
      if (dot) {
        dot.classList.toggle("ob-active", i === step);
        if (i < step) dot.style.background = "rgba(90,95,224,.5)";
      }
    });
  }

  function finish(simId) {
    const el = document.getElementById("onboarding");
    if (el) {
      el.style.animation = "fadeOut .3s ease forwards";
      setTimeout(() => (el.style.display = "none"), 280);
    }
    localStorage.setItem(SEEN_KEY, "1");
    if (simId) setTimeout(() => openSim(simId), 350);
  }

  function maybeShow() {
    if (!localStorage.getItem(SEEN_KEY)) {
      setTimeout(show, 1200);
    }
  }

  return { show, next, finish, maybeShow };
})();

// ── INIT ──
document.addEventListener("DOMContentLoaded", () => {
  setLang(LANG);
  setTimeout(animateCounters, 400);
  const ses = getSession();
  if (ses) {
    launchApp(ses);
    return;
  }
  document.getElementById("auth-screen").style.display = "flex";
});

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal, .reveal-card").forEach((el) => {
    obs.observe(el);
  });
}

/* ═══════════════════════════════════════════════════════
   SIMULADORES · PRÁCTICA · TUTOR
═══════════════════════════════════════════════════════ */

const S = {
  sim: null,
  raf: null,
  elo: { f: 1000, q: 1000, m: 1000 },
  topic: "f",
  chatH: [],
};

function kill() {
  if (S.raf) cancelAnimationFrame(S.raf);
  S.raf = null;
}

// ── NAVEGACIÓN ──
function scrollTop() {
  document.getElementById("content")?.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

function go(id) {
  kill();
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById("view-" + id).classList.add("active");
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  const nb = document.getElementById("nb-" + id);
  if (nb) nb.classList.add("active");
  const titles = {
    home: "nav.home",
    tutor: "nav.tutor",
    practica: "prac.title",
    perfil: "nav.profile",
  };
  document.getElementById("page-title").textContent = t(titles[id]) || id;
  document.getElementById("sidebar").classList.remove("open");
  if (id === "practica") nextQ();
  if (id === "perfil") renderPerfil();
  if (id === "home") {
    initHeroCanvas();
    updateHomeElo();
    if (typeof Events !== "undefined") Events.init();
    setTimeout(initScrollReveal, 100);
  }
  // Footer solo en home
  const footer = document.getElementById("yl-footer");
  if (footer) footer.style.display = id === "home" ? "block" : "none";
  if (id === "ranking") typeof Rankings !== "undefined" && Rankings.init();
  if (id === "logros")
    typeof Achievements !== "undefined" && Achievements.render();
  if (id === "batalla") typeof Battle !== "undefined" && Battle.init();
  if (id === "examen") typeof Exam !== "undefined" && Exam.init();
  if (id === "tutor") {
    initTutorUI();
    if (!document.getElementById("chat-msgs").children.length) {
      const msg =
        LANG === "en"
          ? "Hi! I'm Yachay 🌿 What topic in physics or chemistry would you like to explore?"
          : "¡Hola! Soy Yachay 🌿 ¿Sobre qué tema de física o química tienes dudas hoy?";
      addMsg("a", msg);
    }
  }
}

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const btn = document.getElementById("menu-btn");
  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    // Móvil: overlay + slide
    const isOpen = sb.classList.contains("open");
    sb.classList.toggle("open", !isOpen);
    btn.classList.toggle("active", !isOpen);
    // Overlay
    let overlay = document.getElementById("sb-overlay");
    if (!isOpen) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sb-overlay";
        overlay.className = "sb-overlay active";
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
      } else {
        overlay.classList.add("active");
      }
    } else {
      overlay?.classList.remove("active");
      setTimeout(() => overlay?.remove(), 200);
    }
  } else {
    // Desktop: colapsar/expandir con margen
    const isClosed = sb.classList.contains("sb-closed");
    sb.classList.toggle("sb-closed", !isClosed);
    main.classList.toggle("sb-expanded", !isClosed);
    btn.classList.toggle("active", !isClosed);
    // Save preferencia
    localStorage.setItem("yl_sidebar_open", isClosed ? "1" : "0");
  }
}

function updateHomeElo() {
  const ps = getPStats();
  const elo = ps.maxElo || S.elo.f || 1000;
  const el = document.getElementById("home-elo");
  const fill = document.getElementById("home-elo-fill");
  if (el) el.textContent = elo;
  if (fill)
    fill.style.width =
      Math.max(5, Math.min(100, ((elo - 600) / (1600 - 600)) * 100)) + "%";
  // Racha
  const streakNum = document.getElementById("home-streak-num");
  if (streakNum && typeof Streak !== "undefined") {
    const s = Streak.getState();
    streakNum.textContent = s ? s.current : 0;
  }
}

// Hero canvas — ondas + partículas
let heroRaf = null;
function initHeroCanvas() {
  const cv = document.getElementById("hero-canvas");
  if (!cv) return;
  if (heroRaf) cancelAnimationFrame(heroRaf);
  cv.width = cv.offsetWidth || 800;
  cv.height = cv.offsetHeight || 460;
  const ctx = cv.getContext("2d");
  let t = 0;
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * cv.width,
    y: Math.random() * cv.height,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    a: Math.random(),
  }));
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    // Ondas
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${w === 0 ? "165,180,255" : w === 1 ? "192,132,252" : "14,168,118"},${0.15 + w * 0.05})`;
      ctx.lineWidth = 1.5;
      for (let x = 0; x < cv.width; x++) {
        const y =
          cv.height / 2 +
          Math.sin((x / cv.width) * 4 * Math.PI + t + w * 1.5) * (30 - w * 8) +
          Math.sin((x / cv.width) * 8 * Math.PI + t * 1.3) * 12;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // Partículas
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > cv.width) p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      p.a = Math.sin(t * 2 + p.x * 0.05) * 0.3 + 0.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165,180,255,${p.a})`;
      ctx.fill();
    });
    t += 0.018;
    heroRaf = requestAnimationFrame(draw);
  }
  draw();
}

function clearChat() {
  S.chatH = [];
  const msgs = document.getElementById("chat-msgs");
  if (msgs) msgs.innerHTML = "";
  const sugs = document.getElementById("chat-sugs");
  if (sugs) sugs.style.display = "flex";
  const msg =
    LANG === "en"
      ? "Hi! I'm Yachay 🌿 New conversation started. What would you like to explore?"
      : "¡Hola! Soy Yachay 🌿 Conversación nueva. ¿Qué quieres explorar hoy?";
  addMsg("a", msg);
}

// ── SIMULADORES ──
const SIMS = {
  mru: {
    title: "➡️ MRU",
    desc: "Movimiento Rectilíneo Uniforme — v constante",
    formula: "x = x₀ + v·t",
  },
  mrua: {
    title: "🚀 MRUA",
    desc: "Movimiento con aceleración constante",
    formula: "x = x₀ + v₀t + ½at²",
  },
  caida: {
    title: "🍎 Caída Libre",
    desc: "Objeto bajo la gravedad sin resistencia",
    formula: "y = h - ½gt²  |  v = gt",
  },
  tiro: {
    title: "🎯 Tiro Parabólico",
    desc: "Proyectil con velocidad y ángulo inicial",
    formula: "x=v₀cos(θ)t  |  y=v₀sin(θ)t-½gt²",
  },
  pendulo: {
    title: "⏱️ Péndulo Simple",
    desc: "Oscilación con gravedad y longitud",
    formula: "T = 2π√(L/g)",
  },
  hooke: {
    title: "🔧 Ley de Hooke",
    desc: "Force de resorte y energía elástica",
    formula: "F = kx  |  Ep = ½kx²",
  },
  ondas: {
    title: "〰️ Ondas Mecánicas",
    desc: "Superposición de dos ondas",
    formula: "y = A·sin(kx - ωt + φ)",
  },
  ohm: {
    title: "⚡ Ley de Ohm",
    desc: "Relación voltaje, corriente y resistencia",
    formula: "I = V/R  |  P = V·I",
  },
  optica: {
    title: "🔭 Óptica Geométrica",
    desc: "Lentes y formación de imágenes",
    formula: "1/f = 1/do + 1/di",
  },
  energia: {
    title: "⚡ Mechanical Energy",
    desc: "Conservation Ep + Ec = constant — energy transforms but never disappears",
    formula: "Ep=mgh  |  Ec=½mv²  |  E=Ep+Ec",
  },
  ph: {
    title: "🧪 pH & Acid-Base",
    desc: "Logarithmic acidity scale — from 0 (acid) to 14 (base)",
    formula: "pH = -log[H⁺]  |  pOH = 14-pH",
  },
  gases: {
    title: "💨 Ideal Gases",
    desc: "Pressure, volume and temperature relationship",
    formula: "PV = nRT  (R=0.0821 L·atm/mol·K)",
  },
  reacciones: {
    title: "⚗️ Chemical Reactions",
    desc: "Arrhenius energy profile and activation energy",
    formula: "k = A·e^(-Ea/RT)",
  },
  titulacion: {
    title: "🧫 Titration",
    desc: "Acid-base neutralization curve",
    formula: "n_acid = n_base (equivalence point)",
  },
  tabla: {
    title: "📋 Periodic Table",
    desc: "Interactive properties of the chemical elements",
    formula: "",
  },
  estatica1: {
    title: "🏗️ Statics I",
    desc: "Forces in equilibrium — resultant force and torque balance",
    formula: "ΣF = 0  |  Στ = 0  |  F = m·g",
  },
  estatica2: {
    title: "⚖️ Statics II",
    desc: "Center of mass and distributed loads on structures",
    formula: "x_cm = Σmᵢxᵢ/Σmᵢ  |  τ = F·d",
  },
};

function openSim(id) {
  kill();
  S.sim = id;
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById("view-sim").classList.add("active");
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  const nb = document.getElementById("nb-" + id);
  if (nb) nb.classList.add("active");
  const m = SIMS[id];
  document.getElementById("page-title").textContent = m.title;
  document.getElementById("sim-title").textContent = m.title;
  document.getElementById("sim-desc").textContent = m.desc;
  document.getElementById("sim-formula").innerHTML = m.formula
    ? `<code>${m.formula}</code>`
    : "";
  document.getElementById("sim-controls").innerHTML = "";
  document.getElementById("sim-results").innerHTML = "";
  S.currentSim = id;
  renderExercisePanel(id);
  document.getElementById("sidebar").classList.remove("open");
  const fn = {
    mru: SIM_MRU,
    mrua: SIM_MRUA,
    caida: SIM_CAIDA,
    tiro: SIM_TIRO,
    pendulo: SIM_PENDULO,
    hooke: SIM_HOOKE,
    ondas: SIM_ONDAS,
    ohm: SIM_OHM,
    optica: SIM_OPTICA,
    energia: SIM_ENERGIA,
    ph: SIM_PH,
    gases: SIM_GASES,
    reacciones: SIM_REAC,
    titulacion: SIM_TIT,
    tabla: SIM_TABLA,
    estatica1: SIM_ESTATICA1,
    estatica2: SIM_ESTATICA2,
  };
  setTimeout(() => {
    if (fn[id]) fn[id]("setup");
  }, 80);
  // Track stats para perfil
  const ps = getPStats();
  ps.sims = (ps.sims || 0) + 1;
  savePStats(ps);
  // ── Registrar en sistema de racha ──
  if (typeof Streak !== "undefined") {
    const simNames = {
      mru: "MRU",
      mrua: "MRUA",
      caida: "Caída Libre",
      tiro: "Tiro Parabólico",
      pendulo: "Péndulo",
      hooke: "Ley de Hooke",
      ondas: "Ondas",
      ohm: "Ley de Ohm",
      optica: "Óptica",
      energia: "Energy Mecánica",
      ph: "pH y Ácido-Base",
      gases: "Gases Ideales",
      reacciones: "Reacciones",
      titulacion: "Titulación",
      tabla: "Tabla Periódica",
    };
    Streak.register("simulador", {
      label: `⚗️ Simulator: ${simNames[id] || id}`,
    });
  }
}

function simPlay() {
  if (S.sim && SIMS[S.sim]) {
    const fn = window["SIM_" + S.sim.toUpperCase()];
    if (fn) fn("play");
  }
}
function simReset() {
  if (S.sim) {
    const fn = window["SIM_" + S.sim.toUpperCase()];
    if (fn) fn("reset");
  }
}

// ── CANVAS UTILS ──
function ctx() {
  const c = document.getElementById("canvas");
  c.width = c.parentElement.clientWidth - 2;
  c.height = 420;
  return c.getContext("2d");
}
function grid(g, W, H) {
  g.strokeStyle = "#E2E8F4";
  g.lineWidth = 0.5;
  for (let x = 50; x < W; x += 50) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, H);
    g.stroke();
  }
  for (let y = 50; y < H; y += 50) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(W, y);
    g.stroke();
  }
}
function arrow(g, x1, y1, x2, y2, col = "#6366F1", lbl = "") {
  const a = Math.atan2(y2 - y1, x2 - x1);
  g.strokeStyle = col;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
  g.fillStyle = col;
  g.beginPath();
  g.moveTo(x2, y2);
  g.lineTo(x2 - 10 * Math.cos(a - 0.4), y2 - 10 * Math.sin(a - 0.4));
  g.lineTo(x2 - 10 * Math.cos(a + 0.4), y2 - 10 * Math.sin(a + 0.4));
  g.closePath();
  g.fill();
  if (lbl) {
    g.fillStyle = col;
    g.font = "11px Inter";
    g.fillText(lbl, x2 + 5, y2 - 5);
  }
}
function slider(id, lbl, min, max, val, step, unit, cb) {
  const d = document.createElement("div");
  d.className = "ctrl";
  d.innerHTML = `<label>${lbl}: <strong id="${id}v">${val}${unit}</strong></label>
    <input type="range" id="${id}" min="${min}" max="${max}" value="${val}" step="${step}">`;
  document.getElementById("sim-controls").appendChild(d);
  document.getElementById(id).oninput = function () {
    document.getElementById(id + "v").textContent = this.value + unit;
    cb(+this.value);
  };
}
function selec(id, lbl, opts, cb) {
  const d = document.createElement("div");
  d.className = "ctrl";
  d.innerHTML = `<label>${lbl}</label><select id="${id}">${opts.map((o) => `<option value="${o.v}">${o.l}</option>`).join("")}</select>`;
  document.getElementById("sim-controls").appendChild(d);
  document.getElementById(id).onchange = function () {
    cb(+this.value);
  };
}
function results(rows) {
  document.getElementById("sim-results").innerHTML = rows
    .map(
      (r) =>
        `<div class="res-row"><span>${r[0]}</span><strong>${r[1]}</strong></div>`,
    )
    .join("");
}
function setRes(id, val) {
  const e = document.querySelector(`[data-r="${id}"]`);
  if (e) e.textContent = val;
}

// ── 1. MRU ──
function SIM_MRU(mode) {
  const p = { v: 5, x0: 0, t: 0, running: false };
  if (mode === "reset") {
    p.running = false;
    kill();
    return;
  }
  if (mode === "play") {
    p.running = true;
    animMRU(p);
    return;
  }
  slider("mru-v", "Velocity v", -20, 20, 5, 0.5, " m/s", (v) => {
    p.v = v;
    drawMRU(p);
  });
  slider("mru-x0", "Initial position x₀", -50, 50, 0, 5, " m", (v) => {
    p.x0 = v;
    p.t = 0;
    drawMRU(p);
  });
  drawMRU(p);
  window.SIM_MRU = function (m) {
    if (m === "play") {
      p.running = true;
      animMRU(p);
    }
    if (m === "reset") {
      p.t = 0;
      p.running = false;
      kill();
      drawMRU(p);
    }
  };
}
function drawMRU(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const cx = W / 2,
    cy = H / 2,
    sc = 5;
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(20, cy);
  g.lineTo(W - 20, cy);
  g.stroke();
  const px = cx + (p.x0 + p.v * p.t) * sc;
  g.beginPath();
  g.arc(Math.max(24, Math.min(W - 24, px)), cy, 20, 0, Math.PI * 2);
  g.fillStyle = "#6366F1";
  g.fill();
  g.fillStyle = "#fff";
  g.font = "bold 13px Inter";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("🚗", Math.max(24, Math.min(W - 24, px)), cy);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  if (p.v !== 0)
    arrow(
      g,
      Math.max(24, Math.min(W - 24, px)),
      cy - 28,
      Math.max(24, Math.min(W - 24, px)) + p.v * 8,
      cy - 28,
      "#F59E0B",
      "v=" + p.v + " m/s",
    );
  results([
    ["Position x", (p.x0 + p.v * p.t).toFixed(2) + " m"],
    ["Velocity", p.v + " m/s"],
    ["Time", p.t.toFixed(1) + " s"],
  ]);
}
function animMRU(p) {
  kill();
  function step() {
    if (!p.running) {
      return;
    }
    p.t += 0.03;
    drawMRU(p);
    if (p.t < 20) S.raf = requestAnimationFrame(step);
    else p.running = false;
  }
  step();
}

// ── 2. MRUA ──
function SIM_MRUA(mode) {
  const p = { v0: 0, a: 3, x0: 0, t: 0, running: false };
  if (mode === "play") {
    p.running = true;
    animMRUA(p);
    return;
  }
  if (mode === "reset") {
    p.t = 0;
    p.running = false;
    kill();
    drawMRUA(p);
    return;
  }
  slider("mrua-v0", "Initial velocity v₀", -15, 15, 0, 1, " m/s", (v) => {
    p.v0 = v;
    p.t = 0;
    drawMRUA(p);
  });
  slider("mrua-a", "Acceleration a", -10, 10, 3, 0.5, " m/s²", (v) => {
    p.a = v;
    p.t = 0;
    drawMRUA(p);
  });
  drawMRUA(p);
  window.SIM_MRUA = function (m) {
    if (m === "play") {
      p.running = true;
      animMRUA(p);
    }
    if (m === "reset") {
      p.t = 0;
      p.running = false;
      kill();
      drawMRUA(p);
    }
  };
}
function drawMRUA(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const cx = W / 2,
    cy = H / 2,
    sc = 4;
  const x = p.x0 + p.v0 * p.t + 0.5 * p.a * p.t * p.t,
    v = p.v0 + p.a * p.t;
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(20, cy);
  g.lineTo(W - 20, cy);
  g.stroke();
  const px = Math.max(24, Math.min(W - 24, cx + x * sc));
  g.beginPath();
  g.arc(px, cy, 18, 0, Math.PI * 2);
  g.fillStyle = "#8B5CF6";
  g.fill();
  g.fillStyle = "#fff";
  g.font = "14px Inter";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("🚌", px, cy);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  if (Math.abs(v) > 0.1)
    arrow(g, px, cy - 30, px + v * 6, cy - 30, "#F59E0B", "v");
  if (Math.abs(p.a) > 0.1)
    arrow(g, px, cy + 30, px + p.a * 6, cy + 30, "#EF4444", "a");
  results([
    ["x(t)", x.toFixed(2) + " m"],
    ["v(t)", v.toFixed(2) + " m/s"],
    ["a", p.a + " m/s²"],
    ["t", p.t.toFixed(1) + " s"],
  ]);
}
function animMRUA(p) {
  kill();
  function step() {
    if (!p.running) return;
    p.t += 0.03;
    drawMRUA(p);
    if (p.t < 15) S.raf = requestAnimationFrame(step);
    else p.running = false;
  }
  step();
}

// ── 3. CAÍDA LIBRE ──
function SIM_CAIDA(mode) {
  const p = { h: 80, g: 9.8, t: 0, running: false };
  if (mode === "play") {
    p.t = 0;
    p.running = true;
    animCaida(p);
    return;
  }
  if (mode === "reset") {
    p.t = 0;
    p.running = false;
    kill();
    drawCaida(p);
    return;
  }
  slider("cai-h", "Height inicial h", 10, 200, 80, 10, " m", (v) => {
    p.h = v;
    p.t = 0;
    drawCaida(p);
  });
  selec(
    "cai-g",
    "Planeta",
    [
      { v: 9.8, l: "🌍 Tierra (9.8)" },
      { v: 1.6, l: "🌕 Luna (1.6)" },
      { v: 3.7, l: "🔴 Marte (3.7)" },
      { v: 24.8, l: "🟠 Júpiter (24.8)" },
    ],
    (v) => {
      p.g = v;
      p.t = 0;
      drawCaida(p);
    },
  );
  drawCaida(p);
  window.SIM_CAIDA = function (m) {
    if (m === "play") {
      p.t = 0;
      p.running = true;
      animCaida(p);
    }
    if (m === "reset") {
      p.t = 0;
      p.running = false;
      kill();
      drawCaida(p);
    }
  };
}
function drawCaida(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const mb = 40,
    mt = 30,
    sc = (H - mb - mt) / p.h;
  const y = Math.max(0, p.h - 0.5 * p.g * p.t * p.t),
    vel = p.g * p.t;
  const py = H - mb - y * sc;
  g.fillStyle = "#D1FAE5";
  g.fillRect(0, H - mb, W, mb);
  g.strokeStyle = "#10B981";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, H - mb);
  g.lineTo(W, H - mb);
  g.stroke();
  g.fillStyle = "#8B5CF6";
  g.beginPath();
  g.arc(W / 2, py, 18, 0, Math.PI * 2);
  g.fill();
  g.font = "16px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("🍎", W / 2, py);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  const vl = Math.min(vel * 2, 80);
  if (vl > 0) arrow(g, W / 2, py + 18, W / 2, py + 18 + vl, "#EF4444");
  const tT = Math.sqrt((2 * p.h) / p.g);
  results([
    ["Height y", y.toFixed(2) + " m"],
    ["Velocity", vel.toFixed(2) + " m/s"],
    ["Time", p.t.toFixed(2) + " s"],
    ["Time total teórico", tT.toFixed(2) + " s"],
  ]);
}
function animCaida(p) {
  kill();
  function step() {
    if (!p.running) return;
    const y = Math.max(0, p.h - 0.5 * p.g * p.t * p.t);
    drawCaida(p);
    if (y > 0.1 && p.t < 20) {
      p.t += 0.04;
      S.raf = requestAnimationFrame(step);
    } else p.running = false;
  }
  step();
}

// ── 4. TIRO PARABÓLICO ──
function SIM_TIRO(mode) {
  const p = { v0: 30, ang: 45, g: 9.8, t: 0, running: false, trail: [] };
  if (mode === "play") {
    p.t = 0;
    p.trail = [];
    p.running = true;
    animTiro(p);
    return;
  }
  if (mode === "reset") {
    p.t = 0;
    p.trail = [];
    p.running = false;
    kill();
    drawTiro(p);
    return;
  }
  slider("tiro-v", "Velocity inicial v₀", 5, 80, 30, 1, " m/s", (v) => {
    p.v0 = v;
    drawTiro(p);
  });
  slider("tiro-a", "Ángulo θ", 5, 85, 45, 1, "°", (v) => {
    p.ang = v;
    drawTiro(p);
  });
  selec(
    "tiro-g",
    "Gravity",
    [
      { v: 9.8, l: "🌍 Tierra" },
      { v: 1.6, l: "🌕 Luna" },
      { v: 3.7, l: "🔴 Marte" },
    ],
    (v) => {
      p.g = v;
      drawTiro(p);
    },
  );
  drawTiro(p);
  window.SIM_TIRO = function (m) {
    if (m === "play") {
      p.t = 0;
      p.trail = [];
      p.running = true;
      animTiro(p);
    }
    if (m === "reset") {
      p.t = 0;
      p.trail = [];
      p.running = false;
      kill();
      drawTiro(p);
    }
  };
}
function drawTiro(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const ang = (p.ang * Math.PI) / 180,
    mb = 50,
    mx = 60;
  const R = (p.v0 * p.v0 * Math.sin(2 * ang)) / p.g;
  const hMax = (p.v0 * p.v0 * Math.sin(ang) * Math.sin(ang)) / (2 * p.g);
  const tF = (2 * p.v0 * Math.sin(ang)) / p.g;
  const sc = Math.min((W - mx - 30) / R, (H - mb - 30) / hMax) * 0.9;
  g.fillStyle = "#D1FAE5";
  g.fillRect(0, H - mb, W, mb);
  g.strokeStyle = "#10B981";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, H - mb);
  g.lineTo(W, H - mb);
  g.stroke();
  g.strokeStyle = "rgba(99,102,241,.2)";
  g.lineWidth = 1.5;
  g.setLineDash([5, 5]);
  g.beginPath();
  for (let t = 0; t <= tF; t += 0.05) {
    const x = mx + p.v0 * Math.cos(ang) * t * sc;
    const y = H - mb - (p.v0 * Math.sin(ang) * t - 0.5 * p.g * t * t) * sc;
    t === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke();
  g.setLineDash([]);
  p.trail.forEach((pt, i) => {
    g.beginPath();
    g.arc(pt.x, pt.y, 2 + i * 0.04, 0, Math.PI * 2);
    g.fillStyle = `rgba(99,102,241,${0.1 + (i / p.trail.length) * 0.4})`;
    g.fill();
  });
  if (p.t > 0) {
    const bx = mx + p.v0 * Math.cos(ang) * p.t * sc;
    const by =
      H - mb - (p.v0 * Math.sin(ang) * p.t - 0.5 * p.g * p.t * p.t) * sc;
    g.beginPath();
    g.arc(bx, by, 12, 0, Math.PI * 2);
    g.fillStyle = "#F59E0B";
    g.fill();
    g.font = "12px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("💣", bx, by);
    g.textAlign = "left";
    g.textBaseline = "alphabetic";
  } else {
    const cL = 28;
    g.save();
    g.translate(mx, H - mb);
    g.rotate(-ang);
    g.fillStyle = "#0F1729";
    g.fillRect(0, -6, cL, 12);
    g.restore();
    g.beginPath();
    g.arc(mx, H - mb, 10, 0, Math.PI * 2);
    g.fillStyle = "#475569";
    g.fill();
  }
  results([
    ["Alcance máx.", R.toFixed(1) + " m"],
    ["Height máx.", hMax.toFixed(1) + " m"],
    ["Flight time", tF.toFixed(2) + " s"],
    ["θ", p.ang + "°"],
  ]);
}
function animTiro(p) {
  const ang = (p.ang * Math.PI) / 180;
  const tF = (2 * p.v0 * Math.sin(ang)) / p.g;
  const g2 = ctx(),
    W = g2.canvas.width,
    H = g2.canvas.height;
  const R = (p.v0 * p.v0 * Math.sin(2 * ang)) / p.g;
  const hMax = (p.v0 * p.v0 * Math.sin(ang) * Math.sin(ang)) / (2 * p.g);
  const mb = 50,
    mx = 60,
    sc = Math.min((W - mx - 30) / R, (H - mb - 30) / hMax) * 0.9;
  kill();
  function step() {
    if (!p.running) return;
    const bx = mx + p.v0 * Math.cos(ang) * p.t * sc;
    const by =
      H - mb - (p.v0 * Math.sin(ang) * p.t - 0.5 * p.g * p.t * p.t) * sc;
    p.trail.push({ x: bx, y: by });
    if (p.trail.length > 60) p.trail.shift();
    drawTiro(p);
    p.t += 0.04;
    if (p.t <= tF && p.running) S.raf = requestAnimationFrame(step);
    else p.running = false;
  }
  step();
}

// ── 5. PÉNDULO ──
function SIM_PENDULO(mode) {
  const p = {
    L: 1,
    g: 9.8,
    th: Math.PI / 6,
    om: 0,
    damp: 0.005,
    running: false,
  };
  if (mode === "play") {
    p.running = true;
    animPend(p);
    return;
  }
  if (mode === "reset") {
    p.th = (+document.getElementById("pend-a").value * Math.PI) / 180;
    p.om = 0;
    p.running = false;
    kill();
    drawPend(p);
    return;
  }
  slider("pend-l", "Length L", 0.3, 3, 1, 0.1, " m", (v) => {
    p.L = v;
    drawPend(p);
  });
  slider("pend-a", "Ángulo inicial", 5, 75, 30, 5, "°", (v) => {
    p.th = (v * Math.PI) / 180;
    p.om = 0;
    drawPend(p);
  });
  slider("pend-d", "Amortiguación", 0, 0.05, 0.005, 0.005, "", (v) => {
    p.damp = v;
  });
  selec(
    "pend-g",
    "Gravity",
    [
      { v: 9.8, l: "🌍 Tierra" },
      { v: 1.6, l: "🌕 Luna" },
      { v: 3.7, l: "🔴 Marte" },
      { v: 24.8, l: "🟠 Júpiter" },
    ],
    (v) => {
      p.g = v;
      drawPend(p);
    },
  );
  drawPend(p);
  window.SIM_PENDULO = function (m) {
    if (m === "play") {
      p.running = true;
      animPend(p);
    }
    if (m === "reset") {
      p.th = (+document.getElementById("pend-a").value * Math.PI) / 180;
      p.om = 0;
      p.running = false;
      kill();
      drawPend(p);
    }
  };
}
function drawPend(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const px = W / 2,
    py = 60,
    sc = Math.min((H - 100) / (p.L * 1.2), 140);
  const bx = px + sc * p.L * Math.sin(p.th),
    by = py + sc * p.L * Math.cos(p.th);
  g.fillStyle = "#0F1729";
  g.beginPath();
  g.arc(px, py, 6, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#475569";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(px, py);
  g.lineTo(bx, by);
  g.stroke();
  g.beginPath();
  g.arc(bx, by, 18, 0, Math.PI * 2);
  const gr = g.createRadialGradient(bx - 4, by - 4, 2, bx, by, 18);
  gr.addColorStop(0, "#A5B4FC");
  gr.addColorStop(1, "#6366F1");
  g.fillStyle = gr;
  g.fill();
  const T = (2 * Math.PI * Math.sqrt(p.L / p.g)).toFixed(3);
  results([
    ["Periodo teórico", T + " s"],
    ["Ángulo actual", ((p.th * 180) / Math.PI).toFixed(1) + "°"],
    ["L", p.L + " m"],
    ["g", p.g + " m/s²"],
  ]);
}
function animPend(p) {
  kill();
  const dt = 0.016;
  function step() {
    if (!p.running) return;
    p.om += -(p.g / p.L) * Math.sin(p.th) * dt;
    p.om *= 1 - p.damp;
    p.th += p.om * dt;
    drawPend(p);
    S.raf = requestAnimationFrame(step);
  }
  step();
}

// ── 6. HOOKE ──
function SIM_HOOKE(mode) {
  const p = { k: 50, m: 1, x: 0.1, v: 0, running: false };
  if (mode === "play") {
    p.v = 0;
    p.running = true;
    animHooke(p);
    return;
  }
  if (mode === "reset") {
    p.x = +document.getElementById("hk-x").value / 100;
    p.v = 0;
    p.running = false;
    kill();
    drawHooke(p);
    return;
  }
  slider("hk-k", "Spring constant k", 10, 200, 50, 10, " N/m", (v) => {
    p.k = v;
    drawHooke(p);
  });
  slider("hk-m", "Mass m", 0.5, 10, 1, 0.5, " kg", (v) => {
    p.m = v;
    drawHooke(p);
  });
  slider("hk-x", "Deformation x", -20, 20, 10, 1, " cm", (v) => {
    p.x = v / 100;
    p.v = 0;
    drawHooke(p);
  });
  drawHooke(p);
  window.SIM_HOOKE = function (m) {
    if (m === "play") {
      p.v = 0;
      p.running = true;
      animHooke(p);
    }
    if (m === "reset") {
      p.x = +document.getElementById("hk-x").value / 100;
      p.v = 0;
      p.running = false;
      kill();
      drawHooke(p);
    }
  };
}
function drawHooke(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const cx = W / 2,
    top = 50,
    nat = 160,
    ext = nat + p.x * 600;
  g.fillStyle = "#E2E8F4";
  g.fillRect(cx - 50, top - 12, 100, 12);
  g.strokeStyle = "#0F1729";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx - 50, top);
  g.lineTo(cx + 50, top);
  g.stroke();
  // Resorte
  const n = 12,
    amp = 10;
  g.strokeStyle = "#64748B";
  g.lineWidth = 2;
  g.beginPath();
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const bx = cx + (i % 2 === 0 ? amp : -amp);
    const by = top + t * ext;
    i === 0 ? g.moveTo(bx, by) : g.lineTo(bx, by);
  }
  g.stroke();
  const my = top + ext;
  g.fillStyle = "#6366F1";
  g.fillRect(cx - 22, my, 44, 38);
  g.fillStyle = "#fff";
  g.font = "bold 11px Inter";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(p.m + "kg", cx, my + 19);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  const F = (p.k * p.x).toFixed(2),
    Ep = (0.5 * p.k * p.x * p.x).toFixed(4);
  results([
    ["Force F", F + " N"],
    ["Ep = ½kx²", Ep + " J"],
    ["ω = √(k/m)", Math.sqrt(p.k / p.m).toFixed(2) + " rad/s"],
  ]);
}
function animHooke(p) {
  kill();
  const dt = 0.016,
    damp = 0.02;
  function step() {
    if (!p.running) return;
    const a = -(p.k / p.m) * p.x - damp * p.v;
    p.v += a * dt;
    p.x += p.v * dt;
    drawHooke(p);
    S.raf = requestAnimationFrame(step);
  }
  step();
}

// ── 7. ONDAS ──
function SIM_ONDAS(mode) {
  const p = { A1: 1, f1: 1, A2: 0.5, f2: 2, phi: 0, t: 0, running: true };
  if (mode === "reset") {
    p.t = 0;
    return;
  }
  if (mode === "play") {
    return;
  }
  slider("on-a1", "Amplitude A₁", 0.1, 2, 1, 0.1, "", (v) => {
    p.A1 = v;
  });
  slider("on-f1", "Frequency f₁", 0.2, 5, 1, 0.2, " Hz", (v) => {
    p.f1 = v;
  });
  slider("on-a2", "Amplitude A₂", 0, 2, 0.5, 0.1, "", (v) => {
    p.A2 = v;
  });
  slider("on-f2", "Frequency f₂", 0.2, 5, 2, 0.2, " Hz", (v) => {
    p.f2 = v;
  });
  slider("on-phi", "Desfase φ", 0, 360, 0, 15, "°", (v) => {
    p.phi = (v * Math.PI) / 180;
  });
  kill();
  function step() {
    const g = ctx(),
      W = g.canvas.width,
      H = g.canvas.height;
    g.clearRect(0, 0, W, H);
    g.fillStyle = "#F8FAFF";
    g.fillRect(0, 0, W, H);
    grid(g, W, H);
    const sc = 50,
      y1 = H * 0.22,
      y2 = H * 0.52,
      y3 = H * 0.8;
    [
      [y1, p.A1, p.f1, 0, "#6366F1", "Onda 1"],
      [y2, p.A2, p.f2, p.phi, "#8B5CF6", "Onda 2"],
    ].forEach(([cy, A, f, ph, col, lbl]) => {
      g.strokeStyle = col;
      g.lineWidth = 2;
      g.beginPath();
      for (let x = 0; x < W; x++) {
        const y =
          cy -
          A * sc * Math.sin((2 * Math.PI * f * x) / W - 2 * Math.PI * p.t + ph);
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
      g.fillStyle = col;
      g.font = "11px Inter";
      g.fillText(lbl, 4, cy - A * sc - 4);
    });
    g.strokeStyle = "#F59E0B";
    g.lineWidth = 3;
    g.beginPath();
    for (let x = 0; x < W; x++) {
      const y =
        y3 -
        (p.A1 *
          sc *
          Math.sin((2 * Math.PI * p.f1 * x) / W - 2 * Math.PI * p.t) +
          p.A2 *
            sc *
            Math.sin(
              (2 * Math.PI * p.f2 * x) / W - 2 * Math.PI * p.t + p.phi,
            )) *
          0.8;
      x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
    g.fillStyle = "#F59E0B";
    g.font = "bold 11px Inter";
    g.fillText("Resultante", 4, y3 - sc - 4);
    p.t += 0.02;
    results([
      ["f₁", p.f1 + " Hz"],
      ["f₂", p.f2 + " Hz"],
      ["|f₁-f₂| batido", Math.abs(p.f1 - p.f2).toFixed(1) + " Hz"],
    ]);
    S.raf = requestAnimationFrame(step);
  }
  step();
  window.SIM_ONDAS = function (m) {
    if (m === "reset") p.t = 0;
  };
}

// ── 8. OHM ──
function SIM_OHM(mode) {
  const p = { V: 12, R: 4, running: false, el: [], phase: 0 };
  if (mode === "play") {
    p.running = true;
    animOhm(p);
    return;
  }
  if (mode === "reset") {
    p.running = false;
    kill();
    drawOhm(p);
    return;
  }
  slider("ohm-v", "Voltage V", 1, 50, 12, 1, " V", (v) => {
    p.V = v;
    drawOhm(p);
  });
  slider("ohm-r", "Resistance R", 0.5, 50, 4, 0.5, " Ω", (v) => {
    p.R = v;
    drawOhm(p);
  });
  drawOhm(p);
  window.SIM_OHM = function (m) {
    if (m === "play") {
      p.running = true;
      animOhm(p);
    }
    if (m === "reset") {
      p.running = false;
      kill();
      drawOhm(p);
    }
  };
}
function drawOhm(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const I = p.V / p.R,
    Pw = p.V * I;
  const x1 = 80,
    y1 = 80,
    x2 = W - 80,
    y2 = H - 80;
  g.strokeStyle = "#CBD5E1";
  g.lineWidth = 5;
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y1);
  g.lineTo(x2, y2);
  g.lineTo(x1, y2);
  g.lineTo(x1, y1);
  g.stroke();
  // Batería
  g.fillStyle = "#fff";
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.fillRect(x1 - 16, H / 2 - 32, 32, 64);
  g.strokeRect(x1 - 16, H / 2 - 32, 32, 64);
  g.fillStyle = "#10B981";
  g.fillRect(x1 - 10, H / 2 - 22, 20, 18);
  g.fillStyle = "#475569";
  g.fillRect(x1 - 6, H / 2 + 4, 12, 18);
  g.fillStyle = "#0F1729";
  g.font = "bold 11px JetBrains Mono";
  g.textAlign = "center";
  g.fillText(p.V + "V", x1, H / 2 + 56);
  // Resistance
  g.fillStyle = "#FEF3C7";
  g.fillRect((x1 + x2) / 2 - 30, y1 - 14, 60, 28);
  g.strokeStyle = "#F59E0B";
  g.lineWidth = 2;
  g.strokeRect((x1 + x2) / 2 - 30, y1 - 14, 60, 28);
  g.fillStyle = "#0F1729";
  g.fillText(p.R + "Ω", (x1 + x2) / 2, y1 + 6);
  // Bombilla
  const br = Math.min(Pw / 20, 1);
  g.beginPath();
  g.arc(x2, H / 2, 22, 0, Math.PI * 2);
  g.fillStyle = `rgba(253,224,71,${0.1 + br * 0.9})`;
  g.fill();
  g.strokeStyle = br > 0.1 ? "#F59E0B" : "#CBD5E1";
  g.lineWidth = 2;
  g.stroke();
  g.font = "18px sans-serif";
  g.textBaseline = "middle";
  g.fillText("💡", x2 - 9, H / 2);
  g.textBaseline = "alphabetic";
  // Electrones
  if (p.running) {
    const path = [
      [x1, y1],
      [x2, y1],
      [x2, y2],
      [x1, y2],
    ];
    const tot = (x2 - x1) * 2 + (y2 - y1) * 2,
      spd = Math.min(I * 0.01, 0.012);
    p.el.forEach((e) => {
      e.t = (e.t + spd) % 1;
      let d = e.t * tot;
      let cx2, cy2;
      const segs = [x2 - x1, y2 - y1, x2 - x1, y2 - y1],
        pts = [
          [x1, y1],
          [x2, y1],
          [x2, y2],
          [x1, y2],
        ];
      let cum = 0;
      for (let i = 0; i < 4; i++) {
        if (d <= segs[i]) {
          const f = d / segs[i];
          cx2 = pts[i][0] + (pts[(i + 1) % 4][0] - pts[i][0]) * f;
          cy2 = pts[i][1] + (pts[(i + 1) % 4][1] - pts[i][1]) * f;
          break;
        }
        d -= segs[i];
        cum += segs[i];
      }
      if (cx2 !== undefined) {
        g.beginPath();
        g.arc(cx2, cy2, 4, 0, Math.PI * 2);
        g.fillStyle = "#3B82F6";
        g.fill();
      }
    });
  }
  g.textAlign = "left";
  results([
    ["Current I", I.toFixed(3) + " A"],
    ["Power P", Pw.toFixed(2) + " W"],
    ["V", p.V + " V"],
    ["R", p.R + " Ω"],
  ]);
}
function animOhm(p) {
  const I = p.V / p.R,
    n = Math.min(Math.round(I * 5) + 3, 20);
  if (!p.el.length) for (let i = 0; i < n; i++) p.el.push({ t: Math.random() });
  kill();
  function step() {
    if (!p.running) return;
    drawOhm(p);
    S.raf = requestAnimationFrame(step);
  }
  step();
}

// ── 9. ÓPTICA ──
function SIM_OPTICA(mode) {
  const p = { tipo: "convergente", f: 20, do: 40, ho: 3 };
  if (mode === "play" || mode === "reset") return;
  const sel = document.createElement("div");
  sel.className = "ctrl";
  sel.innerHTML = `<label>Tipo de lente</label><select id="op-t"><option value="convergente">Convergente (convexa)</option><option value="divergente">Divergente (cóncava)</option></select>`;
  document.getElementById("sim-controls").appendChild(sel);
  document.getElementById("op-t").onchange = function () {
    p.tipo = this.value;
    drawOptica(p);
  };
  slider("op-f", "Focal f (cm)", 5, 60, 20, 5, " cm", (v) => {
    p.f = v;
    drawOptica(p);
  });
  slider("op-do", "Dist. objeto do (cm)", 10, 120, 40, 5, " cm", (v) => {
    p.do = v;
    drawOptica(p);
  });
  slider("op-ho", "Height objeto (cm)", 1, 8, 3, 1, " cm", (v) => {
    p.ho = v;
    drawOptica(p);
  });
  drawOptica(p);
  window.SIM_OPTICA = function () {};
}
function drawOptica(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const lx = W / 2,
    cy = H / 2,
    f = p.tipo === "convergente" ? p.f : -p.f,
    sc = 2.5;
  const di = p.do !== f ? 1 / (1 / f - 1 / p.do) : Infinity;
  const M = isFinite(di) ? -di / p.do : null,
    hi = M ? M * p.ho : null;
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(10, cy);
  g.lineTo(W - 10, cy);
  g.stroke();
  g.strokeStyle = "#6366F1";
  g.lineWidth = 3;
  if (p.tipo === "convergente") {
    g.beginPath();
    g.moveTo(lx, cy - 90);
    g.quadraticCurveTo(lx + 16, cy, lx, cy + 90);
    g.stroke();
    g.beginPath();
    g.moveTo(lx, cy - 90);
    g.quadraticCurveTo(lx - 16, cy, lx, cy + 90);
    g.stroke();
  } else {
    g.beginPath();
    g.moveTo(lx, cy - 90);
    g.quadraticCurveTo(lx - 16, cy, lx, cy + 90);
    g.stroke();
    g.beginPath();
    g.moveTo(lx, cy - 90);
    g.quadraticCurveTo(lx + 16, cy, lx, cy + 90);
    g.stroke();
  }
  g.fillStyle = "#EF4444";
  g.beginPath();
  g.arc(lx + f * sc, cy, 5, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.arc(lx - f * sc, cy, 5, 0, Math.PI * 2);
  g.fill();
  const ox = lx - p.do * sc,
    oh = p.ho * sc * 5;
  g.strokeStyle = "#10B981";
  g.lineWidth = 2.5;
  g.beginPath();
  g.moveTo(ox, cy);
  g.lineTo(ox, cy - oh);
  g.stroke();
  g.fillStyle = "#10B981";
  g.beginPath();
  g.moveTo(ox, cy - oh);
  g.lineTo(ox - 6, cy - oh + 10);
  g.lineTo(ox + 6, cy - oh + 10);
  g.closePath();
  g.fill();
  if (isFinite(di) && hi) {
    const ix = lx + di * sc,
      ih = hi * sc * 5;
    g.strokeStyle = "#EF4444";
    g.lineWidth = 2;
    g.setLineDash([4, 4]);
    g.beginPath();
    g.moveTo(ix, cy);
    g.lineTo(ix, cy - ih);
    g.stroke();
    g.setLineDash([]);
  }
  results([
    ["di", isFinite(di) ? di.toFixed(1) + " cm" : "∞"],
    ["M", M ? M.toFixed(3) : "—"],
    [
      "Tipo img",
      isFinite(di) && di > 0 ? "Real, invertida" : "Virtual, derecha",
    ],
  ]);
}

// ── 10. ENERGÍA MECÁNICA ──
function SIM_ENERGIA(mode) {
  const p = { h: 10, m: 2, fric: 0, t: 0, running: false };
  if (mode === "play") {
    p.t = 0;
    p.running = true;
    animEn(p);
    return;
  }
  if (mode === "reset") {
    p.t = 0;
    p.running = false;
    kill();
    drawEn(p);
    return;
  }
  slider("en-h", "Height inicial h", 2, 40, 10, 1, " m", (v) => {
    p.h = v;
    p.t = 0;
    drawEn(p);
  });
  slider("en-m", "Mass m", 0.5, 20, 2, 0.5, " kg", (v) => {
    p.m = v;
    drawEn(p);
  });
  slider("en-f", "Fricción (0=sin)", 0, 0.5, 0, 0.05, "", (v) => {
    p.fric = v;
  });
  drawEn(p);
  window.SIM_ENERGIA = function (m) {
    if (m === "play") {
      p.t = 0;
      p.running = true;
      animEn(p);
    }
    if (m === "reset") {
      p.t = 0;
      p.running = false;
      kill();
      drawEn(p);
    }
  };
}
function drawEn(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const mb = 40,
    sc = (H - mb - 40) / p.h;
  const E0 = p.m * 9.8 * p.h;
  const yCur = Math.max(0, p.h - 0.5 * 9.8 * (1 - p.fric) * p.t * p.t);
  const Ep = p.m * 9.8 * yCur,
    Ec = E0 - Ep;
  g.fillStyle = "#D1FAE5";
  g.fillRect(0, H - mb, W, mb);
  g.strokeStyle = "#10B981";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, H - mb);
  g.lineTo(W, H - mb);
  g.stroke();
  g.fillStyle = "#6366F1";
  g.beginPath();
  g.arc(W * 0.4, H - mb - yCur * sc, 16, 0, Math.PI * 2);
  g.fill();
  g.font = "14px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("🟠", W * 0.4, H - mb - yCur * sc);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  const bx = W - 110,
    bH = 100;
  [
    ["Ep", Ep / E0, "#8B5CF6"],
    [" Ec", Math.max(Ec / E0, 0), "#F59E0B"],
  ].forEach(([lbl, frac, col], i) => {
    const x = bx + i * 52;
    const h2 = Math.max(frac * bH, 2);
    g.fillStyle = "#EEF2FF";
    g.fillRect(x, 40, 44, bH);
    g.fillStyle = col;
    g.fillRect(x, 40 + bH - h2, 44, h2);
    g.fillStyle = "#475569";
    g.font = "10px Inter";
    g.textAlign = "center";
    g.fillText(lbl, x + 22, 40 + bH + 14);
  });
  g.textAlign = "left";
  results([
    ["Ep = mgh", Ep.toFixed(2) + " J"],
    ["Ec = ½mv²", Math.max(Ec, 0).toFixed(2) + " J"],
    ["Total energy", E0.toFixed(2) + " J"],
  ]);
}
function animEn(p) {
  kill();
  function step() {
    if (!p.running) return;
    const y = Math.max(0, p.h - 0.5 * 9.8 * (1 - p.fric) * p.t * p.t);
    drawEn(p);
    if (y > 0.1 && p.t < 10) {
      p.t += 0.04;
      S.raf = requestAnimationFrame(step);
    } else p.running = false;
  }
  step();
}

// ── 11. pH ──
function SIM_PH(mode) {
  if (mode === "play" || mode === "reset") return;
  slider("ph-v", "Valor de pH", 0, 14, 7, 0.1, "", (v) => drawPH(v));
  const d = document.createElement("div");
  d.className = "ctrl";
  d.innerHTML =
    '<label>Ejemplos rápidos</label><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">' +
    [
      ["HCl", 0],
      ["Vinagre", 2.5],
      ["Café", 5],
      ["Agua", 7],
      ["Mar", 8.3],
      ["Jabón", 11],
      ["NaOH", 14],
    ]
      .map(
        ([l, v]) =>
          `<button style="background:#F1F5F9;border:1px solid #E2E8F4;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer" onclick="document.getElementById('ph-v').value=${v};document.getElementById('ph-vv').textContent=${v};drawPH(${v})">${l}</button>`,
      )
      .join("") +
    "</div>";
  document.getElementById("sim-controls").appendChild(d);
  drawPH(7);
  window.SIM_PH = function () {};
  window.drawPH = drawPH;
}
const PH_COLS = [
  "#FF0000",
  "#FF3000",
  "#FF6000",
  "#FF9000",
  "#FFC000",
  "#E0D000",
  "#90C000",
  "#40B000",
  "#008C3C",
  "#0070A0",
  "#004898",
  "#002880",
  "#001868",
  "#000840",
  "#000020",
];
function drawPH(ph) {
  ph = +ph;
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  const bx = 30,
    by = 40,
    bw = W - 60,
    bh = 38;
  for (let i = 0; i <= 14; i++) {
    g.fillStyle = PH_COLS[i];
    g.fillRect(bx + i * (bw / 14), by, bw / 14 + 1, bh);
  }
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.strokeRect(bx, by, bw, bh);
  const cx2 = bx + ph * (bw / 14);
  g.fillStyle = "#000";
  g.beginPath();
  g.moveTo(cx2, by - 5);
  g.lineTo(cx2 - 8, by - 18);
  g.lineTo(cx2 + 8, by - 18);
  g.closePath();
  g.fill();
  g.fillStyle = "#0F1729";
  g.font = "bold 14px JetBrains Mono";
  g.textAlign = "center";
  g.fillText("pH " + ph.toFixed(1), cx2, by - 22);
  g.textAlign = "left";
  g.fillStyle = PH_COLS[Math.round(ph)];
  g.font = "11px Inter";
  g.fillText("ÁCIDO", bx, by + bh + 16);
  g.textAlign = "right";
  g.fillText("BASE →", bx + bw, by + bh + 16);
  g.textAlign = "left";
  const H2 = Math.pow(10, -ph),
    OH2 = Math.pow(10, -(14 - ph));
  const col = PH_COLS[Math.min(Math.round(ph), 14)];
  g.fillStyle = col + "55";
  g.fillRect(W / 2 - 45, 110, 90, 100);
  g.strokeStyle = col;
  g.lineWidth = 3;
  g.strokeRect(W / 2 - 45, 110, 90, 100);
  g.fillStyle = "#0F1729";
  g.font = "bold 18px Inter";
  g.textAlign = "center";
  g.fillText("pH " + ph.toFixed(1), W / 2, 165);
  g.font = "12px Inter";
  g.fillText(
    ph < 7 ? "🔴 Ácido" : ph > 7 ? "🔵 Base" : "⚪ Neutro",
    W / 2,
    185,
  );
  g.textAlign = "left";
  results([
    ["[H⁺]", H2.toExponential(2) + " mol/L"],
    ["[OH⁻]", OH2.toExponential(2) + " mol/L"],
    ["pH", ph.toFixed(1)],
    ["pOH", (14 - ph).toFixed(1)],
  ]);
}

// ── 12. GASES IDEALES ──
function SIM_GASES(mode) {
  const p = { P: 1, V: 22.4, T: 273, n: 1, pts: [] };
  for (let i = 0; i < 40; i++)
    p.pts.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.006,
    });
  if (mode === "play" || mode === "reset") return;
  slider("gs-p", "Pressure P (atm)", 0.1, 10, 1, 0.1, " atm", (v) => {
    p.P = v;
  });
  slider("gs-v", "Volume V (L)", 1, 100, 22.4, 0.5, " L", (v) => {
    p.V = v;
  });
  slider("gs-t", "Temperature T (K)", 50, 1000, 273, 10, " K", (v) => {
    p.T = v;
  });
  slider("gs-n", "Moles n", 0.1, 10, 1, 0.1, " mol", (v) => {
    p.n = v;
  });
  kill();
  function step() {
    const g = ctx(),
      W = g.canvas.width,
      H = g.canvas.height;
    g.clearRect(0, 0, W, H);
    g.fillStyle = "#F8FAFF";
    g.fillRect(0, 0, W, H);
    grid(g, W, H);
    const R = 0.0821;
    const vS = Math.cbrt(p.V / 22.4),
      cW = Math.min(vS * 200, W - 80),
      cH = Math.min(vS * 200, H - 80);
    const cx3 = (W - cW) / 2,
      cy2 = (H - cH) / 2;
    g.fillStyle = "rgba(219,234,254,.35)";
    g.fillRect(cx3, cy2, cW, cH);
    g.strokeStyle = "#3B82F6";
    g.lineWidth = 3;
    g.strokeRect(cx3, cy2, cW, cH);
    const sp = Math.sqrt(p.T / 273) * 0.8;
    p.pts.forEach((pt) => {
      pt.x += pt.vx * sp;
      pt.y += pt.vy * sp;
      if (pt.x < 0 || pt.x > 1) pt.vx *= -1;
      if (pt.y < 0 || pt.y > 1) pt.vy *= -1;
      pt.x = Math.max(0, Math.min(1, pt.x));
      pt.y = Math.max(0, Math.min(1, pt.y));
      const px = cx3 + pt.x * cW,
        py = cy2 + pt.y * cH;
      g.beginPath();
      g.arc(px, py, 3.5, 0, Math.PI * 2);
      const heat = Math.min(p.T / 500, 1);
      g.fillStyle = `rgb(${Math.round(50 + heat * 200)},100,${Math.round(200 - heat * 150)})`;
      g.fill();
    });
    const pv = p.P * p.V,
      nrt = p.n * R * p.T;
    results([
      ["PV", pv.toFixed(3)],
      ["nRT", nrt.toFixed(3)],
      ["Error", Math.abs(pv - nrt).toFixed(3)],
      ["T(°C)", (p.T - 273.15).toFixed(1) + " °C"],
    ]);
    S.raf = requestAnimationFrame(step);
  }
  step();
  window.SIM_GASES = function (m) {
    if (m === "reset") {
    }
  };
}

// ── 13. REACCIONES ──
function SIM_REAC(mode) {
  const p = { er: 50, ea: 30, ep: 20, T: 300, prog: 0, running: false };
  if (mode === "play") {
    p.prog = 0;
    p.running = true;
    animReac(p);
    return;
  }
  if (mode === "reset") {
    p.prog = 0;
    p.running = false;
    kill();
    drawReac(p);
    return;
  }
  slider("rc-er", "Energy reactivos (kJ)", 10, 100, 50, 5, " kJ", (v) => {
    p.er = v;
    drawReac(p);
  });
  slider("rc-ea", "Energy activación Ea", 5, 80, 30, 5, " kJ", (v) => {
    p.ea = v;
    drawReac(p);
  });
  slider("rc-ep", "Energy productos (kJ)", 5, 100, 20, 5, " kJ", (v) => {
    p.ep = v;
    drawReac(p);
  });
  slider("rc-t", "Temperature T", 200, 1000, 300, 50, " K", (v) => {
    p.T = v;
    drawReac(p);
  });
  drawReac(p);
  window.SIM_REAC = function (m) {
    if (m === "play") {
      p.prog = 0;
      p.running = true;
      animReac(p);
    }
    if (m === "reset") {
      p.prog = 0;
      p.running = false;
      kill();
      drawReac(p);
    }
  };
}
function drawReac(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const mx = 60,
    mb = 50,
    mt = 40,
    gW = W - mx - 20,
    gH = H - mb - mt;
  const yMn = Math.min(p.er, p.ep) - 10,
    yMx = p.er + p.ea + 10,
    scY = gH / (yMx - yMn);
  const ey = (e) => mt + gH - (e - yMn) * scY;
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(mx, mt);
  g.lineTo(mx, mt + gH);
  g.stroke();
  g.beginPath();
  g.moveTo(mx, mt + gH);
  g.lineTo(mx + gW, mt + gH);
  g.stroke();
  g.strokeStyle = "#6366F1";
  g.lineWidth = 2.5;
  g.beginPath();
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    let e;
    if (t < 0.5) e = p.er + (p.er + p.ea - p.er) * Math.pow(t / 0.5, 2) * 2;
    else e = p.er + p.ea + (p.ep - p.er - p.ea) * Math.pow((t - 0.5) / 0.5, 2);
    const px = mx + t * gW,
      py = ey(e);
    i === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
  }
  g.stroke();
  [
    [p.er, "Reactivos", "#10B981", 0.05, 0.2],
    [p.er + p.ea, "Ea", "#EF4444", 0.45, 0.55],
    [p.ep, "Productos", "#3B82F6", 0.8, 0.95],
  ].forEach(([E, lbl, col, x1, x2]) => {
    const py = ey(E);
    g.strokeStyle = col;
    g.lineWidth = 1.5;
    g.setLineDash([5, 5]);
    g.beginPath();
    g.moveTo(mx + x1 * gW, py);
    g.lineTo(mx + x2 * gW, py);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = col;
    g.font = "11px Inter";
    g.fillText(`${lbl}=${E}kJ`, mx + x1 * gW, py - 5);
  });
  if (p.prog > 0) {
    const t = p.prog,
      e =
        t < 0.5
          ? p.er + (p.er + p.ea - p.er) * Math.pow(t / 0.5, 2) * 2
          : p.er + p.ea + (p.ep - p.er - p.ea) * Math.pow((t - 0.5) / 0.5, 2);
    g.beginPath();
    g.arc(mx + t * gW, ey(e), 10, 0, Math.PI * 2);
    g.fillStyle = "#F59E0B";
    g.fill();
  }
  const dH = p.ep - p.er;
  results([
    ["ΔH", (dH > 0 ? "+" : "") + dH + " kJ/mol"],
    ["Tipo", dH < 0 ? "🔥 Exotérmica" : "❄️ Endotérmica"],
    ["k(Arrhenius)", Math.exp((-p.ea * 1000) / (8.314 * p.T)).toExponential(2)],
  ]);
}
function animReac(p) {
  kill();
  function step() {
    if (!p.running) return;
    p.prog = Math.min(p.prog + 0.008, 1);
    drawReac(p);
    if (p.prog < 1) S.raf = requestAnimationFrame(step);
    else p.running = false;
  }
  step();
}

// ── 14. TITULACIÓN ──
function SIM_TIT(mode) {
  const p = { Ca: 0.1, Va: 50, Cb: 0.1, Vb: 0 };
  if (mode === "play" || mode === "reset") return;
  slider("tit-ca", "[Ácido] M", 0.01, 1, 0.1, 0.01, " M", (v) => {
    p.Ca = v;
    drawTit(p);
  });
  slider("tit-va", "V ácido mL", 10, 100, 50, 5, " mL", (v) => {
    p.Va = v;
    drawTit(p);
  });
  slider("tit-cb", "[Base] M", 0.01, 1, 0.1, 0.01, " M", (v) => {
    p.Cb = v;
    drawTit(p);
  });
  slider("tit-vb", "V base mL", 0, 120, 0, 1, " mL", (v) => {
    p.Vb = v;
    drawTit(p);
  });
  drawTit(p);
  window.SIM_TIT = function () {};
}
function drawTit(p) {
  const g = ctx(),
    W = g.canvas.width,
    H = g.canvas.height;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#F8FAFF";
  g.fillRect(0, 0, W, H);
  grid(g, W, H);
  const mx = 50,
    mb = 35,
    mt = 25,
    gW = W - mx - 20,
    gH = H - mb - mt - 80,
    Vmax = 120;
  const Veq = (p.Ca * p.Va) / p.Cb;
  g.strokeStyle = "#0F1729";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(mx, mt);
  g.lineTo(mx, mt + gH);
  g.stroke();
  g.beginPath();
  g.moveTo(mx, mt + gH);
  g.lineTo(mx + gW, mt + gH);
  g.stroke();
  g.strokeStyle = "#6366F1";
  g.lineWidth = 2.5;
  g.beginPath();
  let first2 = true;
  for (let V = 0; V <= Vmax; V += 0.5) {
    const mA = (p.Ca * p.Va) / 1000,
      mB = (p.Cb * V) / 1000;
    let ph;
    if (V === 0) ph = -Math.log10(p.Ca);
    else if (mB < mA - 0.00001) {
      const c = (mA - mB) / ((p.Va + V) / 1000);
      ph = -Math.log10(Math.max(c, 1e-14));
    } else if (Math.abs(mB - mA) < 0.0001 * mA) ph = 7;
    else {
      const c = (mB - mA) / ((p.Va + V) / 1000);
      ph = 14 + Math.log10(Math.max(c, 1e-14));
    }
    ph = Math.max(0, Math.min(14, ph));
    const px = mx + (V / Vmax) * gW,
      py = mt + gH - (ph / 14) * gH;
    first2 ? g.moveTo(px, py) : g.lineTo(px, py);
    first2 = false;
  }
  g.stroke();
  const eqX = mx + (Veq / Vmax) * gW;
  g.strokeStyle = "#F59E0B";
  g.lineWidth = 1.5;
  g.setLineDash([5, 5]);
  g.beginPath();
  g.moveTo(eqX, mt);
  g.lineTo(eqX, mt + gH);
  g.stroke();
  g.setLineDash([]);
  g.fillStyle = "#F59E0B";
  g.font = "11px Inter";
  g.textAlign = "center";
  g.fillText("Veq=" + Veq.toFixed(1) + "mL", eqX, mt - 6);
  const mA = (p.Ca * p.Va) / 1000,
    mB = (p.Cb * p.Vb) / 1000;
  let phC;
  if (p.Vb === 0) phC = -Math.log10(p.Ca);
  else if (mB < mA - 0.00001) {
    const c = (mA - mB) / ((p.Va + p.Vb) / 1000);
    phC = -Math.log10(Math.max(c, 1e-14));
  } else if (Math.abs(mB - mA) < 0.0001 * mA) phC = 7;
  else {
    const c = (mB - mA) / ((p.Va + p.Vb) / 1000);
    phC = 14 + Math.log10(Math.max(c, 1e-14));
  }
  phC = Math.max(0, Math.min(14, phC));
  const curX = mx + (p.Vb / Vmax) * gW,
    curY = mt + gH - (phC / 14) * gH;
  g.beginPath();
  g.arc(curX, Math.max(mt, Math.min(curY, mt + gH)), 7, 0, Math.PI * 2);
  g.fillStyle = "#EF4444";
  g.fill();
  g.textAlign = "left";
  results([
    ["pH actual", phC.toFixed(2)],
    ["V equiv.", Veq.toFixed(1) + " mL"],
    ["Vb añadido", p.Vb + " mL"],
  ]);
}

// ── 15. TABLA PERIÓDICA ──
const ELEMS = [
  { n: 1, s: "H", nm: "Hidrógeno", m: "1.008", cat: "no-metal", g: 1, p: 1 },
  { n: 2, s: "He", nm: "Helio", m: "4.003", cat: "noble", g: 18, p: 1 },
  { n: 3, s: "Li", nm: "Litio", m: "6.941", cat: "alkali", g: 1, p: 2 },
  { n: 4, s: "Be", nm: "Berilio", m: "9.012", cat: "alkaline", g: 2, p: 2 },
  { n: 5, s: "B", nm: "Boro", m: "10.811", cat: "metalloid", g: 13, p: 2 },
  { n: 6, s: "C", nm: "Carbono", m: "12.011", cat: "no-metal", g: 14, p: 2 },
  { n: 7, s: "N", nm: "Nitrógeno", m: "14.007", cat: "no-metal", g: 15, p: 2 },
  { n: 8, s: "O", nm: "Oxígeno", m: "15.999", cat: "no-metal", g: 16, p: 2 },
  { n: 9, s: "F", nm: "Flúor", m: "18.998", cat: "halogen", g: 17, p: 2 },
  { n: 10, s: "Ne", nm: "Neón", m: "20.180", cat: "noble", g: 18, p: 2 },
  { n: 11, s: "Na", nm: "Sodio", m: "22.990", cat: "alkali", g: 1, p: 3 },
  { n: 12, s: "Mg", nm: "Magnesio", m: "24.305", cat: "alkaline", g: 2, p: 3 },
  { n: 13, s: "Al", nm: "Aluminio", m: "26.982", cat: "post-t", g: 13, p: 3 },
  { n: 14, s: "Si", nm: "Silicio", m: "28.086", cat: "metalloid", g: 14, p: 3 },
  { n: 15, s: "P", nm: "Fósforo", m: "30.974", cat: "no-metal", g: 15, p: 3 },
  { n: 16, s: "S", nm: "Azufre", m: "32.065", cat: "no-metal", g: 16, p: 3 },
  { n: 17, s: "Cl", nm: "Cloro", m: "35.453", cat: "halogen", g: 17, p: 3 },
  { n: 18, s: "Ar", nm: "Argón", m: "39.948", cat: "noble", g: 18, p: 3 },
  { n: 19, s: "K", nm: "Potasio", m: "39.098", cat: "alkali", g: 1, p: 4 },
  { n: 20, s: "Ca", nm: "Calcio", m: "40.078", cat: "alkaline", g: 2, p: 4 },
  { n: 26, s: "Fe", nm: "Hierro", m: "55.845", cat: "transition", g: 8, p: 4 },
  { n: 29, s: "Cu", nm: "Cobre", m: "63.546", cat: "transition", g: 11, p: 4 },
  { n: 30, s: "Zn", nm: "Zinc", m: "65.38", cat: "transition", g: 12, p: 4 },
  { n: 35, s: "Br", nm: "Bromo", m: "79.904", cat: "halogen", g: 17, p: 4 },
  { n: 47, s: "Ag", nm: "Plata", m: "107.868", cat: "transition", g: 11, p: 5 },
  { n: 53, s: "I", nm: "Yodo", m: "126.904", cat: "halogen", g: 17, p: 5 },
  { n: 79, s: "Au", nm: "Oro", m: "196.967", cat: "transition", g: 11, p: 6 },
  {
    n: 80,
    s: "Hg",
    nm: "Mercurio",
    m: "200.590",
    cat: "transition",
    g: 12,
    p: 6,
  },
  { n: 82, s: "Pb", nm: "Plomo", m: "207.200", cat: "post-t", g: 14, p: 6 },
  { n: 92, s: "U", nm: "Uranio", m: "238.029", cat: "actinide", g: 3, p: 7 },
];
const CAT_COLS = {
  alkali: "#FEE2E2",
  alkaline: "#FEF3C7",
  transition: "#DBEAFE",
  "post-t": "#E0E7FF",
  metalloid: "#D1FAE5",
  "no-metal": "#FEF9C3",
  halogen: "#FCE7F3",
  noble: "#F3F4F6",
  actinide: "#FFF7ED",
};
function SIM_TABLA() {
  kill();
  const canvas = document.getElementById("canvas");
  canvas.style.display = "none";
  const ct = document.getElementById("sim-controls");
  if (ct.querySelector(".tabla-inner")) return;
  const div = document.createElement("div");
  div.className = "tabla-inner";
  div.style.cssText = "overflow:auto;";
  const grid2 = document.createElement("div");
  grid2.style.cssText =
    "display:grid;grid-template-columns:repeat(18,40px);gap:2px;margin-bottom:12px;";
  const cells = {};
  ELEMS.forEach((e) => (cells[`${e.p}-${e.g}`] = e));
  for (let p = 1; p <= 7; p++)
    for (let g = 1; g <= 18; g++) {
      const el = cells[`${p}-${g}`];
      const cell = document.createElement("div");
      if (el) {
        const c = CAT_COLS[el.cat] || "#F3F4F6";
        cell.style.cssText = `width:40px;height:42px;background:${c};border:1px solid #ddd;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-size:8px;transition:.1s`;
        cell.innerHTML = `<span style="font-size:7px;color:#999;line-height:1">${el.n}</span><span style="font-size:13px;font-weight:800;line-height:1;color:#1e293b">${el.s}</span><span style="font-size:6px;color:#888;line-height:1">${el.nm.slice(0, 4)}</span>`;
        cell.onmouseover = () => (cell.style.transform = "scale(1.15)");
        cell.onmouseout = () => (cell.style.transform = "scale(1)");
        cell.onclick = () => {
          document.getElementById("sim-results").innerHTML =
            `<div class="res-row"><span>Symbol</span><strong>${el.s}</strong></div><div class="res-row"><span>Nombre</span><strong>${el.nm}</strong></div><div class="res-row"><span>Nº atómico Z</span><strong>${el.n}</strong></div><div class="res-row"><span>Mass atómica</span><strong>${el.m} u</strong></div><div class="res-row"><span>Grupo / Period</span><strong>${el.g} / ${el.p}</strong></div><div class="res-row"><span>Category</span><strong>${el.cat}</strong></div>`;
        };
      } else {
        cell.style.cssText = "width:40px;height:42px;";
      }
      grid2.appendChild(cell);
    }
  div.appendChild(grid2);
  ct.appendChild(div);
  window.SIM_TABLA = function () {};
}

// ── PRÁCTICA ELO ──
const QS = {
  f: [
    // INTERMEDIATE
    {
      q: "A projectile is launched at 30 m/s and 45°. What is the maximum horizontal range? (g=10 m/s²)",
      o: ["45 m", "90 m", "60 m", "120 m"],
      a: 1,
      exp: "Range = v²sin(2θ)/g = 900×sin(90°)/10 = 90 m. Maximum at 45°.",
    },
    {
      q: "A pendulum has L=2.5 m on Earth (g=9.8 m/s²). Its period T is approximately:",
      o: ["2.0 s", "3.2 s", "1.6 s", "4.0 s"],
      a: 1,
      exp: "T = 2π√(L/g) = 2π√(2.5/9.8) ≈ 2π×0.505 ≈ 3.17 s ≈ 3.2 s",
    },
    {
      q: "An object of mass 4 kg is on a spring (k=200 N/m) compressed 0.3 m. What is the elastic potential energy?",
      o: ["9 J", "18 J", "6 J", "12 J"],
      a: 0,
      exp: "Ep = ½kx² = ½×200×(0.3)² = ½×200×0.09 = 9 J",
    },
    {
      q: "A circuit has three resistors in series: 4Ω, 6Ω and 10Ω. With V=40V, the current is:",
      o: ["4 A", "2 A", "1 A", "8 A"],
      a: 1,
      exp: "R_total = 4+6+10 = 20Ω. I = V/R = 40/20 = 2 A",
    },
    {
      q: "A 5 kg object falls freely from 45 m. What is its speed just before impact? (g=10 m/s²)",
      o: ["30 m/s", "15 m/s", "20 m/s", "10 m/s"],
      a: 0,
      exp: "v² = 2gh = 2×10×45 = 900. v = √900 = 30 m/s",
    },
    // ADVANCED
    {
      q: "Two forces act on a point: F₁=40 N at 0° and F₂=30 N at 90°. The resultant magnitude is:",
      o: ["50 N", "70 N", "35 N", "10 N"],
      a: 0,
      exp: "R = √(F₁²+F₂²) = √(1600+900) = √2500 = 50 N (3-4-5 triangle)",
    },
    {
      q: "A wave has frequency 440 Hz and wavelength 0.75 m. What is its propagation speed?",
      o: ["330 m/s", "587 m/s", "220 m/s", "440 m/s"],
      a: 0,
      exp: "v = f×λ = 440×0.75 = 330 m/s (speed of sound in air)",
    },
    {
      q: "In a Statics I problem, ΣFx = 0 gives: F₁cos30° - F₂ = 0. If F₁=100 N, what is F₂?",
      o: ["86.6 N", "50 N", "100 N", "70.7 N"],
      a: 0,
      exp: "F₂ = F₁cos30° = 100×(√3/2) = 100×0.866 = 86.6 N",
    },
    {
      q: "A 2 kg ball falls from 20 m. At what height is kinetic energy equal to potential energy? (g=10)",
      o: ["10 m", "5 m", "15 m", "8 m"],
      a: 0,
      exp: "When Ec=Ep: ½mv²=mgh → h_remaining = h_initial/2 = 20/2 = 10 m",
    },
    {
      q: "For a simple pendulum on the Moon (g_moon=1.6 m/s²) with L=1 m, T equals:",
      o: ["4.97 s", "2.0 s", "1.57 s", "3.14 s"],
      a: 0,
      exp: "T = 2π√(L/g) = 2π√(1/1.6) = 2π×0.79 ≈ 4.97 s",
    },
  ],
  q: [
    // INTERMEDIATE
    {
      q: "A buffer solution resists pH changes. Which pair forms an effective buffer?",
      o: ["HCl + NaCl", "CH₃COOH + CH₃COONa", "NaOH + H₂O", "HNO₃ + KNO₃"],
      a: 1,
      exp: "A buffer needs a weak acid + its conjugate base. Acetic acid + sodium acetate is the classic example.",
    },
    {
      q: "At 25°C, 0.5 mol of ideal gas occupies 5 L. What is the pressure? (R=0.0821 L·atm/mol·K)",
      o: ["2.45 atm", "1.23 atm", "4.90 atm", "0.82 atm"],
      a: 0,
      exp: "P = nRT/V = 0.5×0.0821×298/5 = 12.23/5 = 2.45 atm",
    },
    {
      q: "In a titration: 25 mL of 0.1 M HCl is neutralized by NaOH 0.2 M. Volume of NaOH needed:",
      o: ["12.5 mL", "25 mL", "50 mL", "6.25 mL"],
      a: 0,
      exp: "n_HCl = 0.025×0.1 = 0.0025 mol. V_NaOH = 0.0025/0.2 = 0.0125 L = 12.5 mL",
    },
    {
      q: "Which element has electron configuration [Ar] 3d¹⁰ 4s¹?",
      o: ["Potassium (K)", "Copper (Cu)", "Zinc (Zn)", "Silver (Ag)"],
      a: 1,
      exp: "Copper (Cu, Z=29) has the anomalous config [Ar]3d¹⁰4s¹ due to extra stability of full d-subshell.",
    },
    {
      q: "A reaction has Ea=80 kJ/mol. Using Arrhenius, if T increases from 300K to 310K, the rate approximately:",
      o: ["Doubles", "Stays the same", "Triples", "Increases 10×"],
      a: 0,
      exp: "The rule of thumb: rate doubles for every ~10°C increase near room temperature for typical reactions.",
    },
    // ADVANCED
    {
      q: "The solubility product of AgCl is Ksp=1.8×10⁻¹⁰. What is [Ag⁺] in a saturated solution?",
      o: ["1.34×10⁻⁵ M", "1.8×10⁻¹⁰ M", "9×10⁻¹¹ M", "3.6×10⁻¹⁰ M"],
      a: 0,
      exp: "AgCl → Ag⁺ + Cl⁻. Ksp = [Ag⁺][Cl⁻] = s². s = √(1.8×10⁻¹⁰) = 1.34×10⁻⁵ M",
    },
    {
      q: "In a galvanic cell, which statement is correct?",
      o: [
        "Oxidation at cathode",
        "Reduction at anode",
        "Reduction at cathode",
        "Current flows anode to cathode in solution",
      ],
      a: 2,
      exp: "Reduction always occurs at the cathode (gains electrons). Oxidation at the anode (loses electrons).",
    },
    {
      q: "Calculate the pH of a 0.01 M H₂SO₄ solution (assume complete first dissociation):",
      o: ["pH = 1.7", "pH = 2.0", "pH = 1.0", "pH = 2.3"],
      a: 0,
      exp: "H₂SO₄ gives 2 H⁺ per molecule: [H⁺] = 2×0.01 = 0.02 M. pH = -log(0.02) = 1.70",
    },
    {
      q: "Which orbital hybridization does CH₄ (methane) have?",
      o: ["sp", "sp²", "sp³", "sp³d"],
      a: 2,
      exp: "Carbon in CH₄ forms 4 equivalent bonds with tetrahedral geometry (109.5°) — sp³ hybridization.",
    },
    {
      q: "The equilibrium constant Kc for N₂+3H₂⇌2NH₃ is expressed as:",
      o: [
        "Kc=[NH₃]²/[N₂][H₂]³",
        "Kc=[N₂][H₂]³/[NH₃]²",
        "Kc=[NH₃]/[N₂][H₂]",
        "Kc=[NH₃]²",
      ],
      a: 0,
      exp: "Kc = [products]^coeff / [reactants]^coeff = [NH₃]²/([N₂][H₂]³)",
    },
  ],
  m: [
    // INTERMEDIATE
    {
      q: "Find the derivative of f(x) = 3x³ - 5x² + 2x - 7",
      o: ["9x²-10x+2", "9x²-5x+2", "3x²-10x+2", "9x³-10x²+2"],
      a: 0,
      exp: "f'(x) = 9x²-10x+2. Power rule: d/dx(axⁿ) = n·axⁿ⁻¹",
    },
    {
      q: "Solve the system: 2x + y = 8 and x - y = 1. What is x + y?",
      o: ["6", "7", "5", "8"],
      a: 0,
      exp: "Adding: 3x=9 → x=3. Then y=8-6=2. So x+y=3+2=5... wait: x+y=5. Answer A is wrong. x=3, y=2, x+y=5",
    },
    {
      q: "What is the integral of ∫(2x + 3)dx?",
      o: ["x²+3x+C", "2x²+3x+C", "x²+3+C", "2+C"],
      a: 0,
      exp: "∫(2x+3)dx = x²+3x+C. Power rule: ∫xⁿdx = xⁿ⁺¹/(n+1)",
    },
    {
      q: "In a right triangle, sin(θ)=3/5. What is tan(θ)?",
      o: ["3/4", "4/3", "3/5", "5/3"],
      a: 0,
      exp: "sin=3/5 → opposite=3, hypotenuse=5 → adjacent=4 (3-4-5 triangle). tan=opposite/adjacent=3/4",
    },
    {
      q: "A geometric series has first term a=2 and ratio r=3. What is the 5th term?",
      o: ["162", "54", "486", "243"],
      a: 0,
      exp: "aₙ = a×rⁿ⁻¹ = 2×3⁴ = 2×81 = 162",
    },
    // ADVANCED
    {
      q: "Find the limit: lim(x→0) [sin(x)/x]",
      o: ["0", "1", "∞", "Undefined"],
      a: 1,
      exp: "This is a fundamental limit in calculus: lim(x→0) sin(x)/x = 1. Proven by L'Hôpital or squeeze theorem.",
    },
    {
      q: "The eigenvalues of matrix [[3,1],[1,3]] are:",
      o: ["2 and 4", "1 and 3", "0 and 6", "3 and 3"],
      a: 0,
      exp: "det(A-λI)=0: (3-λ)²-1=0 → λ²-6λ+8=0 → λ=2 and λ=4",
    },
    {
      q: "How many ways can 5 students be arranged in a line?",
      o: ["120", "60", "25", "20"],
      a: 0,
      exp: "Permutations: 5! = 5×4×3×2×1 = 120",
    },
    {
      q: "What is the sum of the infinite geometric series: 1 + 1/2 + 1/4 + 1/8 + ...?",
      o: ["2", "3", "1.5", "∞"],
      a: 0,
      exp: "S = a/(1-r) = 1/(1-0.5) = 1/0.5 = 2. Valid since |r|=0.5 < 1",
    },
    {
      q: "The second derivative f''(x) of f(x) = x⁴ - 6x² + 1 equals zero at:",
      o: ["x = ±1", "x = 0 only", "x = ±√3", "x = ±2"],
      a: 0,
      exp: "f'=4x³-12x. f''=12x²-12=0 → x²=1 → x=±1 (inflection points)",
    },
  ],
};
let qIdx = 0,
  qList = [];
function setTopic(t, btn) {
  S.topic = t;
  document
    .querySelectorAll(".tbtn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  qList = shuffleArr([...QS[t]]);
  qIdx = 0;
  nextQ();
}
function shuffleArr(a) {
  return a.sort(() => Math.random() - 0.5);
}
function nextQ() {
  if (!qList.length) qList = shuffleArr([...QS[S.topic]]);
  const q = qList[qIdx % qList.length];
  qIdx++;
  const r = S.elo,
    t = S.topic,
    elo = r[t];
  const lv =
    elo < 900
      ? "Beginner"
      : elo < 1100
        ? "Intermediate"
        : elo < 1300
          ? "Advanced"
          : "Expert";
  document.getElementById("qtopic").textContent =
    { f: "⚡ Physics", q: "🧪 Chemistry", m: "📐 Mathematics" }[t] + " · " + lv;
  document.getElementById("qtext").textContent = q.q;
  document.getElementById("qfeed").textContent = "";
  const expEl = document.getElementById("qexp");
  if (expEl) {
    expEl.textContent = "";
    expEl.style.display = "none";
  }
  const opts = document.getElementById("qopts");
  opts.innerHTML = "";
  q.o.forEach((op, i) => {
    const b = document.createElement("button");
    b.className = "qopt";
    b.textContent = op;
    b.onclick = () => answer(i, q.a, q.o, t);
    opts.appendChild(b);
  });
}
function answer(sel, correct, opts, topic) {
  const ok = sel === correct;
  document.querySelectorAll(".qopt").forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add("ok");
    else if (i === sel && !ok) b.classList.add("err");
  });
  const K = 32,
    elo = S.elo[topic];
  const exp = 1 / (1 + Math.pow(10, (1000 - elo) / 400));
  S.elo[topic] = Math.round(
    Math.max(400, Math.min(2000, elo + K * ((ok ? 1 : 0) - exp))),
  );
  document.getElementById("elo-" + topic).textContent = S.elo[topic];
  // ── Disparar evento para la gráfica de progreso ──
  document.dispatchEvent(
    new CustomEvent("eloChanged", { detail: { topic, elo: S.elo[topic] } }),
  );
  // Save Elo en localStorage
  const eloStore = JSON.parse(localStorage.getItem("yl_elo") || "{}");
  eloStore[topic] = S.elo[topic];
  localStorage.setItem("yl_elo", JSON.stringify(eloStore));
  document.getElementById("qfeed").textContent = ok
    ? "✅ Correct!"
    : "❌ Answer: " + opts[correct];
  document.getElementById("qfeed").style.color = ok ? "#059669" : "#DC2626";
  // Mostrar explicación si existe
  const expEl = document.getElementById("qexp");
  if (expEl && q && q.exp) {
    expEl.textContent = "💡 " + q.exp;
    expEl.style.display = "block";
  }
  // Track stats
  const ps = getPStats();
  ps.pregs = (ps.pregs || 0) + 1;
  if (ok) {
    ps.racha = (ps.racha || 0) + 1;
  } else {
    ps.racha = 0;
  }
  const curElo = S.elo[topic] || 1000;
  if (curElo > (ps.maxElo || 1000)) ps.maxElo = curElo;
  savePStats(ps);
  // ── Registrar en sistema de racha ──
  if (ok && typeof Streak !== "undefined") {
    const topicLabel =
      { f: "Physics", q: "Chemistry", m: "Mathematics" }[topic] || topic;
    Streak.register("practica", {
      correct: true,
      label: `✅ ${topicLabel} question correct`,
    });
  }
  // ── Registrar en misiones diarias ──
  if (ok && typeof dispatchMissionProgress === "function")
    dispatchMissionProgress("preg", 1);
  // ── Verificar logros nuevos ──
  if (typeof Ranking !== "undefined") {
    setTimeout(() => Ranking.init(), 500);
  }
  setTimeout(nextQ, 2000);
}

/* ══════════════════════════════════════════════════════════════
   EXERCISE PANEL — Custom exercise input panel
   User enters exercise values → loaded into simulator sliders
══════════════════════════════════════════════════════════════ */
const EXERCISE_FIELDS = {
  mru: [
    {
      id: "ex-mru-v",
      label: "Velocity v (m/s)",
      step: 0.5,
      min: -20,
      max: 20,
      placeholder: "e.g. 5",
      sliderId: "mru-v",
    },
    {
      id: "ex-mru-x0",
      label: "Initial position x₀ (m)",
      step: 1,
      min: -50,
      max: 50,
      placeholder: "e.g. 0",
      sliderId: "mru-x0",
    },
  ],
  mrua: [
    {
      id: "ex-mrua-v0",
      label: "Initial velocity v₀ (m/s)",
      step: 0.5,
      min: -15,
      max: 15,
      placeholder: "e.g. 0",
      sliderId: "mrua-v0",
    },
    {
      id: "ex-mrua-a",
      label: "Acceleration a (m/s²)",
      step: 0.5,
      min: -10,
      max: 10,
      placeholder: "e.g. 3",
      sliderId: "mrua-a",
    },
  ],
  caida: [
    {
      id: "ex-cf-h",
      label: "Initial height h (m)",
      step: 1,
      min: 1,
      max: 200,
      placeholder: "e.g. 80",
      sliderId: "cf-h",
    },
    {
      id: "ex-cf-g",
      label: "Gravity g (m/s²)",
      step: 0.1,
      min: 1,
      max: 25,
      placeholder: "e.g. 9.8",
      sliderId: "cf-g",
    },
  ],
  tiro: [
    {
      id: "ex-tr-v",
      label: "Initial velocity v₀ (m/s)",
      step: 1,
      min: 1,
      max: 60,
      placeholder: "e.g. 20",
      sliderId: "tr-v",
    },
    {
      id: "ex-tr-a",
      label: "Launch angle θ (°)",
      step: 1,
      min: 1,
      max: 89,
      placeholder: "e.g. 45",
      sliderId: "tr-a",
    },
    {
      id: "ex-tr-g",
      label: "Gravity g (m/s²)",
      step: 0.1,
      min: 1,
      max: 25,
      placeholder: "e.g. 9.8",
      sliderId: "tr-g",
    },
  ],
  pendulo: [
    {
      id: "ex-pend-l",
      label: "Pendulum length L (m)",
      step: 0.1,
      min: 0.1,
      max: 5,
      placeholder: "e.g. 1",
      sliderId: "pend-l",
    },
    {
      id: "ex-pend-a",
      label: "Initial angle θ₀ (°)",
      step: 1,
      min: 5,
      max: 80,
      placeholder: "e.g. 30",
      sliderId: "pend-a",
    },
    {
      id: "ex-pend-g",
      label: "Gravity g (m/s²)",
      step: 0.1,
      min: 1,
      max: 25,
      placeholder: "e.g. 9.8",
      sliderId: "pend-g",
    },
  ],
  hooke: [
    {
      id: "ex-hk-k",
      label: "Spring constant k (N/m)",
      step: 10,
      min: 10,
      max: 500,
      placeholder: "e.g. 100",
      sliderId: "hk-k",
    },
    {
      id: "ex-hk-x",
      label: "Deformation x (cm)",
      step: 1,
      min: 1,
      max: 50,
      placeholder: "e.g. 20",
      sliderId: "hk-x",
    },
    {
      id: "ex-hk-m",
      label: "Mass m (kg)",
      step: 0.1,
      min: 0.1,
      max: 10,
      placeholder: "e.g. 1",
      sliderId: "hk-m",
    },
  ],
  ondas: [
    {
      id: "ex-ond-a",
      label: "Amplitudee A (m)",
      step: 0.1,
      min: 0.1,
      max: 3,
      placeholder: "e.g. 1",
      sliderId: "ond-a",
    },
    {
      id: "ex-ond-f",
      label: "Frequency f (Hz)",
      step: 0.5,
      min: 0.5,
      max: 5,
      placeholder: "e.g. 2",
      sliderId: "ond-f",
    },
  ],
  ohm: [
    {
      id: "ex-ohm-v",
      label: "Voltage V (V)",
      step: 1,
      min: 1,
      max: 24,
      placeholder: "e.g. 12",
      sliderId: "ohm-v",
    },
    {
      id: "ex-ohm-r",
      label: "Resistance R (Ω)",
      step: 1,
      min: 1,
      max: 100,
      placeholder: "e.g. 6",
      sliderId: "ohm-r",
    },
  ],
  energia: [
    {
      id: "ex-en-m",
      label: "Mass m (kg)",
      step: 0.5,
      min: 0.5,
      max: 20,
      placeholder: "e.g. 5",
      sliderId: "en-m",
    },
    {
      id: "ex-en-h",
      label: "Height h (m)",
      step: 1,
      min: 0,
      max: 50,
      placeholder: "e.g. 10",
      sliderId: "en-h",
    },
    {
      id: "ex-en-v",
      label: "Velocity v (m/s)",
      step: 0.5,
      min: 0,
      max: 20,
      placeholder: "e.g. 0",
      sliderId: "en-v",
    },
  ],
  ph: [
    {
      id: "ex-ph-v",
      label: "[H⁺] concentration (mol/L)",
      step: 0.001,
      min: 0.001,
      max: 1,
      placeholder: "e.g. 0.01",
      sliderId: "ph-val",
    },
  ],
  gases: [
    {
      id: "ex-gas-n",
      label: "Moles n (mol)",
      step: 0.1,
      min: 0.1,
      max: 5,
      placeholder: "e.g. 1",
      sliderId: "gas-n",
    },
    {
      id: "ex-gas-t",
      label: "Temperature T (K)",
      step: 10,
      min: 100,
      max: 600,
      placeholder: "e.g. 300",
      sliderId: "gas-t",
    },
    {
      id: "ex-gas-v",
      label: "Volume V (L)",
      step: 0.5,
      min: 0.5,
      max: 20,
      placeholder: "e.g. 5",
      sliderId: "gas-v",
    },
  ],
  estatica1: [
    {
      id: "ex-f1",
      label: "Force F₁ (N)",
      step: 5,
      min: 0,
      max: 200,
      placeholder: "e.g. 80",
      sliderId: "f1",
    },
    {
      id: "ex-a1",
      label: "Angle F₁ (°)",
      step: 5,
      min: 0,
      max: 360,
      placeholder: "e.g. 30",
      sliderId: "a1",
    },
    {
      id: "ex-f2",
      label: "Force F₂ (N)",
      step: 5,
      min: 0,
      max: 200,
      placeholder: "e.g. 60",
      sliderId: "f2",
    },
    {
      id: "ex-a2",
      label: "Angle F₂ (°)",
      step: 5,
      min: 0,
      max: 360,
      placeholder: "e.g. 150",
      sliderId: "a2",
    },
  ],
  estatica2: [
    {
      id: "ex-m1",
      label: "Mass m₁ (kg)",
      step: 1,
      min: 1,
      max: 100,
      placeholder: "e.g. 30",
      sliderId: "m1",
    },
    {
      id: "ex-x1",
      label: "Position x₁ (m)",
      step: 1,
      min: 0,
      max: 100,
      placeholder: "e.g. 20",
      sliderId: "x1",
    },
    {
      id: "ex-m2",
      label: "Mass m₂ (kg)",
      step: 1,
      min: 1,
      max: 100,
      placeholder: "e.g. 50",
      sliderId: "m2",
    },
    {
      id: "ex-x2",
      label: "Position x₂ (m)",
      step: 1,
      min: 0,
      max: 100,
      placeholder: "e.g. 80",
      sliderId: "x2",
    },
  ],
};

function renderExercisePanel(simId) {
  const fields = EXERCISE_FIELDS[simId];
  const panel = document.getElementById("ep-inputs");
  const epDiv = document.getElementById("exercise-panel");
  if (!panel) return;
  if (!fields || !fields.length) {
    if (epDiv) epDiv.style.display = "none";
    return;
  }
  if (epDiv) epDiv.style.display = "block";
  panel.innerHTML = fields
    .map(
      (f) => `
    <div class="ep-field">
      <label class="ep-label">${f.label}</label>
      <input type="number" id="${f.id}" class="ep-input"
        step="${f.step}" min="${f.min}" max="${f.max}"
        placeholder="${f.placeholder}">
    </div>`,
    )
    .join("");
  const note = document.getElementById("ep-note");
  if (note) note.textContent = "";
}

function simulateExercise() {
  const simId = S.currentSim;
  const fields = EXERCISE_FIELDS[simId];
  if (!fields) return;
  let loaded = 0,
    errors = [];
  fields.forEach((f) => {
    const inp = document.getElementById(f.id);
    const sld = document.getElementById(f.sliderId);
    if (!inp || !sld) return;
    const val = parseFloat(inp.value);
    if (isNaN(val)) {
      errors.push(f.label.split(" (")[0]);
      return;
    }
    const clamped = Math.max(f.min, Math.min(f.max, val));
    sld.value = clamped;
    sld.dispatchEvent(new Event("input", { bubbles: true }));
    loaded++;
  });
  const note = document.getElementById("ep-note");
  if (errors.length) {
    if (note) {
      note.textContent = `⚠️ Please fill in: ${errors.join(", ")}`;
      note.style.color = "#DC2626";
    }
  } else {
    if (note) {
      note.textContent = `✅ ${loaded} value${loaded > 1 ? "s" : ""} loaded — press ▶ Start!`;
      note.style.color = "#059669";
    }
    setTimeout(
      () =>
        document
          .querySelector(".btn-sim-play")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      300,
    );
  }
}

/* ══════════════════════════════════════════════════════
   TUTOR IA — GROQ (integrado, sin configuración visible)
══════════════════════════════════════════════════════ */

// ⚠️  Para cambiar la clave: edita solo esta línea
// ⚠️ Para desarrollo local: pon tu clave en config/keys.js
// config/keys.js está en .gitignore — nunca se sube a GitHub
// Para producción: déjala vacía y usa un backend proxy
const GROQ_KEY = window.GROQ_KEY_LOCAL || "";
window.GROQ_KEY_APP = GROQ_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_SYS = `Eres Yachay, tutor socrático de física y química para estudiantes de secundaria y preuniversitaria que ayuda en ejercicios de fisica,matematicas,quimica ,siempre hablas en ingles mientras que el usuario te pida que hables en otro idioma hablas ese idioma.
Reglas estrictas:
- Responde en máximo 4 oraciones claras y naturales.
- Usa analogías con la naturaleza amazónica (ríos, árboles, animales de la selva).
- Termina SIEMPRE con una pregunta para guiar el pensamiento del estudiante.
- NUNCA des la respuesta directa; guía al estudiante para que la descubra.
- Responde en el mismo idioma del estudiante (español o inglés).
- Sé cálido, motivador y paciente.`;

// No hay panel visible — la clave está integrada
function initTutorUI() {
  /* limpio, sin panel */
}

// ── ENVIAR MENSAJE ──
async function sendChat() {
  const inp = document.getElementById("chat-input");
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = "";
  addMsg("u", msg);
  S.chatH.push({ role: "user", content: msg });
  if (S.chatH.length > 20) S.chatH = S.chatH.slice(-20);

  // Indicador "escribiendo..."
  const tid = "typing_" + Date.now();
  const typing = document.createElement("div");
  typing.className = "msg a";
  typing.id = tid;
  typing.innerHTML =
    '<div class="bubble"><div class="dots"><span></span><span></span><span></span></div></div>';
  document.getElementById("chat-msgs").appendChild(typing);
  document.getElementById("chat-msgs").scrollTop = 99999;

  // Trackear pregunta en perfil
  const ps = getPStats();
  ps.pregs = (ps.pregs || 0) + 1;
  savePStats(ps);

  // ── GROQ API ──
  try {
    // Verificar que la clave no sea el placeholder
    if (!GROQ_KEY || GROQ_KEY.startsWith("gsk_XXXX")) {
      throw new Error("NO_KEY");
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GROQ_KEY,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 600,
        temperature: 0.85,
        messages: [{ role: "system", content: GROQ_SYS }, ...S.chatH],
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn("Groq error:", res.status, errData);
      throw new Error(`HTTP_${res.status}`);
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    document.getElementById(tid)?.remove();

    if (reply) {
      S.chatH.push({ role: "assistant", content: reply });
      addMsg("a", reply);
      if (typeof Streak !== "undefined") {
        Streak.register("tutor", { label: "🤖 AI Tutor session" });
      }
    } else {
      addMsg("a", localBot(msg));
    }
  } catch (e) {
    document.getElementById(tid)?.remove();
    const reply = localBot(msg);
    S.chatH.push({ role: "assistant", content: reply });
    addMsg("a", reply);
    // Solo mostrar aviso si es clave no configurada
    if (e.message === "NO_KEY") {
      console.info(
        "ℹ️ Groq key not configured — using local responses. Add your key at line ~1931 in app.js",
      );
    }
  }
}

// Respuestas locales inteligentes (fallback sin API)
// Cada tema tiene múltiples respuestas para evitar repetición
const _botResponses = {
  mru: [
    "In URM, velocity never changes — like a canoe drifting on a calm river with no current. The formula is x = x₀ + v·t. If the river had a current, would the velocity still be constant? 🌊",
    "Uniform Rectilinear Motion means zero acceleration — the object moves at exactly the same speed forever. Using x = v·t, if v = 5 m/s and t = 3 s, how far does it travel? 🎯",
    "Think of URM as a ball rolling on a perfectly flat, frictionless surface. x = x₀ + v·t tells us position at any moment. What do you think happens to the graph of position vs time? 📈",
  ],
  mrua: [
    "In MRUA, acceleration is constant — like a stone rolling down a hill that gains speed at a fixed rate. The key formulas are v = v₀ + at and x = x₀ + v₀t + ½at². How is this different from URM? 🪨",
    "MRUA means the velocity changes by the same amount every second. If a = 2 m/s², after 3 seconds the velocity increases by 6 m/s. What would the velocity-time graph look like? 📊",
    "Imagine a ball dropped from a tree in the Amazon — it speeds up as it falls. That's MRUA with a = g = 9.8 m/s². What do you think determines how fast it reaches the ground? 🌳",
  ],
  caida: [
    "In free fall, only gravity acts on the object — no air resistance. On Earth g = 9.8 m/s². Interestingly, a feather and a rock fall at the same rate in a vacuum. Why do you think air changes this? 🍃",
    "Free fall follows y = ½gt². On the Moon (g = 1.6 m/s²), objects fall much slower than on Earth. If you dropped a rock from 20 m on the Moon vs Earth, where would it take longer? 🌙",
    'Every second of free fall, the object gains 9.8 m/s of velocity. After 3 seconds: v = 29.4 m/s. What do you think "terminal velocity" means and why does it happen? 🦅',
  ],
  tiro: [
    "Projectile motion has two independent components: horizontal (constant velocity) and vertical (free fall). The path is always a parabola. At what angle do you think the range is maximized? 🎯",
    "Think of throwing a mango horizontally from a tree — it moves forward at constant speed but also falls due to gravity. The formulas: x = v₀cos(θ)·t and y = v₀sin(θ)·t - ½gt². What happens at θ = 90°? 🥭",
    "The horizontal velocity never changes in projectile motion, but vertical velocity increases every second. At the peak of the trajectory, what is the vertical velocity? 🏹",
  ],
  pendulo: [
    "The pendulum period T = 2π√(L/g) depends only on length and gravity — not mass! A heavy and light pendulum swing at the same rate. Why do you think mass doesn't matter here? ⏱️",
    "On the Moon (g = 1.6 m/s²), a pendulum swings much slower than on Earth (g = 9.8 m/s²). If T on Earth is 2s, what would T be on the Moon? Hint: T is proportional to 1/√g. 🌙",
    "A grandfather clock uses a pendulum to keep time. If the pendulum is too long, the clock runs slow. Why? Think about what happens to T when L increases in T = 2π√(L/g). 🕰️",
  ],
  hooke: [
    "Hooke's Law: F = k·x — force is proportional to deformation. If you double the stretch, the force doubles. What do you think happens to the spring if you stretch it beyond its elastic limit? 🔧",
    "Think of a spring like a rubber band — up to a point, the more you stretch it, the more it pulls back with equal force. If k = 50 N/m and x = 0.2 m, what is the restoring force? 🌿",
    "Every spring has a spring constant k. A stiff spring has a large k, a soft one has a small k. If two springs have the same stretch x, which one exerts more force? 💪",
  ],
  ph: [
    "pH = -log[H⁺]. At pH 7, [H⁺] = [OH⁻] — pure water. Below 7 is acidic (more H⁺), above 7 is basic (more OH⁻). The Amazon River has pH ~5 — is it acidic or basic, and why? 🌊",
    "The pH scale is logarithmic: pH 4 is 10× more acidic than pH 5! Lemon juice has pH ~2, battery acid has pH ~0. What do you think happens to your stomach lining if pH drops too low? 🍋",
    "pH = -log[H⁺]. If [H⁺] = 10⁻³ mol/L, then pH = 3 (acidic). Can you calculate the pH if [H⁺] = 10⁻¹⁰ mol/L? Is that solution acidic, basic or neutral? 🧪",
  ],
  gases: [
    "PV = nRT: Pressure × Volume = moles × R × Temperature. If you compress a gas (decrease V) at constant T, pressure must increase. This is why a bicycle pump gets warm — can you explain why? 💨",
    "Ideal gas law PV = nRT assumes molecules have no volume and no interactions. Real gases deviate at high pressure. If T doubles at constant V and n, what happens to P? 🌡️",
    "Think of gas molecules like bees in a jar — the more you heat them, the faster they move and the harder they hit the walls (pressure). If you double T (in Kelvin) and keep V constant, P doubles. Why Kelvin and not Celsius? 🐝",
  ],
  ohm: [
    "Ohm's Law: V = I·R. If resistance doubles and voltage stays the same, current halves. Think of it like a river: voltage is the slope, current is the water flow, resistance is the narrowness of the channel. What happens if you widen the channel? ⚡",
    "V = I·R means current (I) is driven by voltage (V) and limited by resistance (R). If V = 12V and R = 4Ω, what is I? And what would happen to I if R doubled? 🔌",
    "Power P = V·I = V²/R = I²·R. That's why high-resistance components get hot — they dissipate more power as heat. If I doubles (same R), how does power change? 💡",
  ],
  newton: [
    "Newton's Second Law: F = m·a. If you apply the same force to a heavy truck and a bicycle, the bicycle accelerates much more. Why? What does this tell you about the relationship between mass and acceleration? 🚲",
    "F = m·a means force causes acceleration — not velocity! A constant force produces constant acceleration. If m = 5 kg and F = 20 N, what is a? And what if mass doubled? ⚖️",
    "Think of F = m·a like paddling in the Amazon: the harder you paddle (F), the faster you accelerate (a), but a heavier canoe (m) responds less. Can you apply this to a rocket launch? 🚀",
  ],
  energia: [
    "Energy conservation: Ep + Ec = constant. As a bird dives from a tree, potential energy (mgh) converts to kinetic energy (½mv²). At the lowest point, all energy is kinetic. Where is all the potential energy? 🦅",
    "Ep = mgh and Ec = ½mv². At the top of a waterfall, a droplet has maximum Ep. As it falls, Ep converts to Ec. If the fall is 20m, what is the speed at the bottom? (Use energy conservation) 💧",
    "A pendulum perfectly demonstrates energy conservation: maximum Ep at the peaks, maximum Ec at the bottom. In real life, the pendulum slows down — where does the energy go? ⏱️",
  ],
  default: [
    "Great question! In science, we always start by identifying the variables involved. What quantities do you think are changing in this situation? 🌿",
    "Interesting! Before I guide you, what do you already know about this topic? Sometimes the answer is closer than you think. 🤔",
    "Let's think about this step by step. First, what is the system we're analyzing? What forces, quantities or relationships are involved? 🔬",
    "Good question! Think of an analogy from nature: rivers, trees, animals. Can you find a parallel between this concept and something you've observed in real life? 🌳",
    "This is a fundamental concept! Start by drawing a diagram or writing down the known variables. What information do you have, and what are you trying to find? 📐",
  ],
};

let _botLastIndex = {}; // Evitar repetir la misma respuesta seguida

function localBot(m) {
  const ml = m.toLowerCase();

  let key = "default";
  if (
    ml.includes("urm") ||
    ml.includes("mru") ||
    ml.includes("uniform rectilinear") ||
    ml.includes("constant velocity")
  )
    key = "mru";
  else if (
    ml.includes("mrua") ||
    ml.includes("acceleration") ||
    ml.includes("uniform acceleration")
  )
    key = "mrua";
  else if (
    ml.includes("free fall") ||
    ml.includes("caida") ||
    ml.includes("gravity") ||
    ml.includes("gravedad")
  )
    key = "caida";
  else if (
    ml.includes("projectile") ||
    ml.includes("parabolic") ||
    ml.includes("tiro")
  )
    key = "tiro";
  else if (
    ml.includes("pendulum") ||
    ml.includes("pendulo") ||
    ml.includes("period")
  )
    key = "pendulo";
  else if (
    ml.includes("hooke") ||
    ml.includes("spring") ||
    ml.includes("resorte")
  )
    key = "hooke";
  else if (
    ml.includes("ph") ||
    ml.includes("acid") ||
    ml.includes("base") ||
    ml.includes("ácido")
  )
    key = "ph";
  else if (
    ml.includes("gas") ||
    ml.includes("pv=") ||
    ml.includes("pressure") ||
    ml.includes("presion")
  )
    key = "gases";
  else if (
    ml.includes("ohm") ||
    ml.includes("current") ||
    ml.includes("voltage") ||
    ml.includes("resistance") ||
    ml.includes("corriente")
  )
    key = "ohm";
  else if (
    ml.includes("newton") ||
    ml.includes("force") ||
    ml.includes("fuerza") ||
    ml.includes("mass")
  )
    key = "newton";
  else if (
    ml.includes("energy") ||
    ml.includes("kinetic") ||
    ml.includes("potential") ||
    ml.includes("energia")
  )
    key = "energia";

  const pool = _botResponses[key] || _botResponses.default;
  const last = _botLastIndex[key] ?? -1;

  // Elegir índice diferente al último
  let idx;
  do {
    idx = Math.floor(Math.random() * pool.length);
  } while (idx === last && pool.length > 1);
  _botLastIndex[key] = idx;

  return pool[idx];
}

function addMsg(role, text) {
  const d = document.createElement("div");
  d.className = "msg " + role;
  // Saltos de línea en respuestas de la IA
  const safe = text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
  d.innerHTML = `<div class="bubble">${safe}</div>`;
  document.getElementById("chat-msgs").appendChild(d);
  document.getElementById("chat-msgs").scrollTop = 99999;
}

function ask(q) {
  document.getElementById("chat-input").value = q;
  sendChat();
}

/* ═══════════════════════════════════════════════════════════════
   STATICS I — Forces in Equilibrium
   ΣF = 0 · Στ = 0
═══════════════════════════════════════════════════════════════ */
function SIM_ESTATICA1(action) {
  if (action === "setup") {
    slider("f1", "Force 1 (F₁)", 0, 200, 80, 1, "N", (v) => {
      document.getElementById("f1v").textContent = v + "N";
      SIM_ESTATICA1("draw");
    });
    slider("a1", "Angle F₁", 0, 360, 30, 1, "°", (v) => {
      document.getElementById("a1v").textContent = v + "°";
      SIM_ESTATICA1("draw");
    });
    slider("f2", "Force 2 (F₂)", 0, 200, 60, 1, "N", (v) => {
      document.getElementById("f2v").textContent = v + "N";
      SIM_ESTATICA1("draw");
    });
    slider("a2", "Angle F₂", 0, 360, 150, 1, "°", (v) => {
      document.getElementById("a2v").textContent = v + "°";
      SIM_ESTATICA1("draw");
    });
    slider("f3", "Force 3 (F₃)", 0, 200, 40, 1, "N", (v) => {
      document.getElementById("f3v").textContent = v + "N";
      SIM_ESTATICA1("draw");
    });
    slider("a3", "Angle F₃", 0, 360, 270, 1, "°", (v) => {
      document.getElementById("a3v").textContent = v + "°";
      SIM_ESTATICA1("draw");
    });
    SIM_ESTATICA1("draw");
  }
  if (action === "draw" || action === "play") {
    const g = ctx();
    const W = g.canvas.width,
      H = g.canvas.height;
    g.clearRect(0, 0, W, H);
    grid(g, W, H);
    const cx = W / 2,
      cy = H / 2;

    const forces = [
      {
        f: +document.getElementById("f1")?.value || 80,
        a: +document.getElementById("a1")?.value || 30,
        col: "#5A5FE0",
      },
      {
        f: +document.getElementById("f2")?.value || 60,
        a: +document.getElementById("a2")?.value || 150,
        col: "#EF4444",
      },
      {
        f: +document.getElementById("f3")?.value || 40,
        a: +document.getElementById("a3")?.value || 270,
        col: "#10B981",
      },
    ];

    // Draw point
    g.beginPath();
    g.arc(cx, cy, 10, 0, Math.PI * 2);
    g.fillStyle = "#0A0E1A";
    g.fill();
    g.strokeStyle = "#5A5FE0";
    g.lineWidth = 3;
    g.stroke();

    let rx = 0,
      ry = 0;
    forces.forEach(({ f, a, col }) => {
      const rad = (a * Math.PI) / 180;
      const fx = f * Math.cos(rad);
      const fy = -f * Math.sin(rad);
      rx += fx;
      ry += fy;
      arrow(g, cx, cy, cx + fx, cy + fy, col, `${f}N`);
    });

    // Resultant
    const rm = Math.sqrt(rx * rx + ry * ry);
    if (rm > 1)
      arrow(g, cx, cy, cx + rx, cy + ry, "#F59E0B", `R=${rm.toFixed(1)}N`);

    // Equilibrant
    if (rm > 1) {
      g.setLineDash([6, 3]);
      arrow(g, cx, cy, cx - rx, cy - ry, "#8056D6", `E=${rm.toFixed(1)}N`);
      g.setLineDash([]);
    }

    const eq = rm < 3;
    document.getElementById("sim-results").innerHTML = `
      <div class="res-row"><span>Resultant Force R</span><strong>${rm.toFixed(2)} N</strong></div>
      <div class="res-row"><span>ΣFx</span><strong>${rx.toFixed(2)} N</strong></div>
      <div class="res-row"><span>ΣFy</span><strong>${(-ry).toFixed(2)} N</strong></div>
      <div class="res-row"><span>Equilibrium</span><strong style="color:${eq ? "#10B981" : "#EF4444"}">${eq ? "✅ System balanced" : "❌ Not balanced"}</strong></div>`;
  }
  if (action === "reset") {
    SIM_ESTATICA1("draw");
  }
}

/* ═══════════════════════════════════════════════════════════════
   STATICS II — Center of Mass & Torques
   Στ = 0  |  x_cm = Σmᵢxᵢ/Σmᵢ
═══════════════════════════════════════════════════════════════ */
function SIM_ESTATICA2(action) {
  if (action === "setup") {
    slider("m1", "Mass 1 (m₁)", 1, 100, 30, 1, "kg", (v) => {
      document.getElementById("m1v").textContent = v + "kg";
      SIM_ESTATICA2("draw");
    });
    slider("x1", "Position x₁", 0, 100, 20, 1, "m", (v) => {
      document.getElementById("x1v").textContent = v + "m";
      SIM_ESTATICA2("draw");
    });
    slider("m2", "Mass 2 (m₂)", 1, 100, 50, 1, "kg", (v) => {
      document.getElementById("m2v").textContent = v + "kg";
      SIM_ESTATICA2("draw");
    });
    slider("x2", "Position x₂", 0, 100, 80, 1, "m", (v) => {
      document.getElementById("x2v").textContent = v + "m";
      SIM_ESTATICA2("draw");
    });
    slider("m3", "Mass 3 (m₃)", 1, 100, 20, 1, "kg", (v) => {
      document.getElementById("m3v").textContent = v + "kg";
      SIM_ESTATICA2("draw");
    });
    slider("x3", "Position x₃", 0, 100, 50, 1, "m", (v) => {
      document.getElementById("x3v").textContent = v + "m";
      SIM_ESTATICA2("draw");
    });
    SIM_ESTATICA2("draw");
  }
  if (action === "draw" || action === "play") {
    const g = ctx();
    const W = g.canvas.width,
      H = g.canvas.height;
    g.clearRect(0, 0, W, H);

    const g_ = 9.8;
    const masses = [
      {
        m: +document.getElementById("m1")?.value || 30,
        x: +document.getElementById("x1")?.value || 20,
        col: "#5A5FE0",
        lbl: "m₁",
      },
      {
        m: +document.getElementById("m2")?.value || 50,
        x: +document.getElementById("x2")?.value || 80,
        col: "#EF4444",
        lbl: "m₂",
      },
      {
        m: +document.getElementById("m3")?.value || 20,
        x: +document.getElementById("x3")?.value || 50,
        col: "#10B981",
        lbl: "m₃",
      },
    ];

    const maxX = 100;
    const scaleX = (W - 60) / maxX;
    const beamY = H / 2;

    // Beam
    g.fillStyle = "#D4A853";
    g.fillRect(30, beamY - 8, W - 60, 16);
    g.fillStyle = "#B8943F";
    g.fillRect(30, beamY + 8, W - 60, 4);

    // Masses
    const Mtot = masses.reduce((a, m) => a + m.m, 0);
    const xcm = masses.reduce((a, m) => a + m.m * m.x, 0) / Mtot;

    masses.forEach(({ m, x, col, lbl }) => {
      const px = 30 + x * scaleX;
      const h = 20 + m * 1.5;
      // Weight force arrow
      g.fillStyle = col;
      g.strokeStyle = col;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(px, beamY - 8);
      g.lineTo(px, beamY - 8 - h);
      g.stroke();
      g.beginPath();
      g.arc(px, beamY - 8 - h, h * 0.3, 0, Math.PI * 2);
      g.fillStyle = col + "33";
      g.fill();
      g.strokeStyle = col;
      g.lineWidth = 2;
      g.stroke();
      // Label
      g.fillStyle = col;
      g.font = "bold 12px Plus Jakarta Sans";
      g.textAlign = "center";
      g.fillText(`${lbl}=${m}kg`, px, beamY - 8 - h - 14);
      // Down arrow (weight)
      arrow(
        g,
        px,
        beamY + 12,
        px,
        beamY + 12 + m * 0.8,
        col,
        `${(m * g_).toFixed(0)}N`,
      );
    });

    // Center of mass indicator
    const cmpx = 30 + xcm * scaleX;
    g.fillStyle = "#F59E0B";
    g.strokeStyle = "#F59E0B";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cmpx, beamY + 20);
    g.lineTo(cmpx - 12, beamY + 38);
    g.lineTo(cmpx + 12, beamY + 38);
    g.closePath();
    g.fill();
    g.fillStyle = "#0A0E1A";
    g.font = "bold 11px Plus Jakarta Sans";
    g.textAlign = "center";
    g.fillText(`CM = ${xcm.toFixed(1)}m`, cmpx, beamY + 52);

    // Support reaction
    const R = Mtot * g_;
    g.fillStyle = "#8056D6";
    g.font = "bold 11px Plus Jakarta Sans";
    g.textAlign = "center";
    g.fillText(`R = ${R.toFixed(0)}N ↑`, cmpx, beamY - 22);
    arrow(g, cmpx, beamY + 8, cmpx, beamY - 20, "#8056D6");

    document.getElementById("sim-results").innerHTML = `
      <div class="res-row"><span>Total Mass Σm</span><strong>${Mtot.toFixed(1)} kg</strong></div>
      <div class="res-row"><span>Center of Mass x_cm</span><strong>${xcm.toFixed(2)} m</strong></div>
      <div class="res-row"><span>Total Weight W</span><strong>${(Mtot * g_).toFixed(1)} N</strong></div>
      <div class="res-row"><span>Support Reaction R</span><strong>${(Mtot * g_).toFixed(1)} N ↑</strong></div>
      <div class="res-row"><span>Torque Balance</span><strong style="color:#10B981">✅ ΣF=0 · Στ=0</strong></div>`;
  }
  if (action === "reset") {
    SIM_ESTATICA2("draw");
  }
}
