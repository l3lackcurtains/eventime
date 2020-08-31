import {
  AreaChartOutlined,
  CheckSquareOutlined,
  DesktopOutlined,
  PieChartOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    key: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <PieChartOutlined />,
  },
  {
    key: 2,
    name: "Timer",
    path: "/dashboard/timer",
    icon: <DesktopOutlined />,
  },
  {
    key: 3,
    name: "Projects",
    path: "/dashboard/projects",
    icon: <CheckSquareOutlined />,
  },
  {
    key: 4,
    name: "Clients",
    path: "/dashboard/clients",
    icon: <UsergroupAddOutlined />,
  },
  {
    key: 5,
    name: "Reports",
    path: "/dashboard/reports",
    icon: <SnippetsOutlined />,
  },
  {
    key: 6,
    name: "Expenses",
    path: "/dashboard/expenses",
    icon: <PieChartOutlined />,
  },
  {
    key: 7,
    name: "Invoices",
    path: "/dashboard/invoices",
    icon: <AreaChartOutlined />,
  },
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
            {menu.icon}
            <span className="nav-text">{menu.name}</span>
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default DashSideBar;
