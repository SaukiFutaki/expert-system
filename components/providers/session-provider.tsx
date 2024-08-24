"use client";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect } from "react";

export default function SessionProvider() {
    const setUser = useUser((state) => state.setUser);
  const supabase = createClient();

  const readSession =async() => {
    const { data } = await supabase.auth.getSession();
    setUser(data?.session?.user);   
  };

  useEffect(() => {
    readSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return <div></div>;
}
