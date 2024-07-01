import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DatePickerWithRange } from "./DatePicker";

export type DateOption = "day" | "week" | "month" | "year" | "custom";

interface FilterByDateProps {
  options: any[];
  handleClick: (dateOption: any) => void;
  handleCustomeClick: any;
}

const FilterByDate: React.FC<FilterByDateProps> = ({
  options,
  handleClick,
  handleCustomeClick,
}) => {
  return (
    <div className="gap-2 flex items-center">
      {options.map((option, index) => {
        return (
          <div key={index} className="">
            {option === "custom" ? (
              <DatePickerWithRange
                button={
                  <button
                    key={index}
                    className="px-5 py-3 capitalize rounded-full bg-gray-100"
                  >
                    {option.label}
                  </button>
                }
              >
                <Calendar
                  initialFocus
                  mode="range"
                  onSelect={(e) => {
                    handleCustomeClick(e?.from, e?.to);
                  }}
                  numberOfMonths={2}
                />
              </DatePickerWithRange>
            ) : (
              <button
                key={index}
                className="px-5 py-3 uppercase rounded-full bg-gray-100"
                onClick={() => handleClick(option.option)}
              >
                {option.label}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterByDate;
