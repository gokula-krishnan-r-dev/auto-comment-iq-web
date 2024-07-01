"use client";
import { useJobSearch } from "@/components/provider/JobProvider";
import JobCards from "@/components/shared/Job/job-cards";
import JobExtra from "@/components/shared/Job/job-extra";
import SearchSection from "@/components/shared/Job/search-section";
import CircleButton from "@/components/ui/circle-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const Page = () => {
  const [activeJob, setActiveJob] = React.useState<any>(0);
  const { searchTerm } = useJobSearch();
  const getJobads = async (searchTerm = "") => {
    const res = await fetch(
      `https://autocommentapi.vercel.app/v1/jobads?q=${searchTerm}`
    );
    return res.json();
  };

  const {
    data: jobads,
    isLoading,
    isError,
    refetch,
  } = useQuery(["jobads", searchTerm], () => getJobads(searchTerm)); // Pass searchTerm to getJobads

  const job = jobads?.[activeJob];

  if (searchTerm === "" && isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <main className="">
      <div className="bg-white py-4 h-[85vh] overflow-hidden rounded-3xl">
        <div className="flex  ">
          <div className="px-8 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">
                Discover Your Next Influencer Ads and Collaborative
                Opportunities! 🚀
              </h1>
              <div className=" flex items-center gap-2">
                <Link href={"/jobads/create"}>
                  <CircleButton>
                    <Plus />
                  </CircleButton>
                </Link>
                <CircleButton>
                  <Bell />
                </CircleButton>
              </div>
            </div>
            <div className="flex mt-4 gap-4">
              <div className="flex-[0.5]">
                <div className="flex items-center justify-between bg-gray-800 rounded-full px-6 py-4 text-white">
                  <h1 className="text-base font-semibold">Search Result</h1>
                  <p className="text-xs font-semibold">
                    <span>{jobads?.length}</span>Jobs Found
                  </p>
                </div>
                <ScrollArea className="h-[66vh] rounded-3xl">
                  <JobCards
                    refetch={refetch}
                    setActiveJob={setActiveJob}
                    jobads={jobads}
                  />
                </ScrollArea>
              </div>
              <div className="flex-1">
                <SearchSection />
                <div className="mt-8">
                  <JobExtra job={job} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0.3]">demo</div>
        </div>{" "}
      </div>
    </main>
  );
};

export default Page;
