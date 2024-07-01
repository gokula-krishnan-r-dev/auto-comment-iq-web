"use client";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "@/lib/axios";
import { BarChart, Card } from "@tremor/react";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

function valueFormatter(number: number) {
  let formattedValue = "";

  // Convert the number to millions, billions, or trillions and format accordingly
  if (number >= 1000000000) {
    formattedValue = (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000) {
    formattedValue = (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    formattedValue = (number / 1000).toFixed(1) + "K";
  } else {
    formattedValue = number?.toString(); // No formatting needed for numbers less than 1000
  }

  return formattedValue;
}

const fetchCompetitorsData = async (channelIds: string[]) => {
  try {
    const response: any = await axios.post("/youtube-analytics/competitors", {
      ids: channelIds,
    });

    return response.data; // Return response.data directly, as axios already handles parsing JSON
  } catch (error: any) {
    console.error("Error fetching competitors data:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const fetchChannelIds = async (userId: string) => {
  try {
    const response: any = await axios.get(`/competitor/find/${userId}`);

    return response.data?.competitors; // Return response.data directly, as axios already handles parsing JSON
  } catch (error: any) {
    console.error("Error fetching channel ids:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

export default function CompetitorChart({ chnnaleIds, tab }: any) {
  const channelIds = chnnaleIds?.map((id: any) => id.channelId);
  const [compare, setCompare] = useState<number>(3);
  const {
    data: competitorsData,
    isLoading,
    isError,
    refetch,
  } = useQuery("competitors", () => fetchCompetitorsData(channelIds));

  useEffect(() => {
    // Trigger a manual refetch when chnnaleIds change
    refetch();
  }, [chnnaleIds, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const filteredData = competitorsData;

  const colors = filteredData?.map((dataPoint: any, index: any) => {
    // Check if it's the first element and its subscribers count exists
    if (index === 0 && dataPoint?.counts[0]?.subscribers) {
      return "blue"; // Set color to blue for the first element with subscribers count
    } else {
      return "red"; // Set color to red for all other elements
    }
  });
  const categories = [
    `counts[${tab}].${
      tab === 0
        ? "subscribers"
        : tab === 3
        ? "views"
        : tab === 1
        ? "goal"
        : tab === 5
        ? "videos"
        : "subscribers"
    }`,
  ];
  return (
    <div>
      <Card className="sm:mx-auto !rounded-3xl sm:max-w-6xl">
        <div className="">
          <div className="">
            <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Compare your competitors
            </h3>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              compare your competitors and see how you are performing
            </p>
          </div>
        </div>

        <BarChart
          onMouseLeave={() => toast.dismiss()}
          about="Sales overview"
          onClick={() =>
            toast.success(
              `your subscribers: ${valueFormatter(
                filteredData[0]?.counts[0]?.subscribers
              )}`
            )
          }
          animationDuration={1000}
          data={filteredData}
          index="value"
          categories={categories}
          colors={colors}
          valueFormatter={valueFormatter}
          yAxisWidth={68}
          spellCheck={true}
          showTooltip={true}
          showAnimation={true}
          customTooltip={(data: any) => {
            if (!data || !data.payload || data.payload.length === 0) {
              return null;
            }

            const tooltipData = data.payload[0];

            return (
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <div className="">
                  <img
                    className="rounded-full border-2"
                    alt="logo"
                    src={tooltipData.payload.user[1].count}
                    width={45}
                    height={45}
                  />
                  <div className="">
                    <p className="text-sm font-semibold">
                      {tooltipData.payload.user[0].count}
                    </p>
                  </div>
                </div>
                <p className="text-tremor-content dark:text-dark-tremor-content">
                  {categories?.[0].split(".")[1]} :{" "}
                  <span className="font-semibold text-black">
                    {valueFormatter(tooltipData.value)}{" "}
                  </span>
                </p>
              </div>
            );
          }}
          showXAxis={false}
          className="mt-6 hidden max-h-96 sm:block"
        />
      </Card>
    </div>
  );
}
