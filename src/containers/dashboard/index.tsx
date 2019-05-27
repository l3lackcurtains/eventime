import { Button, Drawer, Layout } from "antd";
import React, { useState } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import DashHeader from "../../components/dashHeader";
import DashSideBar from "../../components/dashSideBar";
import ProtectedRoute from "../../utils/components";
import Clients from "./clients";
import Dash from "./dash";
import Expenses from "./expenses";
import Invoices from "./invoices";
import Projects from "./projects";
import SingleProject from "./projects/singleProject";
import Reports from "./reports";
import Timer from "./timer";

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
        <div className="logo-area">
          <img
            alt="logo"
            src="https://wac-cdn.atlassian.com/dam/jcr:616e6748-ad8c-48d9-ae93-e49019ed5259/Atlassian-horizontal-blue-rgb.svg?cdnVersion=359"
          />
        </div>
        <DashSideBar />
      </StyledSider>
      <Drawer
        title={
          <div className="logo-area">
            <img
              alt="logo"
              src="https://wac-cdn.atlassian.com/dam/jcr:616e6748-ad8c-48d9-ae93-e49019ed5259/Atlassian-horizontal-blue-rgb.svg?cdnVersion=359"
            />
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
          <DashHeader history={props.history} />
        </StyledHeader>
        <StyledContent>
          <Switch>
            <ProtectedRoute exact path="/dashboard" component={Dash} />
            <ProtectedRoute path="/dashboard/timer" component={Timer} />
            <ProtectedRoute
              path="/dashboard/projects"
              exact
              component={Projects}
            />
            <ProtectedRoute
              path="/dashboard/projects/:project"
              component={SingleProject}
            />
            <ProtectedRoute path="/dashboard/clients" component={Clients} />
            <ProtectedRoute path="/dashboard/reports" component={Reports} />
            <ProtectedRoute path="/dashboard/expenses" component={Expenses} />
            <ProtectedRoute path="/dashboard/invoices" component={Invoices} />
          </Switch>
        </StyledContent>
        <StyledFooter>EvenTime - 2019</StyledFooter>
      </Layout>
    </Layout>
  );
};

const StyledSider = styled(Sider)`
  background: #fff;
  .logo-area {
    height: 75px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    img {
      width: 180px;
    }
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
