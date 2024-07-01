"use client";
import { useQuery } from "react-query";
import { apiKey } from "@/components/shared/Dashboard/VideoSection";
import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

interface ChatMessage {
  id: string;
  authorDetails: {
    displayName: string;
    profileImageUrl: string;
  };
  snippet: {
    displayMessage: string;
    publishedAt: string;
  };
}

export default function Page({ params }: { params: { chatId: string } }) {
  const [chatText, setChatText] = useState<string>("");
  const [chatWithAI, setChatWithAI] = useState<{ [key: string]: string }>({});
  const { accessToken } = useAuth();
  const {
    data: chatMessages,
    isLoading,
    isError,
    refetch,
  } = useQuery("chat", async () => {
    const response = await axios.get(
      `/live-stream/chat?part=snippet,id,authorDetails&liveChatId=${params.chatId}&key=${apiKey}&maxResults=2000`
    );
    return response.data;
  });
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for ScrollArea
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const handleScroll = () => {
    const container = scrollRef.current;

    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsUserScrolling(!isAtBottom);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    // Scroll to the bottom when chat is updated and user is not actively scrolling
    if (container && !isUserScrolling) {
      container.scrollTop = container.scrollHeight;
    }
  }, [isUserScrolling, chatMessages]);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (isError)
    return <div className="text-center mt-8">Error fetching data</div>;
  const handletoSendReply = async (message: string) => {
    handleScroll();
    const response = await axios.post(
      `/live-stream/chat`,
      {
        liveChatId: params.chatId,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      handleScroll();
      setChatText("");
      setTimeout(() => {
        refetch();
      }, 2000);
      toast.success("Reply sent successfully");
    } else {
      toast.error("Error sending reply");
    }
    handleScroll();
  };
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="mx-auto py-8">
      <div
        className="w-full scrollbar-hide h-[65vh] lg:h-[66vh] overflow-y-scroll !relative"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className="max-w-lg mx-auto">
          {chatMessages?.items?.map((message: ChatMessage) => (
            <div
              key={message.id}
              className="flex bg-white px-6 rounded-3xl py-4 items-start mb-4"
            >
              <img
                src={message.authorDetails.profileImageUrl}
                alt={message.authorDetails.displayName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <div className="font-semibold text-gray-800">
                  {message.authorDetails.displayName}
                </div>
                <div className="bg-gray-100 rounded-xl px-4 py-2 mt-1">
                  {message.snippet.displayMessage}
                </div>
                {chatWithAI[message.id] && (
                  <button
                    onClick={() => handletoSendReply(chatWithAI[message.id])}
                    className="bg-gray-100 flex items-center gap-3 rounded-xl px-4 py-2 mt-1"
                  >
                    <span className="font-semibold flex items-center gap-1 text-gray-800">
                      <Bot className="w-4 h-4 mr-2" />
                      AI:
                    </span>

                    {chatWithAI[message.id]}
                  </button>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.snippet.publishedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center  mx-auto">
        <div className="w-full max-w-lg relative">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                return;
              }
              if (e.key === "Enter") {
                e.preventDefault();
                handletoSendReply(chatText);
              }
            }}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            id="message"
            rows={2}
            className="block px-6 pr-24 py-5 w-full text-sm text-gray-900 bg-gray-50 rounded-3xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            onClick={() => handletoSendReply(chatText)}
            className="bg-blue-500 absolute right-4 top-8 text-white px-6 py-2 rounded-3xl mt-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
