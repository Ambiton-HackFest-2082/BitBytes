import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AppSidebar({ items }) {
  const location = useLocation();
  useEffect(() => {}, [location.pathname]);
  const { open, openMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        {/* <img src={logo} width={50} alt="Brahmastra Academy" /> */}
        {open && (
          <span className="text-[18px] text-green-600 font-bold">
            SikshyaSetu
          </span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black-100 text-[14px]">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="p-[2px]">
                  <button
                    onClick={() => handleNavigate(item.url)}
                    className={`${
                      item.url.includes(location.pathname)
                        ? "bg-green-500"
                        : "hover:bg-gray-100/50"
                    }  rounded-md w-full flex px-2 py-3 items-center gap-x-2 cursor-pointer`}
                  >
                    <span
                      className={`${
                        item.url.includes(location.pathname)
                          ? "text-white"
                          : "text-black-100"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span
                      className={`text-[15px] ${
                        item.url.includes(location.pathname)
                          ? "text-white"
                          : "text-black-100"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs mb-1 text-primary-200">
          {" "}
          &copy; 2025 SikshyaSetu
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
