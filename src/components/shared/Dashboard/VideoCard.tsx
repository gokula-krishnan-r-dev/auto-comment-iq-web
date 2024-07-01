import { Eye } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DynamicCommentDeailsModel = dynamic(
  () => import("./CommentDeailsModel"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const VideoCard = ({ video }: any) => {
  return (
    <button className="w-full">
      <div className="relative rounded-3xl">
        <Link href={`/dashboard/${video.id.videoId}`}>
          <Image
            width={280}
            height={380}
            className="rounded-3xl object-cover h-[380px] w-full"
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
          />
        </Link>

        <div className="video-overlay shot-thumbnail-overlay"></div>
        <div className="absolute bottom-2 z-10 flex items-center justify-between left-2 right-2 text-white px-4 py-4 rounded-2xl">
          <div className="w-[75%] text-start text-wrap">
            <Link
              className="hover:text-blue-500 text-start hover:underline "
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.id.videoId}&ab_channel=${video.snippet.channelTitle}}`}
            >
              <h2 className="line-clamp-1 text-start font-medium text-lg">
                {video.snippet.title}
              </h2>
            </Link>
          </div>
          <button className="w-10 h-10 flex items-center rounded-full justify-center bg-gray-100">
            <Eye color="black" size={18} />
          </button>
          <DynamicCommentDeailsModel videoId={video.id.videoId} />
        </div>
      </div>
    </button>
  );
};

export default VideoCard;
