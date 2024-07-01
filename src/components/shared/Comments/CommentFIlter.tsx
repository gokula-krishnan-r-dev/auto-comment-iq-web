import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommentFilterProps {
  length: number;
  setSelectedType: React.Dispatch<React.SetStateAction<CommentType | any>>;
  selectedType: CommentType | any;
  options: { value: any; label: string }[];
}

export type CommentType =
  | "all Comment"
  | "negative"
  | "positive"
  | "best"
  | "neutral";

const CommentFilter: React.FC<CommentFilterProps> = ({
  length,
  selectedType,
  setSelectedType,
  options,
}) => {
  return (
    <section className="">
    
      <div className="">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Comment Type" />
          </SelectTrigger>
          <SelectContent>
            {options.map((typeObj) => (
              <SelectItem key={typeObj.value} value={typeObj.value}>
                {typeObj.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default CommentFilter;
