import gql from "graphql-tag";

const DELETE_SECTION = gql`
  mutation DeleteSection($id: ID!) {
    deleteSection(id: $id)
  }
`;

export default DELETE_SECTION;
