import gql from "graphql-tag";

export const CREATE_TASK = gql`
  mutation CreateTask($sectionId: ID!, $name: String!) {
    createTask(sectionId: $sectionId, name: $name) {
      success
      message
    }
  }
`;
