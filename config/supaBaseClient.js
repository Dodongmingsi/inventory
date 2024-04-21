import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.Vue_Supabase_Url
const supabaseKey = process.env.Vue_anon_key
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase