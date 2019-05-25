import { Button, Form, Popover } from "antd";
import { Formik } from "formik";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import { ProjectContext } from "..";
import { CustomTextInput } from "../../../../../components/fields/formFields";
import { ADD_ESTIMATE_TO_TASK } from "../../../../../graphql/task/addEstimateToTask";

const addEstimateSchema = Yup.object().shape({
  total: Yup.number().required()
});
const AddEstimateButton = (props: any) => {
  const [showForms, setShowForms] = useState(false);
  const { currentTask } = props;
  const addEstimate = useMutation(ADD_ESTIMATE_TO_TASK);

  const { refetchProject } = useContext(ProjectContext);

  const handleAddEstimate = async (values: any, { resetForm }: any) => {
    const { total } = values;

    const added = await addEstimate({
      variables: {
        id: currentTask.id,
        total
      }
    });

    if (added.data.addEstimateToTask.success) {
      resetForm({
        date: moment(),
        duration: "01:00",
        description: ""
      });
      setShowForms(false);
      refetchProject();
    }
  };

  return (
    <Popover
      visible={showForms}
      content={
        <AddEstimateFormArea>
          <Formik
            initialValues={{
              total: currentTask.estimate ? currentTask.estimate.total : 0
            }}
            validationSchema={addEstimateSchema}
            onSubmit={handleAddEstimate}
            render={(props: any) => (
              <Form onSubmit={props.handleSubmit}>
                <CustomTextInput
                  label="Estimate Duration"
                  placeholder="Estimate in Hour"
                  name="total"
                  type="number"
                  block
                  required
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
        </AddEstimateFormArea>
      }
      title={null}
      placement="bottomLeft"
    >
      <ActionButton block onClick={() => setShowForms(true)}>
        Add Estimate
      </ActionButton>
    </Popover>
  );
};

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

const AddEstimateFormArea = styled.div`
  margin: 8px 36px;
`;

export default AddEstimateButton;
