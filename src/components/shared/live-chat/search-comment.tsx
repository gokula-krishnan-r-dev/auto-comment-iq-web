import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import CircleButton from "@/components/ui/circle-button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function SearchComment({ button, className, search }: any) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <CircleButton
        onClick={() => setOpen(!open)}
        className={cn(className, "fixed bottom-5 right-5")}
      >
        {button}
      </CircleButton>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className="outline-none border-none "
          placeholder="Type a command or search..."
        />
        <CommandList className="!opacity-100 blur-none z-50">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {search?.map((room: any, index: any) => (
              <CommandItem
                title={room.video_title}
                key={index}
                className="gap-2 !opacity-100 !pointer-events-auto"
              >
                <Link
                  href={`/livechat/${room.roomId}`}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={room.channel_logo}
                      alt={room.channel_name}
                    />
                    <AvatarFallback>{room?._id}</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{room.video_title}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            {search?.map((room: any, index: any) => (
              <CommandItem
                title={room.video_title}
                key={index}
                className="gap-2 !opacity-100 !pointer-events-auto"
              >
                <Link
                  href={`/livechat/${room.roomId}`}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={room.channel_logo}
                      alt={room.channel_name}
                    />
                    <AvatarFallback>{room?._id}</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{room.video_title}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default SearchComment;
