"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
const CreateRoom = dynamic(
  () => import("@/components/shared/room/create-room")
);
const CarouselLive = dynamic(
  () => import("@/components/shared/live-chat/livechat-carousel")
);

const SearchComment = dynamic(
  () => import("@/components/shared/live-chat/search-comment")
);

const LiveChatCard = dynamic(
  () => import("@/components/shared/live-chat/livechat-card")
);
const LiveChatHeader = dynamic(
  () => import("@/components/shared/live-chat/livechat-header")
);

const RoomListPage = () => {
  const {
    data: rooms,
    isLoading,
    isError,
  } = useQuery("rooms", async () => {
    const response = await axios.get(`http://localhost:3000/v1/rooms`);
    return response.data.rooms;
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rooms</div>;

  return (
    <div className="container">
      <ScrollArea className="h-[85vh]">
        <LiveChatHeader rooms={rooms} />
        <CarouselLive autoscroll className="basis-auto py-3">
          {rooms?.map((room: any, index: number) => (
            <CarouselItem key={index} className="basis-auto">
              <Link
                href={`/livechat/${room.roomId}`}
                className="flex gap-3 bg-white hover:border-blue-500 rounded-full border px-2 py-1 items-center"
              >
                <Image
                  className="rounded-full"
                  width={34}
                  height={34}
                  src={room?.channel_logo}
                  alt="logo"
                />
                <p className="text-sm pr-3 font-semibold">
                  {room?.channel_name}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselLive>
        <div className="flex border-b py-6 items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Create a Room</h1>
            <p className="text-sm text-gray-500">
              Create a room and invite your friends to join
            </p>
          </div>
          <CreateRoom />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">Recommented video chat</h1>
          <div className="grid pt-4 grid-cols-3 gap-4">
            {rooms?.map((room: any, index: any) => (
              <Link
                href={`/livechat/${room.roomId}`}
                key={room.roomId}
                className="rounded-3xl px-2 py-2 duration-500 bg-white hover:bg-gray-200 cursor-pointer"
              >
                <LiveChatCard room={room} index={index} />
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
      <SearchComment
        search={rooms}
        className=""
        button={<Search size={24} />}
      ></SearchComment>
    </div>
  );
};

export default RoomListPage;
