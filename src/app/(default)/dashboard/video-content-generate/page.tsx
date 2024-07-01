"use client";
import ContentHero from "@/components/shared/AiChat/content-hero";
import GeneratedContent from "@/components/shared/AiChat/generated-content";
import React, { useState } from "react";

const page = () => {
  const [input, setInput] = useState<string>("");
  const [isInput, setIsInput] = useState<boolean>(false);

  return (
    <main className="px-8">
      {isInput ? (
        <GeneratedContent input={input} />
      ) : (
        <ContentHero setInput={setInput} setIsInput={setIsInput} />
      )}
    </main>
  );
};

export default page;
