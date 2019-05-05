import React from "react";
import { Form, Select, DatePicker, Input } from "antd";

const { Option } = Select;

const AddProject = () => {
  const members: any[] = [];
  for (let i = 10; i < 36; i++) {
    members.push(
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
        <Form.Item label="Project Name">
          <Input size="large" placeholder="Name of project" />
        </Form.Item>
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
        <Form.Item label="Members">
          <Select
            mode="multiple"
            size="large"
            style={{ width: "100%" }}
            placeholder="Select Members"
            defaultValue={[]}
            onChange={handleChange}
          >
            {members}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProject;
