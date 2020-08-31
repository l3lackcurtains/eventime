import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Upload } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import {
  CustomDatePicker,
  CustomSelect,
  CustomTextArea,
  CustomTextInput,
} from "../../../components/fields/formFields";
import { CREATE_EXPENSE } from "../../../graphql/expenses/createExpense";
import { GET_PROJECTS } from "../../../graphql/project/getProjects";
import { GET_WORKSPACE_USERS } from "../../../graphql/user/getWorkspaceUsers";

const createExpenseSchema = Yup.object().shape({
  category: Yup.string().required("Category is Required"),
  details: Yup.string().required("Details is required"),
  user: Yup.string().required("Member is required."),
  project: Yup.string().required("Project is required."),
});

const categoryData = [
  {
    key: 1,
    value: "transportation",
    text: "Transportation",
  },
  {
    key: 2,
    value: "infrastracture",
    text: "Infrastracture",
  },
  {
    key: 3,
    value: "officeNeed",
    text: "Office needs",
  },
  {
    key: 4,
    value: "service",
    text: "Service",
  },
  {
    key: 5,
    value: "others",
    text: "Others",
  },
];

const AddExpense = (props: any) => {
  const {
    onChangeExpenseModalState,
    refetchExpenses,
    refetchExpensesStats,
  } = props;
  const [fileList, setFileList] = useState([]);

  const getUsers = useQuery(GET_WORKSPACE_USERS);

  const getProjects = useQuery(GET_PROJECTS);

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

  let projectsData: any[] = [];
  if (!getProjects.loading && !getProjects.error) {
    const projects = getProjects.data.getProjects.results;
    projectsData = projects.map((project: any) => {
      project.key = project.id;
      project.value = project.id;
      project.text = project.name;
      return project;
    });
  }

  const createExpense = useMutation(CREATE_EXPENSE);
  function handleFileChange(info: any) {
    let fileList: any = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map((file: any) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
    return null;
  }

  const handleCreateExpense = async (values: any, { resetForm }: any) => {
    const { category, date, amount, project, user, details } = values;

    const created: any = await createExpense({
      variables: {
        category,
        date,
        amount,
        projectId: project,
        userId: user,
        details,
      },
    });

    if (created.data.createExpense) {
      resetForm();
      onChangeExpenseModalState(false);
      refetchExpenses();
      refetchExpensesStats();
    }
  };

  return (
    <section>
      <Formik
        initialValues={{}}
        validationSchema={createExpenseSchema}
        onSubmit={handleCreateExpense}
        render={(props: any) => (
          <Form layout="vertical" onSubmit={props.handleSubmit}>
            <CustomSelect
              label="Category"
              size="large"
              placeholder="Select a Category"
              name="category"
              options={categoryData}
            />
            <CustomTextArea
              label="Details"
              size="large"
              placeholder="Details of expense"
              name="details"
              rows={5}
            />
            <Row type="flex" gutter={16}>
              <Col xs={12}>
                <CustomTextInput
                  label="Expense Amount"
                  name="amount"
                  size="large"
                  placeholder="Expense Amount"
                  type="number"
                />
              </Col>
              <Col xs={12}>
                <CustomDatePicker
                  size="large"
                  label="Date"
                  placeholder="Date"
                  name="date"
                />
              </Col>
            </Row>
            <Form.Item>
              <Upload onChange={handleFileChange} multiple fileList={fileList}>
                <Button>
                  <UploadOutlined /> Attachments
                </Button>
              </Upload>
            </Form.Item>
            <Row type="flex" gutter={16}>
              <Col xs={12}>
                <CustomSelect
                  label="Project"
                  size="large"
                  placeholder="Select a Project"
                  name="project"
                  options={projectsData}
                />
              </Col>
              <Col xs={12}>
                <CustomSelect
                  label="Member"
                  size="large"
                  placeholder="Select a Member"
                  name="user"
                  options={usersData}
                />
              </Col>
            </Row>
            <Form.Item>
              <ActionButton type="primary" htmlType="submit">
                Create Expense
              </ActionButton>
            </Form.Item>
          </Form>
        )}
      />
    </section>
  );
};

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

export default AddExpense;
