import React from "react";
import dynamic from "next/dynamic";
const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });
const Chat = ({ user, room, authId }: any) => {
  return (
    <div className="relative h-[100vh] lg:h-[80vh]">
      <ChatWindow authId={authId} user={user} room={room} />
    </div>
  );
};

export default Chat;
