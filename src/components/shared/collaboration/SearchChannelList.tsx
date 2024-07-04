import { useAuth } from "@/components/provider/AuthProvider";
import axios from "@/lib/axios";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const SearchChannelList = ({ selectedChannel, setSelectedChannel }: any) => {
  const { authId } = useAuth();
  const [message, setMessage] = React.useState("");
  const handleSend = () => {
    // console.log("message", message);
    const post = axios.post("/collaboration", {
      title: "Collaboration Request",
      message: message,
      channel: true,
      channel_id: selectedChannel?.id,
      channel_name: selectedChannel?.snippet?.title,
      channel_logo: selectedChannel?.snippet?.thumbnails?.high?.url,
      user: authId,
      userId: authId,
      isReviewed: false,
      isViewed: false,
      isAccepted: false,
      isRejected: false,
    });
    post.then((res) => {
      console.log("res", res);
      toast.success("Collaboration Request Sent");
      setMessage("");
      if (res.status === 201) {
        setSelectedChannel(null);
      }
    });
  };

  return (
    <div>
      <div className="px-6 py-3">
        <div className="flex items-center gap-6">
          <Image
            className="rounded-full"
            src={selectedChannel?.snippet?.thumbnails?.high?.url}
            alt="channel"
            width={150}
            height={150}
          />
          <div className="">
            <h3 className="text-3xl font-bold">
              {selectedChannel?.snippet?.title}
            </h3>
          </div>
        </div>
        <div className="mt-8">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className="w-full outline-none px-6 py-4 rounded-3xl border "
            name="message"
            placeholder={
              "Enter a Collaboration Message to " +
              selectedChannel?.snippet?.title
            }
            id="message"
            rows={8}
            cols={8}
          ></textarea>
        </div>
        <div className="flex items-end justify-end">
          <button
            onClick={handleSend}
            className="bg-white rounded-3xl px-6 text-sm font-semibold py-4 mt-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchChannelList;
