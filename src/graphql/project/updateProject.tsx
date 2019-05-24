import gql from "graphql-tag";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $clientId: ID!
    $users: [ID!]!
  ) {
    updateProject(id: $id, name: $name, clientId: $clientId, users: $users) {
      success
      message
    }
  }
`;
