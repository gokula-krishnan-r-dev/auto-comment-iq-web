import CircleButton from "@/components/ui/circle-button";
import { ArrowRight, LinkIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const AdsPreview = ({ ads, setShowAds }: any) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(1);

  const isVideo = ads?.url.endsWith(".mp4");
  const overlayColor = "rgba(0, 0, 0, 0.6)";

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const skipAd = () => {
    setShowAds(false);
  };

  useEffect(() => {
    const skipButtonTimeout = setTimeout(() => {
      setShowSkipButton(true);
    }, 1000);
    setShowAds(false);
    const countdownInterval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(skipButtonTimeout);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="relative capitalize rounded-3xl overflow-hidden">
      <div
        // href={`${ads?.ads_company_website}`}
        // target="_black"
        className="relative"
      >
        <CircleButton onClick={skipAd} className="absolute p-2 top-3 right-3">
          {!showSkipButton ? (
            <div className="">{secondsRemaining}s</div>
          ) : (
            <X size={24} className="font-bold" />
          )}
        </CircleButton>
        {isVideo ? (
          <video width="100%" height="100%" controls>
            <source src={ads?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            width={400}
            height={400}
            className="rounded-3xl w-full h-full"
            src={ads?.url}
            alt=""
          />
        )}

        <div className="absolute bottom-2 w-full text-white px-6 gap-4">
          <div>
            <div
              className="absolute z-10 inset-0 bg-opacity-50"
              style={{ backgroundColor: overlayColor }}
            ></div>
            <div className="flex !z-20  pt-1 relative justify-between items-center gap-4">
              <div className=" flex items-center gap-4">
                <Image
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-12 h-12"
                  src={ads?.ads_company_logo}
                  alt=""
                />
                <div className="">
                  <h1 className="text-lg font-bold">{ads?.title}</h1>
                  <div
                    title={ads?.description}
                    className="flex items-center flex-wrap gap-2"
                  >
                    {showFullDescription ? (
                      <p className="text-sm">{ads?.description}</p>
                    ) : (
                      <p className="text-sm line-clamp-1">
                        {ads?.description.split(" ").slice(0, 6).join(" ")}
                      </p>
                    )}

                    {ads?.description.split(" ").length > 20 && (
                      <button
                        className="text-sm relative z-50 text-blue-500 hover:underline focus:outline-none"
                        onClick={toggleDescription}
                      >
                        {showFullDescription ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                  <div className="">
                    <p className="text-xs gap-2 flex items-center text-gray-400">
                      {ads?.ads_company_website}
                      <LinkIcon size={14} className="inline" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <CircleButton className="p-3 hover:bg-black hover:text-white duration-300 text-black border bg-white">
                  <ArrowRight size={24} className="font-bold   -rotate-45" />
                </CircleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPreview;
