import React from "react";
import { Table, Divider, Dropdown, Button, Menu } from "antd";

const menu = (
  <Menu>
    <Menu.Item>Archive</Menu.Item>
    <Menu.Item>Unarchive</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: (
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button type="dashed">Bulk Actions</Button>
      </Dropdown>
    ),
    dataIndex: "name"
  },
  {
    title: "",
    dataIndex: "actions",
    width: 200,
    render: (text: string, record: any) => (
      <span>
        <a href="javascript:;">Edit</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
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

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  hideDefaultSelections: true
};

const Projects = () => {
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Projects;
