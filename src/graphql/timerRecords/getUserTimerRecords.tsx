import gql from "graphql-tag";

export const GET_USER_TIMER_RECORDS = gql`
  {
    getUserTimerRecords {
      success
      message
      results {
        id
        duration
        date
        description
        startedAt
        stoppedAt
        type
        task {
          id
          name
        }
        user {
          email
        }
      }
    }
  }
`;
