// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rikwapvxiijauhynhyhe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpa3dhcHZ4aWlqYXVoeW5oeWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTQ1NjAsImV4cCI6MjA1OTM3MDU2MH0.U3IPt75HYFc_ZYeKO6CBnBn3ijdudFiKhAr-04sFb2w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);