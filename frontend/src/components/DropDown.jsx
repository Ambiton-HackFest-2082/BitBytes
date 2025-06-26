import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Dropdown = ({ trigger, items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {items.map((item, index) => (
          <div key={index}>
            <DropdownMenuItem asChild>
              <button onClick={item.onclick && item.onclick} className="w-full flex items-center justify-between hover:cursor-pointer">
                <Link to={item.path && item.path} className="text-primary-100">
                  {item.label}
                </Link>
                <span className="text-primary-200">{item.icon && item.icon}</span>
              </button>
            </DropdownMenuItem>
            {
                index !== items.length - 1 && <DropdownMenuSeparator />
            }
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
