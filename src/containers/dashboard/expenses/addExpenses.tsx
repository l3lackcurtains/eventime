import React from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";

const { TextArea } = Input;

const children: any[] = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>
  );
}

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

function onChange(date: any, dateString: string) {
  console.log(date, dateString);
}

const AddExpense = () => {
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Client name">
          <Input size="large" placeholder="Name of client" />
        </Form.Item>
        <Form.Item label="Projects">
          <Select
            size="large"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            onChange={handleChange}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item label="Client Information">
          <TextArea
            placeholder="Important information about clients"
            rows={4}
          />
        </Form.Item>
        <Row type="flex" gutter={16}>
          <Col>
            <Form.Item label="Tax %">
              <Input size="large" placeholder="Tax %" type="number" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Discount %">
              <Input size="large" placeholder="Tax %" type="number" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Due Date">
              <DatePicker size="large" onChange={onChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddExpense;
