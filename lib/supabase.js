// ==============================================
// SUPABASE DATABASE CONNECTION
// ==============================================
// This file creates a reusable Supabase client that we can use throughout the app
// to query the database

import { createClient } from '@supabase/supabase-js';

// ==============================================
// GET CREDENTIALS FROM ENVIRONMENT VARIABLES
// ==============================================
// These are stored in .env.local file (never commit to Git!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ==============================================
// VALIDATE CREDENTIALS EXIST
// ==============================================
// If credentials are missing, throw an error immediately
// This prevents hard-to-debug issues later
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials! Please check your .env.local file.\n' +
    'Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// ==============================================
// CREATE SUPABASE CLIENT
// ==============================================
// This creates a single instance of the Supabase client
// We export it so other files can import and use it
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable automatic session management
    // We're handling auth with JWT cookies manually
    persistSession: false,
    autoRefreshToken: false,
  },
});

// ==============================================
// USAGE EXAMPLE:
// ==============================================
// In other files, you can use this like:
//
// import { supabase } from '@/lib/supabase';
//
// const { data, error } = await supabase
//   .from('users')
//   .select('*')
//   .eq('email', 'admin@school.com')
//   .single();
// ==============================================
