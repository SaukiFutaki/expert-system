import Marquee from "@/components/magicui/maruqee";
import { ButtonCozyV2Login } from "@/components/ori/button-cozy";
import { createClientServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClientServer();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (data.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex items-center justify-center h-screen  ">
      <div className="flex flex-col items-center gap-2">
        {/* <Marquee className="">
          LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
        </Marquee> */}
        <Marquee pauseOnHover className="[--duration:20s]">
          LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
        </Marquee>
        <div className="flex">
          {/* <h1 className="-rotate-90">LOGIN</h1> */}
          <Marquee pauseOnHover className="[--duration:20s] -rotate-90 z-20">
            LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
          </Marquee>
          <ButtonCozyV2Login label="Login" className="py-2.5 px-3.5" />
          <Marquee pauseOnHover className="[--duration:20s] rotate-90 z-20">
            LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
          </Marquee>
          {/* <h1 className="rotate-90">LOGIN</h1> */}
        </div>
        {/* <h1 className="">LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN</h1> */}
        <Marquee className="[--duration:20s]" pauseOnHover reverse>
          LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
        </Marquee>
      </div>
    </div>
  );
}
