import CircleButton from "@/components/ui/circle-button";
import { Vote, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/TimeAgo";
import axios from "axios";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "sonner";
import { PollFetch } from "@/lib/chatLib";
import PollCardView from "./poll-card";
const PollCard = ({ poll, setPoll, roomId }: any) => {
  const { authId } = useAuth();
  const [voteValue, setVoteValue] = useState<any>(null);
  useEffect(() => {
    const isVoted = poll?.map((vote: any, index: any) => {
      const is_voted = vote?.votes?.find((v: any) => v.userId === authId);
      console.log(is_voted, "is_voted");
      console.log(index, "is_voted");
      setVoteValue(index);
    });
    console.log(isVoted);
  }, [poll]);

  return (
    <div className="absolute bottom-24 right-4">
      <div className="">
        <Popover>
          <PopoverTrigger className="">
            <CircleButton className="relative">
              <span className="w-4 h-4 text-xs font-semibold text-white bg-red-500 absolute top-0 right-0 rounded-full">
                1
              </span>
              <Vote size={24} />
            </CircleButton>
          </PopoverTrigger>
          <PopoverContent className="lg:w-[500px] w-full ml-0 lg:ml-96 rounded-3xl">
            <ScrollArea className="h-[60vh] rounded-3xl scrollbar-hide">
              <div className="">
                {poll?.map((poll: any, indexV: number) => {
                  return <PollCardView polls={poll} indexV={indexV} />;
                })}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PollCard;
