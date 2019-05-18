import { Button, Card, Col, Dropdown, Menu, Modal, Row, Table } from "antd";
import React, { useState } from "react";
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
    title: "Expense",
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

const Expenses = () => {
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
   * Create Expense Modal
   */

  const [createExpenseModalVisible, setCreateExpenseModalVisible] = useState(
    false
  );

  const onChangeExpenseModalState = (state: boolean) => {
    setCreateExpenseModalVisible(state);
  };

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
              onClick={() => onChangeExpenseModalState(true)}
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
        title="Add a new Expense"
        style={{ top: 20 }}
        visible={createExpenseModalVisible}
        onOk={() => onChangeExpenseModalState(false)}
        onCancel={() => onChangeExpenseModalState(false)}
      >
        <AddExpense />
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

export default Expenses;
