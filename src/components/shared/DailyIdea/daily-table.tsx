"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import CircleButton from "@/components/ui/circle-button";
import { CheckCheck, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "@/lib/axios";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "sonner";
import { useQuery } from "react-query";
import { cn } from "@/lib/utils";

const DailyTable = ({ ideas, channelDescription }: any) => {
  const { authId } = useAuth();
  const { data: savedideas, refetch } = useQuery("savedideas", async () => {
    const res = await axios.get(`/daily/ideas/save/${authId}`);
    return res.data.ideas;
  });
  const handletoSaveIdea = async (ideaId: any, isAccepted: boolean) => {
    const response = await axios.post(`/daily/ideas/save/${ideaId}/${authId}`, {
      isAccepted: isAccepted,
    });
    await response.data;
    refetch();
    if (response.status === 201 && response.data.SaveIdea.isAccepted) {
      toast.success("Idea saved successfully");
    } else {
      toast.error("Disapproved");
    }
  };

  const {
    data: ideasTable,
    isLoading,
    refetch: reloadIdeas,
  } = useQuery("cretae-ideas", async () => {
    const res = await axios.get(
      `/daily/ideas/ai/${authId}?message=${channelDescription}`
    );
    refetch();
    return res.data.ideas;
  });

  // if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="pt-8">
      <ScrollArea className="">
        <div className="max-w-5xl mx-auto bg-white border rounded-3xl">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-4">
                  <Checkbox id="terms" className="rounded-md w-5 h-5" />
                </TableHead>
                <TableHead>Idea</TableHead>
                {/* <TableHead>Lead</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>View prediction</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ideas?.map((idea: any) => {
                const saved = savedideas?.find(
                  (savedidea: any) => savedidea.ideaId?._id === idea?._id
                );
                console.log(saved, "saved");

                return (
                  <TableRow key={idea?.id}>
                    <TableCell className="font-medium">
                      <Checkbox
                        id={`terms-${idea?.id}`}
                        className="rounded-md w-5 h-5"
                      />
                    </TableCell>
                    <TableCell>{idea?.name}</TableCell>
                    {/* <TableCell>
                      <div>
                      <div className="flex items-center gap-x-2">
                          <img
                            height={32}
                            width={32}
                            className="w-8 h-8 rounded-full"
                            src={idea.lead.avatar}
                            alt="logo"
                          />
                          <div className="grow">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {idea.lead.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell> */}
                    <TableCell>{idea?.status}</TableCell>
                    <TableCell className="gap-2 flex items-center">
                      {idea?.prediction}
                      <div
                        className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary bg-gray-100 hover:bg-secondary/80"
                        data-id={idea?.id}
                      >
                        🚀
                      </div>
                    </TableCell>
                    <TableCell>
                      {saved ? (
                        <div>
                          {saved.isAccepted ? (
                            <CircleButton
                              onClick={() => handletoSaveIdea(idea._id, true)}
                              className={cn(
                                "py-2 text-sm font-semibold",
                                saved?.isAccepted
                                  ? "text-green-500 bg-green-200 border-green-500"
                                  : "text-red-500 bg-gray-200 border-red-500"
                              )}
                            >
                              <CheckCheck size={16} />
                            </CircleButton>
                          ) : (
                            <CircleButton
                              onClick={() => handletoSaveIdea(idea._id, false)}
                              className={cn(
                                "py-2 text-sm font-semibold",
                                saved?.isAccepted
                                  ? "text-green-500 bg-green-200 border-green-500"
                                  : "text-red-500 bg-red-200 border-red-500"
                              )}
                            >
                              <X size={16} />
                            </CircleButton>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CircleButton
                            onClick={() => handletoSaveIdea(idea._id, true)}
                            className={cn(
                              "py-2 text-sm font-semibold",
                              true && "text-white bg-green-200 border-green-500"
                            )}
                          >
                            <CheckCheck size={16} />
                          </CircleButton>
                          <CircleButton
                            onClick={() => handletoSaveIdea(idea._id, false)}
                            className={cn(
                              "py-2 text-sm font-semibold",
                              saved?.isAccepted
                                ? "text-white bg-green-200 border-green-500"
                                : "text-red-500 bg-red-200 border-red-500"
                            )}
                          >
                            <X size={16} color="white" />
                          </CircleButton>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <button
            className="px-6 py-3 bg-gray-100 rounded-3xl my-4 mx-8"
            onClick={() => reloadIdeas()}
          >
            Show more
          </button>
          {isLoading && (
            <div className="text-xl font-semibold px-6 py-7">Loading...</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DailyTable;
