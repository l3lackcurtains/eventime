import React, { useState } from "react";
import { Form, Select, DatePicker, Checkbox } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateInvoice = () => {
  const projects: any[] = [];
  for (let i = 10; i < 36; i++) {
    projects.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function onChange(date: any, dateString: any) {
    console.log(date, dateString);
  }
  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onSelectChange(value: any) {
    console.log(`selected ${value}`);
  }

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Client">
          <Select
            showSearch
            size="large"
            placeholder="Select a Client"
            optionFilterProp="children"
            onChange={onSelectChange}
            filterOption={(input, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="client1">Client 1</Option>
            <Option value="client2">Client 2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Projects">
          <Select
            mode="multiple"
            size="large"
            style={{ width: "100%" }}
            placeholder="Select Projects"
            defaultValue={[]}
            onChange={handleChange}
          >
            {projects}
          </Select>
        </Form.Item>
        <Form.Item label="Period (optional)">
          <RangePicker size="large" onChange={onChange} />
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={handleChange}>Include Expenses</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateInvoice;
