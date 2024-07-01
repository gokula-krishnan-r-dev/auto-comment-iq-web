import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CircleButton from "@/components/ui/circle-button";
import { useQuery } from "react-query";
import axios from "axios";
import { apiKey, channelId } from "../Dashboard/VideoSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
const AddVideo = () => {
  const {
    data: video,
    error: videoError,
    isLoading: videoLoading,
    refetch: refetchVideoData,
  } = useQuery("fetchVideo", async () => {
    const res = await axios.get(
      `http://localhost:3000/v1/search?order=date&part=snippet&channelId=${channelId}&key=${apiKey}&maxResults=2000`
    );
    return res.data;
  });
  if (videoLoading) return <Loading />;
  if (videoError) return <Error />;
  const handletoAddVideo = () => {
    toast.success("Video added successfully");
  };
  return (
    <section>
      {" "}
      <Popover>
        <PopoverTrigger>
          <CircleButton>Add video</CircleButton>
        </PopoverTrigger>
        <PopoverContent className="mr-36">
          {/* Place content for the popover here. */}
          <div className="">
            <h3 className="text-lg font-semibold">Add Video</h3>
            <p className="text-sm text-gray-500">
              Add a video to the dashboard
            </p>
            <ScrollArea className="h-96">
              <div className="">
                {video?.data?.items?.map((video: any, index: any) => {
                  return (
                    <button
                      onClick={handletoAddVideo}
                      key={index}
                      className="border text-start mb-4 cursor-pointer rounded-3xl px-4 py-4"
                    >
                      <div className="">
                        <img
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          className="w-full h-32 object-cover rounded-3xl"
                        />
                        <div className="">
                          <h4 className="text-sm font-semibold">
                            {video.snippet.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {video.snippet.channelTitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>{" "}
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default AddVideo;
