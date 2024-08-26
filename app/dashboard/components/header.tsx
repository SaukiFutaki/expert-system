"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";

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
      <div className="flex items-center justify-between gap-4">
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button onClick={handleLogout}>Logout</Button>
        <h1>{user?.user_metadata.full_name}</h1>
      
      </div>
    </div>
  );
}
