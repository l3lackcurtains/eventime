import gql from "graphql-tag";

const GET_USER = gql`
  {
    getUser {
      success
      data {
        id
      }
    }
  }
`;

export default GET_USER;
