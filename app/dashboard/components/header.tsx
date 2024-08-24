"use client";
import { useUser } from "@/lib/store/user";
import React from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Header() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const supabase = createClient();
  console.log(user);

  //   const supabase = await createClientServer();
  //   const { data,error } = await supabase.auth.getUser();

  //   console.log(data);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
  };

  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Welcome to the dashboard, {user?.user_metadata.full_name}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <Image
        src={user?.user_metadata.avatar_url}
        width={200}
        height={200}
        alt=""
      />
    </div>
  );
}
