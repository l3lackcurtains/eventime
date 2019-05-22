import gql from "graphql-tag";

export const UPDATE_SECTION = gql`
  mutation UpdateSection($id: ID!, $name: String) {
    updateSection(id: $id, name: $name) {
      success
      message
    }
  }
`;
