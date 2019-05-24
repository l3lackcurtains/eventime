import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_BY_SLUG } from "../../../../graphql/project/getProject";
import ProjectView from "./projectView";

const SingleProject = (props: any) => {
  const slug = props.location.pathname.split("/projects/")[1];
  const { data, error, loading, refetch } = useQuery(GET_PROJECT_BY_SLUG, {
    variables: {
      slug
    }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  if (!data.getProjectBySlug.success)
    return <p>{data.getProjectBySlug.message}</p>;
  return (
    <ProjectView
      projectTasks={data.getProjectBySlug.result}
      refetchProject={refetch}
    />
  );
};

export default SingleProject;
