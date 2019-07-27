import gql from "graphql-tag";

export const GET_EXPENSES = gql`
  {
    getExpenses {
      amount
      details
      billable
      category
      date
      user {
        email
      }
      project {
        name
      }
    }
  }
`;

export const GET_EXPENSE = gql`
  query getExpense($id: ID!) {
    getExpense(id: $id) {
      amount
      details
      billable
      category
      date
    }
  }
`;

export const GET_EXPENSE_STATS = gql`
  query getGroupedExpensesStat {
    getGroupedExpensesStat {
      total
      categoryStat {
        total
        category
        percentage
      }
    }
  }
`;
