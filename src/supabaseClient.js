import { createClient } from '@supabase/supabase-js'

// Variables de entorno - asegúrate de tener el archivo .env configurado
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
