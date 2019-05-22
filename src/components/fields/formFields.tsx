import { Alert, DatePicker, Form, Input, Select, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Field, FieldProps, useField } from "formik";
import moment from "moment";
import React from "react";
import styled from "styled-components";

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
        <CustomAlert message={meta.error} type="error" />
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
        <CustomAlert message={meta.error} type="error" />
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
        <CustomAlert message={meta.error} type="error" />
      ) : null}
    </>
  );
};

const CustomTimePicker = (props: any) => {
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
            <TimePicker
              value={value ? moment(value) : undefined}
              onChange={time =>
                setFieldValue(field.name, time ? time.toISOString() : null)
              }
              size="large"
              use12Hours
              format="h:mm a"
              {...rest}
            />
          )}
        </Field>
      </Form.Item>
      {meta.touched && meta.error ? (
        <CustomAlert message={meta.error} type="error" />
      ) : null}
    </>
  );
};

const CustomSelect = (props: any) => {
  const {
    label,
    required,
    colon,
    extra,
    validateStatus,
    value,
    options,
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
            <Select
              showSearch
              size="large"
              value={value ? value : undefined}
              optionFilterProp="children"
              onChange={(selected: any) => setFieldValue(field.name, selected)}
              filterOption={(input: any, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              {...rest}
            >
              {options.map((option: any) => (
                <Select.Option key={option.key} value={option.value}>
                  {option.text}
                </Select.Option>
              ))}
            </Select>
          )}
        </Field>
      </Form.Item>
      {meta.touched && meta.error ? (
        <CustomAlert message={meta.error} type="error" />
      ) : null}
    </>
  );
};

const CustomMultipleSelect = (props: any) => {
  const {
    label,
    required,
    colon,
    extra,
    validateStatus,
    value,
    options,
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
            <Select
              showSearch
              mode="multiple"
              size="large"
              value={value ? value : undefined}
              optionFilterProp="children"
              defaultValue={[]}
              onChange={(selected: any) => setFieldValue(field.name, selected)}
              filterOption={(input: any, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              {...rest}
            >
              {options.map((option: any) => (
                <Select.Option key={option.key} value={option.value}>
                  {option.text}
                </Select.Option>
              ))}
            </Select>
          )}
        </Field>
      </Form.Item>
      {meta.touched && meta.error ? (
        <CustomAlert message={meta.error} type="error" />
      ) : null}
    </>
  );
};

const CustomAlert = styled(Alert)`
  margin-bottom: 8px;
  margin-top: -8px;
`;

export {
  CustomTextInput,
  CustomTextArea,
  CustomDatePicker,
  CustomTimePicker,
  CustomSelect,
  CustomMultipleSelect
};
