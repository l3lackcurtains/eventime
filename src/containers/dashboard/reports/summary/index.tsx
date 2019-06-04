import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_REPORTS_BY_MEMBER } from "../../../../graphql/reports/getUserReports";

const columns = [
  {
    title: "Member Name",
    dataIndex: "name",
    key: "name",
    width: "80%"
  },
  {
    title: "Duration",
    dataIndex: "totalDuration",
    key: "totalDuration",
    render: (text: any) => {
      return moment.utc(parseInt(text) * 1000).format("HH:mm");
    }
  }
];

const expandedRowRender = (record: any) => {
  const columns = [
    { title: "Task", dataIndex: "task", key: "task", width: "80%" },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text: any) => {
        return moment.utc(parseInt(text) * 1000).format("HH:mm");
      }
    }
  ];

  const data = [];
  for (let task of record.tasks) {
    data.push({
      key: task.tid,
      task: task.name,
      duration: task.totalDuration
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

const Summary = () => {
  const getReports = useQuery(GET_REPORTS_BY_MEMBER);

  if (getReports.loading) return null;

  const reports = getReports.data.getReportsByMember;

  reports.map((report: any) => {
    report.key = report.uid;
    return report;
  });
  return (
    <Table
      columns={columns}
      dataSource={reports}
      expandedRowRender={expandedRowRender}
    />
  );
};

export default Summary;
