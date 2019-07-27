import { Button, Card, Dropdown, Menu, Modal, Table } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { GET_CLIENTS } from "../../../graphql/client/getClients";
import CreateClient from "./createClient";

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
  }
];

const Clients = () => {
  const getClients = useQuery(GET_CLIENTS);

  const [selectedRowKeys, setSelectedRowKey] = useState([]);

  const onTableRowSelection = (selKeys: any) => {
    setSelectedRowKey(selKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableRowSelection
  };

  const hasSelected = selectedRowKeys.length > 0;

  // create client modal
  const [createClientModalVisible, setCreateClientModalVisible] = useState(
    false
  );

  const onChangeClientModalState = (state: boolean) => {
    setCreateClientModalVisible(state);
  };

  console.log(getClients);
  if (getClients.loading) return null;
  if (getClients.error) {
    return <div>Error loading client..</div>;
  }

  const clientsData = getClients.data.getClients;
  clientsData.map((client: any) => {
    client.key = client.id;
    return client;
  });

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
          dataSource={clientsData}
        />
      </Card>
      <Modal
        title="Add a new Client"
        style={{ top: 20 }}
        visible={createClientModalVisible}
        onOk={() => onChangeClientModalState(false)}
        onCancel={() => onChangeClientModalState(false)}
        width={750}
        footer={null}
      >
        <CreateClient
          onChangeClientModalState={onChangeClientModalState}
          refetchClients={getClients.refetch}
        />
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
