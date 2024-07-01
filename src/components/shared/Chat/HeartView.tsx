import { Heart } from "lucide-react";
import React from "react";
import { TooltipBox } from "../LibComponent/Tooltip";
import Image from "next/image";

interface HeartViewProps {
  isUserAuthorized: boolean;
  isCurrentUser: boolean;
  AddHeart: (id: string | undefined) => void;
  data: any;
  room: any;
}

const HeartView: React.FC<HeartViewProps> = ({
  isUserAuthorized,
  isCurrentUser,
  AddHeart,
  data,
  room,
}: HeartViewProps) => {
  const handleClick = () => {
    if (data?._id) {
      AddHeart(data._id);
    }
  };

  return (
    <div>
      {(isUserAuthorized || data.heart) && (
        <TooltipBox 
          content={
            <div>
              {!isUserAuthorized ? (
                <div className="flex gap-2 items-center">
                  <Image
                    src={room?.channel_logo}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                  />
                  <h2 className="text-xs font-semibold">
                    {room?.channel_name}
                  </h2>
                </div>
              ) : (
                <p className="text-xs font-semibold">
                  {data.heart ? "Heart" : "unHeart"}
                </p>
              )}
            </div>
          }
        >
          <div
            onClick={isUserAuthorized ? handleClick : undefined}
            className={`cursor-pointer ${
              isUserAuthorized ? "" : "opacity-100"
            }`}
          >
            <Heart
              fill={data?.heart ? "red" : "white"}
              color={!isUserAuthorized ? "red" : "black"}
              size={20}
            />
          </div>
        </TooltipBox>
      )}
      {/* {!isUserAuthorized && (
        <>
          {isCurrentUser && (
            <TooltipBox
              content={
                <div>
                  <p className="text-xs font-semibold">
                    {data.heart ? "Heart" : "unHeart"}
                  </p>
                </div>
              }
            >
              <div className="cursor-pointer">
                <Heart fill={data?.heart ? "red" : "white"} size={20} />
              </div>
            </TooltipBox>
          )}
        </>
      )} */}
    </div>
  );
};

export default HeartView;
