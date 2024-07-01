import { timeAgo } from "@/lib/TimeAgo";
import { Pin, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import PollCardView from "./poll-card";
import CircleButton from "@/components/ui/circle-button";

const PinContent = ({ pins }: any) => {
  const [close, setClose] = React.useState(false);
  return (
    <div className="w-full duration-300 relative flex justify-end">
      {!close && (
        <>
          {pins && (
            <div className="bg-white  max-w-6xl border duration-500 !z-50 mt-8 absolute top-0 rounded-2xl px-6 py-4">
              <div className="">
                <CircleButton
                  onClick={() => setClose(!close)}
                  className="px-4 py-2 absolute bottom-2 right-2 rounded-full bg-white"
                >
                  <X size={20} />
                </CircleButton>
                <div className="flex pb-4 items-center gap-2">
                  <Pin size={18} />
                  <p className="text-xs font-semibold">
                    Pinned by {pins?.roomId?.channel_name}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src={pins?.roomId?.channel_logo}
                    alt=""
                    width={24}
                    height={24}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="">
                    <h2 className="text-xs font-semibold">
                      {pins?.roomId?.channel_name}
                    </h2>
                    <p className="text-xs text-gray-400 font-normal">
                      {timeAgo(pins?.createdAt)} ago
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                {pins?.pinType === "text" ? (
                  <div className="py-4">
                    <p className="text-base font-semibold">
                      {pins?.messageId?.message}
                    </p>
                  </div>
                ) : (
                  pins?.pinType === "poll" && (
                    <div className="">
                      <div className="bg-gray-200 rounded-3xl mt-4 mb-4 px-4 pt-3">
                        <PollCardView polls={pins?.poll} />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default PinContent;
