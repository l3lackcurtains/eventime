import gql from "graphql-tag";

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $clientId: ID!, $users: [ID!]!) {
    createProject(name: $name, clientId: $clientId, users: $users) {
      success
      message
    }
  }
`;
