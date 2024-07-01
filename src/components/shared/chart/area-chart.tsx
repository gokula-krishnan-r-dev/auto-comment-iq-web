import { AreaChart, Card, List } from "@tremor/react";

export const valueFormatter = (number: any) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function AreaChartView({
  chart,
  totalValue,
  percentageChange,
  hero,
  categories,
}: any) {
  return (
    <>
      <Card className="!rounded-3xl px-0 pr-8 sm:max-w-full">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{hero}</h2>
            {/* <div className="">{hero === "Views" && <AddVideo />}</div> */}
          </div>
          <div className="flex items-center py-4">
            <div className="border rounded-2xl bg-gray-100/50 px-4 py-3">
              <p className="text-xs font-medium">Total {hero}</p>
              <div className="flex items-center gap-1">
                <p className="text-3xl font-semibold">
                  {valueFormatter(totalValue)}
                </p>

                <div
                  className={`px-2 py-1 font-semibold rounded-full border ${
                    percentageChange === 1
                      ? "text-green-500 border-green-300 bg-green-300"
                      : "text-red-500 border-red-300 bg-red-200/60"
                  }`}
                >
                  {percentageChange?.toFixed(2)} %
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h2>
              So for this year, you are gaining persenteage per month on average
            </h2>
          </div>
        </div>
        {totalValue === 0 ? (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-lg font-semibold">No data available</p>
          </div>
        ) : (
          <AreaChart
            data={chart}
            index="date"
            categories={categories}
            colors={["blue", "violet"]}
            valueFormatter={valueFormatter}
            showLegend={false}
            showYAxis={true}
            showXAxis={true}
            showGradient={true}
            startEndOnly={false}
            className="h-[400px]"
          />
        )}
      </Card>
    </>
  );
}
