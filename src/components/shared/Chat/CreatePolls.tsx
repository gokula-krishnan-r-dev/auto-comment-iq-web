import {
  ArrowDownUp,
  Image,
  MessageCircleMore,
  Plus,
  Send,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { reFetchChat } from "@/lib/chatLib";
import { useChat } from "@/components/provider/ChatProvider";
import { useRouter } from "next/navigation";

const CreatePolls = ({ socket }: any) => {
  const { authId } = useAuth();
  const { setPoll, roomId, setChat, firstFetch, setFirstFetch } = useChat();
  const navigate = useRouter();
  const [selectPoll, setSelectPoll] = useState("poll");
  const [Questions, setQuestions] = useState<string>(""); // Initialize with two empty options
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]); // Initialize with two empty options
  const isCorrent = selectPoll
    ? !Questions
    : !Questions || !pollOptions[0] || !pollOptions[1];
  const handleSubmit = () => {
    if (isCorrent) {
      toast.error("Please fill all the fields");
    } else {
      const response = axios.post(
        "https://autocommentapi.vercel.app/v1/poll/create",
        {
          roomId: roomId,
          user: authId,
          userId: authId,
          question: Questions,
          options: pollOptions,
          type: selectPoll,
        }
      );
      console.log(response);
      response.then((res) => {
        socket.emit("add-poll", {
          roomId: roomId,
        });
        const resID = res.data.result?._id;

        socket.emit("send-message", {
          message: "Poll Created",
          roomId,
          type: "poll",
          userId: authId,
          pollId: resID,
        });
      });
      reFetchChat({ setChat, roomId });
      toast.success("Poll Created");
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-4 duration-500 rounded-3xl">
      <ScrollArea className="max-h-[80vh]">
        <HeaderPolls setSelectPoll={setSelectPoll} selectPoll={selectPoll} />
        <Textarea
          onChange={(e) => setQuestions(e.target.value)}
          value={Questions}
          className="rounded-3xl mt-8 px-6 font-semibold text-base outline-none py-4"
          placeholder="Enter Your Questions"
        />
        <div className="mt-4 flex items-center justify-between">
          <button className="px-4 bg-white py-4 border rounded-full">
            <Image />
          </button>
        </div>
        {selectPoll === "poll" && (
          <OptionView
            setPollOptions={setPollOptions}
            pollOptions={pollOptions}
          />
        )}
        <div className="flex items-center mt-2 gap-2">
          {isCorrent ? (
            <button
              onClick={handleSubmit}
              className="px-4 flex items-center gap-4 text-base font-semibold bg-white mb-3 py-4 border rounded-full"
            >
              <Send />
              Post
            </button>
          ) : (
            <DialogClose
              disabled={isCorrent}
              role="button"
              onClick={handleSubmit}
              className="px-4 flex items-center gap-4 text-base font-semibold bg-white mb-3 py-4 border rounded-full"
            >
              <Send />
              Post
            </DialogClose>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CreatePolls;

interface HeaderPollsProps {
  setSelectPoll: React.Dispatch<React.SetStateAction<string>>;
  selectPoll: string;
}

const pollOptions = [
  { type: "poll", label: "Selection Poll", icon: <ArrowDownUp size={18} /> },
  {
    type: "comment",
    label: "Comment Poll",
    icon: <MessageCircleMore size={18} />,
  },
];

const HeaderPolls: React.FC<HeaderPollsProps> = ({
  setSelectPoll,
  selectPoll,
}) => {
  const handleSelectPoll = (pollType: string) => {
    setSelectPoll(pollType);
  };

  return (
    <div className="">
      <div className="flex items-center gap-6 ">
        {pollOptions.map((option) => (
          <div
            key={option.type}
            onClick={() => handleSelectPoll(option.type)}
            className={`flex items-center border bg-gray-100 duration-300 rounded-full px-6 py-3 gap-2 cursor-pointer ${
              selectPoll === option.type ? "bg-white" : ""
            }`}
          >
            {option.icon}
            <h5>{option.label}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

function OptionView({ setPollOptions, pollOptions }: any) {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...pollOptions];
    updatedOptions.splice(index, 1);
    setPollOptions(updatedOptions);
  };

  const handleSubmit = () => {
    console.log("Submitted options:", pollOptions);
  };

  useEffect(() => {
    setPollOptions(["", ""]);
  }, []);

  return (
    <div className="mt-4 w-full">
      <div className="">
        {pollOptions.map((option: any, index: any) => (
          <div key={index} className="flex items-center mt-2 space-x-4">
            <Input
              className="px-6 py-6 rounded-full w-full"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            {index > 1 && ( // Don't show remove button for the first two options
              <button
                type="button"
                className="px-4 flex items-center gap-4 text-base font-semibold bg-white mb-3 py-4 border rounded-full"
                onClick={() => handleRemoveOption(index)}
              >
                <X />
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={handleAddOption}
            className="px-4 bg-white mb-3 py-4 border rounded-full"
          >
            <Plus />
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 flex items-center gap-4 text-base font-semibold bg-white mb-3 py-4 border rounded-full"
          >
            <Send />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
