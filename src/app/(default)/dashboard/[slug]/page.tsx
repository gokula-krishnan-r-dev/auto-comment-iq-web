"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { apiKey } from "@/components/shared/Dashboard/VideoSection";
import axios from "axios";
import { toast } from "sonner";
import { updateVideoDetails } from "@/lib/changeTitle";
import { useAuth } from "@/components/provider/AuthProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dynamic from "next/dynamic";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
const TagAi = dynamic(() => import("@/components/shared/tab-ai"));
const Descriptionai = dynamic(
  () => import("@/components/shared/description-ai")
);
const fetchVideoById = async (videoId: string) => {
  try {
    const response = await axios.get(
      `https://autocommentapi.vercel.app/v1/videos?order=date&part=snippet&key=${apiKey}&maxResults=2000&id=${videoId}`
    );

    return response?.data?.data;
  } catch (error) {
    toast.error("Failed to fetch video");
  }
};

interface PageProps {
  params: { slug: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { accessToken } = useAuth(); // Assuming useAuth is a hook provided by your authentication system
  const videoId = params.slug;
  const [approved, setApproved] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const {
    isLoading: videoLoading,
    error: videoError,
    data: videoData,
  } = useQuery(["fetchVideo", videoId], () => fetchVideoById(videoId), {
    enabled: !!accessToken, // Only fetch video if accessToken is available
  });

  const {
    data: title,
    error: titleError,
    isLoading: titleLoading,
  } = useQuery(
    "fetchAiTitle",
    async () => {
      try {
        const res = await axios.get(
          `https://autocommentapi.vercel.app/api/llama13?message=${videoData?.items[0].snippet?.title}&system="re write a YouTube video title"`
        );
        return res.data;
      } catch (error) {
        toast.error("Failed to fetch title");
      }
    },
    {
      enabled: !!videoData,
    }
  );

  if (titleLoading && videoLoading) return <Loading />;
  if (titleError && videoError) return <Error />;

  function handleToupdateTitle(description: any, tags: any) {
    updateVideoDetails(selectedTitle, videoId, accessToken, description, tags);
    toast.success(selectedTitle);
  }

  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200">
                AI Content Generator BETA
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Video Idea: {params.slug}
              </p>
            </div>
            <div className="">
              <p className="text-gray-600 dark:text-gray-400">
                Explore how vidIQ harnesses the power of AI to enhance your
                content creation for maximum views. Elevate your experience by
                registering and experimenting with our official suite of tools.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="px-2">
                <h2 className="text-xl font-semibold mb-2 pt-8 ">
                  Alternative title - orginal title -{" "}
                  <span className="px-6 py-3 rounded-full bg-white">
                    {videoData?.items[0]?.snippet?.title}
                  </span>
                </h2>
                <div className="">
                  <AlertDialog>
                    <AlertDialogTrigger className="gap-2 mt-6 flex items-center flex-wrap">
                      {title &&
                        title?.map((item: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTitle(item?.title)}
                            className="px-6 py-3 bg-white rounded-full"
                          >
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                              {item?.title}
                            </h2>
                          </button>
                        ))}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setApproved(false)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            setApproved(true);
                            handleToupdateTitle(
                              videoData?.items[0].snippet?.description,
                              videoData?.items[0].snippet?.tags
                            );
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {videoData?.items[0]?.snippet?.description && (
        <Descriptionai des={videoData?.items[0]?.snippet?.description} />
      )} */}
      <TagAi tag={videoData?.items[0]?.snippet?.tags} />
    </div>
  );
};

export default Page;
