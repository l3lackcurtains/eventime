import gql from "graphql-tag";

export const GET_TIMER = gql`
  {
    getTimer {
      success
      result {
        id
        startedAt
        task {
          id
          name
        }
      }
    }
  }
`;
