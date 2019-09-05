import { Button, Divider, Form, Modal } from "antd";
import { Formik } from "formik";
import React, { useContext } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import { ProjectContext } from "..";
import {
  CustomDatePicker,
  CustomTextArea,
  CustomTextInput
} from "../../../../../components/fields/formFields";
import { DELETE_TASK } from "../../../../../graphql/task/deleteTask";
import { UPDATE_TASK } from "../../../../../graphql/task/updateTask";

const EditTaskSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required")
});

const EditTask = (props: any) => {
  const { setShowEditTask, currentTask, setTaskModalVisible } = props;

  const { refetchProject } = useContext(ProjectContext);

  const updateTask = useMutation(UPDATE_TASK);
  const deleteTask = useMutation(DELETE_TASK);

  const { name, description, dueAt } = currentTask;
  const confirm = Modal.confirm;
  const handleDeleteTask = async (e: any) => {
    e.preventDefault();

    confirm({
      title: "Do you want to delete this section",
      content:
        "Deleting the section will also removes all the tasks associated with it.",
      async onOk() {
        const destroy: any = await deleteTask({
          variables: {
            id: currentTask.id
          }
        });

        if (destroy.data.deleteTask) {
          refetchProject();
          setShowEditTask(false);
          setTaskModalVisible(false);
        }
      },
      onCancel() {}
    });
  };

  const handleUpdate = async (values: any) => {
    const { name, description, dueAt } = values;
    const updated: any = await updateTask({
      variables: {
        id: currentTask.id,
        name,
        description,
        dueAt
      }
    });

    if (updated.data.updateTask.success) {
      setShowEditTask(false);
      refetchProject();
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name,
          description,
          dueAt
        }}
        validationSchema={EditTaskSchema}
        onSubmit={handleUpdate}
        render={(props: any) => (
          <Form onSubmit={props.handleSubmit}>
            <CustomTextInput placeholder="Task name" label="Name" name="name" />
            <CustomTextArea
              rows={4}
              placeholder="Task description"
              label="Description"
              name="description"
            />
            <CustomDatePicker
              placeholder="Due Date"
              label="Due Date"
              name="dueAt"
            />
            <Divider />
            <Form.Item>
              <Actions>
                <div>
                  <ActionButton type="primary" htmlType="submit">
                    Update
                  </ActionButton>
                  <ActionButton onClick={() => setShowEditTask(false)}>
                    Cancel
                  </ActionButton>
                </div>
                <DeleteButton type="danger" onClick={handleDeleteTask}>
                  Delete
                </DeleteButton>
              </Actions>
            </Form.Item>
          </Form>
        )}
      />
    </>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ActionButton = styled(Button)`
  margin-right: 16px;
`;

const DeleteButton = styled(Button)`
  margin-right: 16px;
`;

export default EditTask;
