import { Button, Form, Popover } from "antd";
import { Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import {
  CustomDatePicker,
  CustomTextArea,
  CustomTextInput
} from "../../../../../components/fields/formFields";
import { ADD_TIME_TO_TASK } from "../../../../../graphql/task/addTimeToTask";
const addTimeSchema = Yup.object().shape({
  date: Yup.string().required("Name is Required"),
  duration: Yup.string().matches(
    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/,
    "Not a duration format"
  )
});
const AddTimeButton = (props: any) => {
  const [showForms, setShowForms] = useState(false);
  const { currentTask } = props;
  const addTime = useMutation(ADD_TIME_TO_TASK);

  const handleAddTime = async (values: any, { resetForm }: any) => {
    const { date, duration, description } = values;

    const added = await addTime({
      variables: {
        taskId: currentTask.id,
        date,
        duration,
        description
      }
    });

    if (added.data.addTimeToTask.success) {
      resetForm({
        date: moment(),
        duration: "01:00",
        description: ""
      });
      setShowForms(false);
    }
  };

  return (
    <Popover
      visible={showForms}
      content={
        <AddTimeFormArea>
          <Formik
            initialValues={{
              date: moment(),
              duration: "01:00",
              description: ""
            }}
            validationSchema={addTimeSchema}
            onSubmit={handleAddTime}
            render={(props: any) => (
              <Form onSubmit={props.handleSubmit}>
                <CustomDatePicker
                  label="Date"
                  placeholder="Date"
                  name="date"
                  block
                  required
                />
                <CustomTextInput
                  label="Time Duration"
                  placeholder="Time Duration (Hour:Minute)"
                  name="duration"
                  block
                  required
                />
                <CustomTextArea
                  label="comment"
                  placeholder="comment"
                  name="description"
                  block
                />
                <Form.Item>
                  <ActionButton type="primary" htmlType="submit">
                    Save
                  </ActionButton>
                  <ActionButton onClick={() => setShowForms(false)}>
                    Cancel
                  </ActionButton>
                </Form.Item>
              </Form>
            )}
          />
        </AddTimeFormArea>
      }
      title={null}
      placement="bottomLeft"
    >
      <ActionButton type="primary" block onClick={() => setShowForms(true)}>
        Add Time
      </ActionButton>
    </Popover>
  );
};

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

const AddTimeFormArea = styled.div`
  margin: 8px 36px;
`;

export default AddTimeButton;
