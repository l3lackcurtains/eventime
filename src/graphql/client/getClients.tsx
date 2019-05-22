import gql from "graphql-tag";

export const GET_CLIENTS = gql`
  {
    getClients {
      success
      results {
        id
        name
      }
    }
  }
`;
