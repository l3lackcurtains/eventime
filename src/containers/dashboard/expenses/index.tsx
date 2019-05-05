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
    title: "Expense",
    dataIndex: "expense"
  },
  {
    title: "Project",
    dataIndex: "project"
  },
  {
    title: "Member",
    dataIndex: "member"
  },
  {
    title: "Date",
    dataIndex: "date"
  },
  {
    title: "Amount",
    dataIndex: "amount"
  }
];
const data = [
  {
    key: "1",
    expense: "Entertainment - While working on the project",
    project: "Time Management App",
    member: "Madhav Poudel",
    date: "May 2",
    amount: 10000
  },
  {
    key: "2",
    expense: "Transportation - Moving from x to y",
    project: "Evenhour project",
    member: "Umesh Subedi",
    date: "May 1",
    amount: 2000
  },
  {
    key: "3",
    expense: "Services - Website Maintainence",
    project: "Time Management App",
    member: "Madan Poudel",
    date: "April 12",
    amount: 16000
  }
];

const pieChartColumns = [
  {
    title: "category",
    dataIndex: "category"
  },
  {
    title: "Amount",
    dataIndex: "amount"
  },
  {
    title: "Percentage",
    dataIndex: "percentage"
  }
];
const pieChartData = [
  {
    key: "1",
    category: "Entertainment ",
    amount: 23000,
    percentage: `33%`
  },
  {
    key: "1",
    category: "Transportation ",
    amount: 18000,
    percentage: `25%`
  },
  {
    key: "1",
    category: "Infrastructure ",
    amount: 18000,
    percentage: `25%`
  },
  {
    key: "1",
    category: "Others ",
    amount: 12000,
    percentage: `17%`
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
            <Col sm={12}>
              <Table
                columns={pieChartColumns}
                dataSource={pieChartData}
                pagination={false}
                size="small"
              />
            </Col>
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
          title="Add a new Expense"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
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
