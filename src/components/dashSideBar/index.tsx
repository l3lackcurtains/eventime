import React from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    key: 1,
    name: "Dashboard",
    path: "/",
    icon: "pie-chart"
  },
  {
    key: 2,
    name: "Timer",
    path: "/timer",
    icon: "desktop"
  },
  {
    key: 3,
    name: "Projects",
    path: "/projects",
    icon: "check-square"
  },
  {
    key: 4,
    name: "Clients",
    path: "/clients",
    icon: "usergroup-add"
  },
  {
    key: 5,
    name: "Reports",
    path: "/reports",
    icon: "snippets"
  },
  {
    key: 6,
    name: "Expenses",
    path: "/expenses",
    icon: "pie-chart"
  },
  {
    key: 7,
    name: "Invoices",
    path: "/invoices",
    icon: "area-chart"
  }
];

const DashSideBar = () => {
  const currentPath = window.location.pathname;
  const defaulSelectedMenu: any[] = [];
  menuItems.forEach((menu: any) => {
    if (currentPath.includes(menu.path)) {
      defaulSelectedMenu.push("" + menu.key);
    }
  });

  if (defaulSelectedMenu.length > 1) defaulSelectedMenu.shift();

  return (
    <Menu
      defaultSelectedKeys={defaulSelectedMenu}
      mode="inline"
      style={{ height: "100%", borderRight: 0 }}
    >
      {menuItems.map((menu: any) => (
        <Menu.Item key={menu.key}>
          <NavLink to={menu.path}>
            <Icon type={menu.icon} />
            <span className="nav-text">{menu.name}</span>
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default DashSideBar;
