import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/TimeAgo";
import { StoryPopup } from "./StoryPopup";
import FileDrag from "./FileDrag";
import AdsForm from "./AdsForm";
import { FileStory } from "./FileeStory";
import CreatePolls from "./CreatePolls";
import CreateAds from "./CreateAds";
import { formatSubscriberCount } from "@/lib/countFormat";
import PinContent from "./pin-content";
import { ImageIcon, Plus, Vote } from "lucide-react";
import CircleButton from "@/components/ui/circle-button";
import { useChat } from "@/components/provider/ChatProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
const ChatHeader = ({
  roomId,

  isOnline,
  room,
  socket,
  authId,
  isAuthor,
  numberOfOnline,
}: any) => {
  const [subCount, setSubCount] = useState<any>();
  const { fetchPins, pins } = useChat();
  const [file, setFile] = useState<any>(null);
  const channelid = room?.channel_id;
  const SubCount = subCount && JSON?.parse(subCount);

  const formattedSubCount1 = formatSubscriberCount(
    SubCount?.counts?.[0]?.count
  );

  useEffect(() => {
    if (!socket || !roomId) return;

    fetchPins();
    socket.on("is-pinned", () => {
      fetchPins();
    });
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");

    ws.onopen = () => {
      ws.send(JSON.stringify(`subCount:${channelid}`));
    };

    ws.onmessage = (event) => {
      setSubCount(event?.data);
      console.log("Received:", event?.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <nav>
      <div className="bg-white border-b z-50 rounded-t-3xl px-6 py-4 w-full top-0 left-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-max">
              {room?.channel_logo && (
                <div className="relative">
                  <AnimatedTooltip
                    message={
                      isOnline ? "Active Now" : `${timeAgo(room?.isLeft)} ago`
                    }
                    isOnline={isOnline}
                  >
                    <StoryPopup
                      className="bg-transparent border-none sm:max-w-[480px]"
                      button={
                        <Image
                          objectFit="cover"
                          className="rounded-full"
                          width={64}
                          height={64}
                          src={room?.channel_logo || ""}
                          alt="channel logo"
                        />
                      }
                    >
                      <FileStory />
                    </StoryPopup>
                    <div
                      className={cn(
                        "w-4 h-4  rounded-full absolute top-0 -right-1 border-2 border-white",
                        {
                          "bg-green-500": isOnline,
                          "bg-gray-300": !isOnline,
                        }
                      )}
                    />
                  </AnimatedTooltip>
                </div>
              )}
            </div>
            {room && (
              <div className="">
                <h3
                  title={room?.video_title}
                  className="text-base line-clamp-1 font-semibold"
                >
                  {room?.video_title}
                </h3>
                <p>
                  subscribers:
                  <span>{formattedSubCount1}</span>
                </p>
              </div>
            )}
          </div>
          {isAuthor && (
            <div className="gap-2 flex items-center">
              <StoryPopup
                button={
                  <CircleButton className="rounded-xl text-sm font-semibold px-3 py-2 items-center flex-col flex">
                    <ImageIcon /> Story
                  </CircleButton>
                }
              >
                {!file ? (
                  <FileDrag setFile={setFile}>
                    <div className="">
                      <h1 className="text-base font-semibold">Add Stroy</h1>
                      <div className="flex items-center justify-center">
                        <img
                          className="w-[80%]"
                          src="/images/Folder.gif"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center">
                        <p className="text-sm text-gray-500">
                          Drag and drop your Image or Video here
                        </p>
                      </div>
                    </div>
                  </FileDrag>
                ) : (
                  <div className="">
                    <AdsForm roomId={roomId} file={file} />
                  </div>
                )}
              </StoryPopup>
              <StoryPopup
                className="max-w-[480px]"
                button={
                  <CircleButton className="rounded-xl text-sm font-semibold px-3 py-2 items-center flex-col flex">
                    <Vote /> Poll
                  </CircleButton>
                }
              >
                <CreatePolls socket={socket} roomId={roomId} />
              </StoryPopup>
              <StoryPopup
                className="max-w-[480px]"
                button={
                  <CircleButton className="rounded-xl text-sm font-semibold px-3 py-2 items-center flex-col flex">
                    <Plus /> Ads
                  </CircleButton>
                }
              >
                <CreateAds roomId={roomId} />
              </StoryPopup>
            </div>
          )}
          {numberOfOnline && (
            <Popover>
              <PopoverTrigger>
                <CircleButton
                  title={numberOfOnline?.user?.length}
                  className="text-xs py-2 font-semibold"
                >
                  {numberOfOnline?.user?.length} online
                </CircleButton>
              </PopoverTrigger>
              <PopoverContent className="ml-52 space-y-2">
                {numberOfOnline?.user?.map((user: any, index: any) => (
                  <CircleButton
                    key={index}
                    className="flex py-2 px-2 items-center gap-2"
                  >
                    <Image
                      className="rounded-full"
                      src={user?.profile?.picture}
                      alt={user?.username}
                      width={44}
                      height={44}
                    />
                    <p className="pr-3 text-xs font-semibold capitalize">
                      {user?.username}
                    </p>
                  </CircleButton>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <PinContent pins={pins} />
      </div>
    </nav>
  );
};

export default ChatHeader;
