import { Button, Form } from "antd";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomTextInput } from "../../../../components/fields/formFields";
import { UPDATE_SECTION } from "../../../../graphql/section/updateSection";

const EditSectionSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required")
});

const EditSection = (props: any) => {
  const { setEditSectionView, refetchProject, section } = props;
  const updateSection = useMutation(UPDATE_SECTION);

  const { name } = section;

  const handleUpdate = async (values: any) => {
    const { name } = values;
    await updateSection({
      variables: {
        id: section.id,
        name
      }
    });
    setEditSectionView(false);
    refetchProject();
  };

  return (
    <>
      <Formik
        initialValues={{
          name
        }}
        validationSchema={EditSectionSchema}
        onSubmit={handleUpdate}
        render={(props: any) => (
          <Form onSubmit={props.handleSubmit}>
            <CustomTextInput
              placeholder="Section name"
              label="Name"
              name="name"
            />
            <Form.Item>
              <ActionButton type="primary" htmlType="submit">
                Update
              </ActionButton>
              <ActionButton onClick={() => setEditSectionView(false)}>
                Cancel
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

export default EditSection;
