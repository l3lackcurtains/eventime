import {
  Alert,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker
} from "antd";
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
        <Input {...rest} {...field} />
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
        <TextArea {...rest} {...field} />
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

const CustomCascader = (props: any) => {
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
  const handleAreaClick = (e: any, label: string, option: object) => {
    e.stopPropagation();
  };
  const displayRender = (labels: any, selectedOptions: any) =>
    labels.map((label: any, i: number) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return <span key={option.value}>{label}</span>;
      }
      return <span key={option.value}>{label} / </span>;
    });
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
            <Cascader
              options={options}
              displayRender={displayRender}
              value={value ? value : undefined}
              onChange={(selected: any) => setFieldValue(field.name, selected)}
              defaultValue={[]}
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

const CustomAlert = styled(Alert)`
  margin-bottom: 16px;
  margin-top: -24px;
`;

export {
  CustomTextInput,
  CustomTextArea,
  CustomDatePicker,
  CustomTimePicker,
  CustomSelect,
  CustomMultipleSelect,
  CustomCascader
};
