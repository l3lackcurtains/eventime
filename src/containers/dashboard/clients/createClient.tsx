import { Button, Divider, Form } from "antd";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import {
  CustomTextArea,
  CustomTextInput
} from "../../../components/fields/formFields";
import { CREATE_CLIENT } from "../../../graphql/client/createClient";

const createClientSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required")
});

const CreateClient = (props: any) => {
  const { onChangeClientModalState, refetchClients } = props;
  const createClient = useMutation(CREATE_CLIENT);
  const handleCreateClient = async (values: any, { resetForm }: any) => {
    const { name, details } = values;
    const created = await createClient({
      variables: {
        name,
        details
      }
    });

    if (created.data.createClient.success) {
      onChangeClientModalState(false);
      resetForm();
      refetchClients();
    }
  };

  return (
    <Formik
      initialValues={{}}
      validationSchema={createClientSchema}
      onSubmit={handleCreateClient}
      render={(props: any) => (
        <Form layout="vertical" onSubmit={props.handleSubmit}>
          <CustomTextInput
            label="Client name"
            size="large"
            placeholder="Name of client"
            name="name"
          />
          <CustomTextArea
            label="Client Information"
            placeholder="Important information about clients"
            rows={4}
            name="details"
          />
          <Divider />
          <Form.Item>
            <ActionButton type="primary" htmlType="submit">
              Create Client
            </ActionButton>
          </Form.Item>
        </Form>
      )}
    />
  );
};

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

export default CreateClient;
