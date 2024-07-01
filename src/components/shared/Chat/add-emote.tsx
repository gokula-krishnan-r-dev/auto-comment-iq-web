import CircleButton from "@/components/ui/circle-button";
import { Plus, Smile } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useChat } from "@/components/provider/ChatProvider";
import { useAuth } from "@/components/provider/AuthProvider";
import { reFetchChat } from "@/lib/chatLib";
import { useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";
const emohis = [
  {
    name: "happy",
    icon: "😀",
  },
  {
    name: "sad",
    icon: "😢",
  },
  {
    name: "angry",
    icon: "😡",
  },
  {
    name: "love",
    icon: "❤️",
  },
  {
    name: "laugh",
    icon: "😂",
  },
  {
    name: "cry",
    icon: "😭",
  },
];
const AddEmote = ({ messageId }: any) => {
  const { socket, roomId, setChat, firstFetch, setFirstFetch } = useChat();
  const navigate = useRouter();
  const { authId } = useAuth();
  const [addmore, setAddmore] = React.useState<boolean>(false);
  const handletoSendEmote = (emote: string) => {
    socket.emit("add-emote", { userId: authId, roomId, messageId, emote });
    setTimeout(() => {
      reFetchChat({ setChat, roomId });
    }, 500);
  };

  return (
    <div>
      <div className="">
        <Popover>
          <PopoverTrigger>
            <CircleButton className="py-1 px-1">
              <Smile size={16} />
            </CircleButton>
          </PopoverTrigger>
          <PopoverContent className="w-full py-2 rouf px-2">
            <div className="flex items-center gap-2">
              {!addmore ? (
                <>
                  {emohis.map((emoji, index) => (
                    <PopoverClose
                      key={index}
                      onClick={() => handletoSendEmote(emoji?.icon)}
                      className="!text-2xl bg-gray-100 rounded-full px-3 py-2"
                    >
                      {emoji.icon}
                    </PopoverClose>
                  ))}
                  <button
                    onClick={() => setAddmore(!addmore)}
                    className="!text-3xl bg-gray-100 rounded-full px-3 py-2"
                  >
                    <Plus size={24} />
                  </button>
                </>
              ) : (
                <Picker
                  data={data}
                  onEmojiSelect={(e: any) => handletoSendEmote(e.native)}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AddEmote;
