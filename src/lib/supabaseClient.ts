
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://douhbaztorwgzojwmtmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdWhiYXp0b3J3Z3pvandtdG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjA5NDQsImV4cCI6MjA2NDUzNjk0NH0.tlas9ReicwE_tdYMtlJmzb0Iw6mB-MKYt-C2oKBNufg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
