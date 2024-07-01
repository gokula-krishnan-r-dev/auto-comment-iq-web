import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CircleButton = dynamic(() => import("@/components/ui/circle-button"));
import { useQuery } from "react-query";
import axios from "axios";
import { Command } from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/provider/AuthProvider";
import { Close } from "@radix-ui/react-popover";

const AddChannel = ({ refetchChannleIds }: any) => {
  const { authId } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("mrbeast");
  const {
    data: searchResults,
    isLoading,
    isError,
    refetch: researchResults,
  } = useQuery("searchResults", () => fetchSearchResults(searchQuery));

  const fetchSearchResults = async (query: string) => {
    try {
      const response: any = await axios.get(
        `https://autocommentapi.vercel.app/v1/youtube-analytics/search/channel/${query}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching search results:", error.message);
      throw new Error("Failed to fetch search results. Please try again."); // Error handling
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      researchResults(); // Trigger search on Enter key press
    }
  };

  const handleAddChannel = async (
    channelId: string,
    channelName: string,
    channelLogo: string
  ) => {
    const response: any = await axios.post(
      "https://autocommentapi.vercel.app/v1/competitor/save",
      {
        userId: authId,
        channelId: channelId,
        channelName: channelName,
        channelAvatar: channelLogo,
      }
    );
    if (response.status === 201) {
      // Add channel logic
      refetchChannleIds(); // Refetch channel ids
      toast.success("Channel added successfully!");
    } else {
      toast.error("Failed to add channel. Please try again.");
    }
  };
  return (
    <div>
      <div className="">
        <Popover>
          <PopoverTrigger>
            <div className="rounded-3xl px-4 py-3 bg-white border w-max text-sm font-semibold">
              Add Channel
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] rounded-3xl mr-32">
            <div className="w-full">
              <div className="flex w-full items-center gap-4">
                <div className="relative w-full">
                  <input
                    onKeyDown={handleSearch} // Call handleSearch function on Enter key press
                    type="text"
                    placeholder="Search for a channel..."
                    className="rounded-3xl text-sm flex-1 font-medium border border-gray-200 px-4 py-3 w-full"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute top-2 right-3">
                    <div className="flex items-center text-gray-400 gap-1 bg-gray-100/60 rounded-full px-4 py-1">
                      <Command size={16} className="" />
                      <span>+ </span>
                      <span>Enter</span>
                    </div>
                  </div>
                </div>

                <CircleButton
                  onClick={() => researchResults} // Trigger search on button click
                  className="rounded-3xl hover:bg-gray-100 duration-300 text-sm font-semibold py-3 px-4 w-max"
                >
                  Search
                </CircleButton>
              </div>

              {isError && (
                <div className="text-red-500">
                  Failed to fetch search results. Please try again.
                </div>
              )}

              <div className="grid gap-4 mt-4">
                <ListAChannle
                  searchResults={searchResults}
                  handleAddChannel={handleAddChannel}
                  button={"Add"}
                />
              </div>

              {/* Error message for failed search */}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AddChannel;

export function ListAChannle({ searchResults, handleAddChannel, button }: any) {
  return (
    <div className="">
      {searchResults?.list?.map((result: any, index: number) => (
        <div key={index} className="flex items-center p-2 bg-white rounded-lg">
          <img
            src={result[1]}
            alt="Channel Logo"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="flex-1">{result[0]}</div>
          <Close
            onClick={() => handleAddChannel(result[2], result[0], result[1])}
            className="px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            {button}
          </Close>
        </div>
      ))}
    </div>
  );
}
