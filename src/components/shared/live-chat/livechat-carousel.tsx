import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

function CarouselLive({ children, className, autoscroll }: any) {
  return (
    <Carousel autoscroll={autoscroll} className={cn("", className)}>
      <CarouselContent className="w-[80vw]">{children}</CarouselContent>
      {/* <CarouselPrevious className="ml-12" /> */}
      {/* <CarouselNext className="mr-12" /> */}
    </Carousel>
  );
}

export default CarouselLive;
