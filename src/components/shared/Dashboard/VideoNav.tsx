import { Filter, MoreVertical, TrendingUpIcon } from "lucide-react";
import React from "react";
import SidebarItem from "../Sidebar/SidebarItem";

const VideoNav = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TrendingUpIcon size={24} />
        <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
          You tube video
        </h3>
      </div>
      <div className="">
        <div className="flex items-center gap-2">
          <nav>
            <ul className="flex items-center gap-2">
              <li className="text-black bg-gray-200 rounded-full px-6 font-medium py-3">
                All
              </li>
              <li className="text-black bg-gray-200 rounded-full px-6 font-medium py-3">
                Shap
              </li>
              <li className="text-black bg-gray-200 rounded-full px-6 font-medium py-3">
                Category
              </li>
            </ul>
          </nav>
          <SidebarItem
            icon={<MoreVertical className="w-5 h-5" />}
            bgColor="bg-gray-200"
          />
          <SidebarItem
            title={"Filter"}
            icon={<Filter className="w-5 h-5" />}
            bgColor="bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoNav;
