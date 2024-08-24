import { createClient } from "@/lib/supabase/client";
import React from "react";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data);
  return <div>Page</div>;
}
