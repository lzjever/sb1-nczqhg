import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zccfmcpaixvtkainlhlw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjY2ZtY3BhaXh2dGthaW5saGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MzIxMzcsImV4cCI6MjA0MzIwODEzN30.sAc_O1uNt-Si8SQ2bdb8mo1sDP7F_5aK-BhPCtxIhKQ'

export const supabase = createClient(supabaseUrl, supabaseKey)