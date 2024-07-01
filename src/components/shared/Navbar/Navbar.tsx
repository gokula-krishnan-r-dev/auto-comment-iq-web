import { NotebookTextIcon, Settings, Watch } from "lucide-react";
import React from "react";
import SidebarItem from "../Sidebar/SidebarItem";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CircleButton from "@/components/ui/circle-button";
interface NavItem {
  id: number;
  label: string;
  link: string;
}

const Navbar: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 1, label: "Overview", link: "/overview" },
    { id: 2, label: "Features", link: "/features" },
    { id: 3, label: "Contact", link: "/contact" },
  ];

  return (
    <header className="py-4 lg:flex hidden pr-8 pl-4  items-center w-full justify-between mt-2">
      <nav>
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="px-5 py-3 rounded-full font-medium bg-gray-200 transition duration-300"
            >
              <Link href={item.link} className="text-gray-800">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="flex items-center gap-4">
        <div className="">
          <div className="flex items-center gap-2 border rounded-full px-2 py-2">
            <SidebarItem
              className="w-12 h-12"
              icon={<NotebookTextIcon />}
              bgColor="bg-gray-200"
            />
            <h3 className="font-medium">Sat,26Aug</h3>
            <div className="bg-red-500 px-2 text-white rounded-full">6</div>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <div>
              <Watch />
            </div>
          </PopoverTrigger>
          <PopoverContent className="sm:max-w-max -ml-44 mt-2">
            <div className="w-full">
              <CircleButton className="flex items-center gap-3">
                connect to watch os <Watch />
              </CircleButton>
            </div>
          </PopoverContent>
        </Popover>

        <SidebarItem
          className="w-14 h-14"
          icon={<Settings />}
          bgColor="bg-white"
        />
        <SidebarItem
          className="w-14 h-14"
          icon={<Settings />}
          bgColor="bg-white"
        />
      </section>
    </header>
  );
};

export default Navbar;
