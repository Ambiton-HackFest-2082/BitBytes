
import { useSidebar } from "@/components/ui/sidebar";
import Dropdown from "./DropDown";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

const CustomHeader = () => {
  const { toggleSidebar } = useSidebar();

 

//   const logoutUser = async () => {
//     try {
//       await auth.logout();
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const items = [
    {
      label: "Profile",
      path: "/student/profle",
      icon: <User />,
    },
    {
      label: "Logout",
    //   onclick: logoutUser,
      icon: <LogOut />,
    },
  ];

  const Trigger = () => {
    return (
      <div className="flex justify-center items-center gap-x-2 hover:cursor-pointer">
        <div className="h-10 w-10 bg-gray-200 rounded-full border border-gray-400"></div>
        {/* <p className="text-primary-500 text-[15px]">{user.fullName}</p> */}
        <span>
           <ChevronDown />
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white px-3 py-3 flex justify-between items-center sticky top-0 z-10 border-b">
      <button
        onClick={toggleSidebar}
        className="text-2xl text-black-100 rounded-full hover:cursor-pointer"
      >
       <Menu />
      </button>
      <div className="flex gap-x-4 items-center">
        
        <Dropdown items={items} trigger={<Trigger />} />
      </div>
    </div>
  );
};

export default CustomHeader;
