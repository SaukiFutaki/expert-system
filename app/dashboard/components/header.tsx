"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import ShimmerButton from "@/components/magicui/button-shimmer";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";


export default function Header() {
  const user = useUser((state) => state.user);
  const router = useRouter();

  // console.log(user?.identities?.[0]?.last_sign_in_at);
  // console.log(user?.identities?.[0]?.created_at);

  const setUser = useUser((state) => state.setUser);
  const supabase = createClient();

  //   const supabase = await createClientServer();
  //   const { data,error } = await supabase.auth.getUser();

  //   console.log(data);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
    router.refresh();
  };

  const formatterTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-60">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            alt=""
            src={user?.user_metadata.avatar_url}
            className="rounded-full ring-2 ring-green-500"
          />
          <div className="flex flex-col">
            <h1 className="text-xl text-white">{user?.user_metadata.full_name}</h1>
            <h1 className="text-xs underline text-slate-400">
              created at :
              {formatterTime(user?.identities?.[0]?.created_at || "")}
            </h1>
          </div>
        </div>
        <ShimmerButtonLogOut onClick={handleLogout} />
      </div>
    </div>
  );
}

function ShimmerButtonLogOut({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full  px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        Logout
      </span>
    </button>
  );
}
