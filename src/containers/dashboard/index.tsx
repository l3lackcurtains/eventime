import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import {
  Route,
  Switch,
  NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import Timer from "./timer";
import Dash from "./dash";
import Projects from "./projects";
import Clients from "./clients";
import Reports from "./reports";
import SingleProject from "./projects/singleProject";
import Expenses from "./expenses";
import Invoices from "./invoices";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ background: "#fff" }}
          width={250}
        >
          <div className="logo" style={{ height: 60 }}>
            LOGO
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">
              <NavLink to="/">
                <Icon type="pie-chart" />
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/timer">
                <Icon type="desktop" />
                <span className="nav-text">Time</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/projects">
                <Icon type="check-square" />
                <span className="nav-text">Projects</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/clients">
                <Icon type="usergroup-add" />
                <span className="nav-text">Clients</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/reports">
                <Icon type="snippets" />
                <span className="nav-text">Reports</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="8">
              <NavLink to="/expenses">
                <Icon type="pie-chart" />
                <span className="nav-text">Expenses</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink to="/invoices">
                <Icon type="area-chart" />
                <span className="nav-text">Invoices</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content
            style={{ margin: "0 16px", padding: "36px 48px", minHeight: 360 }}
          >
            <Switch>
              <Route path="/" exact component={Dash} />
              <Route path="/timer" component={Timer} />
              <Route path="/projects" component={Projects} />
              <Route path="/project/:project" component={SingleProject} />
              <Route path="/clients" component={Clients} />
              <Route path="/reports" component={Reports} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/invoices" component={Invoices} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
