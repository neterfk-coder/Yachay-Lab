/* ═══════════════════════════════════════════════════════════════
   YACHAY LAB — SUPABASE CLIENT
   Conexión central a Supabase para toda la app.
   Importado como módulo global antes que cualquier otro script.
═══════════════════════════════════════════════════════════════ */

const SUPA_URL = "https://fxecqcgunxcjwoqrcpkl.supabase.co";
const SUPA_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZWNxY2d1bnhjandvcXJjcGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTU3MzMsImV4cCI6MjA5Njk5MTczM30.G6ek3-Gd9jegf6XGJpQVfZMakHHV82gru6QCxHR3i0s";

/* ── Cargar SDK de Supabase desde CDN ── */
const _supaScript = document.createElement("script");
_supaScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
_supaScript.onload = () => {
  window._supa = supabase.createClient(SUPA_URL, SUPA_KEY);
  console.log("✅ Supabase connected");
  // Disparar evento para que otros módulos sepan que está listo
  document.dispatchEvent(new Event("supabase:ready"));
};
document.head.appendChild(_supaScript);

/* ── Helper global ── */
function db() {
  return window._supa;
}
