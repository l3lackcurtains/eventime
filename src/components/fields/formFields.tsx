import React from "react";
import { Form, Input, Alert } from "antd";
import { useField } from "formik";

const CustomTextInput = (props: any) => {
  const { label, required, colon, extra, validateStatus, ...rest } = props;
  const [field, meta] = useField(props.name);
  return (
    <>
      <Form.Item
        label={label}
        required={required}
        colon={colon}
        extra={extra}
        validateStatus={validateStatus}
      >
        <Input size="large" {...rest} {...field} />
      </Form.Item>

      {meta.touched && meta.error ? (
        <Alert message={meta.error} type="error" banner />
      ) : null}
    </>
  );
};

export { CustomTextInput };
