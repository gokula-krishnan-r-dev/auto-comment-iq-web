"use client";
import CircleButton from "@/components/ui/circle-button";
import React, { useState } from "react";
import DailyTable from "@/components/shared/DailyIdea/daily-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2, ListTodo } from "lucide-react";
import { useQuery } from "react-query";
import { useAuth } from "@/components/provider/AuthProvider";
import DailyCard from "@/components/shared/DailyIdea/daily-card";
import { ScrollArea } from "@/components/ui/scroll-area";
const buttonLabels = ["Daily ideas", "Saved ideas", "Deleted ideas"];

const page = () => {
  const { authId, channelId } = useAuth();
  const [isGrid, setIsGrid] = useState<string>("");
  const [tab, setTab] = useState<string>("Daily ideas");

  const { data: ideas, isLoading } = useQuery("ideas", async () => {
    const res = await fetch(`http://localhost:3000/v1/daily/ideas/${authId}`);
    return res.json().then((data) => data.ideas);
  });

  const { data: channelDescription, isLoading: isChannelDescriptionLoading } =
    useQuery("channelDescription", async () => {
      const res = await fetch(
        `http://localhost:3000/v1/channels?id=${channelId}&part=snippet&key=AIzaSyBltuLl1h_5USy6dSnD_X9erU6PiOD-xgI`
      );
      return res.json().then((data) => data.data.items[0].snippet.description);
    });

  const { data: savedideas, isLoading: isSavedIdeasLoading } = useQuery(
    "savedideas",
    async () => {
      const res = await fetch(
        `http://localhost:3000/v1/daily/ideas/save/${authId}`
      );
      return res.json().then((data) => data.ideas);
    }
  );
  if (isSavedIdeasLoading && isLoading) return <div>Loading...</div>;
  const filterAndMapIdeas = (ideas: any, condition: any) => {
    const filteredIdeas = ideas?.filter(condition);
    return filteredIdeas?.map((idea: any) => idea.ideaId) ?? [];
  };

  // Example usage:
  const ideaIds = filterAndMapIdeas(savedideas, (idea: any) => idea.isAccepted);
  const rejectedIdeaIds = filterAndMapIdeas(
    savedideas,
    (idea: any) => !idea.isAccepted
  );
  if (isChannelDescriptionLoading) return <div>Loading...</div>;
  return (
    <main>
      <ScrollArea className="h-[85vh]">
        <div className="px-4 py-2">
          <div className="">
            <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200">
              Daily Ideas 🔥
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get daily ideas for your content. Use these ideas to create
              content for your channel.
            </p>
            <p>{channelDescription}</p>
          </div>
          <div className="pt-4">
            <nav className="flex items-center w-full justify-between">
              <div className="flex items-center gap-2 w-full">
                <div className="gap-2  flex items-center">
                  {buttonLabels.map((label, index) => (
                    <CircleButton
                      onClick={() => setTab(label)}
                      key={index}
                      className="py-4 text-sm font-semibold"
                    >
                      {label}
                    </CircleButton>
                  ))}
                </div>
              </div>
              <div className="flex w-auto items-center gap-6">
                {/* <Select>
                <SelectTrigger className=" rounded-3xl w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select> */}
                <div className="">
                  <Tabs
                    onValueChange={setIsGrid}
                    defaultValue="list"
                    className=""
                  >
                    <TabsList>
                      <TabsTrigger value="list">
                        <ListTodo />
                      </TabsTrigger>
                      <TabsTrigger value="grid">
                        <Grid2X2 />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </nav>
          </div>
          <section>
            <div className="pt-6">
              <div className="flex justify-center">
                <div className="inline-flex items-center font-semibold gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  🔔 Ideas will update daily. Save or dismiss up to 3 ideas to
                  help our AI give you the topics best suited to your channel
                  <span className="py-2.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section>
            {tab === "Daily ideas" ? (
              <>
                {isGrid !== "grid" ? (
                  <DailyTable
                    ideas={ideas}
                    channelDescription={channelDescription}
                  />
                ) : (
                  <div className="">
                    <DailyCard
                      ideas={ideas}
                      channelDescription={channelDescription}
                    />
                  </div>
                )}
              </>
            ) : tab === "Saved ideas" ? (
              <>
                {isGrid !== "grid" ? (
                  <DailyTable
                    ideas={ideaIds}
                    channelDescription={channelDescription}
                  />
                ) : (
                  <div className="">
                    <DailyCard
                      ideas={ideaIds}
                      channelDescription={channelDescription}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {isGrid !== "grid" ? (
                  <DailyTable
                    ideas={rejectedIdeaIds}
                    channelDescription={channelDescription}
                  />
                ) : (
                  <div className="">
                    <DailyCard
                      ideas={rejectedIdeaIds}
                      channelDescription={channelDescription}
                    />
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </ScrollArea>
    </main>
  );
};

export default page;
