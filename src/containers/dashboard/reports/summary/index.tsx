import React from "react";

import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "60%"
  },
  {
    title: "Duration",
    dataIndex: "duration"
  }
];

const data: any[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    duration: "1h 55m"
  });
}

const Summary = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default Summary;
