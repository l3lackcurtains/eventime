import React, { Component } from "react";

import { Table, Button } from "antd";

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

class Summary extends Component {
  render() {
    return (
      <div
        style={{
          margin: "16px 0",
          background: "#fff",
          padding: 24,
          borderRadius: 10
        }}
      >
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Summary;
