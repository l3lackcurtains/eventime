import React, { Component } from "react";
import { Table, Dropdown, Button, Menu, Modal, Card, Row, Col } from "antd";
import styled from "styled-components";

import AddExpense from "./addExpenses";
import ExpenseChart from "./expenseChart";

const menu = (
  <Menu>
    <Menu.Item>Delete</Menu.Item>
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

class Expenses extends Component {
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
              <h1>Expenses</h1>
              <Button
                type="primary"
                icon="plus"
                size="large"
                onClick={() => this.setModal1Visible(true)}
              >
                Add Expense
              </Button>
            </StyledCardTitle>
          }
        >
          <Row>
            <Col sm={12}>
              <ExpenseChart />
            </Col>
            <Col sm={12}>sd</Col>
          </Row>
        </Card>

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
          title="Add a new Expense"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          width={750}
        >
          <AddExpense />
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

export default Expenses;
