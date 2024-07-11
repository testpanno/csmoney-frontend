import BotService from "@/services/bot/bot.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader/Loader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IBotResponse } from "@/services/bot/bot.types";
import { useBotMutations } from '@/hooks/useBotMutations';

export default function BotManager() {
  const {
    data: bots,
    isLoading: isBotsLoading,
    isFetching: isBotsFetching,
    error: botsError,
    refetch: refetchBotsData,
  } = useQuery({
    queryKey: ["get all bots"],
    queryFn: () => BotService.getAll(),
  });

  const {createBot, isCreatePending} = useBotMutations()

  if (botsError) return <div>Error: {botsError.message}</div>;

  const BotData: IBotResponse[] = bots?.data ?? [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={() => refetchBotsData()}>
          {isBotsFetching ? <Loader size="sm" /> : "Обновить Ботов"}
        </Button>
      </div>
      {isBotsLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <DataTable columns={columns} data={BotData} />
      )}
    </div>
  );
} 
