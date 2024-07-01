import { useAuth } from "@/components/provider/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
const ChatMessage = dynamic(() => import("./ChatMessage"));
const ChatHeader = dynamic(() => import("./ChatHeader"));
const ChatInput = dynamic(() => import("./ChatInput"));
const PollCard = dynamic(() => import("./PollCard"));
const AdsPreview = dynamic(() => import("./AdsPreview"));
import {
  PollFetch,
  fetchAds,
  fetchOnline,
  isOnlineF,
  reFetchChat,
} from "@/lib/chatLib";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useChat } from "@/components/provider/ChatProvider";
import { toast } from "sonner";
const MouseScroll = dynamic(() => import("./mouse-scroll"));
const ChatWindow = ({ user, room, authId }) => {
  const {
    poll,
    setPoll,
    socket,
    roomId,
    setChat,
    chat,
    setNumberOfOnline,
    numberOfOnline,
    isReplying,
    setIsReplying,
  } = useChat();

  const { channelId } = useAuth();
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [ads, setAds] = useState([]);
  const [showAds, setShowAds] = useState(true);
  const navigate = useRouter();
  const fileRef = useRef();
  function checkIsAuthor() {
    const userChannelId = channelId;
    const isAuthor = room?.channel_id === userChannelId;
    return isAuthor;
  }

  const isAuthor = checkIsAuthor();

  function fileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result;
      socket.emit("upload", { data, roomId });
      setChat((prev) => [
        ...prev,
        { message: reader.result, received: false, type: "image" },
      ]);
    };
  }

  useEffect(() => {
    if (!socket) return;
    isOnlineF({ setIsOnline, roomId });
    fetchAds({ setAds, roomId });
    socket.on("message-from-server", (data) => {
      reFetchChat({ setChat, roomId });
    });
    socket.on("poll-added", (data) => {
      PollFetch(roomId, setPoll);
    });
    socket.on("poll-get", (data) => {
      PollFetch(roomId, setPoll);
    });

    socket.on("heart-added", (data) => {
      reFetchChat({ setChat, roomId });
    });
    PollFetch(roomId, setPoll);
    reFetchChat({ setChat, roomId });
    socket.on("uploaded", (data) => {
      console.log(data);
      setChat((prev) => [
        ...prev,
        { message: data.buffer, received: true, type: "image" },
      ]);
    });

    if (isAuthor) {
      socket.emit("is-online", { roomId });
      isOnlineF({ setIsOnline, roomId });
    }
    socket.on("emote-added", (data) => {
      reFetchChat({ setChat, roomId });
    });
    socket?.on("get-online-user", (data) => {
      fetchOnline({ setNumberOfOnline, roomId });
    });
    fetchOnline({ setNumberOfOnline, roomId });
    socket.on("is-online-from-server", (data) => {
      setIsOnline(data?.isOnline);
      console.log(data?.isOnline ? "Online" : "Offline");
      isOnlineF({ setIsOnline, roomId });
    });

    socket.on("typing-started-from-server", () => setTyping(true));
    window.addEventListener("beforeunload", handleBeforeUnload);
    socket.on("typing-stoped-from-server", () => setTyping(false));
  }, [socket]);

  const handleBeforeUnload = (event) => {
    if (isAuthor) {
      socket.emit("off-online", { roomId });
      isOnlineF({ setIsOnline, roomId });
    }
    socket.emit("remove-online-user", { roomId, userId: authId });
  };

  function handleForm(e) {
    e.preventDefault();
    if (!message) return toast.error("Please enter a message");
    if (isReplying?.[0]?.message) {
      socket.emit("send-message", {
        message: isReplying?.[0]?.message,
        roomId,
        userId: authId,
        type: "reply",
        replyMessage: message,
        replyTo: {
          messageId: isReplying?.[0]?.messageId,
          username: isReplying?.[0]?.username,
        },
      });
      setIsReplying(null);
    } else {
      socket.emit("send-message", {
        message,
        roomId,
        userId: authId,
      });
    }

    setChat((prev) => [
      ...prev,
      {
        message,
        userId: {
          _id: authId,
        },
        received: false,
      },
    ]);

    reFetchChat({
      setChat,
      roomId,
    });
    reFetchChat({ setChat, roomId });
    setMessage("");
  }

  function handleImages(image) {
    socket.emit("send-message", {
      message,
      roomId,
      userId: authId,
      type: "image",
      image: image,
    });
    reFetchChat({ setChat, roomId });
  }

  const [typingTimeout, settypingTimeout] = useState(null);

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started", { roomId });

    if (typingTimeout) clearTimeout(typingTimeout);

    settypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped", { roomId });
      }, 1000)
    );
  }

  async function AddHeart(hearts) {
    console.log(hearts);
    socket.emit("add-heart", { messageId: hearts });
    reFetchChat({ setChat, roomId });
    reFetchChat({ setChat, roomId });
  }

  return (
    <div
      className={cn(
        "bg-[#F1F0F3] relative h-full border   rounded-3xl mt-6",
        showAds && "px-0 py-0"
      )}
    >
      {showAds ? (
        <AdsPreview setShowAds={setShowAds} ads={ads[0]} />
      ) : (
        <div>
          <MouseScroll />
          <ChatHeader
            numberOfOnline={numberOfOnline}
            authId={authId}
            socket={socket}
            isOnline={isOnline}
            user={user}
            room={room}
            roomId={roomId}
            isAuthor={isAuthor}
          />
          <ChatMessage
            socket={socket}
            roomId={roomId}
            room={room}
            isAuthor={isAuthor}
            authId={authId}
            user={user}
            AddHeart={AddHeart}
            chat={chat}
          />
          <ChatInput
            roomId={roomId}
            socket={socket}
            authId={authId}
            setMessage={setMessage}
            typing={typing}
            handleForm={handleForm}
            handleInput={handleInput}
            message={message}
            fileRef={fileRef}
            fileSelected={fileSelected}
            handleImages={handleImages}
          />
          <PollCard setPoll={setPoll} roomId={roomId} poll={poll} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
