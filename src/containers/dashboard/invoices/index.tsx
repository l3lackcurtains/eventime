import React, { useState } from "react";
import { Table, Dropdown, Button, Menu, Modal, Card, Row, Col } from "antd";
import styled from "styled-components";

import CreateInvoice from "./createInvoice";
import InvoiceChart from "./invoiceChart";

const menu = (
  <Menu>
    <Menu.Item>Delete</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Client",
    dataIndex: "client"
  },
  {
    title: "Period",
    dataIndex: "period"
  },
  {
    title: "Duration",
    dataIndex: "duration"
  },
  {
    title: "Amount",
    dataIndex: "amount"
  },
  {
    title: "Issue Date",
    dataIndex: "issueDate"
  },
  {
    title: "Status",
    dataIndex: "status"
  }
];

const data = [
  {
    key: "1",
    client: "The Moisture Factory",
    period: "May 1 to Dec 12",
    duration: "23h 45m",
    amount: 6780,
    issueDate: "Dec 12",
    status: "draft"
  },
  {
    key: "2",
    client: "Brian Van Rooyen",
    period: "May 12 to Sep 12",
    duration: "45h 12m",
    amount: 12300,
    issueDate: "Sep 12",
    status: "paid"
  }
];

const Invoices = () => {
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
   * Create Invoice Modal
   */

  const [createInvoiceModalVisible, setCreateInvoiceModalVisible] = useState(
    false
  );

  const onChangeInvoiceModalState = (state: boolean) => {
    setCreateInvoiceModalVisible(state);
  };

  return (
    <div>
      <Card
        title={
          <StyledCardTitle>
            <h1>Invoices</h1>
            <Button
              type="primary"
              icon="plus"
              size="large"
              onClick={() => onChangeInvoiceModalState(true)}
            >
              Create Invoice
            </Button>
          </StyledCardTitle>
        }
      >
        <Row>
          <InvoiceChart />
        </Row>
        <div
          style={{
            padding: "48px 16px",
            borderRadius: 8
          }}
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
        </div>
      </Card>

      <Modal
        title="Create Invoice"
        style={{ top: 20 }}
        visible={createInvoiceModalVisible}
        onOk={() => onChangeInvoiceModalState(false)}
        onCancel={() => onChangeInvoiceModalState(false)}
      >
        <CreateInvoice />
      </Modal>
    </div>
  );
};

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

export default Invoices;
