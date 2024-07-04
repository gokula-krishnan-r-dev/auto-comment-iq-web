import axios from "@/lib/axios";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

const LiveChatCard = ({ room, index }: any) => {
  const {
    data: onlineUser,
    isLoading,
    isError,
    refetch,
  } = useQuery(["onlineUser", room?.roomId], async () => {
    const response = await axios.get(`/online-user/${room?.roomId}`);
    return response.data;
  });
  return (
    <div className="">
      <div className="">
        <div className="w-full relative">
          <Image
            objectFit="cover"
            className=" rounded-3xl w-full h-64"
            src={room?.video_thumbnail}
            alt={room?.name}
            width={300}
            height={100}
          />
          <div className="bg-gray-100 border rounded-full absolute top-2 left-2 text-sm font-semibold px-2 py-1">
            @ Live Now
          </div>
        </div>
        <div className="pt-2  px-2 py-1">
          <h1
            title={room?.video_title}
            className="text-sm font-bold line-clamp-1"
          >
            {room?.video_title}
          </h1>
          <div className="flex mt-2 items-center justify-between">
            <div className="">
              <button className="flex items-center gap-3">
                <Image
                  className="rounded-full"
                  width={44}
                  height={44}
                  src={room?.channel_logo}
                  alt="logo"
                />
                <p className="text-sm pr-3 font-semibold">
                  {room?.channel_name}
                </p>
              </button>
            </div>
            <div className="">
              <div
                title={room?.video_title}
                className="text-sm gap-2 font-bold line-clamp-1 flex items-center"
              >
                <span className="bg-green-500 w-3 h-3 rounded-full" />{" "}
                {isLoading ? "Loading..." : onlineUser?.user?.length} Online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatCard;
