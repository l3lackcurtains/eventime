import { Button, Divider, Form } from "antd";
import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import {
  CustomMultipleSelect,
  CustomSelect,
  CustomTextInput
} from "../../../components/fields/formFields";

const createProjectSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required")
});

const CreateProject = (props: any) => {
  const handleCreateProject = async (values: any) => {
    console.log(values);
  };
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
              options={[
                {
                  key: 1,
                  value: "xxx",
                  text: "XXX"
                },
                {
                  key: 2,
                  value: "yyy",
                  text: "YYY"
                }
              ]}
            />

            <CustomMultipleSelect
              label="Select Members"
              size="large"
              placeholder="Select Members"
              name="members"
              options={[
                {
                  key: 1,
                  value: "xxx",
                  text: "XXX"
                },
                {
                  key: 2,
                  value: "yyy",
                  text: "YYY"
                }
              ]}
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
