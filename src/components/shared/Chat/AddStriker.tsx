import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StickyNote } from "lucide-react";
import React from "react";
import TabsView from "./Tabs";

const AddStriker = ({ handleImages, setMessage }: any) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="">
          <StickyNote />
        </div>
      </PopoverTrigger>
      <PopoverContent className="lg:ml-24 ml-0 w-[350px] lg:w-[500px]">
        <TabsView setMessage={setMessage} handleImages={handleImages} />
      </PopoverContent>
    </Popover>
  );
};

export default AddStriker;
