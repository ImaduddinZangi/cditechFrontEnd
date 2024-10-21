import React, { ReactNode, useEffect, useState } from "react";
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
    { title: "New Rapid Task", src: "reminder", href: "/new-rapid-task" },
    {
      title: "Quick Search",
      src: "find",
      href: "/quick-search",
    },
    {
      title: "Customers",
      src: "customer",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Manage Customers",
          src: "management",
          href: "/manage-customers",
        },
        {
          title: "Add New Customer",
          src: "people",
          href: "/add-customer",
        },
      ],
    },
    {
      title: "Extras",
      src: "dummy",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Client Profile",
          src: "dummy",
          href: "/client-profile",
        },
        {
          title: "Services",
          src: "dummy",
          href: "/manage-services",
        },
        {
          title: "Pump Brands",
          src: "dummy",
          href: "/manage-pump-brands",
        },
      ],
    },
    {
      title: "Tasks",
      src: "clipboard",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Task Manager",
          src: "project-management",
          href: "/manage-tasks",
        },
        {
          title: "My Tasks",
          src: "checklist",
          href: "/my-tasks",
        },
        {
          title: "My Task History",
          src: "file",
          href: "/my-task-history",
        },
        {
          title: "Add New Customer Task",
          src: "portfolio",
          href: "/add-new-customer-task",
        },
        {
          title: "Easy Task Editor",
          src: "checklist1",
          href: "/easy-task-editor",
        },
      ],
    },
    {
      title: "Inspections",
      src: "checked",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Inspection Manager",
          src: "inspection",
          href: "/manage-inspections",
        },
        {
          title: "My Inspections",
          src: "task",
          href: "/manage-inspections",
        },
        {
          title: "My Inspection History",
          src: "history",
          href: "/my-inspection-history",
        },
        {
          title: "Add New Inspection",
          src: "more",
          href: "/add-inspection",
        },
        {
          title: "Inspection Checklist Manager",
          src: "quality-control",
          href: "/manage-inspection-checklists",
        },
      ],
    },
    {
      title: "Maps",
      src: "placeholder",
      isDropdown: true,
      dropdownItems: [
        { title: "Customers", src: "customer-journey", href: "/customers-map" },
        {
          title: "Tasks",
          src: "checklist",
          href: "/tasks-map",
        },
        {
          title: "Inspections",
          src: "journey",
          href: "/inspections-map",
        },
        {
          title: "Assets",
          src: "placeholder",
          href: "/assets-map",
        },
        {
          title: "One Click Task Route",
          src: "location1",
          href: "/one-click-task-route",
        },
        {
          title: "One Click Inspection Route",
          src: "location",
          href: "/one-click-inspection-route",
        },
      ],
    },
    {
      title: "Calendars",
      src: "calendar",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Task Calendar",
          src: "dummy",
          href: "/task-calendar",
        },
        {
          title: "Inspection Calendar",
          src: "dummy",
          href: "/inspection-calendar",
        },
      ],
    },
    {
      title: "Billing",
      src: "dummy",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Invoice Manager",
          src: "dummy",
          href: "/manage-invoices",
        },
        {
          title: "Products",
          src: "dummy",
          href: "/products",
        },
        {
          title: "Services",
          src: "dummy",
          href: "/services",
        },
      ],
    },
    {
      title: "Users & Groups",
      src: "dummy",
      isDropdown: true,
      dropdownItems: [
        {
          title: "User Management",
          src: "dummy",
          href: "/manage-users",
        },
        {
          title: "Group Management",
          src: "dummy",
          href: "/manage-user-groups",
        },
        {
          title: "Add New User",
          src: "dummy",
          href: "/add-client-user",
        },
        {
          title: "Current User Sessions",
          src: "dummy",
          href: "/currect user sessions",
        },
      ],
    },
    {
      title: "Support",
      src: "dummy",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Support Case Management",
          src: "dummy",
          href: "/support-case-management",
        },
        {
          title: "Education Center",
          src: "dummy",
          href: "/education-center",
        },
        {
          title: "Chat With Support",
          src: "dummy",
          href: "/chat-with-support",
        },
        {
          title: "Contact Us",
          src: "dummy",
          href: "/contact-us",
        },
        {
          title: "About Us",
          src: "dummy",
          href: "/about-us",
        },
      ],
    },
    {
      title: "Settings",
      src: "dummy",
      isDropdown: true,
      dropdownItems: [
        {
          title: "Task Settings",
          src: "dummy",
          href: "/task-settings",
        },
        {
          title: "Client Profile",
          src: "dummy",
          href: "/client-profile",
        },
        {
          title: "My Fee Plan",
          src: "dummy",
          href: "/my-fee-plan",
        },
        {
          title: "Log Dashboard",
          src: "dummy",
          href: "/log-dashboard",
        },
        {
          title: "Pump Brands",
          src: "dummy",
          href: "/manage-pump-brands",
        },
        {
          title: "My User Profile",
          src: "dummy",
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
    if (!open) return;
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  useEffect(() => {
    if (!open) {
      setActiveDropdown(null);
    }
  }, [open]);

  return (
    <div className="flex font-inter">
      <div
        className={`bg-white h-screen overflow-y-auto overflow-x-hidden fixed border-r p-[1.25vw] pt-[2vw] duration-300 pb-[12vh] ${
          open ? "w-[15vw]" : "w-[6vw]"
        } `}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer right-0 top-[2.2vw] w-[2vw]
                ${!open && "rotate-180"}`}
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
                className={`flex rounded-md p-[0.5vw] cursor-pointer hover:bg-slate-200 text-darkgray-0 text-[0.9vw] items-center mt-[0.3vw] ${
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
                        className="flex rounded-md p-[0.5vw] cursor-pointer hover:bg-slate-200 text-darkgray-0 text-[0.9vw] items-center mt-[0.5vw]"
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
