import gql from "graphql-tag";

export const GET_WORKSPACE_USERS = gql`
  {
    getWorkshopUsers {
      success
      results {
        id
        email
      }
    }
  }
`;
