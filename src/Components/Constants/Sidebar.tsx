import React, { ReactNode, useState } from "react";
import AuthFooter from "./AuthFooter";
import { FiLogOut, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

interface SubMenuItem {
  title: string;
  src: string;
  href: string;
}

interface MenuItem {
  title: string;
  src: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: SubMenuItem[];
}

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const Menus: MenuItem[] = [
    { title: "Dashboard", src: "dashboard", href: "/client-dashboard" },
    { title: "New Rapid Task", src: "client", href: "/new-rapid-task" },
    {
      title: "Quick Search",
      src: "table",
      href: "/quick-search",
    },
    {
      title: "Customers",
      src: "customer",
      isDropdown: true,
      dropdownItems: [
        { title: "Manage Customers", src: "table", href: "/manage-customers" },
        {
          title: "Add New Customer",
          src: "table",
          href: "/add-customer",
        },
      ],
    },
    {
      title: "Tasks",
      src: "customer",
      isDropdown: true,
      dropdownItems: [
        { title: "Task Manager", src: "table", href: "/manage-tasks" },
        {
          title: "My Tasks",
          src: "manage-customer",
          href: "/my-tasks",
        },
        {
          title: "My Task History",
          src: "manage-customer",
          href: "/my-task-history",
        },
        {
          title: "Add New Customer Task",
          src: "manage-customer",
          href: "/add-new-customer-task",
        },
        {
          title: "Easy Task Editor",
          src: "manage-customer",
          href: "/easy-task-editor",
        },
      ],
    },
    {
      title: "Inspections",
      src: "inspection",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Inspection Manager",
          src: "inspection",
          href: "/manage-inspections",
        },
        {
          title: "My Inspections",
          src: "log",
          href: "/manage-inspections",
        },
        {
          title: "My Inspection History",
          src: "log",
          href: "/my-inspection-history",
        },
        {
          title: "Add New Inspection",
          src: "log",
          href: "/add-inspection",
        },
        {
          title: "Inspection Checklist Manager",
          src: "log",
          href: "/manage-inspection-checklists",
        },
      ],
    },
    {
      title: "Maps",
      src: "map",
      isDropdown: true,
      dropdownItems: [
        { title: "Customers", src: "", href: "/customers-map" },
        {
          title: "Tasks",
          src: "log",
          href: "/tasks-map",
        },
        {
          title: "Inspections",
          src: "log",
          href: "/inspections-map",
        },
        {
          title: "Assets",
          src: "log",
          href: "/assets-map",
        },
        {
          title: "One Click Task Route",
          src: "log",
          href: "/one-click-task-route",
        },
        {
          title: "One Click Inspection Route",
          src: "log",
          href: "/one-click-inspection-route",
        },
      ],
    },
    {
      title: "Calendars",
      src: "files",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Task Calendar",
          src: "reports",
          href: "/task-calendar",
        },
        {
          title: "Inspection Calendar",
          src: "reports",
          href: "/inspection-calendar",
        },
      ],
    },
    {
      title: "Billing",
      src: "files",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Invoice Manager",
          src: "reports",
          href: "/manage-invoices",
        },
        {
          title: "Products",
          src: "reports",
          href: "/products",
        },
        {
          title: "Services",
          src: "reports",
          href: "/services",
        },
      ],
    },
    {
      title: "Users & Groups",
      src: "files",
      isDropdown: true,
      dropdownItems: [
        {
          title: "User Management",
          src: "reports",
          href: "/manage-users",
        },
        {
          title: "Group Management",
          src: "reports",
          href: "/manage-groups",
        },
        {
          title: "Add New User",
          src: "reports",
          href: "/add-client-user",
        },
        {
          title: "Current User Sessions",
          src: "reports",
          href: "/currect user sessions",
        },
      ],
    },
    {
      title: "Support",
      src: "files",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Support Case Management",
          src: "reports",
          href: "/support-case-management",
        },
        {
          title: "Education Center",
          src: "reports",
          href: "/education-center",
        },
        {
          title: "Chat With Support",
          src: "reports",
          href: "/chat-with-support",
        },
        {
          title: "Contact Us",
          src: "reports",
          href: "/contact-us",
        },
        {
          title: "About Us",
          src: "reports",
          href: "/about-us",
        },
      ],
    },
    {
      title: "Settings",
      src: "setting",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Task Settings",
          src: "reports",
          href: "/task-settings",
        },
        {
          title: "Client Profile",
          src: "reports",
          href: "/client-profile",
        },
        {
          title: "My Fee Plan",
          src: "reports",
          href: "/my-fee-plan",
        },
        {
          title: "Log Dashboard",
          src: "reports",
          href: "/log-dashboard",
        },
        {
          title: "Pump Brands",
          src: "reports",
          href: "/manage-pump-brands",
        },
        {
          title: "My User Profile",
          src: "reports",
          href: "/my-user-profile",
        },
      ],
    },
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
        className={`${
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
          {Menus.map((Menu: MenuItem, index: number) => (
            <React.Fragment key={index}>
              <li
                className={`flex rounded-md p-[0.5vw] cursor-pointer hover:bg-light-white text-gray-700 text-[0.9vw] items-center mt-[0.3vw] ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <div className="flex items-center w-full">
                  {Menu.href ? (
                    <Link
                      to={Menu.href}
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
                    </Link>
                  ) : (
                    <div
                      className="flex items-center gap-x-[1vw] w-full"
                      onClick={() =>
                        Menu.isDropdown ? handleDropdownClick(Menu.title) : null
                      }
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
                    </div>
                  )}
                </div>
              </li>
              {Menu.isDropdown && Menu.dropdownItems && (
                <ul
                  className={`${
                    activeDropdown === Menu.title ? "block" : "hidden"
                  } ml-[1.5vw]`}
                >
                  {Menu.dropdownItems.map(
                    (dropdownItem: SubMenuItem, idx: number) => (
                      <li
                        key={idx}
                        className="flex rounded-md p-[0.5vw] cursor-pointer hover:bg-light-white text-gray-700 text-[0.9vw] items-center mt-[0.5vw]"
                      >
                        <Link
                          to={dropdownItem.href}
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
                        </Link>
                      </li>
                    )
                  )}
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
          className={`block ${open ? "w-[84.7vw]" : "w-[93.7vw]"} duration-300`}
        >
          <AuthFooter />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Sidebar;
