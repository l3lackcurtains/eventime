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

export const GET_PROJECTS_WITH_TASKS = gql`
  {
    getProjectWithTasks {
      success
      results {
        id
        name
        sections {
          id
          name
          tasks {
            id
            name
          }
        }
      }
    }
  }
`;
