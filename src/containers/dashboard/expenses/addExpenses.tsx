import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Upload,
  Button,
  Icon
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

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

function onSelectChange(value: any) {
  console.log(`selected ${value}`);
}

const AddExpense = () => {
  const [fileList, setFileList] = useState([]);
  function handleFileChange(info: any) {
    let fileList: any = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map((file: any) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
    return null;
  }
  return (
    <section>
      <Form layout="vertical">
        <Form.Item label="Category">
          <Select
            showSearch
            size="large"
            placeholder="Select a Category"
            optionFilterProp="children"
            onChange={onSelectChange}
            filterOption={(input, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="transportation">Transportation</Option>
            <Option value="infrastracture">Infrastracture</Option>
            <Option value="meals">Meals</Option>
            <Option value="office-needs">Office Needs</Option>
            <Option value="services">Services</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description">
          <TextArea placeholder="Description of expense" rows={4} />
        </Form.Item>
        <Row type="flex" gutter={16}>
          <Col xs={12}>
            <Form.Item label="Amount">
              <Input size="large" placeholder="Expense Amount" type="number" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Date">
              <DatePicker size="large" onChange={onChange} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Upload onChange={handleFileChange} multiple fileList={fileList}>
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        </Form.Item>
        <Row type="flex" gutter={16}>
          <Col xs={12}>
            <Form.Item label="Project">
              <Select
                showSearch
                size="large"
                placeholder="Select a Project"
                optionFilterProp="children"
                onChange={onSelectChange}
                filterOption={(input, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="project1">Project 1</Option>
                <Option value="project2">Project 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Member">
              <Select
                showSearch
                size="large"
                placeholder="Select a Member"
                optionFilterProp="children"
                onChange={onSelectChange}
                filterOption={(input, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="member1">Member 1</Option>
                <Option value="member2">Member 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default AddExpense;
