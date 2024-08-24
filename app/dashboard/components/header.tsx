"use client";
import { useUser } from "@/lib/store/user";
import React from "react";
import Image from "next/image";


export default function Header() {
  const user = useUser((state) => state.user);
  console.log(user);
 
  return (
    <div>
      <h1>Welcome to the dashboard, {user?.user_metadata.full_name}!</h1>
      <Image
        src={user?.user_metadata.avatar_url}
        width={200}
        height={200}
        alt=""
      />
    </div>
  );
}
