"use client";
import { Button } from "@/components/ui/button";
import { CardFooter, Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import axios from "axios";
import { CommentType } from "@/components/shared/Comments/CommentFIlter";
import { languageTypes } from "@/components/content/language";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { toast } from "sonner";

const CommentHeader = dynamic(
  () => import("@/components/shared/Comments/CommentHeader")
);
const CommentFilter = dynamic(
  () => import("@/components/shared/Comments/CommentFIlter")
);
const CommentCard = dynamic(
  () => import("@/components/shared/Comments/CommentCard")
);

export default function Page({ params }: { params: { videoid: string } }) {
  const [selectedType, setSelectedType] = useState<CommentType | any | "">(
    "all Comment"
  );
  const [showReplies, setShowReplies] = useState<boolean[]>([]);
  const [commentResponses, setCommentResponses] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("English");
  const toggleReplies = (index: number) => {
    setShowReplies((prevShowReplies) => {
      const updatedShowReplies = [...prevShowReplies];
      updatedShowReplies[index] = !updatedShowReplies[index];
      return updatedShowReplies;
    });
  };

  const getNegativeComments = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/negative/comments?videoId=${params.videoid}&sentiment=${selectedType}&language=${language}`
    );
    if (!response.ok) toast.error("Failed to fetch negative comments");

    return response.json();
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["comments", selectedType, language],
    getNegativeComments
  );

  useEffect(() => {
    if (data) {
      const fetchResponses = async () => {
        const responses = await Promise.all(
          data?.comment.map(async (comment: any) => {
            const commentText =
              comment.snippet.topLevelComment.snippet.textDisplay;
            let response = await AiResponseAPI(commentText);

            if (language !== "English") {
              const translation = await translationText(response, language);
              response = translation.translated_text;
            }

            return response;
          })
        );
        setCommentResponses(responses);
      };
      fetchResponses();
    }
  }, [data, language]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  // Define array of comment types
  const commentTypes: { value: CommentType; label: string }[] = [
    { value: "all Comment", label: "All Comment" },
    { value: "neutral", label: "Neutral" },
    { value: "negative", label: "Negative" },
    { value: "positive", label: "Positive" },
    { value: "best", label: "Best" },
  ];

  return (
    <Card className="w-full capitalize rounded-3xl max-w-3xl mx-auto">
      <CommentHeader videoId={params.videoid} />
      <section className="flex items-center justify-between w-full px-6 pt-6">
        <div className="">
          <h2 className="text-lg font-semibold">
            {data?.comment?.length} Comments
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <CommentFilter
            options={commentTypes}
            length={data?.comment?.length}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <CommentFilter
            options={languageTypes}
            length={data?.comment?.length}
            selectedType={language}
            setSelectedType={setLanguage}
          />
        </div>
      </section>

      {data?.comment && data?.comment.length === 0 ? (
        <div className="flex items-center px-6 py-4">
          <p>No comments available</p>
        </div>
      ) : (
        data?.comment?.map((comment: any, index: number) => {
          const profileImg = comment?.replies?.comments?.map((reply: any) => {
            return reply?.snippet;
          });

          return (
            <>
              <CommentCard
                reloadContent={refetch}
                profileImg={profileImg}
                commentId={comment.id}
                videoId={params.videoid}
                length={comment?.replies?.comments?.length}
                showReplies={showReplies}
                toggleReplies={toggleReplies}
                comment={comment.snippet.topLevelComment}
                index={index}
                key={index}
                isReplies={false}
                response={commentResponses[index]} // Pass the corresponding response to each comment
              />
              {comment?.replies?.comments && showReplies[index] && (
                <>
                  {comment.replies.comments.map(
                    (reply: any, replyIndex: number) => (
                      <CommentCard
                        reloadContent={refetch}
                        commentId={reply.id}
                        videoId={params.videoid}
                        length={comment?.replies?.comments?.length}
                        showReplies={showReplies}
                        toggleReplies={toggleReplies}
                        comment={reply}
                        index={replyIndex}
                        key={replyIndex}
                        isReplies={true}
                      />
                    )
                  )}
                </>
              )}
            </>
          );
        })
      )}

      <CardFooter className="p-6">
        <Button onClick={undefined} size="sm" variant="outline">
          Delete All Comments From YouTube
        </Button>
      </CardFooter>
    </Card>
  );
}

async function AiResponseAPI(commentText: string) {
  try {
    const response = await axios.get("http://localhost:3000/api/llama2", {
      params: {
        message: `commentMessage='${commentText}'`,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error from AiResponseAPI:", error);
    toast.error("Failed to fetch AI response");
  }
}

async function translationText(comment: string, language: string) {
  const response = await axios.get(
    `http://127.0.0.1:8000/translate?text=${comment}&target_language=${language}`
  );
  console.log(response.data, "response gokula");

  return response.data;
}

function YoutubeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
