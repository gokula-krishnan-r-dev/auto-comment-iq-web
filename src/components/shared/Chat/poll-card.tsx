import { useAuth } from "@/components/provider/AuthProvider";
import { useChat } from "@/components/provider/ChatProvider";
import { timeAgo } from "@/lib/TimeAgo";
import { PollFetch, reFetchChat } from "@/lib/chatLib";
import axios from "axios";
import { Vote, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PollCardView = ({ polls }: any) => {
  const [voteValue, setVoteValue] = useState<any>(null);
  const { setPoll, roomId, setChat, firstFetch, setFirstFetch } = useChat();
  const navigate = useRouter();
  const [isWriteComment, setIsWriteComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const pollArray = [polls];
  useEffect(() => {
    const isVoted = pollArray?.map((vote: any, index: any) => {
      const is_voted = vote?.votes?.find((v: any) => v.userId === authId);
      console.log(is_voted, "is_voted");
      console.log(index, "is_voted");
      setVoteValue(index);
    });
    console.log(isVoted);
  }, [polls]);
  console.log(
    polls?.votes?.filter((vote: any) => vote.option === "dasdasd").length,
    "vote"
  );

  const { authId } = useAuth();

  const handleVote = (option: string, pollId: any, type: string) => {
    const response = axios.post(
      `http://localhost:3000/v1/poll/${pollId}/vote`,
      {
        option: option,
        user: authId,
        userId: authId,
        type: type,
      }
    );
    console.log(response);
    response.then((res) => {
      toast.success(res.data.message);
      PollFetch(roomId, setPoll);

      reFetchChat({ setChat, roomId, navigate, firstFetch, setFirstFetch });
      setIsWriteComment(false);
    });
  };

  return (
    <div className="bg-gray-100 mb-4 rounded-3xl px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={polls?.user?.profile?.picture}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <h5>{polls?.user?.username}</h5>
        </div>
        <div className="">{timeAgo(polls?.createdAt)}</div>
      </div>
      <div className="">
        <h5 className="mb-4 py-2 font-semibold text-gray-800 text-4xl lg:text-2xl dark:text-gray-200">
          {polls?.question}
        </h5>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        {polls?.type === "comment" ? (
          <div className="">
            {!isWriteComment && (
              <button
                onClick={() => setIsWriteComment(!isWriteComment)}
                className="bg-white rounded-full px-6 py-3 w-full"
              >
                {polls?.votes[0]?.option
                  ? polls?.votes[0]?.option
                  : " Write a Comment"}
              </button>
            )}
            {isWriteComment && (
              <div className="mt-4">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full rounded-3xl px-6 py-4"
                  placeholder="Write a Comment"
                ></textarea>
                <div className="flex items-center justify-between mt-4">
                  <button className="bg-white rounded-full px-6 py-3">
                    <X />
                  </button>
                  <button
                    onClick={() => handleVote(comment, polls?._id, polls?.type)}
                    className="bg-white rounded-full px-6 py-3"
                  >
                    <Vote />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {polls?.options?.map((option: any, index: number) => (
              <button
                onClick={() => handleVote(option, polls?._id, polls?.type)}
                key={index}
                className="flex items-center gap-2 mb-2"
              >
                <div className="px-6 py-3 rounded-full bg-gray-400/50 font-semibold">
                  {option} -
                  {true && (
                    <span>
                      {
                        polls?.votes?.filter(
                          (vote: any) => vote.option === option
                        ).length
                      }
                    </span>
                  )}
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PollCardView;
