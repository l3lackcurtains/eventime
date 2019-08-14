import { Button, Col, DatePicker, Popover, Row } from "antd";
import moment from "moment";
import React, { Component } from "react";

const RangePicker = DatePicker.RangePicker;

const userContents = (
  <div>
    <p>Content 1</p>
    <p>Content 2</p>
  </div>
);

function onChange(dates: any, dateStrings: any) {
  //
}
class Filters extends Component {
  render() {
    return (
      <div style={{ margin: "36px 0" }}>
        <Row type="flex" gutter={8} align="middle">
          <Col>
            <p style={{ margin: "8px 24px 8px 0" }}>Filter By: </p>
          </Col>
          <Col>
            <Popover
              placement="bottom"
              content={userContents}
              title="Select Users"
              trigger="click"
            >
              <Button>Users</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              placement="bottom"
              content={userContents}
              title="Select Projects"
              trigger="click"
            >
              <Button>Projects</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              placement="bottom"
              content={userContents}
              title="Select Clients"
              trigger="click"
            >
              <Button>Clients</Button>
            </Popover>
          </Col>
          <Col>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                "This Week": [moment().startOf("week"), moment().endOf("week")],
                "Last Week": [
                  moment()
                    .subtract(1, "weeks")
                    .startOf("week"),
                  moment()
                    .subtract(1, "weeks")
                    .endOf("week")
                ],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month")
                ],
                "Last Month": [
                  moment()
                    .subtract(1, "month")
                    .startOf("month"),
                  moment()
                    .subtract(1, "month")
                    .endOf("month")
                ],
                "This Year": [moment().startOf("year"), moment().endOf("year")]
              }}
              format="YYYY/MM/DD"
              onChange={onChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filters;
