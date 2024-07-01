"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "axios";
import FilterByDate, {
  DateOption,
} from "@/components/shared/Dashboard/FilterByDate";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
const Viewchart = dynamic(
  () => import("@/components/shared/Dashboard/Viewchart"),
  {
    ssr: false,
  }
);

const CountryFilter = dynamic(
  () => import("@/components/shared/analysis/country-filter"),
  {
    ssr: false,
  }
);

const heroNames = [
  "subscribersGained",
  "views",
  "likes",
  "comments",
  "estimatedMinutesWatched",
  "averageViewDuration",
  "shares",
  "dislikes",
  "annotationImpressions",
  "annotationClickThroughRate",
  "annotationCloseRate",
  "viewsPerPlaylistStart",
  "averageTimeInPlaylist",
];
const options = [
  { option: "day", label: "1d" },
  { option: "week", label: "1w" },
  { option: "month", label: "1m" },
  { option: "year", label: "1y" },
  { option: "custom", label: "Custom" },
];

const Page: React.FC = () => {
  const { accessToken } = useAuth();
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-12-01");
  const [country, setCountry] = useState<string>("all");
  const {
    data: view,
    error: viewError,
    isLoading: viewLoading,
    refetch: refetchViewData, // Refetch function
  } = useQuery(
    "fetchView",
    async () => {
      const res = await axios.get(
        `https://autocommentapi.vercel.app/v1/youtube-analytics?startDate=${startDate}&endDate=${endDate}&hero=${heroNames.join(
          ","
        )}${country === "all" ? "" : `&filter=country==${country}`}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    },
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    refetchViewData();
  }, [country]);
  // if (viewLoading) return <div>Loading...</div>;
  // if (viewError) return <div>Error fetching data</div>;
  if (viewLoading) return <Loading />;
  if (viewError) return <Error />;
  const handleCustomeClick = async (startdate: any, endDate: any) => {
    setStartDate(startdate.toISOString().split("T")[0]);
    setEndDate(endDate.toISOString().split("T")[0]);
    await refetchViewData();
  };

  const handleDateClick = async (dateOption: DateOption) => {
    alert(dateOption);
    const currentDate = new Date();
    switch (dateOption) {
      case "day":
        const endDate = new Date(currentDate); // End date is current date
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 1); // Start date is previous day
        setStartDate(startDate.toISOString().split("T")[0]);
        setEndDate(endDate.toISOString().split("T")[0]);
        await refetchViewData();
        break;
      case "week":
        const endOfWeek = new Date(currentDate);
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start date is the first day of the current week
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End date is the last day of the current week
        setStartDate(startOfWeek.toISOString().split("T")[0]);
        setEndDate(endOfWeek.toISOString().split("T")[0]);
        await refetchViewData();
        break;
      case "month":
        const endOfMonth = new Date(currentDate);
        const startOfMonth = new Date(currentDate);
        startOfMonth.setDate(1); // Start date is the first day of the current month
        endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to next month
        endOfMonth.setDate(0); // Set to the last day of the current month
        setStartDate(startOfMonth.toISOString().split("T")[0]);
        setEndDate(endOfMonth.toISOString().split("T")[0]);
        await refetchViewData();
        break;
      case "year":
        const endOfYear = new Date(currentDate);
        const startOfYear = new Date(currentDate);
        startOfYear.setMonth(0); // Start date is the first day of the current year
        endOfYear.setMonth(11); // End date is the last day of the current year
        endOfYear.setDate(31);
        setStartDate(startOfYear.toISOString().split("T")[0]);
        setEndDate(endOfYear.toISOString().split("T")[0]);
        await refetchViewData();

        break;
      default:
        break;
    }
  };

  return (
    <div className="px-24 capitalize">
      <ScrollArea className="h-[85vh]">
        <div className="pb-6">
          <h2 className="text-2xl font-semibold">Youtube Analysis</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className=""></div>
          <div className="bg-white flex items-center gap-3  rounded-full px-4 py-3">
            <FilterByDate
              handleCustomeClick={handleCustomeClick}
              options={options}
              handleClick={handleDateClick}
            />
            <CountryFilter setCountry={setCountry} />
          </div>
        </div>
        {heroNames.map((hero) => (
          <Viewchart
            categories={[hero]}
            key={hero}
            hero={hero}
            chartData={view}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default Page;
