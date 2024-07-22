import { useQuery } from "@tanstack/react-query";
import SteamLogsService from "@/services/steam_logs/steam_logs.service";

export const useLogs = () => {
  const {
    data: logsResponse,
    isLoading: isLogsLoading,
    isFetching: isLogsFetching,
    refetch: refetchLogsData,
    error: logsError,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: () => SteamLogsService.getLast(),
  });

  const logs = logsResponse?.data ?? [];

  const {
    data: acceptedLogsResponse,
    isLoading: isAcceptedLogsLoading,
    isFetching: isAcceptedLogsFetching,
    refetch: refetchAcceptedLogs,
    error: acceptedLogsError,
  } = useQuery({
    queryKey: ["acceptedLogs"],
    queryFn: () => SteamLogsService.getLastAccepted(),
  });

  const acceptedLogs = acceptedLogsResponse?.data ?? [];

  const {
    data: totalPriceResponse,
    isLoading: isTotalPriceLoading,
    error: totalPriceError,
  } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: () => SteamLogsService.getTotalPriceOfAcceptedLogs(),
  });

  const totalPrice = totalPriceResponse?.data ?? 0;

  const {
    data: logsLast6MonthsResponse,
    isLoading: isLogsLast6MonthsLoading,
    error: logsLast6MonthsError,
  } = useQuery({
    queryKey: ["logsLast6Months"],
    queryFn: () => SteamLogsService.getLogsLast6Months(),
  });

  const logsLast6Months = logsLast6MonthsResponse?.data ?? [];

  const {
    data: logsLastMonthResponse,
    isLoading: isLogsLastMonthLoading,
    refetch: refetchLogsLastMonth,
    error: logsLastMonthError,
  } = useQuery({
    queryKey: ["logsLastMonth"],
    queryFn: () => SteamLogsService.getLogsLastMonth(),
  });

  const logsLastMonth = logsLastMonthResponse?.data ?? 0;

  return {
    logs,
    isLogsLoading,
    isLogsFetching,
    refetchLogsData,
    acceptedLogs,
    isAcceptedLogsLoading,
    isAcceptedLogsFetching,
    refetchAcceptedLogs,
    totalPrice,
    isTotalPriceLoading,
    logsLast6Months,
    isLogsLast6MonthsLoading,
    logsLast6MonthsError,
    logsLastMonth,
    isLogsLastMonthLoading,
    refetchLogsLastMonth,
    logsLastMonthError,
  };
};
