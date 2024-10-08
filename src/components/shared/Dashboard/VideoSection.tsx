"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "@/lib/axios";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/loading";

const SearchVideo = dynamic(
  () => import("@/components/shared/Dashboard/SearchVideo")
);
const VideoNav = dynamic(
  () => import("@/components/shared/Dashboard/VideoNav")
);
const VideoCard = dynamic(
  () => import("@/components/shared/Dashboard/VideoCard")
);

export const apiKey = "AIzaSyCz3EpTwEZrYOENK5flv2W6DRlKlXF5rjA";
export const channelId = "UCayJBKourqXMEmkJzGPzrXA";
export function fetchVideo() {
  const res = axios.get(
    `/search?order=date&part=snippet&channelId=${channelId}&key=${apiKey}&maxResults=2000`
  );

  return res.then((res) => res.data);
}
const VideoSection = () => {
  const [comments, setComments] = useState<any>();
  const [shawcomments, setShawComments] = useState<any>(null);
  const [videodetails, setVideoDetails] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchVideo"],
    queryFn: fetchVideo,
  });

  if (error) return "An error has occurred: " + error;

  const fetchComments = async ({ videoId }: any) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&key=${apiKey}&maxResults=2000`
      );

      if (response.ok) {
        const data = await response.json();

        setComments(data.items);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  return (
    <section className="pt-6 flex">
      <div className="bg-white flex rounded-3xl px-6 py-5 w-full">
        <div className="max-w-full flex-1">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <SearchVideo
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <VideoNav />
            </>
          )}
          <section className="grid mt-6 grid-cols-2 gap-6">
            {data?.data?.items?.map((video: any, index: any) => {
              const videoInfo = {
                title: video.snippet.title,
                description: video.snippet.description,
                tags: video.snippet.tags,
                channelTitle: video.snippet.channelTitle,
              };

              return (
                <div key={video.id} className="">
                  <VideoCard
                    video={video}
                    fetchComments={fetchComments}
                    setShawComments={setShawComments}
                    setVideoDetails={setVideoDetails}
                    shawcomments={shawcomments}
                    index={index}
                    videoInfo={videoInfo}
                  />
                </div>
              );
            })}
          </section>
        </div>
        <div className="max-w-xl bg-gray-200 ml-6 flex rounded-3xl px-6 py-5 w-full flex-[0.3]">
          demo
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
