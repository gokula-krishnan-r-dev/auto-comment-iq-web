import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import RespoDesign from "./respoDesign";
import axios from "axios";
import { toast } from "sonner";
import DailyContent from "./DailyContent";
export interface MessageData {
  title: string;
  content: string;
  role: string;
  id: number;
  icon: JSX.Element; // Assuming you're using JSX in your project
  options: string[];
}

const defaultMessageData: MessageData[] = [
  {
    title: "Example",
    content: "Example",
    role: "system",
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-at-sign"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
      </svg>
    ),
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    title: "Capabilites",
    content: "Capabilites",
    role: "system",
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-at-sign"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
      </svg>
    ),
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    title: "Limitations",
    content: "Limitations",
    role: "system",
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-at-sign"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
      </svg>
    ),
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
];

const PromtUI = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<any>([]);
  console.log(response, "response");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [response]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handlePromptSubmit();
    }
  };

  const handlePromptSubmit = () => {
    scrollDown();
    setIsLoading(true);
    setInputValue("");
    setResponse((prevResponse: any) => [
      ...prevResponse,
      { text: inputValue, isAuthor: true },
    ]);

    var message = [];
    message.push({
      role: "system",
      content:
        "You are an AI assistant and for your YouTube channel related chat and analytics",
    });

    message.push({
      role: "user",
      content: inputValue || response[response.length - 1].text,
    });

    axios
      .post(`http://localhost:3000/v1/ai-chat/llama70B`, {
        message,
      })
      .then((response) => {
        const responseData = response.data.response;

        setResponse((prevResponse: any) => [
          ...prevResponse,
          { text: responseData, isAuthor: false },
        ]);
        scrollDown();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        toast.error("Error fetching data");
      });
  };

  return (
    <div>
      <div className="relative w-full">
        <ScrollArea className="h-[70vh]" ref={containerRef}>
          <div className="py-10 lg:py-10">
            {/* Title */}
            <div className="max-w-4xl capitalize px-4 sm:px-6 lg:px-8 mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                GOKULA KISHNAN Welcome To you tuber personal AI Chat 👋
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Your AI-powered copilot for the You tube analytics and ideas.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-12 px-12 mt-4">
              {defaultMessageData.map((data) => (
                <DailyContent data={data} />
              ))}
            </div>
            {/* End Title */}
            <ul className="mt-16 space-y-5">
              {/* Chat Bubble */}
              {Array.isArray(response) &&
                response.map((res: any, index: number) => (
                  <RespoDesign
                    handlePromptSubmit={handlePromptSubmit}
                    isAuthor={res?.isAuthor}
                    content={res?.text.toString()}
                  />
                ))}
              {isLoading && <div className="">Loading....</div>}
              {/* End Chat Bubble */}
            </ul>
          </div>
        </ScrollArea>
        {/* Search */}
        <footer className="max-w-4xl border rounded-3xl bg-white  mx-auto sticky bottom-0 z-10 p-3 sm:py-0">
          {/* Input */}
          <div className="relative flex items-center justify-between">
            <div className="w-full">
              <textarea
                disabled={isLoading}
                onKeyPress={handleKeyPress}
                value={inputValue}
                onChange={handleInputChange}
                className="p-4 block w-full  border-gray-200 border-none rounded-lg outline-none text-base focus:border-transparent  dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Ask me anything..."
              />
            </div>
            {/* Toolbar */}
            <div className="flex items-center gap-x-1">
              {/* Send Button */}
              <button
                onClick={handlePromptSubmit}
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
              {/* End Send Button */}
            </div>
            {/* End Toolbar */}
          </div>
          {/* End Input */}
        </footer>
        {/* End Search */}
      </div>
    </div>
  );
};

export default PromtUI;
