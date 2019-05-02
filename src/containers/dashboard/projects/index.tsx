import React, { Component } from "react";
import { Table, Divider, Dropdown, Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
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
    loading: false
  };

  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
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
      <div
        className="list"
        style={{
          margin: "24px 48px",
          backgroundColor: "#fff",
          padding: "48px 16px",
          borderRadius: 8
        }}
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
      </div>
    );
  }
}

export default Projects;
