import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { CartesianGrid, XAxis, Bar, BarChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";

import { Loader } from "../ui/loader/Loader";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import { useLogs } from "@/hooks/useLogs";

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

export default function DashboardOverview() {
  const {
    logsLast6Months,
    isLogsLast6MonthsLoading,
    acceptedLogs,
    isAcceptedLogsLoading,
    isAcceptedLogsFetching,
    refetchAcceptedLogs,
  } = useLogs();

  return (
    <div className="container">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 bg-background text-foreground">
        <div className="grid gap-4">
          <Card className="bg-card p-6">
            <CardHeader>
              <CardTitle>Статистика по логам за полгода</CardTitle>
            </CardHeader>
            <CardContent>
              {isLogsLast6MonthsLoading ? (
                <Loader />
              ) : (
                <BarchartChart data={logsLast6Months} />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Последние принятые логи</h3>
                </div>
                <Button variant="outline" onClick={() => refetchAcceptedLogs()}>
                  {isAcceptedLogsFetching ? <Loader size="sm" /> : "Обновить"}
                </Button>
              </div>
            </CardHeader>
            <div className="p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Мамонт</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Скины</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isAcceptedLogsLoading ? (
                    <Loader />
                  ) : (
                    acceptedLogs.map((item) => {
                      const uniqueKey = item.id;

                      // @ts-ignore
                      const skins: ISkinData = item.skins;
                      let marketHashNames: string[] = [];

                      try {
                        const skinsData: ISkinData = skins;
                        if (skinsData.items_from_them) {
                          marketHashNames = skinsData.items_from_them.map(
                            (item) => item.market_hash_name
                          );
                        }
                      } catch (error) {
                        console.error("Error parsing skins data:", error);
                      }

                      return (
                        <TableRow key={uniqueKey}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">
                                  {item.target_steam_id}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  BOT: {item.bot_steam_id}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="success">accepted</Badge>
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger className="rounded bg-white text-black px-3 py-1">
                                Список
                              </PopoverTrigger>
                              <PopoverContent className="p-1">
                                <ScrollArea className="h-[200px] rounded-md p-1">
                                  {marketHashNames.length > 0 ? (
                                    <ul>
                                      {marketHashNames.map((name, index) => (
                                        <li key={index} className="text-xs">
                                          {name}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span className="text-xs">
                                      No skins available
                                    </span>
                                  )}
                                </ScrollArea>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.total_price}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BarchartChart({
  data,
}: {
  data: { month: string; total_price: number }[];
}) {
  return (
    <div>
      <ChartContainer
        config={{
          desktop: {
            label: "Сумма принятых логов $",
            color: "#fff",
          },
        }}
        className="min-h-[200px]"
      >
        <BarChart
          accessibilityLayer
          data={data.map((item) => ({
            month: item.month,
            desktop: item.total_price,
          }))}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 7)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
