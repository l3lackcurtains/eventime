import { Alert, DatePicker, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Field, FieldProps, useField } from "formik";
import moment from "moment";
import React from "react";

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

const CustomTextArea = (props: any) => {
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
        <TextArea size="large" {...rest} {...field} />
      </Form.Item>
      {meta.touched && meta.error ? (
        <Alert message={meta.error} type="error" banner />
      ) : null}
    </>
  );
};

const CustomDatePicker = (props: any) => {
  const {
    label,
    required,
    colon,
    extra,
    validateStatus,
    value,
    ...rest
  } = props;
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
        <Field name={field.name}>
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <DatePicker
              value={value ? moment(value) : undefined}
              onChange={date =>
                setFieldValue(field.name, date ? date.toISOString() : null)
              }
              size="large"
              {...rest}
            />
          )}
        </Field>
      </Form.Item>
      {meta.touched && meta.error ? (
        <Alert message={meta.error} type="error" banner />
      ) : null}
    </>
  );
};

export { CustomTextInput, CustomTextArea, CustomDatePicker };
