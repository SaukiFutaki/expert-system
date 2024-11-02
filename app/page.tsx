import { BackgroundBeamsWithCollision } from "@/components/ace/background-beams-with-collision";
import { TextGenerateEffect } from "@/components/ace/text-generate-effect";
import ButtonGenerateHome from "@/components/Button-generate-home";
import { Button } from "@/components/ui/button";
import { HALOTEST } from "@/lib/openai/openai";
import { BackgroundLines } from "@/components/ace/background-lines";

const words = `Sistem pakar sipil `;

export default async function Home() {
  // const supabase = await createClientServer();
  // const { data } = await supabase.auth.getSession();
  // console.log(data);
  // const history = await getHistoryUser();
  // console.log(history);

  return (
    <div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Sistem Pakar <br/>Sipil.
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Dapatkan berbagai nasihat terbaik dari para ahli, mulai dari ahli
          teknik sipil, konsultan konstruksi, hingga pakar perencanaan bangunan,
          secara gratis.
        </p>
      </BackgroundLines>
    </div>
  );
}

{
  /* <BackgroundBeamsWithCollision className="h-screen">
<div className="flex items-center justify-center flex-col">
  <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
    <TextGenerateEffect
      duration={2}
      words={words}
      className={`bg-clip-text text-5xl text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4`}
    />
  </h2>
  <ButtonGenerateHome />
</div>
</BackgroundBeamsWithCollision> */
}
