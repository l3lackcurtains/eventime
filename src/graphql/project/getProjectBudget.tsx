import gql from "graphql-tag";

export const GET_PROJECT_BUDGET = gql`
  query GetProjectBudget($id: ID!) {
    getProjectBudget(id: $id) {
      success
      result {
        id
        amount
        type
        progress
      }
    }
  }
`;
