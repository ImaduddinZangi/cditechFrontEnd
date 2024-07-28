import React, { ReactNode, useState } from "react";
import AuthFooter from "./AuthFooter";
import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [customersOpen, setCustomersOpen] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(false);
  const [pumpsOpen, setPumpsOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", src: "home-line", href: "/client-dashboard" },
    {
      title: "Customers",
      src: "User",
      isDropdown: true,
      dropdownItems: [
        { title: "Manage Customer Assets", href: "/manage-customer-asset" },
        { title: "Manage Customer Pumps", href: "/manage-customer-pump" },
        { title: "Add Customer", href: "/add-customer" },
      ],
    },
    {
      title: "Assets",
      src: "User",
      isDropdown: true,
      dropdownItems: [
        { title: "Add Asset", href: "/add-asset" },
        { title: "Add Asset Types", href: "/add-asset-type" },
      ],
    },
    {
      title: "Pumps",
      src: "Search",
      isDropdown: true,
      dropdownItems: [
        { title: "Add Pump Brand", href: "/add-pump-brand" },
      ],
    },
    { title: "Add Photos", src: "Folder", href: "/add-photos" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      window.location.reload();
      navigate("/client-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDropdownClick = (menuTitle: string) => {
    switch (menuTitle) {
      case "Customers":
        setCustomersOpen(!customersOpen);
        break;
      case "Assets":
        setAssetsOpen(!assetsOpen);
        break;
      case "Pumps":
        setPumpsOpen(!pumpsOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-[18vw]" : "w-[6vw]"
        } bg-white h-screen fixed border-r p-[1.25vw] pt-[2vw] duration-300`}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-[1vw] top-[2.2vw] w-[2vw] border-dark-purple
           border rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/Content.png"
            className={`cursor-pointer w-[2vw] h-[2vw] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-[1.5vw]">
          {Menus.map((Menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`flex rounded-md p-[0.5vw] cursor-pointer hover:bg-light-white text-gray-300 text-[1vw] items-center 
                ${Menu.gap ? "mt-[2.5vw]" : "mt-[0.5vw]"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <div
                  className="flex items-center w-full"
                  onClick={() =>
                    Menu.isDropdown ? handleDropdownClick(Menu.title) : null
                  }
                >
                  <a href={Menu.href} className="flex items-center gap-x-[1vw] w-full">
                    <img
                      src={`/assets/${Menu.src}.png`}
                      className="w-[2vw] h-[2vw]"
                    />
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300`}
                    >
                      {Menu.title}
                    </span>
                  </a>
                </div>
              </li>
              {Menu.isDropdown && Menu.dropdownItems && (
                <ul
                  className={`${
                    (Menu.title === "Customers" && customersOpen) ||
                    (Menu.title === "Assets" && assetsOpen) ||
                    (Menu.title === "Pumps" && pumpsOpen)
                      ? "block"
                      : "hidden"
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
        <div>
          <button
            onClick={handleLogout}
            className="flex flex-row items-center justify-center bg-purple-0 w-full p-[0.9vw] mt-[5vw] rounded-[0.5vw]"
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
        </div>
      </div>
      <div
        className={`flex-1 min-h-screen bg-lightgray-0 overflow-auto ${
          open ? "ml-[18vw]" : "ml-[6vw]"
        } duration-300`}
      >
        {children}
        <div
          className={`fixed bottom-0 ${
            open ? "w-[82vw]" : "w-[94vw]"
          } duration-300`}
        >
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
