import axios from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const Descriptionai = ({ des }: any) => {
  const formattedDes = des.replace(/\n/g, "<br>");
  const {
    data: description,
    error: descriptionError,
    isLoading: descriptionLoading,
  } = useQuery(
    "fetchAiDescription",
    async () => {
      try {
        const res = await axios.get(
          `/api/llama13/description?message=${des}&system="re write a YouTube video description in 1 and make it more design and add more link and more look desgin and more sentence"`
        );
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch AI title");
      }
    },
    {
      enabled: !!des,
    }
  );

  return (
    <section>
      <div className="text-center pt-6">
        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl dark:text-white">
          Features: Stats
        </h2>
        <p className="mt-4 md:text-lg text-gray-600 dark:text-gray-400">
          Quickly get a project started with any of our examples ranging from
          using parts of the UI to custom components and layouts using Tailwind
          CSS.
        </p>
        <div className="px-24 text-start py-6">
          <h2 className="text-xl font-semibold capitalize mb-2">
            orginal description
          </h2>
          <div className="border rounded-3xl px-6 py-4 bg-white text-sm font-semibold">
            <div dangerouslySetInnerHTML={{ __html: formattedDes }} />
          </div>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold capitalize mb-2">
            Ai description
          </h2>
          <div className="text-start">
            {description &&
              description?.map((item: any, index: number) => (
                <button
                  key={index}
                  className="px-6 py-3 mt-8 bg-white rounded-3xl"
                >
                  <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                    {item?.description}
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  </h2>
                </button>
              ))}
            {descriptionLoading && <div>Loading...</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Descriptionai;
