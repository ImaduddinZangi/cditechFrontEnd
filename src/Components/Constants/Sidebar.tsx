import React, { ReactNode, useState } from "react";
import AuthFooter from "./AuthFooter";
import { FiLogOut, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const Menus = [
    { title: "Dashboard", src: "dashboard", href: "/client-dashboard" },
    { title: "Client Profile", src: "client", href: "/client-profile" },
    {
      title: "Pump Brands Table",
      src: "table",
      href: "pump-brands-table",
    },
    {
      title: "Inspection Table",
      src: "table",
      href: "inspection-table",
    },
    {
      title: "Customers",
      src: "customer",
      isDropdown: true,
      dropdownItems: [
        { title: "Customers Table", src: "table", href: "/customer-table" },
        {
          title: "Manage Customer",
          src: "manage-customer",
          href: "/manage-customer",
        },
      ],
    },
    {
      title: "Files",
      src: "files",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Inspection Reports",
          src: "reports",
          href: "/inspection-reports",
        },
        { title: "Add Photos", src: "photo", href: "/add-photos" },
      ],
    },
    { title: "Setting", src: "setting" },
  ];

  const handleLogout = async () => {
    try {
      localStorage.clear();
      toast.error("Logging Out the User", {
        onClose: () => window.location.reload(),
        autoClose: 500,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDropdownClick = (menuTitle: string) => {
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  return (
    <div className="flex font-inter">
      <div
        className={` ${
          open ? "w-[15vw]" : "w-[6vw]"
        } bg-white h-screen fixed border-r p-[1.25vw] pt-[2vw] duration-300`}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-[1vw] top-[2.2vw] w-[2vw] border-dark-purple
           border rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-[1vw] items-center">
          <img
            src="/assets/Content.png"
            className={`cursor-pointer w-[1.5vw] h-[1.5vw] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-[1.5vw]">
          {Menus.map((Menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`flex rounded-md p-[0.5vw] cursor-pointer hover:bg-light-white text-gray-300 text-[0.9vw] items-center mt-[0.3vw] ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <div
                  className="flex items-center w-full"
                  onClick={() =>
                    Menu.isDropdown ? handleDropdownClick(Menu.title) : null
                  }
                >
                  <a
                    href={Menu.href}
                    className="flex items-center gap-x-[1vw] w-full"
                  >
                    <img
                      src={`/assets/${Menu.src}.png`}
                      className="w-[1.7vw] h-[1.7vw]"
                    />
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300 flex items-center`}
                    >
                      {Menu.title}
                      {Menu.isDropdown && (
                        <span className="ml-[0.5vw]">
                          {activeDropdown === Menu.title ? (
                            <FiChevronDown className="text-[1.2vw]" />
                          ) : (
                            <FiChevronRight className="text-[1.2vw]" />
                          )}
                        </span>
                      )}
                    </span>
                  </a>
                </div>
              </li>
              {Menu.isDropdown && Menu.dropdownItems && (
                <ul
                  className={`${
                    activeDropdown === Menu.title ? "block" : "hidden"
                  } ml-[1.5vw]`}
                >
                  {Menu.dropdownItems.map((dropdownItem, idx) => (
                    <li
                      key={idx}
                      className="flex rounded-md p-[0.5vw] cursor-pointer hover:bg-light-white text-gray-300 text-[0.9vw] items-center mt-[0.5vw]"
                    >
                      <a
                        href={dropdownItem.href}
                        className="flex items-center gap-x-[1vw]"
                      >
                        <img
                          src={`/assets/${dropdownItem.src}.png`}
                          className="w-[1.5vw] h-[1.5vw]"
                        />
                        <span
                          className={`${
                            !open && "hidden"
                          } origin-left duration-300`}
                        >
                          {dropdownItem.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className={`flex flex-row items-center justify-center fixed ${
          open ? "bottom-[1.5vw]" : "bottom-[1vw]"
        } ${open ? "left-[1.5vw]" : "left-[1vw]"} ${
          open ? "w-[12vw]" : "w-[4vw]"
        } bg-purple-0 p-[0.9vw] rounded-[0.5vw] transition-all duration-300`}
      >
        <FiLogOut
          className={`text-white font-bold ${
            open ? "mr-[1vw]" : "mr-0"
          } text-[1.4vw]`}
        />
        <p
          className={`text-white font-inter text-[1.1vw] font-semibold ${
            open ? "block" : "hidden"
          }`}
        >
          Logout
        </p>
      </button>
      <div
        className={`flex-1 min-h-screen bg-lightgray-0 overflow-auto ${
          open ? "ml-[15vw]" : "ml-[6vw]"
        } duration-300`}
      >
        {children}
        <div
          className={`fixed bottom-0 ${
            open ? "w-[85vw]" : "w-[94vw]"
          } duration-300`}
        >
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
