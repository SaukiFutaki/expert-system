import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IConstructionAnalysis } from "@/types";
import Link from "next/link";

// Define the new type with the updated columns

export const columns: ColumnDef<IConstructionAnalysis>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tipeRumah",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipe Rumah
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tipeRumah")}</div>
    ),
  },
  {
    accessorKey: "jenisLantai",
    header: "Jenis Lantai",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jenisLantai")}</div>
    ),
  },
  {
    accessorKey: "jenisAtap",
    header: "Jenis Atap",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jenisAtap")}</div>
    ),
  },
  {
    accessorKey: "jenisMaterial",
    header: "Jenis Material",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jenisMaterial")}</div>
    ),
  },
  {
    accessorKey: "promptresult",
    header: "Result",
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("promptresult")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const analysis = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(analysis.id!)}
            >
              Copy Analysis ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/result/${analysis.id}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
