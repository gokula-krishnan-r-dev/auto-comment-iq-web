"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useQuery } from "react-query";
import { useAuth } from "@/components/provider/AuthProvider";
import React, { useState } from "react";

import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import axios from "@/lib/axios";
const fetchSearchResults = async (query: string) => {
  try {
    const response: any = await axios.get(
      `/youtube-analytics/search/channel/${query}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching search results:", error.message);
    toast.error("Error fetching search results: " + error.message);
  }
};
export default function Page({ params }: { params: { channelId: string } }) {
  const [message, setMessage] = useState<string>("");
  const { authId } = useAuth();
  const {
    data: searchResults,
    isLoading,
    isError,
    refetch: researchResults,
  } = useQuery("searchResults", () => fetchSearchResults(params.channelId));
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  const handleSend = () => {
    const post = axios.post("/collaboration", {
      title: "Collaboration Request",
      message: message,
      channel: true,
      channel_id: params.channelId,
      channel_name: searchResults.list[0][0],
      channel_logo: searchResults.list[0][2],
      user: authId,
      userId: authId,
      isReviewed: false,
      isViewed: false,
      isAccepted: false,
      isRejected: false,
    });
    post.then((res) => {
      setMessage("");
      if (res.status === 201) {
        toast.success("Collaboration Request Sent");
      }
    });
  };

  return (
    <div>
      <div className="">
        <div className="items-start gap-12 px-4 text-center md:gap-24 md:px-6 lg:grid-cols-3 lg:justify-center lg:items-center">
          <div className="space-y-4">
            <Image
              alt="YouTuber"
              className="rounded-full object-cover mx-auto"
              height="200"
              src={searchResults.list[0][1]}
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{searchResults.list[0][0]}</h1>
            </div>
          </div>
          <div className="space-y-4 pt-6">
            <div className="space-y-2">
              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] rounded-3xl px-6 py-4"
                id="message"
                placeholder="Enter your message"
              />
            </div>
            <Button
              onClick={handleSend}
              className="flex ml-auto items-end justify-end"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
