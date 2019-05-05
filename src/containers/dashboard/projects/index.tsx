import React, { Component } from "react";
import { Table, Divider, Dropdown, Button, Menu, Card, Modal } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AddProject from "./addProject";

const menu = (
  <Menu>
    <Menu.Item>Archive</Menu.Item>
    <Menu.Item>Unarchive</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => {
      const projectUrl = text
        .toLowerCase()
        .split(" ")
        .join("-");
      return <NavLink to={`/project/${projectUrl}`}>{text}</NavLink>;
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 200,
    render: (text: string, record: any) => (
      <span>
        <a href="#">Edit</a>
        <Divider type="vertical" />
        <a href="#">Delete</a>
      </span>
    )
  }
];
const data = [
  {
    key: "1",
    name: "Time Management Application",
    actions: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "NNTask Application Development",
    actions: <p>hb</p>
  }
];
class Projects extends Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    modal1Visible: false
  };

  setModal1Visible(modal1Visible: any) {
    this.setState({ modal1Visible });
  }

  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
        modal1Visible: false
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Card
          title={
            <StyledCardTitle>
              <h1>Projects</h1>
              <Button
                type="primary"
                icon="plus"
                size="large"
                onClick={() => this.setModal1Visible(true)}
              >
                Create Project
              </Button>
            </StyledCardTitle>
          }
        >
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            disabled={!hasSelected}
          >
            <Button type="dashed" loading={loading}>
              Bulk Actions
            </Button>
          </Dropdown>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </Card>
        <Modal
          title="Create Invoice"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <AddProject />
        </Modal>
      </div>
    );
  }
}

const StyledCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding: 8px 0;
  }
`;

export default Projects;
