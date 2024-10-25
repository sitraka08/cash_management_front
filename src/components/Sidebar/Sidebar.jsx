import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import AuthApi from "../../utils/AuthApi";
import { userConnectedStore } from "../../store/userConnectedStore/userConnectedStore";

const RECEPTION_MENU = [
  {
    title: "Statistiques",
    icon: IoStatsChart,
    path: "/admin/stats",
  },

  {
    title: "Clients",
    icon: FaUser,
    path: "/admin/clients",
  },
  {
    title: "Professeurs",
    icon: FaUser,
    path: "/admin/profs",
  },
  {
    title: "Etudiants",
    icon: FaUser,
    path: "/admin/students",
  },
  {
    title: "Salles",
    icon: FaUser,
    path: "/admin/rooms",
  },
  {
    title: "Formations",
    icon: FaUser,
    path: "/admin/trainings",
  },
];
const CAISSIER_MENU = [
  {
    title: "Statistiques",
    icon: IoStatsChart,
    path: "/caissier/stats",
  },
  {
    title: "Affectations",
    icon: FaUserCog,
    path: "/caissier/affectations/",
  },
  {
    title: "Participations",
    icon: FaUser,
    path: "/caissier/participations",
  },
  {
    title: "Ventes",
    icon: FaUser,
    path: "/caissier/ventes",
  },
  {
    title: "Logements",
    icon: FaUser,
    path: "/caissier/logements",
  },

  {
    title: "Achats",
    icon: FaUser,
    path: "/caissier/achats",
  },
];

const ADMIN_MENU = [
  {
    title: "Statistiques",
    icon: IoStatsChart,
    path: "/admin/stats",
  },
  {
    title: "Utilisateurs",
    icon: FaUserCog,
    path: "/admin/users/",
  },
  {
    title: "Réceptionniste",
    icon: MdAdminPanelSettings,
    subMenu: RECEPTION_MENU.filter((v) => v.title !== "Statistiques"),
  },
  {
    title: "Caissier",
    icon: MdAdminPanelSettings,
    subMenu: CAISSIER_MENU.filter((v) => v.title !== "Statistiques"),
  },
];

// ----------------------------------------------------------
const CHEF_MENU = [
  {
    title: "Statistiques",
    icon: IoStatsChart,
    path: "/2/stats",
    active: "/2/stats",
  },
  {
    title: "Validation CRCM",
    icon: FaUserCog,
    path: "/2/crcm/",
    active: "/2/crcm/",
  },
  {
    title: "Validation CPR",
    icon: FaUser,
    path: "/2/cpr",
    active: "/2/cpr",
  },
  {
    title: "Bareme",
    icon: FaUser,
    path: "/2/baremes",
    active: "/2/baremes",
  },
  {
    title: "Suivi des validation",
    icon: FaUser,
    path: "/2/suivi",
    active: "/2/suivi",
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const userConnected = userConnectedStore((s) => s.userConnected);

  const SIDE_LIST = true
    ? ADMIN_MENU
    : userConnected?.poste_id == "2"
    ? CHEF_MENU
    : [];

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  console.log(pathname, "pat");

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-40 flex h-screen w-72.5 flex-col overflow-y-hidden bg-primary duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <div className="flex items-center gap-5">
          <img src={logo} alt="" className="w-20 rounded" />
          <h1 className="text-[20px] font-bold text-center text-white">
            Caisse
          </h1>
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {SIDE_LIST.map((item, index) => {
                if (item.subMenu) {
                  return (
                    <SidebarLinkGroup
                      key={index}
                      activeCondition={item.subMenu.some(
                        (v) => v?.path === pathname
                      )}
                    >
                      {(handleClick, open) => {
                        return (
                          <>
                            <NavLink
                              to="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-zinc-800 ${
                                item.subMenu.some(
                                  (v) => v?.path === pathname
                                ) &&
                                "border border-white bg-white text-zinc-800"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {/* <div>
                                <item.icon />
                              </div> */}
                              {item.title}
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                  open && "rotate-180"
                                }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </NavLink>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                {item.subMenu.map((item, index) => (
                                  <li key={index}>
                                    <NavLink
                                      to={item.path}
                                      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                        pathname === item.active && "text-white"
                                      }`}
                                    >
                                      {item.title}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                } else {
                  return (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out
                           hover:bg-white hover:text-zinc-800 dark:hover:bg-meta-4 ${
                             (item.case_sensible
                               ? pathname === item.path
                               : pathname.includes(`${item.path}`)) &&
                             "border border-white bg-white text-zinc-800"
                           }`}
                      >
                        {/* <item.icon size={20} /> */}
                        {item.title}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
