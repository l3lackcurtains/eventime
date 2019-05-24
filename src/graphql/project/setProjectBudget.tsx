import gql from "graphql-tag";

export const SET_PROJECT_BUDGET = gql`
  mutation SetProjectBudget($id: ID!, $amount: Int!, $type: String!) {
    setProjectBudget(id: $id, amount: $amount, type: $type) {
      success
      message
    }
  }
`;
