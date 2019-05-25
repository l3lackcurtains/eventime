import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PROJECT_BY_SLUG } from "../../../../graphql/project/getProject";
import ProjectView from "./projectView";

interface ProjectContextTypes {
  project: any;
  refetchProject: any;
}

export const ProjectContext = React.createContext<Partial<ProjectContextTypes>>(
  {
    project: {},
    refetchProject: () => {}
  }
);

const SingleProject = (props: any) => {
  const slug = props.location.pathname.split("/projects/")[1];
  const fetchProject = useQuery(GET_PROJECT_BY_SLUG, {
    variables: {
      slug
    }
  });

  if (fetchProject.loading) return null;
  if (fetchProject.error) return <div>{`Error! ${fetchProject.error}`}</div>;

  const getProject = fetchProject.data.getProjectBySlug;

  if (!getProject.success) return null;
  return (
    <ProjectContext.Provider
      value={{
        project: getProject.result,
        refetchProject: fetchProject.refetch
      }}
    >
      <ProjectView />
    </ProjectContext.Provider>
  );
};

export default SingleProject;
