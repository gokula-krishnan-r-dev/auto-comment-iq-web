import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useChat } from "@/components/provider/ChatProvider";
import dynamic from "next/dynamic";
import axios from "@/lib/axios";

const MessageChat = dynamic(
  () => import("@/components/shared/Chat/message-chat"),
  {
    ssr: false,
  }
);
const ChatMessageWraper = dynamic(
  () => import("@/components/shared/Chat/ChatMessageWraper"),
  {
    ssr: false,
  }
);

const PollCardView = dynamic(
  () => import("@/components/shared/Chat/poll-card"),
  {
    ssr: false,
  }
);

const ChatMessage = ({
  chat,
  AddHeart,
  authId,
  isAuthor,
  room,
  roomId,
}: any) => {
  const {
    MessagecontainerRef: containerRef,
    displayedMessages,
    socket,
  } = useChat();
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(0);
  const [pins, setPins] = useState([]);

  async function fetchPins(roomId: string) {
    try {
      const response = await axios.get(`/message/pin/${roomId}`);
      setPins(response.data);
    } catch (error) {
      console.error("Error fetching pins:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!socket) return;

    fetchPins(roomId);
    const container = containerRef.current;

    const handlePinnedMessage = (data: any) => {
      fetchPins(roomId);
    };

    socket.on("is-pinned", handlePinnedMessage);

    // Scroll to the bottom when chat is updated, but only if the user is at the bottom
    if (container && !isUserScrolling) {
      container.scrollTop = container.scrollHeight;
    }

    // Calculate the number of remaining messages
    const remaining = chat.length - displayedMessages;
    setRemainingMessages(Math.max(remaining, 0));

    return () => {
      socket.off("is-pinned", handlePinnedMessage);
    };
  }, [chat, isUserScrolling, displayedMessages]);

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 1;
      setIsUserScrolling(!isAtBottom);
    }
  };
  return (
    <div
      id="message-chat"
      className="w-full bg-white scrollbar-hide h-[72vh] lg:h-[60vh] overflow-y-scroll !relative"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className="w-full flex relative px-4 lg:px-8 py-3 lg:py-4 flex-col pt-24 items-start">
        {chat.map((data: any) => {
          const isUserAuthorized = isAuthor;
          const isCurrentUser = true;

          return (
            <div
              id={data?._id}
              className={` ${
                data?.userId?._id === authId ? "self-end" : "self-start"
              } mb-6`}
              key={data?.userId?._id}
            >
              {data.type === "image" ? (
                <ChatMessageWraper
                  roomid={roomId}
                  socket={socket}
                  roomId={room?._id}
                  room={room}
                  AddHeart={AddHeart}
                  isCurrentUser={isCurrentUser}
                  isUserAuthorized={isUserAuthorized}
                  data={data}
                  authId={authId}
                >
                  <div className="rounded-3xl w-[340px] h-full bg-white border space-y-2 px-4 py-3 relative">
                    <Image
                      objectFit="cover"
                      className="rounded-2xl w-full h-auto"
                      src={data.image}
                      alt="my-image"
                      width={280}
                      height={240}
                    />
                    <span className="text-base pt-2 font-semibold">
                      {data.image_text}
                    </span>
                  </div>
                </ChatMessageWraper>
              ) : data.type === "poll" ? (
                <ChatMessageWraper
                  socket={socket}
                  roomId={room?._id}
                  room={room}
                  AddHeart={AddHeart}
                  isCurrentUser={isCurrentUser}
                  isUserAuthorized={isUserAuthorized}
                  data={data}
                  authId={authId}
                >
                  <div className="bg-gray-100 relative rounded-3xl mt-4 mb-4 px-4 pt-3">
                    <PollCardView polls={data?.pollId} />
                  </div>
                </ChatMessageWraper>
              ) : (
                <ChatMessageWraper
                  socket={socket}
                  roomId={room?._id}
                  room={room}
                  AddHeart={AddHeart}
                  isCurrentUser={isCurrentUser}
                  isUserAuthorized={isUserAuthorized}
                  data={data}
                  authId={authId}
                >
                  <MessageChat data={data} />
                </ChatMessageWraper>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatMessage;
