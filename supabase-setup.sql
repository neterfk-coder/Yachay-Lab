-- ================================================================
-- YACHAY LAB — Script de configuración de Supabase
-- Ejecuta esto en el SQL Editor de tu proyecto en supabase.com
-- ================================================================

-- Tabla principal de progreso del estudiante
CREATE TABLE IF NOT EXISTS progreso (
  user_id    uuid        PRIMARY KEY
             REFERENCES auth.users(id) ON DELETE CASCADE,
  datos      jsonb       NOT NULL DEFAULT '{}'::jsonb,
  actualizado timestamptz DEFAULT now()
);

-- Activar Row Level Security (RLS) para que cada usuario
-- solo pueda leer y escribir SUS propios datos.
ALTER TABLE progreso ENABLE ROW LEVEL SECURITY;

-- Política: leer propio registro
CREATE POLICY "leer propio" ON progreso
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: insertar propio registro
CREATE POLICY "insertar propio" ON progreso
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: actualizar propio registro
CREATE POLICY "actualizar propio" ON progreso
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ================================================================
-- NOTAS PARA EL EQUIPO
-- ================================================================
-- 1. Ve a tu proyecto en https://supabase.com
-- 2. SQL Editor → pega este script → Run
-- 3. Copia tu Project URL y anon key desde
--    Settings → API → Project API keys
-- 4. Pégalas en el objeto CONFIG_SUPABASE de app.js:
--
--    const CONFIG_SUPABASE = {
--      url:     'https://TU_ID.supabase.co',
--      anonKey: 'eyJ...'
--    };
--
-- 5. En Authentication → Email (Settings), puedes desactivar
--    "Confirm email" para que la demo funcione sin confirmar.
-- ================================================================