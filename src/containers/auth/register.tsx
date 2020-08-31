import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form } from "antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomTextInput } from "../../components/fields/formFields";
import { REGISTER } from "../../graphql/user/register";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too Short!"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Passwords must match"
  ),
});

const Register = (props: any) => {
  const [registerErrors, setRegisterErrors] = useState([]);
  const doRegister = useMutation(REGISTER);

  return (
    <Wrapper>
      <AuthForm>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validationSchema={RegisterSchema}
          onSubmit={async (values) => {
            const { email, password, name } = values;
            try {
              const registered = await doRegister({
                variables: {
                  name,
                  email,
                  password,
                },
              });

              setRegisterErrors([]);
              if (registered.data) {
                props.history.push("/login");
              }
            } catch (e) {
              let errors: any = [];
              e.graphQLErrors.forEach((err: any, index: number) => {
                errors.push(err.message.split("rror:")[1]);
              });
              setRegisterErrors(errors);
            }
          }}
          render={(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <CustomTextInput
                prefix={<UserOutlined />}
                placeholder="name"
                label="Name"
                name="name"
                size="large"
              />
              <CustomTextInput
                prefix={<UserOutlined />}
                placeholder="email"
                label="Email"
                type="email"
                name="email"
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
              <CustomTextInput
                prefix={<LockOutlined />}
                type="password"
                placeholder="Retype Password"
                label="Retype Password"
                name="passwordConfirmation"
                size="large"
              />
              <Form.Item>
                {registerErrors.length > 0 ? (
                  <Alert
                    message="Error"
                    description={
                      <>
                        {registerErrors.map((err: string, index: number) => (
                          <div key={index}>{err}</div>
                        ))}
                      </>
                    }
                    type="error"
                    showIcon
                    closable
                    onClose={() => setRegisterErrors([])}
                  />
                ) : null}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
              <MoreLinks>
                <NavLink to="/login">Login</NavLink>
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

export default Register;
