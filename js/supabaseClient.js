import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const SUPABASE_URL = "https://vjyrwkzpyrpfrqnseiga.supabase.co";
export const SUPABASE_ANON_KEY =
  "sb_publishable_oZRSXwynSZDmZRrhBmC-eQ_AajpU_Np";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
