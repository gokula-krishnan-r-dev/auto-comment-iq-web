import { useJobSearch } from "@/components/provider/JobProvider";
import dynamic from "next/dynamic";
import { ListFilter, Search } from "lucide-react";
import React from "react";

const CircleButton = dynamic(() => import("@/components/ui/circle-button"));
const SearchSection = () => {
  const { setSearchTerm } = useJobSearch();
  return (
    <div className="flex gap-2 items-center justify-between  ">
      <div className="w-full relative">
        <Search className="absolute top-1/2 left-4 transform -translate-y-1/2" />
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Jobs"
          type="text"
          className="bg-gray-100 pl-12 rounded-full w-full px-6 py-4"
        />
      </div>
      <div className="">
        <CircleButton>
          <ListFilter />
        </CircleButton>
      </div>
    </div>
  );
};

export default SearchSection;
