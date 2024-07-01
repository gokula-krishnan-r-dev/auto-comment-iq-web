import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarItems } from "../../content/Sidebardata";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  return (
    <nav className="w-[100px] lg:block hidden">
      <ScrollArea role="div" className="h-screen">
        <SidebarNav />
        <section className=" ">
          <div className="py-4 px-4 rounded-full">
            <div className="bg-white flex-col rounded-full space-y-4 py-4 flex items-center">
              <SidebarItem
                bgColor="bg-black"
                icon={
                  <svg
                    height={24}
                    width={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                }
              />
            </div>
          </div>
        </section>
      </ScrollArea>
    </nav>
  );
};

export default Sidebar;

function SidebarNav() {
  return (
    <div>
      <section className=" ">
        <div className="py-4 px-4 rounded-full">
          <div className="bg-white flex-col rounded-full space-y-4 py-4 flex items-center">
            <SidebarItem
              bgColor="bg-black"
              icon={
                <svg
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.3514 5 8.34694 6.48637 7.5 8.5C4.8 8.9375 3 11.2001 3 13.6493Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              }
            />
            <br />
            {SidebarItems.filter((item: any) => !item.isImportant).map(
              (item, index) => (
                <SidebarItem
                  key={index}
                  tag={item.tag}
                  path={item.path}
                  url={item.url}
                  title={item.title}
                  bgColor="bg-custom-gray"
                  icon={item.icon}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
