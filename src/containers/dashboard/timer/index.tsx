import React from "react";
import {
  Cascader,
  Button,
  Row,
  Col,
  DatePicker,
  TimePicker,
  List,
  Progress,
  Collapse
} from "antd";
import moment from "moment";

const options = [
  {
    value: "project1",
    label: "Khata App Project",
    children: [
      {
        value: "task1",
        label: "Mobile App development",
        children: [
          {
            value: "design",
            label: "App Design",
            code: 752102
          },
          {
            value: "development",
            label: "App development",
            code: 752102
          }
        ]
      }
    ]
  },
  {
    value: "project2",
    label: "Time Management App",
    children: [
      {
        value: "task1",
        label: "Web App Development",
        children: [
          {
            value: "design",
            label: "UI/UX Part",
            code: 752102
          },
          {
            value: "deployment",
            label: "Deploy the code",
            code: 752102
          }
        ]
      }
    ]
  }
];

const data = [
  {
    title: "Time Management App, design, deployment "
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

function handleAreaClick(e: any, label: string, option: object) {
  e.stopPropagation();
}
function callback(key: any) {
  console.log(key);
}

const displayRender = (labels: any, selectedOptions: any) =>
  labels.map((label: any, i: number) => {
    const option = selectedOptions[i];
    if (i === labels.length - 1) {
      return (
        <span key={option.value}>
          {label} (
          <a onClick={e => handleAreaClick(e, label, option)}>{option.code}</a>)
        </span>
      );
    }
    return <span key={option.value}>{label} / </span>;
  });

function onChange(date: any, dateString: string) {
  console.log(date, dateString);
}

const Timer = () => {
  return (
    <div>
      <div className="list" style={{ margin: "24px 48px" }}>
        <Row gutter={4} type="flex" justify="space-around" align="middle">
          <Col xs={16}>
            <Cascader
              options={options}
              displayRender={displayRender}
              size="large"
              style={{ width: "100%" }}
              defaultValue={["project2", "task1", "design"]}
              placeholder="Select task from the projects."
            />
          </Col>
          <Col>
            <Row gutter={4} type="flex" justify="space-around" align="middle">
              <Col>
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  defaultValue={moment(moment(), "h:mm a")}
                  onChange={onChange}
                  size="large"
                />
              </Col>
              <Col>
                <DatePicker
                  onChange={onChange}
                  size="large"
                  defaultValue={moment()}
                />
              </Col>
              <Col>
                <Button type="primary" size="large">
                  Start Timer
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="list" style={{ margin: "24px 48px" }}>
        <Row>
          <Collapse defaultActiveKey={["1"]} onChange={callback}>
            <Collapse.Panel
              header={`week #3: ${moment()
                .day(1)
                .format("l")} to ${moment()
                .day(7)
                .format("l")}`}
              key="1"
            >
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item style={{ margin: "24px 0" }}>
                    <Row
                      gutter={36}
                      type="flex"
                      justify="space-around"
                      align="middle"
                    >
                      <Col>
                        <div style={{ width: 100 }}>
                          <p>11h 37m</p>
                          <Progress percent={70} status="active" />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <a href="https://ant.design">{item.title}</a>
                        </div>
                        <p>
                          Ant Design, a design language for background
                          applications, is refined by Ant UED Team
                        </p>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Collapse.Panel>
            <Collapse.Panel
              header={`week #2: ${moment()
                .day(1)
                .format("l")} to ${moment()
                .day(7)
                .format("l")}`}
              key="2"
            >
              <p>work from other weeks</p>
            </Collapse.Panel>
          </Collapse>
        </Row>
      </div>
    </div>
  );
};

export default Timer;
