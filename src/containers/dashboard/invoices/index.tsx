import React, { Component } from "react";
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

class Invoices extends Component {
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
        <Card
          title={
            <StyledCardTitle>
              <h1>Invoices</h1>
              <Button
                type="primary"
                icon="plus"
                size="large"
                onClick={() => this.setModal1Visible(true)}
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
        </Card>

        <Modal
          title="Create Invoice"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <CreateInvoice />
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

export default Invoices;
