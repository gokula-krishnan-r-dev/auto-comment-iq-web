"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/provider/AuthProvider";
import { useQuery } from "react-query";
import { fetchChannelIds } from "@/components/shared/Competitors/CompetitorsChart";
import RemoveChannel from "@/components/shared/Competitors/remove-channel";
const AddChannel = dynamic(
  () => import("@/components/shared/Competitors/add-channel")
);
const CompetitorChart = dynamic(
  () => import("@/components/shared/Competitors/CompetitorsChart")
);
const CircleButton = dynamic(() => import("@/components/ui/circle-button"));

const buttonLabels = [
  {
    label: "Subscribers",
    value: "subscribers",
  },
  {
    label: "Views",
    value: "views",
  },
  {
    label: "Videos",
    value: "videos",
  },
  {
    label: "Goals",
    value: "goal",
  },
];

const Page = () => {
  const [tab, setTab] = useState<number>(0);
  const { authId } = useAuth();
  const { data: chnnaleIds, refetch: refetchChannleIds } = useQuery(
    "channelIds",
    () => fetchChannelIds(authId),
    {
      enabled: !!authId,
    }
  );
  const handleTabChange = (label: string) => {
    switch (label) {
      case "subscribers":
        setTab(0);
        break;
      case "views":
        setTab(3);
        break;
      case "goal":
        setTab(1);
        break;
      case "videos":
        setTab(5);
        break;
      default:
        setTab(0); // Default to 3 for any other value
    }
  };

  return (
    <main>
      <div className="px-6">
        <div className="">
          <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200">
            Competitor analysis 🔥
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here you can see the list of competitors and their performance
            metrics. You can also add new competitors and update their
            information.
          </p>
        </div>
        <div className="">
          <div className="pt-4 px-8">
            <nav className="flex items-center w-full justify-between">
              <div className="flex items-center gap-2 w-full">
                <div className="gap-2  flex items-center">
                  {buttonLabels.map((label, index) => (
                    <CircleButton
                      onClick={() => handleTabChange(label.value)}
                      key={index}
                      className="py-4 text-sm font-semibold"
                    >
                      {label.label}
                    </CircleButton>
                  ))}
                </div>
              </div>
              <div className="flex w-auto items-center gap-6">
                <AddChannel refetchChannleIds={refetchChannleIds} />
                <RemoveChannel
                  chnnaleIds={chnnaleIds}
                  refetchChannleIds={refetchChannleIds}
                />
              </div>
            </nav>
          </div>
        </div>
        <div className="">
          <div className="pt-8">
            {chnnaleIds && (
              <CompetitorChart chnnaleIds={chnnaleIds} tab={tab} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
