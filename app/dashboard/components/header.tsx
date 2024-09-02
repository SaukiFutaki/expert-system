"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import ShimmerButton from "@/components/magicui/button-shimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Header() {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const supabase = createClient();

  //   const supabase = await createClientServer();
  //   const { data,error } = await supabase.auth.getUser();

  //   console.log(data);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-60">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.user_metadata.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{user?.user_metadata.full_name}</h1>
        </div>
        <ShimmerButtonLogOut onClick={handleLogout} />
      </div>
    </div>
  );
}

function ShimmerButtonLogOut({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full  px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        Logout
      </span>
    </button>
  );
}
