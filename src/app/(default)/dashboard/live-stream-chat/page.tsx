"use client";
import { useAuth } from "@/components/provider/AuthProvider";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/lib/TimeAgo";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

interface LiveStream {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  scheduledStartTime: string;
  status: any;
  contentDetails: any;
  liveChatId: string;
}

const Page: React.FC = () => {
  const { accessToken } = useAuth();
  const {
    data: liveStreams,
    isLoading,
    isError,
  } = useQuery("livestreams", async () => {
    const response = await axios.get(
      "/live-stream/broadcasts?part=snippet,id,contentDetails,status,monetizationDetails&id=9DhKFzbaXn4",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const livestreamData = response.data as any; // Assuming response is any
    return livestreamData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      scheduledStartTime: item.snippet.scheduledStartTime,
      status: item.status,
      contentDetails: item.contentDetails,
      liveChatId: item.snippet.liveChatId,
    })) as LiveStream[];
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <main>
      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-4">
          {liveStreams &&
            liveStreams.map((stream) => (
              <Link
                href={`/dashboard/live-stream-chat/${stream.liveChatId}`}
                className="rounded-3xl bg-white px-4 py-4 border"
                key={stream.id}
              >
                <Image
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-3xl"
                  src={stream.thumbnail}
                  alt={stream.title}
                />
                <h2 className="text-xl mt-2 font-semibold">{stream.title}</h2>
                <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                  {stream.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Scheduled Start Time: {timeAgo(stream.scheduledStartTime)}
                </p>
                <div className=" rounded-lg">
                  <ul>
                    <li className="mb-2">
                      <span className="font-semibold">Status:</span>{" "}
                      {stream.status?.lifeCycleStatus}
                    </li>
                    <li className="mb-2">
                      <span className="font-semibold">Privacy Status:</span>{" "}
                      {stream.status?.privacyStatus}
                    </li>
                    <li className="mb-2">
                      <span className="font-semibold">Recording Status:</span>{" "}
                      {stream.status?.recordingStatus}
                    </li>
                    <li className="mb-2">
                      <span className="font-semibold">Made For Kids:</span>{" "}
                      {stream.status?.madeForKids ? "Yes" : "No"}
                    </li>
                    <li>
                      <span className="font-semibold">
                        Self Declared Made For Kids:
                      </span>{" "}
                      {stream.status?.selfDeclaredMadeForKids ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>
              </Link>
            ))}
        </div>{" "}
      </ScrollArea>
    </main>
  );
};

export default Page;
