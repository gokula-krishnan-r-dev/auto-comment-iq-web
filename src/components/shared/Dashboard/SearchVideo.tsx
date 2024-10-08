import CircleButton from "@/components/ui/circle-button";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

const SearchVideo = ({ handleSearch, setSearchQuery, searchQuery }: any) => {
  const handleKeyPress = (e: any) => {
    setSearchQuery(e.target.value);
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <section>
      <div className="py-2 flex items-center gap-2">
        <div className="relative w-1/2">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Video here..."
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchQuery);
              }
            }}
            className="px-6 border w-full border-gray-200 py-3 bg-gray-100/60 rounded-3xl"
          />
          {searchQuery?.length > 0 && (
            <button className="absolute top-0 right-3 py-3">
              <X />
            </button>
          )}
        </div>
        <CircleButton onClick={handleKeyPress} className="px-6 py-3">
          <Search size={24} />
        </CircleButton>
      </div>
    </section>
  );
};

export default SearchVideo;
