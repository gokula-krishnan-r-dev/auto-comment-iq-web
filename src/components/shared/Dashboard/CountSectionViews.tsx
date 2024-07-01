import { useAuth } from "@/components/provider/AuthProvider";
import { AreaChart } from "@tremor/react";
import axios from "axios";
import { BarChart } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { valueFormatter } from "../chart/area-chart";
import Link from "next/link";
import { secondsInDay } from "date-fns";
import { useRouter } from "next/navigation";
const heroNames = ["subscribersGained"];
const CountSectionViews = ({ subCountData, data }: any) => {
  const { accessToken } = useAuth();
  const [startDate, setStartDate] = useState<string>("2024-01-01");
  const [endDate, setEndDate] = useState<string>("2024-12-01");

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
        )}`,
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
  const router = useRouter();
  return (
    <div className="bg-white mt-6 rounded-3xl px-6 py-4">
      <section
        onClick={() => router.push("/dashboard/youtube-analysis")}
        className=""
      >
        <div className="">
          <div className="pb-4 flex items-center gap-2">
            <BarChart className="w-6 h-6 " />
            <span className="text-3xl font-semibold">Analytics</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <CountSection
            title="Views"
            count={subCountData?.counts?.[3]?.count}
          />
          <CountSection
            title="videos"
            count={subCountData?.counts?.[5]?.count}
          />
          <CountSection title="comments" count={data?.rows?.[0]?.[1]} />
          <CountSection title="likes" count={data?.rows?.[0]?.[2]} />
          <CountSection
            title="estimated Min Watched"
            count={`${data?.rows?.[0]?.[4]} Min`}
          />
          <CountSection
            title="average View Duration"
            count={data?.rows?.[0]?.[5]}
          />
          <CountSection
            title="Total Impressions"
            count={data?.rows?.[0]?.[7]}
          />
        </div>
        <section className="pt-6">
          {heroNames.map((hero) => (
            <Link href="/dashboard/youtube-analysis" key={hero}>
              <AreaChart
                data={view?.values[hero]}
                index="date"
                categories={[hero]}
                colors={["blue", "violet"]}
                valueFormatter={valueFormatter}
                showLegend={false}
                showYAxis={true}
                showXAxis={true}
                showGradient={true}
                startEndOnly={false}
                className="h-[350px] w-full border py-6 px-4 rounded-3xl"
              />
            </Link>
          ))}
        </section>
      </section>
    </div>
  );
};

export default CountSectionViews;

function CountSection({
  title,
  count,
  updown,
}: {
  title: string;
  count?: string;
  updown?: string;
}) {
  return (
    <div className="border bg-gray-100 rounded-xl px-6 py-2">
      <p className="text-xs font-medium text-gray-400 capitalize"> {title} </p>
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl font-semibold">{count}</h2>
      </div>
    </div>
  );
}
