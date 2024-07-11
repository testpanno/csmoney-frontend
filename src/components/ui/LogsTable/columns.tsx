"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ISteamLog } from "@/types"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface ISkinItem {
    appid: number;
    contextid: string;
    assetid: string;
    classid: string;
    instanceid: string;
    amount: string;
    market_hash_name: string;
}

interface ISkinData {
    items_from_them: ISkinItem[];
    items_from_me: ISkinItem[];
}

export const columns: ColumnDef<ISteamLog>[] = [
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
    accessorKey: 'offer_id',
    header: 'Offer ID',
  },
  {
    accessorKey: 'skins',
    header: 'Скины',
    cell: ({ row }) => {
      const skins: ISkinData = row.getValue('skins');
      let marketHashNames: string[] = [];
        
      try {
        const skinsData: ISkinData = skins;
        if (skinsData.items_from_them) {
          marketHashNames = skinsData.items_from_them.map(item => item.market_hash_name);
        }
      } catch (error) {
        console.error('Error parsing skins data:', error);
      }
  
      return (
        <Popover>
          <PopoverTrigger className="rounded bg-white text-black px-3 py-1">
            Список
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <ScrollArea className="h-[200px] rounded-md p-1">
              {marketHashNames.length > 0 ? (
                <ul>
                  {marketHashNames.map((name, index) => (
                    <li key={index} className="text-xs">{name}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs">No skins available</span>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: 'domain_id',
    header: 'Сумма',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
  },
  {
    accessorKey: 'target_steam_id',
    header: 'SteamID Мамонта',
  },
  {
    accessorKey: 'bot_steam_id',
    header: 'SteamID Бота',
  },
  {
    accessorKey: 'hold',
    header: 'Холд',
    cell: ({ row }) => {
      const holdValue: string = row.getValue("hold");
      return holdValue ? new Date(holdValue).toLocaleDateString() : ''; // Check if holdValue is not null
    },
  },
];
