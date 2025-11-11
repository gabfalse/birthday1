import { createClient } from "@supabase/supabase-js";

// Ambil URL dan Key dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Buat koneksi Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
