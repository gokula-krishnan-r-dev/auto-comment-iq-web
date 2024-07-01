import { fetchVideoById } from "@/app/(default)/dashboard/[slug]/page";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const CommentHeader = ({ videoId }: any) => {
  const {
    data: video,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useQuery(["video", videoId], async () => fetchVideoById(videoId));

  if (videoIsLoading) return <div>Loading...</div>;
  if (videoIsError) return <div>Error</div>;
  const { snippet } = video?.items[0];

  return (
    <CardHeader className="flex border-b items-start p-6 gap-4">
      <Link href={"/"} className="flex items-center gap-4">
        {/* <YoutubeIcon className="w-6 h-6 text-red-500" /> */}
        <img
          className="rounded-xl object-cover"
          src={snippet?.thumbnails?.maxres?.url}
          width={140}
          height={90}
          alt="thumbnail"
        />
        <h2 className="text-lg font-bold">{snippet?.title}</h2>
      </Link>
    </CardHeader>
  );
};

export default CommentHeader;
