import React, { useEffect, useState } from "react";
import { DialogC } from "../DialogC";
import axios from "@/lib/axios";
import { useQuery } from "react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Plus } from "lucide-react";
import CircleButton from "@/components/ui/circle-button";
import Link from "next/link";
import Image from "next/image";
import { apiKey } from "../Dashboard/VideoSection";
import { useAuth } from "@/components/provider/AuthProvider";
import { useRouter } from "next/navigation";

// Define types for the API response
interface VideoSnippet {
  title: string;
  channelTitle: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}

interface Video {
  id: {
    videoId: string;
  };
  snippet: VideoSnippet;
}

interface SearchData {
  items: Video[];
}

const CreateRoom: React.FC = () => {
  const [query, setQuery] = useState<string>("hi");
  const { authId } = useAuth();
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<SearchData>(
    ["search-room", query],
    async () => {
      const response = await axios.get(
        `/search?order=date&part=snippet&q=${query}&key=AIzaSyDAIbJTbNIebqH1aw78RK19q13btquteWM&maxResults=200`
      );
      return response.data.data;
    }
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  if (isError) return <div>Error fetching rooms</div>;

  const SearchVideo = data?.items ?? [];

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

  const handleCreateRoom = async (videoId: string) => {
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
        router.push("/livehat/" + videoId);
      }
    } catch (error: any) {
      // Handle errors
      console.error("Error creating room:", error.message);
    }
  };

  return (
    <div className="p-4">
      <DialogC
        className="sm:max-w-[725px]"
        button={
          <button className="px-6 py-2 rounded-xl text-base font-semibold border-2 border-gray-300 hover:bg-gray-200">
            Create Room
          </button>
        }
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">Create a Room</h1>
          <p className="text-sm text-gray-500 mb-4">
            Create a room and invite your friends to join
          </p>
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={handleSearchChange}
            className="w-full mb-4 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <ScrollArea className="h-[500px]">
            <div>
              {SearchVideo.map((item, index) => (
                <div key={index} className="flex w-full mt-4 gap-3">
                  <Link
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      width={200}
                      height={60}
                      src={item.snippet.thumbnails.default.url}
                      alt="thumbnail"
                      className="rounded-lg object-cover h-[100px]"
                    />
                  </Link>
                  <div className="flex w-full items-center justify-between">
                    <Link
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      className="flex-grow"
                    >
                      <h1 className="text-base max-w-full line-clamp-2 font-semibold">
                        {item.snippet.title}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {item.snippet.channelTitle}
                      </p>
                    </Link>
                    <div className="flex items-center gap-6">
                      <Link
                        target="_blank"
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        className="flex-grow"
                      >
                        <CircleButton>
                          <span className="text-sm font-semibold">
                            <Play size={16} />
                          </span>
                        </CircleButton>
                      </Link>
                      <CircleButton
                        onClick={() => handleCreateRoom(item.id.videoId)}
                      >
                        <span className="text-sm flex items-center gap-2 font-semibold">
                          <Plus size={16} />
                        </span>
                      </CircleButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogC>
    </div>
  );
};

export default CreateRoom;
