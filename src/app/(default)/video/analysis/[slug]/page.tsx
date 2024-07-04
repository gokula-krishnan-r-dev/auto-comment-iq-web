"use client";
import React, { useEffect, useState } from "react";
import Viewchart from "@/components/shared/Dashboard/Viewchart";
import { useQuery } from "react-query";
import { useAuth } from "@/components/provider/AuthProvider";
import FilterByDate, {
  DateOption,
} from "@/components/shared/Dashboard/FilterByDate";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "@/lib/axios";

const heroNames = ["subscribersGained", "views", "likes", "dislikes"];

const options = [
  { option: "day", label: "1d" },
  { option: "week", label: "1w" },
  { option: "month", label: "1m" },
  { option: "year", label: "1y" },
  { option: "custom", label: "Custom" },
];

export default function Page({ params }: { params: { slug: string } }) {
  const { accessToken } = useAuth();
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-12-01");
  const [chartData, setChartData] = useState<any>([]);

  const {
    data: view,
    error: viewError,
    isLoading: viewLoading,
    refetch: refetchViewData,
  } = useQuery(
    "fetchView",
    async () => {
      const res = await axios.get(
        `/youtube-analytics?startDate=${startDate}&endDate=${endDate}&hero=${heroNames.join(
          ","
        )}&filter=video==${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setChartData([res.data]);
      return res.data;
    },
    {
      staleTime: Infinity,
    }
  );

  function fetchChartdata() {
    axios
      .get(
        `/youtube-analytics?startDate=${startDate}&endDate=${endDate}&hero=${heroNames.join(
          ","
        )}&filter=video==${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setChartData((prevData: any) => [...prevData, res.data]);
      });

    axios
      .get(
        `/youtube-analytics?startDate=${startDate}&endDate=${endDate}&hero=${heroNames.join(
          ","
        )}&filter=video==${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setChartData((prevData: any) => [...prevData, res.data]);
      });
  }

  if (viewLoading) return <div>Loading...</div>;
  if (viewError) return <div>Error fetching data</div>;
  const handleCustomeClick = async (startdate: any, endDate: any) => {
    setStartDate(startdate.toISOString().split("T")[0]);
    setEndDate(endDate.toISOString().split("T")[0]);
    await refetchViewData();
  };

  const handleDateClick = async (dateOption: DateOption) => {
    const currentDate = new Date();
    switch (dateOption) {
      case "day":
        const endDate = new Date(currentDate); // End date is current date
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 1); // Start date is previous day
        setStartDate(startDate.toISOString().split("T")[0]);
        setEndDate(endDate.toISOString().split("T")[0]);
        break;
      case "week":
        const endOfWeek = new Date(currentDate);
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start date is the first day of the current week
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End date is the last day of the current week
        setStartDate(startOfWeek.toISOString().split("T")[0]);
        setEndDate(endOfWeek.toISOString().split("T")[0]);
        break;
      case "month":
        const endOfMonth = new Date(currentDate);
        const startOfMonth = new Date(currentDate);
        startOfMonth.setDate(1); // Start date is the first day of the current month
        endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to next month
        endOfMonth.setDate(0); // Set to the last day of the current month
        setStartDate(startOfMonth.toISOString().split("T")[0]);
        setEndDate(endOfMonth.toISOString().split("T")[0]);
        break;
      case "year":
        const endOfYear = new Date(currentDate);
        const startOfYear = new Date(currentDate);
        startOfYear.setMonth(0); // Start date is the first day of the current year
        endOfYear.setMonth(11); // End date is the last day of the current year
        endOfYear.setDate(31);
        setStartDate(startOfYear.toISOString().split("T")[0]);
        setEndDate(endOfYear.toISOString().split("T")[0]);

        break;
      default:
        break;
    }
    await refetchViewData();
  };

  return (
    <ScrollArea className="h-[82vh] mt-6">
      <div className="px-24">
        <div className="pb-6">
          <h2 className="text-2xl font-semibold">Youtube Analysis</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className=""></div>
          <div className="bg-white  rounded-full px-4 py-3">
            <FilterByDate
              handleCustomeClick={handleCustomeClick}
              options={options}
              handleClick={handleDateClick}
            />
          </div>
          <button onClick={fetchChartdata}>Fetch</button>
        </div>
        {heroNames.map((hero) => {
          return (
            <Viewchart
              categories={[hero]}
              key={hero}
              hero={hero}
              chartData={view}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
