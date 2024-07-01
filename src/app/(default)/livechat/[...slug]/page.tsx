"use client";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const Chat = dynamic(() => import("@/components/shared/Chat/Chat"), {
  ssr: false,
});
import { useAuth } from "@/components/provider/AuthProvider";
import { ChatProvider, useChat } from "@/components/provider/ChatProvider";
import dynamic from "next/dynamic";
import { apiKey } from "@/components/shared/Dashboard/VideoSection";

export default function Page({ params }: { params: { slug: string } }) {
  const roomId = params.slug[0];
  const { authId } = useAuth();
  const userId = params.slug[1] || authId;
  const videoId = params.slug[0];
  const {
    data: room,
    isLoading,
    isError,
    refetch,
  } = useQuery(["room", roomId], async () => {
    const response = await axios.get(
      `https://autocommentapi.vercel.app/v1/room/${roomId}`
    );
    return response.data;
  });

  const fetchVideoDetails = async (roomId: any) => {
    const url = `https://autocommentapi.vercel.app/v1/videos?order=date&part=snippet&key=${apiKey}&maxResults=2000&id=${roomId}&part=player&part=liveStreamingDetails`;

    try {
      const response = await axios.get(url);
      console.log(response.data, "gokula");

      return response.data.data.items[0].snippet;
    } catch (error: any) {
      throw new Error("Error fetching video details: " + error.message);
    }
  };

  const fetchChannelLogo = async (channelId: any) => {
    const url = `https://autocommentapi.vercel.app/v1/channels?part=snippet&key=${apiKey}&id=${channelId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.data?.items[0]?.snippet?.thumbnails?.high?.url;
    } catch (error: any) {
      throw new Error("Error fetching channel logo: " + error.message);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const videoDetails = await fetchVideoDetails(videoId);
      const channelLogo = await fetchChannelLogo(videoDetails?.channelId);

      const roomData = {
        name: videoDetails?.title,
        userId: authId,
        roomId: videoId,
        authorId: authId,
        videoId: videoId,
        user: authId,
        channel_name: videoDetails?.channelTitle,
        channel_id: videoDetails?.channelId,
        video_title: videoDetails?.title,
        channel_logo: channelLogo,
        video_thumbnail: videoDetails?.thumbnails?.default?.url,
      };

      // Make a POST request to create a room
      const response = await axios.post(
        "https://autocommentapi.vercel.app/v1/create-room",
        roomData
      );
      if (response.data) {
        refetch();
      }
    } catch (error: any) {
      // Handle errors
      console.error("Error creating room:", error.message);
    }
  };
  useEffect(() => {
    if (!room?.roomId) {
      console.log("Room exists");
      handleCreateRoom();
    } else {
    }
  }, [room?.roomId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching room</div>;
  }

  return (
    <div>
      <ChatProvider roomId={roomId}>
        <div className="flex lg:flex-row flex-col">
          <div className="lg:flex-1">
            <Chat authId={userId} room={room} user={room?.authorId} />
          </div>
          <div className="lg:flex-1"></div>
        </div>
      </ChatProvider>
    </div>
  );
}
