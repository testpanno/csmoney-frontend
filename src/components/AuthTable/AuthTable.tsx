import SteamAuthService from "@/services/steam_auth/steam_auth.service";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader } from "../ui/loader/Loader";
import { ISteamAuth } from "@/services/steam_auth/steam_auth.types";
import { Button } from "@/components/ui/button";
import { Heading } from "../ui/heading";

export default function AuthTable() {
  const {
    data: steamAuthResponse,
    isLoading: isSteamAuthLoading,
    isFetching: isSteamAuthFetching,
    refetch: refetchSteamAuthData,
  } = useQuery({
    queryKey: ["get last 100 auth"],
    queryFn: () => SteamAuthService.getLast100(),
  });

  const steamAuthData: ISteamAuth[] = steamAuthResponse?.data ?? [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <Heading title="Авторизации"></Heading>
        <Button variant="outline" onClick={() => refetchSteamAuthData()}>
          {isSteamAuthFetching ? <Loader size="sm" /> : "Обновить авторизации"}
        </Button>
      </div>
      {isSteamAuthLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <DataTable columns={columns} data={steamAuthData} />
      )}
    </div>
  );
}
