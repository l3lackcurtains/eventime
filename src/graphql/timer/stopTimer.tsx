import gql from "graphql-tag";

export const STOP_TIMER = gql`
  mutation StopTimer($taskId: ID!) {
    stopTimer(taskId: $taskId) {
      success
      message
    }
  }
`;
