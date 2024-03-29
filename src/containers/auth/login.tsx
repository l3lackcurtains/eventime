import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomTextInput } from "../../components/fields/formFields";
import { LOGIN } from "../../graphql/user/login";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too Short!"),
});

const Login = (props: any) => {
  const [loginErrors, setLoginErrors] = useState([]);
  const doLogin = useMutation(LOGIN);

  return (
    <Wrapper>
      <AuthForm>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            const { email, password } = values;
            try {
              const logged = await doLogin({
                variables: {
                  email,
                  password,
                },
              });

              setLoginErrors([]);
              if (logged.data) {
                props.history.push("/dashboard");
              }
            } catch (e) {
              let errors: any = [];
              e.graphQLErrors.forEach((err: any, index: number) => {
                errors.push(err.message.split("rror:")[1]);
              });
              setLoginErrors(errors);
            }
          }}
          render={(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <CustomTextInput
                prefix={<UserOutlined />}
                placeholder="email"
                label="Email"
                name="email"
                type="email"
                size="large"
              />
              <CustomTextInput
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                label="Password"
                name="password"
                size="large"
              />
              <Form.Item>
                {loginErrors.length > 0 ? (
                  <Alert
                    message="Error"
                    description={
                      <>
                        {loginErrors.map((err: string, index: number) => (
                          <div key={index}>{err}</div>
                        ))}
                      </>
                    }
                    type="error"
                    showIcon
                    closable
                    onClose={() => setLoginErrors([])}
                  />
                ) : null}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <MoreLinks>
                <NavLink to="/register">Register</NavLink>
              </MoreLinks>
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
const MoreLinks = styled.div`
  margin: 16px 4px;
`;
export default Login;
