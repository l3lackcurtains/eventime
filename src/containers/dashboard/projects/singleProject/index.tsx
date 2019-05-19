import React from "react";
import { useQuery } from "react-apollo-hooks";
import GET_PROJECT_BY_SLUG from "../../../../graphql/project/getProject";
import ProjectView from "./projectView";

const SingleProject = (props: any) => {
  /**
   * *********************************************
   * Get Project Data
   * *********************************************
   */
  const slug = props.location.pathname.split("/projects/")[1];
  const { data, error, loading } = useQuery(GET_PROJECT_BY_SLUG, {
    variables: {
      slug
    }
  });

  if (loading) return null;

  const projectData = data.getProjectBySlug.result;

  return (
    <>
      <ProjectView projectData={projectData} />
    </>
  );
};

export default SingleProject;
