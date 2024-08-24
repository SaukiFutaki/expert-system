"use client";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import { redirect, usePathname } from "next/navigation";
import React from "react";

interface Props {
  label?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function ButtonCozy({
  label,
  className,
  type,
  disabled,
  children,
}: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${className} px-6 py-2 font-medium   w-fit transition-all shadow-[3px_3px_0px_black] dark:shadow-white hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`}
    >
      {label}
      {children}
    </button>
  );
}

export function ButtonCozyV2Login({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  // const user = useUser((state) => state.user);
  // const setUser = useUser((state) => state.setUser);
  const pathname = usePathname();
  const supabase = createClient();
  const handleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathname,
      },
    });
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      redirect("/dashboard");
    }
  };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   setUser(undefined);
  // }
  return (
    <div className="group relative h-fit w-fit">
      <button
        onClick={handleLogin}
        className={`relative cursor-pointer overflow-hidden font-medium  text-sm  bg-indigo-600 text-white z-10 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:-translate-x-0 group-active:-translate-y-0 ${className}`}
      >
        {label}
      </button>
      <div className="absolute inset-0 z-0 translate-x-0.5 translate-y-0.5 dark:bg-white bg-neutral-950"></div>
    </div>
  );
}
