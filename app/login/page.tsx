import { ButtonCozyV2Login } from "@/components/ori/button-cozy";
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClientServer();
  const { data,error } = await supabase.auth.getUser();
  console.log(data);

  if(data.user){
    redirect("/dashboard")
  } 
  return (
    <div className="flex items-center justify-center h-screen ">
      <h1>Pasti kamu kelempar ke halaman login, makanya login blok</h1>
      <ButtonCozyV2Login label="Login" className="py-2.5 px-3.5" />
    </div>
  );
}
