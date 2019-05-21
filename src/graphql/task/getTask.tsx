import gql from "graphql-tag";

const GET_TASK = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      success
      result {
        id
        name
        description
        dueAt
        createdAt
      }
    }
  }
`;

export default GET_TASK;
