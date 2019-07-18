import { Button, Card, Col, Dropdown, Menu, Modal, Row, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { GET_EXPENSES } from "../../../graphql/expenses/getExpenses";
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
    dataIndex: "category",
    render: (text: any, record: any) => {
      return (
        <ExpenseDetail>
          <p>{text}</p>
          <span>{record.details}</span>
        </ExpenseDetail>
      );
    }
  },
  {
    title: "Project",
    dataIndex: "projectName"
  },
  {
    title: "Member",
    dataIndex: "userEmail"
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
  const [selectedRowKeys, setSelectedRowKey] = useState([]);

  const onTableRowSelection = (selKeys: any) => {
    setSelectedRowKey(selKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableRowSelection
  };

  const hasSelected = selectedRowKeys.length > 0;

  const [createExpenseModalVisible, setCreateExpenseModalVisible] = useState(
    false
  );

  const getExpenses = useQuery(GET_EXPENSES);

  const onChangeExpenseModalState = (state: boolean) => {
    setCreateExpenseModalVisible(state);
  };

  let expensesData: any = [];
  if (!getExpenses.loading && !getExpenses.error) {
    expensesData = getExpenses.data.getExpenses;

    expensesData.map((expense: any) => {
      expense.key = expense.id;
      expense.date = moment(expense.date).fromNow();
      expense.projectName = expense.project.name;
      expense.userEmail = expense.user.email;
      return expense;
    });
  }

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
          dataSource={expensesData}
        />
      </Card>

      <Modal
        title="Add a new Expense"
        style={{ top: 20 }}
        visible={createExpenseModalVisible}
        footer={null}
        onOk={() => onChangeExpenseModalState(false)}
        onCancel={() => onChangeExpenseModalState(false)}
      >
        <AddExpense onChangeExpenseModalState={onChangeExpenseModalState} />
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

const ExpenseDetail = styled.div`
  span {
    font-size: 11px;
    color: #777;
  }
  p {
    margin: 4px 0;
  }
`;

export default Expenses;
