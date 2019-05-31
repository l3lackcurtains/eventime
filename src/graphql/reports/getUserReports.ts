import gql from "graphql-tag";

export const GET_REPORTS_BY_MEMBER = gql`
  {
    getReportsByMember {
      uid
      name
      totalDuration
    }
  }
`;
