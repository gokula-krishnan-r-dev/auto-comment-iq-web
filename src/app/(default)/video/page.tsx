"use client";
import SearchVideo from "@/components/shared/Dashboard/SearchVideo";
import VideoCard from "@/components/shared/Dashboard/VideoCard";
import VideoNav from "@/components/shared/Dashboard/VideoNav";
import { apiKey, channelId } from "@/components/shared/Dashboard/VideoSection";
import CircleButton from "@/components/ui/circle-button";
import axios from "@/lib/axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

function fetchVideo(q: string, page: any) {
  let url = `/search?order=date&part=snippet&channelId=${channelId}&key=${apiKey}&maxResults=10000&q=${q}`;

  if (page) {
    url += `&pageToken=${page}`;
  }

  return axios.get(url).then((res) => res.data);
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);

  const queryKey = ["fetchVideo", searchQuery, nextPageToken];

  const { isLoading, error, data, refetch } = useQuery(queryKey, () =>
    fetchVideo(searchQuery, nextPageToken)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setNextPageToken(null); // Reset nextPageToken when performing a new search
  };

  const handleLoadMore = () => {
    setNextPageToken(data?.data?.nextPageToken);
    refetch();
  };

  // Merge new videos with existing videos when loading more
  React.useEffect(() => {
    if (data && data.data && data.data.items) {
      setVideos((prevVideos) => [...prevVideos, ...data.data.items]);
    }
  }, [data]);

  if (error) return "An error has occurred: " + error;

  return (
    <main>
      <section>
        <div className="bg-white flex rounded-3xl px-6 py-5 w-full">
          <div className="max-w-full flex-1">
            <SearchVideo handleSearch={handleSearch} />
            <div className="py-2">
              {searchQuery?.length > 0 && (
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-medium text-gray-500">
                    Search Results for:{" "}
                    <span className="text-black line-clamp-1">
                      {searchQuery}
                    </span>
                  </h2>
                  <CircleButton
                    className="px-4 py-2"
                    onClick={() => setSearchQuery("")}
                  >
                    clear
                  </CircleButton>
                </div>
              )}
            </div>
            <VideoNav />
          </div>
        </div>
      </section>
      <section className="grid mt-6 grid-cols-2 gap-6">
        {videos.map((video: any, index: number) => (
          <div key={video.id} className="">
            <VideoCard video={video} />
          </div>
        ))}
      </section>

      {true && (
        <CircleButton onClick={handleLoadMore} className="px-4 py-2">
          Load More
        </CircleButton>
      )}
    </main>
  );
};

export default Page;
