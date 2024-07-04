"use client";
import { useAuth } from "@/components/provider/AuthProvider";
import CountSectionViews from "@/components/shared/Dashboard/CountSectionViews";
import HeroD from "@/components/shared/Dashboard/HeroD";
import RoomStatus from "@/components/shared/Dashboard/RoomStatus";
import VideoSection from "@/components/shared/Dashboard/VideoSection";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const Page = () => {
  const [subCount, setSubCount] = React.useState<any>(0);

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
  const channelid = "UCX6OQ3DkcsbYNE6H8uQQuVA";

  const { accessToken } = useAuth();
  console.log(accessToken, "accessToken");
  const { data, isLoading, error } = useQuery("reports", async () => {
    try {
      const response = await axios.get(
        `https://youtubeanalytics.googleapis.com/v2/reports?endDate=2024-09-30&ids=channel%3D%3DMINE&metrics=views%2Ccomments%2Clikes%2Cdislikes%2CestimatedMinutesWatched%2CaverageViewDuration%2CsubscribersGained%2CannotationImpressions&startDate=2001-01-01`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      throw error;
    }
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const subCountData = subCount && JSON?.parse(subCount);

  return (
    <div>
      <div className="px-4 ">
        <ScrollArea className="h-[86vh]">
          <HeroD subCountData={subCountData} data={data} />
          <RoomStatus />
          <CountSectionViews subCountData={subCountData} data={data} />
          <VideoSection />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
