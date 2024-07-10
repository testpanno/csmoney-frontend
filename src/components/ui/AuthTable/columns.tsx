"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ISteamAuth } from "@/types"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<ISteamAuth>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'user_ip',
    header: 'IP',
  },
  {
    accessorKey: 'created_at',
    header: 'Дата',
    cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString(),
  },
  {
    accessorKey: 'steam_id',
    header: 'Steam ID',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'domain_id',
    header: 'Domain ID',
  },
];
