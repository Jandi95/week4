import { createClient } from '@supabase/supabase-js'
import type { Database, Tables } from './database.types'

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env
const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
)

export default supabase

type Profile = Tables<'profiles'>
export type SupaProfile = {
  id: string
} & Partial<Omit<Profile, 'id'>>
