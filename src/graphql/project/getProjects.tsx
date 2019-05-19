import gql from "graphql-tag";

const GET_PROJECTS = gql`
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

export default GET_PROJECTS;
