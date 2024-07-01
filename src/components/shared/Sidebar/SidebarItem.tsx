"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC, ReactNode, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
interface SidebarItemProps {
  icon: ReactNode; // Accepts any valid ReactNode as an icon
  bgColor?: string; // Optional background color prop
  className?: string; // Accepts a string as a class name
  title?: string;
  url?: string;
  path?: string;
  tag?: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  bgColor = "white",
  className,
  title,
  url,
  path,
}) => {
  const [activeSidebar, setActiveSidebar] = useState<any>("");
  const pathname = usePathname();
  return (
    <Link
      onClick={() => setActiveSidebar(title)}
      title={title}
      href={`${path}`}
      className={cn(
        " flex items-center justify-center duration-300 rounded-full",
        bgColor,
        className,
        title ? "px-3 gap-2 py-3" : "w-11 h-11",
        pathname === path ? "bg-gray-300" : "hover:bg-gray-200"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger> {icon}</TooltipTrigger>
          <TooltipContent
            className="ml-20 capitalize rounded-full duration-150"
            sideOffset={-24}
          >
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default SidebarItem;
