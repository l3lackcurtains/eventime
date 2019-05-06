import React from "react";

import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "60%"
  },
  {
    title: "User",
    dataIndex: "user"
  },
  {
    title: "Duration",
    dataIndex: "duration"
  },
  {
    title: "Time",
    dataIndex: "time"
  }
];

const data: any[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    user: `edwand${i}`,
    duration: "1h 55m",
    time: `10:29AM-5:19PM on 04/29/2019`
  });
}

const Detailed = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default Detailed;
