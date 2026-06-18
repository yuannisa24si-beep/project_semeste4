import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://syhdacylakrloujsqdhz.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5aGRhY3lsYWtybG91anNxZGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjM5MjksImV4cCI6MjA5NjkzOTkyOX0.SQX4Ji0anXF_eo3OSiDhJxxN6pjaj6XAdtPAySiblVY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
