import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
"https://smauuurtvfvxuxumbicr.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtYXV1dXJ0dmZ2eHV4dW1iaWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzQ5NTEsImV4cCI6MjA2MzkxMDk1MX0.a-CfgbVD5L3SGEZwSRGSU4AHBLmpzzEe9UJJYAZLwJE",
{
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
