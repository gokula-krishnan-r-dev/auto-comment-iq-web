import { useAuth } from "@/components/provider/AuthProvider";
import { cn } from "@/lib/utils";
import React from "react";

const MessageChat = ({ data }: any) => {
  const { authId } = useAuth();

  return (
    <button className="text-start">
      <div
        className={cn("px-4 py-3 relative max-w-max bg-gray-100 ", {
          "rounded-tl-md rounded-tr-2xl rounded-b-2xl":
            data?.userId?._id !== authId,
          "rounded-tr-md rounded-tl-2xl rounded-b-2xl":
            data?.userId?._id === authId,
        })}
      >
        {data?.type === "reply" && (
          <div className="">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">Replying to</span>
              <span className="text-sm font-semibold">
                {data?.replyTo?.username}
              </span>
            </div>
            <div className="bg-white rounded-xl px-4 my-2 py-2">
              <span>{data?.message}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">
                {data?.replyMessage}
              </span>
            </div>
          </div>
        )}
        {data?.type === "text" && <span>{data?.message}</span>}
      </div>
    </button>
  );
};

export default MessageChat;
