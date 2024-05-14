import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://ysddwwgsydksjhlzhsuy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZGR3d2dzeWRrc2pobHpoc3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3MDIzMzcsImV4cCI6MjAzMTI3ODMzN30.BS5lAuR93aF1bYEaJT4oTKa0482rWcrK4cgw-Po2cak"
    // process.env.SUPABASE_URL,
    // process.env.SUPABASE_KEY

);

//TODO: Use .env file.
//Backend has url/key in process.env but frontend does not.