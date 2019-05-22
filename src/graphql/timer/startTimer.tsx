import gql from "graphql-tag";

export const START_TIMER = gql`
  mutation StartTimer($taskId: ID!) {
    startTimer(taskId: $taskId) {
      success
      message
      result {
        id
        startedAt
      }
    }
  }
`;
