import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SVGProps } from "react";
import { useLogs } from "@/hooks/useLogs";
import { useAuthData } from "@/hooks/useAuthData";
import { Loader } from "../ui/loader/Loader";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

function CreditCardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function DashboardMainStats() {
  const {
    logs,
    isLogsLoading,
    isLogsFetching,
    refetchLogsData,
    acceptedLogs,
    isAcceptedLogsLoading,
    totalPrice,
    isTotalPriceLoading,
    logsLastMonth,
    isLogsLastMonthLoading,
    refetchLogsLastMonth
  } = useLogs();

  const {
    uniqueSteamIdsCount,
    isUniqueSteamIdsLoading,
    isUniqueSteamIdsFetching,
    refetchUniqueSteamIds,
  } = useAuthData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <Heading title="Статистика" />
        <Button variant="outline" onClick={() => {
          refetchLogsData();
          refetchUniqueSteamIds();
          refetchLogsLastMonth();
        }}>
          {isLogsFetching || isUniqueSteamIdsFetching || isAcceptedLogsLoading ? <Loader size="sm" /> : "Обновить"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Общая сумма принятых депозитов</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isTotalPriceLoading ? (
              <Loader />
            ) : (
              <div className="text-2xl font-bold">${totalPrice}</div>
            )}
          </CardContent>
        </Card>
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Уникальных пользователей</CardTitle>
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isUniqueSteamIdsLoading ? (
              <Loader />
            ) : (
              <div className="text-2xl font-bold">{uniqueSteamIdsCount}</div>
            )}
          </CardContent>
        </Card>
        <Card className="text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Сумма принятых логов в этом месяце</CardTitle>
            <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLogsLastMonthLoading ? (
              <Loader />
            ) : (
              <div className="text-2xl font-bold">${logsLastMonth}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
