"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBotMutations } from '@/hooks/useBotMutations';
import { IBotResponse } from "@/services/bot/bot.types"
import { Loader } from "../loader/Loader";
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<IBotResponse>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => row.original.id.slice(0, 20) + "..."
  },
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'port',
    header: 'Порт',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'exited' ? 'destructive' : 'success'}>
        {row.original.status}
      </Badge>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: ({ row }) => {
      const { stopBot, isStopPending, restartBot, isRestartPending, deleteBot, isDeletePending } = useBotMutations();

      const handleStop = () => {
        stopBot({ container_id: row.original.id });
      };

      const handleRestart = () => {
        restartBot({ container_id: row.original.id });
      };

      const handleDelete = () => {
        deleteBot({ container_id: row.original.id });
      };

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleStop} disabled={isStopPending}>
            {isStopPending ? <Loader size="sm"/> : 'Остановить'}
          </Button>
          <Button size="sm" onClick={handleRestart} disabled={isRestartPending}>
            {isRestartPending ? <Loader size="sm"/> : 'Перезапустить'}
          </Button>
          <Button size="sm" variant="destructive" onClick={handleDelete} disabled={isDeletePending}>
            {isDeletePending ? <Loader size="sm"/> : 'Удалить'}
          </Button>
        </div>
      );
    },
  },
];
