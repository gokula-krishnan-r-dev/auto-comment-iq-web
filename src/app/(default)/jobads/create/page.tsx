"use client";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

const DynamicForm = dynamic(
  () => import("@/components/shared/Jobads/CreateForm")
);
const CollaborationForm = dynamic(
  () => import("@/components/shared/Jobads/CollaborationForm")
);
const AdsForm = dynamic(() => import("@/components/shared/Jobads/AdsForm"));

interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

const Page: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([
    {
      id: "job",
      label: "Post A Jobs",
      content: <DynamicForm />,
    },
    {
      id: "collaboration",
      label: "Post A Collaboration",
      content: <CollaborationForm />,
    },
    {
      id: "ads",
      label: "Post A Ads",
      content: <AdsForm />,
    },
  ]);

  return (
    <main>
      <div className="px-24 py-12 flex items-center justify-center">
        <Tabs defaultValue={tabs[0].id} className="w-full max-w-2xl">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollArea className="h-[80vh]">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
