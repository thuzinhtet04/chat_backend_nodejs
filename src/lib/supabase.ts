import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL!;
const supabaseKey = process.env!.SUPABASE_SECRET_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
export const bucketName = process.env.BUCKET_NAME!;
export default supabase;
