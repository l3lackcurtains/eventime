import gql from "graphql-tag";

export const GET_PROJECTS = gql`
  {
    getProjects {
      success
      results {
        id
        name
        slug
      }
    }
  }
`;
