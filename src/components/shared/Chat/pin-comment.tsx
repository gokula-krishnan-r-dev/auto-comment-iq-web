import React from "react";
import { useAuth } from "@/components/provider/AuthProvider";
import { Pin } from "lucide-react";
import { useParams } from "next/navigation";
import { useChat } from "@/components/provider/ChatProvider";

const PinComment = ({ roomId, messageId, socket, type }: any) => {
  const { authId } = useAuth();
  const { fetchPins } = useChat();
  const roomid = useParams().slug[0];
  const handlePinClick = () => {
    socket.emit("add-pin", {
      userId: authId,
      roomId: roomId,
      messageId: messageId,
      pinType: type,
      room: roomid,
    });
    fetchPins();
  };

  return (
    <div className="">
      <button className="" onClick={handlePinClick}>
        <Pin size={20} />
      </button>
    </div>
  );
};

export default PinComment;
