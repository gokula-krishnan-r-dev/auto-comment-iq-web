import { MessageCircle } from "lucide-react";
import React from "react";
import { MessageData } from "./Promt";

const DailyContent = ({ data }: MessageData | any) => {
  return (
    <div>
      <div className="bg-white rounded-3xl px-6 py-4">
        <div className="flex items-center justify-center w-full space-y-2 mt-6 flex-col">
          {data.icon}
          <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-xl dark:text-gray-200">
            {data.title}
          </h1>
        </div>
        <div className="flex mt-2 items-start flex-col">
          {data.options.map((option: any, index: number) => (
            <button
              key={index}
              className="px-4 py-2 mb-2 w-full bg-gray-100 rounded-3xl"
            >
              <p className="text-gray-800 text-xs font-semibold dark:text-gray-200">
                {option}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyContent;
