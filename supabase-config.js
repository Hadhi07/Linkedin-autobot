import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://ipcezwlmkvvmydhqcbbk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwY2V6d2xta3Z2bXlkaHFjYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzODQyMzgsImV4cCI6MjA4OTk2MDIzOH0.qSG12Yt33PYkOrfPlOqtY5arhHFFiTXtZYeJeq59y1w'
export const supabase = createClient(supabaseUrl, supabaseKey)
