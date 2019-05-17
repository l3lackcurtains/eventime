import React from "react";
import { Icon, Button, Form } from "antd";
import * as Yup from "yup";
import styled from "styled-components";
import { CustomTextInput } from "../../components/fields/formFields";
import { Formik } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too Short!")
});

const Login = (props: any) => {
  return (
    <Wrapper>
      <AuthForm>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          render={(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <CustomTextInput
                prefix={<Icon type="user" />}
                placeholder="email"
                label="Email"
                name="email"
              />
              <CustomTextInput
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Password"
                label="Password"
                name="password"
              />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        />
      </AuthForm>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 120px 0;
`;
const AuthForm = styled.div`
  width: 450px;
  padding: 36px;
  background: #fff;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
`;

export default Login;
