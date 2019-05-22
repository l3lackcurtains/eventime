import gql from "graphql-tag";

export const GET_USER = gql`
  {
    getUser {
      success
      result {
        id
      }
    }
  }
`;
