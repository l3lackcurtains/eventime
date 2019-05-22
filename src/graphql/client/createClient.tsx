import gql from "graphql-tag";

export const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $details: String) {
    createClient(name: $name, details: $details) {
      success
      message
    }
  }
`;
