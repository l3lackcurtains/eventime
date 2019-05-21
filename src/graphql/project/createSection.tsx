import gql from "graphql-tag";

export const CREATE_SECTION = gql`
  mutation CreateSection($projectId: ID!, $name: String!) {
    createSection(projectId: $projectId, name: $name) {
      success
      message
    }
  }
`;
