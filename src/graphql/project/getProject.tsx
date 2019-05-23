import gql from "graphql-tag";

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    getProjectBySlug(slug: $slug) {
      success
      result {
        id
        name
        sections {
          id
          name
          tasks {
            id
            name
            description
            dueAt
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      success
      result {
        id
        name
        billing {
          id
        }
        budget {
          id
        }
        users {
          id
          email
        }
        client {
          id
          name
        }
      }
    }
  }
`;
