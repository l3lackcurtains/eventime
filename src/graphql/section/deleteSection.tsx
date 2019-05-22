import gql from "graphql-tag";

export const DELETE_SECTION = gql`
  mutation DeleteSection($id: ID!) {
    deleteSection(id: $id)
  }
`;
