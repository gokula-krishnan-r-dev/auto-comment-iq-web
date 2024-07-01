import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, VolumeX } from "lucide-react";

export function FileStory() {
  return (
    <Carousel className="w-full h-[80vh] max-w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative h-[80vh]">
              <nav className="absolute top-0 left-0 px-4 py-4 w-full flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="http://localhost:3001/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAIdro_kSsyRQtQPdSxDRPrNhMjeZyeWgvE8-ArqLY9Z7_g%3Ds800-c-k-c0x00ffffff-no-rj&w=48&q=75http://localhost:3001/_next/image?url=https%3A%2F%2Fyt3.ggpht.com%2Fytc%2FAIdro_kSsyRQtQPdSxDRPrNhMjeZyeWgvE8-ArqLY9Z7_g%3Ds800-c-k-c0x00ffffff-no-rj&w=48&q=75"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h3 className="text-base font-semibold">
                      GOKULA KRISHNAN R
                    </h3>
                    <p>
                      subscribers:<span>787M</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="">
                    <Play size={18} />
                  </button>
                  <button className="">
                    <VolumeX size={18} />
                  </button>
                </div>
              </nav>
              <div className="">
                <img
                  className="rounded-3xl h-full w-full"
                  src="https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
