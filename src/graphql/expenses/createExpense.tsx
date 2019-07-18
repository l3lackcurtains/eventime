import gql from "graphql-tag";

export const CREATE_EXPENSE = gql`
  mutation createExpense(
    $amount: Int!
    $projectId: ID!
    $userId: ID!
    $details: String
    $billable: Boolean
    $category: String!
    $date: String!
  ) {
    createExpense(
      amount: $amount
      projectId: $projectId
      userId: $userId
      details: $details
      billable: $billable
      category: $category
      date: $date
    )
  }
`;
