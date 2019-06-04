import { Table } from "antd";
import React from "react";
import styled from "styled-components";

const TimeSheetTitle = styled.div`
  span {
    color: #777;
  }
  p {
    margin-bottom: 2px;
  }
`;

const columns = [
  {
    title: "Task",
    dataIndex: "name",
    key: "name",
    width: "30%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Sunday</p>
        <span>June 11</span>
      </TimeSheetTitle>
    ),
    dataIndex: "sunday",
    key: "sunday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Monday</p>
        <span>June 12</span>
      </TimeSheetTitle>
    ),
    dataIndex: "monday",
    key: "monday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Tuesday</p>
        <span>June 13</span>
      </TimeSheetTitle>
    ),
    dataIndex: "tuesday",
    key: "tuesday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Wednesday</p>
        <span>June 14</span>
      </TimeSheetTitle>
    ),
    dataIndex: "wednesday",
    key: "wednesday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Thursday</p>
        <span>June 15</span>
      </TimeSheetTitle>
    ),
    dataIndex: "thursday",
    key: "thursday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Friday</p>
        <span>June 16</span>
      </TimeSheetTitle>
    ),
    dataIndex: "friday",
    key: "friday",
    width: "10%"
  },
  {
    title: (
      <TimeSheetTitle>
        <p>Saturday</p>
        <span>June 17</span>
      </TimeSheetTitle>
    ),
    dataIndex: "saturday",
    key: "saturday",
    width: "10%"
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width: "10%"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown"
  },
  {
    key: "2",
    name: "Jim Green"
  },
  {
    key: "3",
    name: "Joe Black"
  }
];

const Timesheet = () => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default Timesheet;
