"use client";
import React, { useState, useEffect, useCallback } from "react";
import DialogModel from "./DialoagModel";
import { Send } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiKey } from "./VideoSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { timeAgo } from "@/lib/TimeAgo";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const fetchVideoDetails = async (videoId: any) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,id,liveStreamingDetails,localizations,player,recordingDetails,statistics,status,topicDetails&id=${videoId}&key=${apiKey}`
    );
    const data = await response.json();
    return data.items[0]; // Return the first video item
  } catch (error) {
    console.error("Error fetching video details:", error);
    return {};
  }
};

const CommentDeailsModel = ({ videoId }: any) => {
  const router = useRouter();
  const { authId } = useAuth();
  const [videoDetails, setVideoDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socketUrl, setSocketUrl] = useState("ws://localhost:3002");
  const [messageHistory, setMessageHistory] = useState([]);
  const [activeAutoComment, setActiveAutoComment] = useState<any>([]);
  const { sendMessage, lastMessage, readyState }: any = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(lastMessage);
    }

    const dataString = lastMessage?.data;
    const isJSONString =
      dataString &&
      typeof dataString === "string" &&
      dataString.trim().startsWith("{");

    if (isJSONString) {
      const message = JSON.parse(dataString || "{}");
      setActiveAutoComment(message);
      console.log(message, "message");
    } else {
      console.warn("Invalid JSON string:", dataString);
    }
    // console.log(message, "message");
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("ws://localhost:3002"),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage(videoId), []);

  const fetchAndSetVideoDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchVideoDetails(videoId);
      setVideoDetails(response);

      // Assuming comments are available in the videoDetails object (you might need to adjust this based on your API response)
      const videoComments = response;
      setComments(videoComments);
    } catch (error) {
      setError("Error fetching video details");
      console.error("Error fetching video details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(videoId, "videoId");

  // const sendComment = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/v1/reply/comment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ videoId }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error sending comment:", error);
  //   }
  // };
  const sendComment = async () => {
    try {
      // Assuming you have a WebSocket API link, replace the placeholder with your actual WebSocket API URL
      const ws = new WebSocket("ws://localhost:3002");

      ws.onopen = () => {
        // Connection opened, send a JSON-formatted message to the server
        const message = videoId;
        ws.send(message);
      };

      ws.onmessage = (event) => {
        // Handle the response from the Webws server
        // const data = JSON.parse(event.data);

        try {
          console.log("Received data:", event.data);

          const receivedData = JSON.parse(event.data);
          console.log(receivedData, "receivedData");

          // Handle valid JSON data
        } catch (error) {
          console.error("Error parsing JSON:", error);
          console.log("Non-JSON data:", event.data);
          // Handle non-JSON data or other errors
        }
        ws.close();
      };

      ws.onclose = (event) => {
        // Handle the WebSocket connection closure
        console.log("WebSocket connection closed:", event);
      };
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const roomData = {
        name: "Test Room",
        userId: authId,
        roomId: videoId,
        authorId: authId,
        videoId: videoId,
        user: authId,
      };
      // Make a POST request to create a room
      const response = await axios.post(
        "http://localhost:3000/v1/create-room",
        roomData
      );
      router.push(`/livechat/${videoId}`);
      // Handle success
      console.log("Room Created:", response.data);
    } catch (error: any) {
      // Handle errors
      console.error("Error creating room:", error.response.data);
    }
  };

  return (
    <DialogModel
      className="sm:max-w-[925px] duration-500"
      button={
        <button
          onClick={fetchAndSetVideoDetails}
          className="w-10 h-10 flex items-center rounded-full justify-center bg-gray-100"
        >
          <Send color="black" size={18} />
        </button>
      }
    >
      <div className="">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&#39re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <section>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {videoDetails && (
              <>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Video Details:</p>
                  <p>Video Title: {videoDetails.snippet?.title}</p>
                  {/* Add more video details here */}
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    Comments ({comments.length}):
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-6 rounded-full bg-gray-100 py-3"
                      onClick={handleClickSendMessage}
                    >
                      Send Comment
                    </button>
                    <button className="px-6 rounded-full bg-gray-100 py-3">
                      Like all Video
                    </button>
                    <Link
                      href={"/comment/" + videoId}
                      className="px-6 rounded-full bg-gray-100 py-3"
                    >
                      Negative Comment
                    </Link>
                    <Link
                      href={"/video/analysis/" + videoId}
                      className="px-6 rounded-full bg-gray-100 py-3"
                    >
                      Video Analysis
                    </Link>
                  </div>
                  <div className="flex items-center mt-4 text-sm font-semibold gap-12">
                    <div className="">
                      <h4>pending: {activeAutoComment?.pendingComment}</h4>
                    </div>
                    <div className="">
                      <h4>Success: {activeAutoComment?.successCount}</h4>
                    </div>
                  </div>
                  <section className="py-4 border rounded-3xl px-6 mt-8">
                    {activeAutoComment && (
                      <>
                        {activeAutoComment?.videoDetailsArray?.[0]?.map(
                          (comment: any, index: any) => {
                            const response =
                              activeAutoComment?.replyComment?.[index]
                                ?.response;

                            return (
                              <div
                                key={index}
                                className="flex w-full items-start mb-8 gap-4"
                              >
                                <div className="">
                                  <img
                                    className="rounded-full"
                                    src={
                                      comment?.snippet?.topLevelComment?.snippet
                                        ?.authorProfileImageUrl
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <div className="w-full">
                                  <div className="flex items-center gap-3">
                                    <button
                                      title={
                                        comment?.snippet?.topLevelComment
                                          ?.snippet?.authorDisplayName
                                      }
                                      className="bg-gray-100 px-2 text-sm py-0.5 rounded-full font-semibold"
                                    >
                                      {
                                        comment?.snippet?.topLevelComment
                                          ?.snippet?.authorDisplayName
                                      }
                                    </button>
                                    <p className="text-sm font-semibold">
                                      {timeAgo(
                                        comment?.snippet?.topLevelComment
                                          ?.snippet?.publishedAt
                                      )}
                                    </p>
                                    <div className="flex items-center gap-1">
                                      <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                                      <p className="text-sm font-semibold">
                                        {activeAutoComment?.status?.[index] ||
                                          "pending"}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                                      <p className="text-sm font-semibold">
                                        {activeAutoComment?.perCommnetTime?.[
                                          index
                                        ] || "rendering..."}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="">
                                    <p
                                      title={
                                        comment?.snippet?.topLevelComment
                                          ?.snippet?.textOriginal
                                      }
                                      className="text-base pl-1 font-semibold mt-2"
                                    >
                                      {
                                        comment?.snippet?.topLevelComment
                                          ?.snippet?.textOriginal
                                      }
                                    </p>
                                    <button
                                      title={response && response}
                                      className="w-auto items-start flex text-start bg-gray-100 px-4 py-2 rounded-xl ml-8 mt-2"
                                    >
                                      {response ? (
                                        response
                                      ) : (
                                        <Skeleton className="h-8 w-[300px]" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </>
                    )}
                  </section>
                </div>
              </>
            )}
          </section>
        </ScrollArea>
      </div>
    </DialogModel>
  );
};

export default CommentDeailsModel;
