import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

interface EmojiData {
  emotes: any[];
  user: string;
}

const ShowEmoji: React.FC<{ data: EmojiData }> = ({ data }) => {
  return (
    <div className="relative !duration-100">
      <HoverCard>
        <HoverCardTrigger className="duration-100">
          {data?.emotes?.length > 0 && (
            <div className="bg-gray-100 rounded-full px-2 py-1 mt-1 cursor-pointer">
              <div className="flex items-center justify-end gap-2">
                <div className="flex items-center gap-1 overflow-hidden">
                  {data?.emotes.slice(-1).map((emote, index) => (
                    <span key={index} className="text-base">
                      {emote?.emoteString}
                    </span>
                  ))}
                  {data?.emotes.length > 1 && (
                    <span className="text-sm">+{data?.emotes.length - 1}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </HoverCardTrigger>
        <HoverCardContent className="duration-100 ml-44 max-w-xl w-full space-y-2 rounded-3xl">
          {data?.emotes?.map((emote, index) => (
            <button
              key={index}
              className="flex w-full hover:bg-gray-100 duration-300 rounded-full items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-2">
                <Image
                  objectFit="cover"
                  className="rounded-full"
                  src={emote?.user?.profile?.picture}
                  alt="user"
                  width={44}
                  height={44}
                />
                <p className="text-sm font-semibold capitalize">
                  {emote?.user?.username}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">{emote.emoteString}</span>
              </div>
            </button>
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ShowEmoji;
