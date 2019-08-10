import { Button, Divider, Form } from "antd";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import {
  CustomMultipleSelect,
  CustomSelect,
  CustomTextInput
} from "../../../components/fields/formFields";
import { GET_CLIENTS } from "../../../graphql/client/getClients";
import { CREATE_PROJECT } from "../../../graphql/project/createProject";
import { GET_WORKSPACE_USERS } from "../../../graphql/user/getWorkspaceUsers";

const createProjectSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  client: Yup.string().required("Client is Required"),
  members: Yup.array().required("Atleast one Member is Required")
});

const CreateProject = (props: any) => {
  const { setCreateProjectModalVisible, refetchProjects } = props;

  const getClients = useQuery(GET_CLIENTS);
  const getUsers = useQuery(GET_WORKSPACE_USERS);

  const createProject = useMutation(CREATE_PROJECT);

  const handleCreateProject = async (values: any, { resetForm }: any) => {
    const { name, client, members } = values;

    const created = await createProject({
      variables: {
        name,
        clientId: client,
        users: members
      }
    });

    if (created.data.createProject.success) {
      resetForm();
      setCreateProjectModalVisible(false);
      refetchProjects();
    }
  };
  let clientsData: any[] = [];
  if (!getClients.loading && !getClients.error) {
    const clients = getClients.data.getClients;
    clientsData = clients.map((client: any) => {
      client.key = client.id;
      client.value = client.id;
      client.text = client.name;
      return client;
    });
  }

  let usersData: any[] = [];
  if (!getUsers.loading && !getUsers.error) {
    const users = getUsers.data.getWorkshopUsers;
    usersData = users.map((user: any) => {
      user.key = user.id;
      user.value = user.id;
      user.text = user.email;
      return user;
    });
  }

  if (clientsData.length === 0) {
    return <p>You must add client first.</p>;
  }

  return (
    <>
      <Formik
        initialValues={{}}
        validationSchema={createProjectSchema}
        onSubmit={handleCreateProject}
        render={(props: any) => (
          <Form layout="vertical" onSubmit={props.handleSubmit}>
            <CustomTextInput
              label="Project Name"
              size="large"
              placeholder="Name of project"
              name="name"
            />

            <CustomSelect
              label="Select a Client"
              size="large"
              placeholder="Select a Client"
              name="client"
              options={clientsData}
            />

            <CustomMultipleSelect
              label="Select Members"
              size="large"
              placeholder="Select Members"
              name="members"
              options={usersData}
            />
            <Divider />

            <Form.Item>
              <ActionButton type="primary" htmlType="submit">
                Create Project
              </ActionButton>
            </Form.Item>
          </Form>
        )}
      />
    </>
  );
};

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

export default CreateProject;
