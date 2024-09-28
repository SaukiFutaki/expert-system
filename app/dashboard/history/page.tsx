import { getHistoryUser } from "@/lib/action";
import React from "react";
import TableDataHistory, { columns } from "./_components/table-history";
import { DataTable } from "./_components/data-table";

export default async function Page() {
  const history = await getHistoryUser();
  return <div>
     {history && <DataTable columns={columns} data={history} />}
  </div>;
}
