import React, { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Timer from "./timer";
import Dash from "./dash";
import Projects from "./projects";
import Clients from "./clients";
import Reports from "./reports";
import SingleProject from "./projects/singleProject";
import Expenses from "./expenses";
import Invoices from "./invoices";
import DashSideBar from "../../components/dashSideBar";
import DashHeader from "../../components/dashHeader";
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = (props: any) => {
  // Slider Collapse
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  // Drawer Open and Close
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onDrawerClose = () => {
    setDrawerVisible(false);
  };
  const onDrawerOpen = () => {
    setDrawerVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledSider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ background: "#fff" }}
        width={250}
      >
        <div className="logo" style={{ height: 60, padding: 32 }}>
          LOGO
        </div>
        <DashSideBar />
      </StyledSider>
      <Drawer
        title={
          <div className="logo" style={{ height: 60, padding: 32 }}>
            LOGO
          </div>
        }
        placement="left"
        onClose={onDrawerClose}
        visible={drawerVisible}
      >
        <DashSideBar />
      </Drawer>
      <Layout>
        <StyledHeader>
          <DrawerOpenerButton onClick={onDrawerOpen} icon="menu" size="large" />
          <DashHeader />
        </StyledHeader>
        <StyledContent>
          <Switch>
            <Route path="/" exact component={Dash} />
            <Route path="/timer" component={Timer} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/projects/:project" component={SingleProject} />
            <Route path="/clients" component={Clients} />
            <Route path="/reports" component={Reports} />
            <Route path="/expenses" component={Expenses} />
            <Route path="/invoices" component={Invoices} />
          </Switch>
        </StyledContent>
        <StyledFooter>EvenTime - 2019</StyledFooter>
      </Layout>
    </Layout>
  );
};

const StyledSider = styled(Sider)`
  background: #fff;
  .logo {
    height: 60px;
    padding: 32px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const DrawerOpenerButton = styled(Button)`
  @media (min-width: 768px) {
    display: none;
  }
  margin: 16px;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 80px;
  padding: 12px 0;
  border-bottom: 1px solid #e3e3e3;
`;

const StyledContent = styled(Content)`
  margin: 0 16px;
  padding: 36px;
  min-height: 450;

  @media (max-width: 767px) {
    margin: 36px 8px;
    padding: 6px 8px;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export default Dashboard;
