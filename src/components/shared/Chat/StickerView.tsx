import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

const StickerView = ({ handleImages }: any) => {
  const fetchGif = async () => {
    const res = await fetch(
      "https://api.giphy.com/v1/stickers/trending?api_key=EwxOF42qgyfNwM64buuXQp2rPsfJU8O5&limit=25&offset=0&rating=g&bundle=messaging_non_clips"
    );
    return res.json();
  };
  const { data: gif, error, isLoading } = useQuery("gif", fetchGif);
  return (
    <section className="py-4">
      <div className="">
        <div>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Any Gif"
            required
          />
        </div>
        <div className="">
          <ScrollArea className="h-[400px] rounded-2xl">
            <div className="mt-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error && " something went wrong ! "}</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {gif.data.map((gif: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => handleImages(gif.images.fixed_height.url)}
                      className="cursor-pointer"
                    >
                      <Image
                        height={gif.images.fixed_height.height}
                        width={gif.images.fixed_height.width}
                        className="w-full h-full object-cover rounded-xl"
                        key={gif.id}
                        src={gif.images.fixed_height.url}
                        alt={gif.title}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default StickerView;
