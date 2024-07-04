import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "@/lib/axios";
import { Clipboard } from "lucide-react";
import React, { use, useEffect } from "react";
import { useQuery } from "react-query";

const fetchData = async (input: string) => {
  const response = await axios.get(
    `/api/video-content?message=${input}&count=10`
  );
  return response.data;
};

const GeneratedContent = ({ input }: any) => {
  const { data, error, isLoading } = useQuery("videoContent", () =>
    fetchData(input)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="">
      <div className="">
        <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200">
          AI Content Generator BETA
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Video Idea: {input}</p>
      </div>
      <div className="">
        <p className="text-gray-600 dark:text-gray-400">
          Explore how vidIQ harnesses the power of AI to enhance your content
          creation for maximum views. Elevate your experience by registering and
          experimenting with our official suite of tools.
        </p>
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="">
            <SingleTitle title="title" content={data?.[0].title} />
            <SingleTitle title="Description" content={data?.[1]?.title} />
            <SingleTitle title="Keywords" content={data?.[2]?.title} />
          </div>
        </div>
        <div className="flex-1">
          <SingleTitle title="Video Script" content={data?.[4]?.title} />
        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;

export function SingleTitle({ title, content }: any) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="mt-4 capitalize relative space-y-2">
      <label htmlFor="title" className="text-xl font-semibold">
        {title}
      </label>
      <div className="flex items-center justify-between px-6 py-3 rounded-xl bg-white">
        <ScrollArea className="h-full rounded-none">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            {content}
          </h2>
        </ScrollArea>
        <button
          className=" text-sm font-semibold bg-gray-100 p-2 rounded-full hover:bg-white focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleCopyClick}
        >
          <Clipboard size={16} />
        </button>
      </div>
    </div>
  );
}
