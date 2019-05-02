import React, { Component } from "react";
import { Table, Divider, Dropdown, Button, Menu, Modal } from "antd";
import AddClient from "./addClient";

const menu = (
  <Menu>
    <Menu.Item>Archive</Menu.Item>
    <Menu.Item>Unarchive</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Budget",
    dataIndex: "budget"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 200,
    render: (text: string, record: any) => (
      <span>
        <a href="javascript:;">Edit</a>
      </span>
    )
  }
];
const data = [
  {
    key: "1",
    name: "Bryan van Rooyen",
    budget: "34h 55m of 120h"
  },
  {
    key: "2",
    name: "The moisture factory",
    budget: "12h 04m of 150h"
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

class Clients extends Component {
  state = {
    modal1Visible: false,
    selectedRowKeys: [],
    loading: false
  };

  setModal1Visible(modal1Visible: any) {
    this.setState({ modal1Visible });
  }

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
      <div>
        <Button
          type="primary"
          icon="plus"
          onClick={() => this.setModal1Visible(true)}
        >
          Add Client
        </Button>

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
        <Modal
          title="Add a new Client"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          width={750}
        >
          <AddClient />
        </Modal>
      </div>
    );
  }
}

export default Clients;
