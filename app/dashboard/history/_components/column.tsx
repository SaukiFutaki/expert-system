"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type History = {
    id: string;
    land_area: number;
    house_type: string;
    price_range_min: number;
    price_range_max: number;
    created_at: string;
  }

export const columns: ColumnDef<History>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Land Area",
        accessorKey: "land_area",
    },
    {
        header: "House Type",
        accessorKey: "house_type",
    },
    {
        header: "Price Range Min",
        accessorKey: "price_range_min",
    },
    {
        header: "Price Range Max",
        accessorKey: "price_range_max",
    },
    {
        header: "Created At",
        accessorKey: "created_at",
    },
]
