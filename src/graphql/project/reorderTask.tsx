import gql from "graphql-tag";

export const REORDER_TASK = gql`
  mutation ReorderTask($sectionId: ID!, $from: Int!, $to: Int!) {
    reorderTask(sectionId: $sectionId, from: $from, to: $to)
  }
`;

export const REORDER_TASK_BETWEEN_SECTIONS = gql`
  mutation ReorderTaskBetweenSections(
    $sourceSectionId: ID!
    $destinationSectionId: ID!
    $from: Int!
    $to: Int!
  ) {
    reorderTaskBetweenSections(
      sourceSectionId: $sourceSectionId
      destinationSectionId: $destinationSectionId
      from: $from
      to: $to
    )
  }
`;
