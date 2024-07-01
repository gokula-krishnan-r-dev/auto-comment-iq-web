import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import io from "socket.io-client";
import { useAuth } from "./AuthProvider";

type ChatContextType = {
  pins: any;
  fetchPins: any;
  roomId: any;
  poll: any;
  setPoll: any;
  firstFetch: any;
  setFirstFetch: any;
  socket: any;
  setChat: any;
  chat: any;
  MessagecontainerRef: any;
  displayedMessages: any;
  setDisplayedMessages: any;
  setNumberOfOnline: any;
  numberOfOnline: any;
  setIsReplying: any;
  isReplying: any;
};

const initialContext: ChatContextType = {
  pins: [],
  fetchPins: [],
  poll: [],
  roomId: "",
  setPoll: [],
  firstFetch: true,
  setFirstFetch: [],
  socket: null,
  chat: [],
  setChat: [],
  MessagecontainerRef: null,
  displayedMessages: 20,
  setDisplayedMessages: [],
  setNumberOfOnline: [],
  numberOfOnline: [],
  setIsReplying: [],
  isReplying: [],
};

const ChatContext = createContext<ChatContextType>(initialContext);

const ChatProvider = ({ children, roomId }: any) => {
  const [pins, setPins] = useState<any[]>([]);
  const [poll, setPoll] = useState([]);
  const [chat, setChat] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState(20);
  const [numberOfOnline, setNumberOfOnline] = useState([]);
  const MessagecontainerRef = useRef<HTMLDivElement>(null);
  const [firstFetch, setFirstFetch] = useState(true);
  const [isReplying, setIsReplying] = useState<any>();
  const { authId } = useAuth();
  async function fetchPins() {
    try {
      const response = await axios.get(
        `https://autocommentapi.vercel.app/v1/message/pin/${roomId}`
      );
      setPins(response.data[response.data.length - 1]);
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  }
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3003"); // Update with your server address
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", { roomId: roomId, userId: authId });
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        pins,
        fetchPins,
        setPoll,
        poll,
        roomId,
        setFirstFetch,
        firstFetch,
        socket,
        setChat,
        chat,
        MessagecontainerRef,
        displayedMessages,
        setDisplayedMessages,
        setNumberOfOnline,
        numberOfOnline,
        setIsReplying,
        isReplying,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChat };
