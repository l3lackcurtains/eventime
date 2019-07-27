import gql from "graphql-tag";

export const GET_CLIENTS = gql`
  {
    getClients {
      id
      name
    }
  }
`;
