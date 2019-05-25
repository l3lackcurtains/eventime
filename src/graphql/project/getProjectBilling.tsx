import gql from "graphql-tag";

export const GET_PROJECT_BILLING = gql`
  query GetProjectBilling($id: ID!) {
    getProjectBilling(id: $id) {
      success
      result {
        id
        rate
        type
      }
    }
  }
`;
