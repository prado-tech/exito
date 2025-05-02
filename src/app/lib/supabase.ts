// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ykknbbyefgltqnlkfqsb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra25iYnllZmdsdHFubGtmcXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMjIxNjIsImV4cCI6MjA2MTY5ODE2Mn0.x4anLheMwHfadi_FTSKUgG1eb7o85-8fpCZm9qbQgHc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = supabase;  // Exportando db
export const auth = supabase.auth;  // Exportando auth
