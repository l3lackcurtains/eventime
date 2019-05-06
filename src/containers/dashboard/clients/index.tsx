import React, { useState } from "react";
import { Table, Dropdown, Button, Menu, Modal, Card } from "antd";
import AddClient from "./addClient";
import styled from "styled-components";

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

const Clients = () => {
  /**
   * Table Rows Selection
   */
  const [selectedRowKeys, setSelectedRowKey] = useState([]);

  const onTableRowSelection = (selKeys: any) => {
    setSelectedRowKey(selKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableRowSelection
  };

  const hasSelected = selectedRowKeys.length > 0;

  /**
   * Create Client Modal
   */

  const [createClientModalVisible, setCreateClientModalVisible] = useState(
    false
  );

  const onChangeClientModalState = (state: boolean) => {
    setCreateClientModalVisible(state);
  };

  return (
    <div>
      <Card
        title={
          <>
            <StyledCardTitle>
              <h1>Clients</h1>
              <Button
                type="primary"
                icon="plus"
                size="large"
                onClick={() => onChangeClientModalState(true)}
              >
                Add Client
              </Button>
            </StyledCardTitle>
          </>
        }
      >
        <StyledAboveTable>
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            disabled={!hasSelected}
          >
            <Button type="dashed">Bulk Actions</Button>
          </Dropdown>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </StyledAboveTable>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Modal
        title="Add a new Client"
        style={{ top: 20 }}
        visible={createClientModalVisible}
        onOk={() => onChangeClientModalState(false)}
        onCancel={() => onChangeClientModalState(false)}
        width={750}
      >
        <AddClient />
      </Modal>
    </div>
  );
};

// TODO: Need to make it reusable
const StyledCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding: 8px 0;
  }
`;

const StyledAboveTable = styled.div`
  margin: 24px 0;
`;

export default Clients;
