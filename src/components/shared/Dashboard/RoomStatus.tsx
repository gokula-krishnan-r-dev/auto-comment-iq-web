import axios from "axios";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const RoomStatus = () => {
  const {
    data: rooms,
    isLoading,
    isError,
  } = useQuery(
    "rooms",
    async () => {
      const response = await axios.get(`http://localhost:3000/v1/rooms`);
      return response.data.rooms.sort(
        (a: any, b: any) =>
          new Date(b.isLeft).getTime() - new Date(a.isLeft).getTime()
      );
    },
    {
      staleTime: 5000, // Set the stale time to 5 seconds
      refetchInterval: 5000, // Refetch every 5 seconds
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rooms</div>;

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold">Room Status</h2>
      <div className="w-full">
        <Carousel>
          <CarouselContent>
            {rooms.map((room: any) => (
              <CarouselItem key={room.roomId} className="basis-26">
                <Link
                  title={room.name}
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${room.roomId}`}
                  className="flex items-center space-y-2 flex-col justify-center"
                >
                  <div
                    className={`rounded-full flex border-4 w-16 h-16  items-center justify-center ${
                      room.isOnline ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <Image
                      objectFit="cover"
                      className="rounded-full"
                      src={room.channel_logo}
                      alt="room"
                      width={164}
                      height={164}
                    />
                  </div>
                  <div className="w-full line-clamp-1">
                    <RoomTitle name={room.name} />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </div>
  );
};

export default RoomStatus;

interface RoomProps {
  name: string;
}

const RoomTitle: React.FC<RoomProps> = ({ name }) => {
  const displayText = name.length > 16 ? name.substring(0, 16) + "..." : name;

  return <h3 className="text-xs font-semibold">{displayText}</h3>;
};
