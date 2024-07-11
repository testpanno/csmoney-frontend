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
    cell: ({ row }) => {
      const createdAt: string = row.getValue("created_at");
      if (!createdAt) return '';
  
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      // @ts-ignore
      return new Date(createdAt).toLocaleString('ru-RU', options);
    },
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
