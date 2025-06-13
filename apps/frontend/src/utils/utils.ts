import { createClient } from "@/utils/supabase/server";

export const getToken = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  return token;
};
