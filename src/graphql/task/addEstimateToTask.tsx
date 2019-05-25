import gql from "graphql-tag";

export const ADD_ESTIMATE_TO_TASK = gql`
  mutation AddEstimateToTask($id: ID!, $total: Int!) {
    addEstimateToTask(id: $id, total: $total) {
      success
      message
    }
  }
`;
