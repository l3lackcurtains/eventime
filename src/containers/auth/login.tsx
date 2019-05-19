import { Button, Form, Icon } from "antd";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomTextInput } from "../../components/fields/formFields";
import LOGIN from "../../graphql/user/login";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too Short!")
});

const Login = (props: any) => {
  const doLogin = useMutation(LOGIN);

  return (
    <Wrapper>
      <AuthForm>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async values => {
            const { email, password } = values;
            const result = await doLogin({
              variables: {
                email,
                password
              }
            });
            if (result.data.login.success) {
              props.history.push("/dashboard");
            }
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
