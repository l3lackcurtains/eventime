import gql from "graphql-tag";

const GET_PROJECT_BY_SLUG = gql`
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

export default GET_PROJECT_BY_SLUG;
