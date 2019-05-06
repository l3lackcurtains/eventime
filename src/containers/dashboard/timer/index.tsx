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
  Card,
  Popover,
  Icon
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

const Timer = () => {
  // handling Cascader
  const handleAreaClick = (e: any, label: string, option: object) => {
    e.stopPropagation();
  };

  const displayRender = (labels: any, selectedOptions: any) =>
    labels.map((label: any, i: number) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return (
          <span key={option.value}>
            {label} (
            <a onClick={e => handleAreaClick(e, label, option)}>
              {option.code}
            </a>
            )
          </span>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });

  const onDateChange = (date: any, dateString: string) => {
    console.log(date, dateString);
  };

  const onTimeChange = (time: any, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <>
      <div>
        <Row>
          <Card
            title={
              <Row
                gutter={4}
                type="flex"
                justify="space-between"
                align="middle"
              >
                <Col xs={24} lg={14}>
                  <Cascader
                    options={options}
                    displayRender={displayRender}
                    size="large"
                    style={{ width: "100%" }}
                    defaultValue={["project2", "task1", "design"]}
                    placeholder="Select task from the projects."
                  />
                </Col>
                <Col xs={24} lg={10}>
                  <Row
                    gutter={4}
                    type="flex"
                    justify="space-between"
                    align="middle"
                  >
                    <Col xs={4}>
                      <Popover
                        content={
                          <Row>
                            <Col>
                              <TimePicker
                                use12Hours
                                format="h:mm a"
                                defaultValue={moment(moment(), "h:mm a")}
                                onChange={onTimeChange}
                                size="large"
                                style={{ width: `200px`, padding: `8px` }}
                              />
                            </Col>
                            <Col>
                              <DatePicker
                                onChange={onDateChange}
                                size="large"
                                defaultValue={moment()}
                                style={{ width: `200px`, padding: `8px` }}
                              />
                            </Col>
                          </Row>
                        }
                        trigger="click"
                        title="Add Manual Time"
                      >
                        <Icon style={{ width: `100%` }} type="down" />
                      </Popover>
                    </Col>
                    <Col xs={20}>
                      <Button
                        type="primary"
                        size="large"
                        style={{ width: "100%" }}
                      >
                        Start Timer
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item style={{ margin: "24px 0" }}>
                  <Row
                    gutter={36}
                    type="flex"
                    justify="space-between"
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
          </Card>
        </Row>
      </div>
    </>
  );
};

export default Timer;
