
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://dlxqvmmzeumuddvcyjob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseHF2bW16ZXVtdWRkdmN5am9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTc5MjgsImV4cCI6MjA1Njg5MzkyOH0.u08nAKqBcLnGQzHq7GSidV8GrnAxlwIljjb9h1O333I';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
