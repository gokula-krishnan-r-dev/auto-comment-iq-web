import TitleGeneraedWithAI from "@/components/shared/Generated/title-generated";
import React from "react";

const page = () => {
  return (
    <main>
      <TitleGeneraedWithAI
        isAllCopy={true}
        className="grid grid-cols-3 gap-4"
        url="ai-tag-generator"
        description="Streamline Your Video Tagging Experience: Instantly Generate Relevant Tags with Our Advanced YouTube Tag Generator."
        title="Effortlessly Save Time on YouTube Tagging with Our Advanced Video Tag Generator"
      />
    </main>
  );
};

export default page;
