import gql from "graphql-tag";

const GET_USER = gql`
  {
    getUser {
      success
      result {
        id
      }
    }
  }
`;

export default GET_USER;
