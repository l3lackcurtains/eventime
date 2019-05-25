import gql from "graphql-tag";

export const SET_PROJECT_BILLING = gql`
  mutation SetProjectBilling($id: ID!, $rate: Int!, $type: String!) {
    setProjectBilling(id: $id, rate: $rate, type: $type) {
      success
      message
    }
  }
`;
