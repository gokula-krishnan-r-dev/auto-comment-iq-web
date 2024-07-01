import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { timeAgo } from "@/lib/TimeAgo";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { ChevronDown, FilePenLine, RotateCw } from "lucide-react";
import Link from "next/link";
import React from "react";
const InputComment = dynamic(() => import("./InputComment"));
import axios from "axios";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";
import AiResponseView from "./AiResponseView";
const CommentProfile = dynamic(() => import("./CommentProfile"));

const CommentCard = ({
  comment,
  key,
  isReplies,
  index,
  toggleReplies,
  showReplies,
  length,
  videoId,
  commentId,
  response,
  profileImg,
  profilename,
  reloadContent,
}: any) => {
  const { snippet } = comment;
  const { accessToken } = useAuth();
  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(
        `https://www.googleapis.com/youtube/v3/comments?id=${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      reloadContent();
      console.log("Comment deleted:", response);
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <CardContent
      key={key}
      className={cn("p-6", isReplies ? "ml-12 border-l duration-500" : "ml-0")}
    >
      <div className="grid gap-2">
        <div className="py-2 grid gap-2">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Link href={snippet.authorChannelUrl}>
                <Image
                  alt="Thumbnail"
                  className="rounded-full object-cover aspect-square"
                  height={40}
                  src={snippet.authorProfileImageUrl}
                  width={40}
                />
              </Link>
              <div className="text-sm">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  {snippet.authorDisplayName}
                </div>
                <div className="text-xs lowercase text-gray-500 dark:text-gray-400">
                  {timeAgo(snippet.publishedAt)} ago
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <Button
                onClick={handleDeleteComment}
                size="sm"
                variant="outline"
                className="text-red-500 dark:text-red-400 rounded-3xl font-semibold"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div className="font-medium text-grey dark:text-white mb-4 sm:s-h6 md:l-h6">
          <div dangerouslySetInnerHTML={{ __html: snippet.textDisplay }}></div>
          {response ? (
            <AiResponseView response={response} commentId={commentId} />
          ) : (
            <div className="bg-gray-100 px-4 py-2 rounded-xl mt-3">
              Loading...
            </div>
          )}
        </div>
        {!isReplies && (
          <div className="flex items-center gap-2">
            <CommentProfile profileImg={profileImg} profilename={profilename} />
            <button
              className="flex font-xs font-medium items-center gap-1"
              onClick={() => toggleReplies(index)}
            >
              {length} Replies
              <ChevronDown
                className={cn(
                  "w-4 h-4 duration-500",
                  showReplies[index] ? "transform rotate-180" : ""
                )}
              />
            </button>
            <InputComment videoId={commentId} />
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default CommentCard;
