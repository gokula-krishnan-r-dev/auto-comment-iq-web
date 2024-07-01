import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { timeAgo } from "@/lib/TimeAgo";
import Image from "next/image";
const CommentProfile = ({ profileImg }: any) => {
  return (
    <button>
      <div className="flex -space-x-4 rtl:space-x-reverse">
        {profileImg?.slice(0, 4).map((img: any, index: number) => (
          <HoverCard>
            <HoverCardTrigger>
              <Image
                width={32}
                height={32}
                key={index}
                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                src={img.authorProfileImageUrl}
                alt=""
              />
            </HoverCardTrigger>
            <HoverCardContent className="rounded-3xl text-sm font-semibold py-2 w-max">
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex gap-1 items-center">
                  <Image
                    width={40}
                    height={40}
                    key={index}
                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={img.authorProfileImageUrl}
                    alt=""
                  />
                  {img?.authorDisplayName}
                  <span className="text-sm font-medium pl-2">
                    {timeAgo(img?.publishedAt)} ago
                  </span>
                </div>
                <p className="bg-gray-100 px-4 py-2 rounded-full">
                  {img?.textOriginal}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
        {profileImg?.length > 4 && (
          <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
            +{profileImg.length - 4}
          </div>
        )}
      </div>
    </button>
  );
};

export default CommentProfile;
