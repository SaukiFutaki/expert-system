import ButtonCozy from "@/components/ori/button-cozy";
import { createClientServer } from "@/lib/supabase/server";
import Header from "./components/header";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTableDemo } from "./components/datatable/data-table";
import { getDataConstruction } from "@/lib/action";


export default async function Page() {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getSession();
  const d = await getDataConstruction();
  


  if (!data) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <Header />
      <div className="mt-8 space-x-4">
        {d ? <DataTableDemo data={d} /> : <p>No data available</p>}
      </div>
    </div>
  );
}
