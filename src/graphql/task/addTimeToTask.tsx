import gql from "graphql-tag";

export const ADD_TIME_TO_TASK = gql`
  mutation AddTimeToTask(
    $taskId: ID!
    $duration: String!
    $date: String!
    $description: String
  ) {
    addTimeToTask(
      taskId: $taskId
      duration: $duration
      date: $date
      description: $description
    ) {
      success
      message
    }
  }
`;
