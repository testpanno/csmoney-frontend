import { useQuery } from "@tanstack/react-query";
import SteamAuthService from "@/services/steam_auth/steam_auth.service";

export const useAuthData = () => {
  const {
    data: steamAuthResponse,
    isLoading: isSteamAuthLoading,
    isFetching: isSteamAuthFetching,
    refetch: refetchSteamAuthData,
  } = useQuery({
    queryKey: ["get last 100 auth"],
    queryFn: () => SteamAuthService.getLast100(),
  });

  const {
    data: uniqueSteamIdsResponse,
    isLoading: isUniqueSteamIdsLoading,
    isFetching: isUniqueSteamIdsFetching,
    refetch: refetchUniqueSteamIds,
  } = useQuery({
    queryKey: ["get unique steam ids count"],
    queryFn: () => SteamAuthService.getUniqueSteamIdsCount(),
  });

  const authData = steamAuthResponse?.data ?? [];
  const uniqueSteamIdsCount = uniqueSteamIdsResponse?.data ?? 0;

  return {
    authData,
    isSteamAuthLoading,
    isSteamAuthFetching,
    refetchSteamAuthData,
    uniqueSteamIdsCount,
    isUniqueSteamIdsLoading,
    isUniqueSteamIdsFetching,
    refetchUniqueSteamIds,
  };
};
