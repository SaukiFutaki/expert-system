import ButtonCozy from "@/components/ori/button-cozy";
import { createClientServer } from "@/lib/supabase/server";
import Header from "./components/header";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function Page() {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getSession();
  console.log(data);
  if (!data) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <Header />
      <div className="mt-8 space-x-4">
        <Link href={"/dashboard/create"}>
          <ButtonCozy className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Buat
          </ButtonCozy>
        </Link>
        <Link href={"/dashboard/history"}>
          <ButtonCozy className="px-4 p y-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            History
          </ButtonCozy>
        </Link>
      </div>
    </div>
  );
}
