import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryData } from "@/components/content/country";
const CountryFilter = ({ setCountry }: { setCountry: any }) => {
  return (
    <section>
      <div className="">
        <Select onValueChange={setCountry}>
          <SelectTrigger className="">
            <SelectValue placeholder="All Country" />
          </SelectTrigger>
          <SelectContent>
            {CountryData.map((country: any) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="flex items-center space-x-2 !gap-4"
              >
                {country.emoji}
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default CountryFilter;
