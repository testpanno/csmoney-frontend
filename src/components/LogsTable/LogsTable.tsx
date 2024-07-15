import SteamLogsService from "@/services/steam_logs/steam_logs.service";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader } from "../ui/loader/Loader";
import { ISteamLog } from "@/services/steam_logs/steam_logs.types";
import { Button } from "@/components/ui/button";
import { Heading } from "../ui/heading";

export default function AuthTable() {
  const {
    data: steamLogResponse,
    isLoading: isSteamLogLoading,
    isFetching: isSteamLogFetching,
    refetch: refetchSteamLogData,
  } = useQuery({
    queryKey: ["get last logs"],
    queryFn: () => SteamLogsService.getLast(),
  });

  const steamAuthData: ISteamLog[] = steamLogResponse?.data ?? [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
      <Heading title="Логи"></Heading>
        <Button variant="outline" onClick={() => refetchSteamLogData()}>
          {isSteamLogFetching ? <Loader size="sm" /> : "Обновить Логи"}
        </Button>
      </div>
      {isSteamLogLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <DataTable columns={columns} data={steamAuthData} />
      )}
    </div>
  );
}