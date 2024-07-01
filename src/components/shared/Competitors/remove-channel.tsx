import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Close } from "@radix-ui/react-popover";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const RemoveChannel = ({ chnnaleIds, refetchChannleIds }: any) => {
  const handleAddChannel = async (id: string) => {
    // Implement the logic to remove the channel
    const response: any = await axios.delete(
      `http://localhost:3000/v1/competitor/delete/${id}`
    );
    if (response.status === 200) {
      refetchChannleIds();
      toast.success("Channel removed successfully");
    }
  };
  return (
    <div>
      <div className="">
        <Popover>
          <PopoverTrigger>
            <div className="rounded-3xl px-4 py-3 bg-white border w-max text-sm font-semibold">
              Remove Channel
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] rounded-3xl mr-32">
            <ScrollArea className="h-96">
              <div className="grid gap-4 mt-4">
                {chnnaleIds?.map((result: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-white rounded-lg"
                  >
                    <img
                      src={result.channelAvatar}
                      alt="Channel Logo"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">{result.channelName}</div>
                    <Close
                      onClick={() => handleAddChannel(result?._id)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    >
                      Remove
                    </Close>
                  </div>
                ))}
                {chnnaleIds?.length === 0 && (
                  <div className="text-gray-400 text-center">
                    No channels added yet
                  </div>
                )}
              </div>{" "}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RemoveChannel;
