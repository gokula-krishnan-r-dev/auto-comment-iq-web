import { CarouselItem } from "@/components/ui/carousel";
import dynamic from "next/dynamic";
import React from "react";

const CarouselLive = dynamic(
  () => import("@/components/shared/live-chat/livechat-carousel")
);

const LiveChatHeader = ({ rooms }: any) => {
  return (
    <div className="relative">
      <CarouselLive autoscroll>
        {/* @ts-ignore */}
        {rooms.map((room, index) => (
          <CarouselItem key={index} className="basis-full ">
            <div
              className="h-[500px] bg-cover rounded-3xl bg-center relative"
              style={{
                backgroundImage: `url(${room.video_thumbnail})`,
              }}
            >
              <div className="bg-overloy py-8 px-6">
                <div className="flex items-center gap-3">
                  <button className="border bg-gray-100 rounded-full px-4 py-1.5 text-sm font-semibold">
                    2232 Live chat
                  </button>
                  <button className="border bg-white rounded-full px-4 py-1.5 text-sm font-semibold">
                    @ Live Now
                  </button>
                </div>
                <div className="">
                  <h1 className="text-xl text-wrap text-white line-clamp-2 font-bold md:text-4xl lg:text-4xl pt-4 lg:leading-tight dark:text-white">
                    {room?.video_title}
                  </h1>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselLive>
    </div>
  );
};

export default LiveChatHeader;
