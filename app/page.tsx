import { createClientServer } from "@/lib/supabase/server";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ace/text-generate-effect";
import { BackgroundBeamsWithCollision } from "@/components/ace/background-beams-with-collision";
import InfoMark from "@/components/info-mark";

const words = `Sistem pakar sipil `;

export default async function Home() {
  // const supabase = await createClientServer();
  // const { data } = await supabase.auth.getSession();
  // console.log(data);

  return (
    <div>
      <BackgroundBeamsWithCollision className="h-screen">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          <TextGenerateEffect
            duration={2}
            words={words}
            className={`bg-clip-text text-5xl text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4`}
          /> 
        </h2>
      </BackgroundBeamsWithCollision>
      </div>
  );
}
