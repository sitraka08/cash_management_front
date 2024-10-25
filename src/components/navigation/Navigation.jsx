import React, { useState } from "react";
import "./Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  IoPeople,
  IoLocate,
  IoPieChart,
  IoPencil,
  IoBook,
  IoBookOutline,
  IoFolderOpen,
  IoBookmarks,
} from "react-icons/io5";

const menuItems = [
  {
    title: "Statistiques",
    icon: <IoPieChart className="icon" />,
    path: "/1",
    exact: true,
  },
  {
    title: "Validation CRCM",
    icon: <IoBook className="icon" />,
    path: "/1/validation",
  },
  {
    title: "Validation CPR",
    icon: <IoFolderOpen className="icon" />,
    path: "/1/validation_cpr",
  },
  {
    title: "Liste agents",
    icon: <IoPeople className="icon" />,
    path: "/1/agent",
  },

  {
    title: "Barème",
    icon: <IoBookmarks className="icon" />,
    path: "/1/bareme",
  },
];

const Navigation = ({ isActive }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    Array(menuItems.length).fill(false)
  );

  const location = useLocation();
  const currentPath = location.pathname;
  const findMenuItem = (path) => {
    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      if (item.path === path) {
        return item;
      }
      if (item.subMenus) {
        for (const subItem of item.subMenus) {
          if (subItem.path === path) {
            return item;
          }
        }
      }
    }
    return null;
  };

  const menuItem = findMenuItem(currentPath);

  const initialActiveItem = menuItem ? menuItems.indexOf(menuItem) : null;
  const [activeItem, setActiveItem] = useState(initialActiveItem);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const toggleSubMenu = (index) => {
    const updatedSubMenuOpen = [...subMenuOpen];
    updatedSubMenuOpen[index] = !updatedSubMenuOpen[index];
    setSubMenuOpen(updatedSubMenuOpen);
  };

  return (
    <div className={`navigation ${isActive ? "active" : ""}`}>
      <div className="mt-5">
        <Link>
          <div className="w-fit  cursor-pointer  rounded-xl m-2 text-center">
            <h1 className="text-white ">SVSP</h1>
          </div>
        </Link>
      </div>
      <ul className="mt-[110px]">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} end={item.exact}>
              <h5 className="listeItem ">
                <span className={`flex justify-center items-center `}>
                  {item.icon}
                  <div className="flex flex-col listItemContains">
                    <div className={`title`}>{item.title}</div>
                  </div>
                </span>
              </h5>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
