"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDomainResponse } from "@/services/domain/domain.types";
import { useDomainMutations } from "@/hooks/useDomainMutations";
import { Loader } from "@/components/ui/loader/Loader";
import { DomainCreateForm } from "./DomainCreateForm";

export const columns: ColumnDef<IDomainResponse>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "domain_name",
    header: "Название",
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const { deleteDomain, isDeletePending } = useDomainMutations();

      const handleDelete = () => {
        const domainId = row.original.id;
        deleteDomain(domainId);
      };

      return (
        <div className="flex space-x-2">
          <DomainCreateForm domain={row.original} />
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeletePending}
          >
            {isDeletePending ? <Loader size="sm" /> : "Удалить"}
          </Button>
        </div>
      );
    },
  },
];
