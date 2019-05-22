import { Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

const { TextArea } = Input;

const AddClient = () => {
  function onChange(date: any, dateString: string) {
    console.log(date, dateString);
  }

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Client name">
          <Input size="large" placeholder="Name of client" />
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

export default AddClient;
