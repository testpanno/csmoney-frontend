
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CartesianGrid, XAxis, Bar, BarChart} from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function DashboardOverview() {
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-4 lg:p-8 bg-background text-foreground">
      <div className="grid gap-4">
        <Card className="bg-card p-6">
          <CardHeader>
            <CardTitle>Статистика по логам за полгода</CardTitle>
          </CardHeader>
          <CardContent>
            <BarchartChart className="aspect-[16/9]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Последние принятые логи</h3>
            <p className="text-muted-foreground">ммм смак...</p>
          </div>
          <Button variant="outline">
            Обновить
          </Button>
        </div>
        <Card className="bg-card p-6 text-card-foreground">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Мамонт</TableHead>
                <TableHead>Скины</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="text-sm text-muted-foreground">liam@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>liam@example.com</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="text-sm text-muted-foreground">olivia@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>olivia@example.com</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">Noah Williams</div>
                      <div className="text-sm text-muted-foreground">noah@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>noah@example.com</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">Emma Brown</div>
                      <div className="text-sm text-muted-foreground">emma@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>emma@example.com</TableCell>
                <TableCell className="text-right">$450.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

function BarchartChart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Сумма принятых логов",
            color: "#fff",
          },
        }}
        className="min-h-[200px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
