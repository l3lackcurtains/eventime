import gql from "graphql-tag";

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $name: String
    $description: String
    $dueAt: String
    $status: String
  ) {
    updateTask(
      id: $id
      name: $name
      description: $description
      dueAt: $dueAt
      status: $status
    ) {
      success
      message
    }
  }
`;
