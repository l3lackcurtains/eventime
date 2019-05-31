import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_REPORTS_BY_MEMBER } from "../../../../graphql/reports/getUserReports";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "60%"
  },
  {
    title: "Duration",
    dataIndex: "totalDuration",
    render: (text: any) => {
      return moment.utc(parseInt(text) * 1000).format("HH:mm");
    }
  }
];

const Summary = () => {
  const getReports = useQuery(GET_REPORTS_BY_MEMBER);

  if (getReports.loading) return null;

  const reports = getReports.data.getReportsByMember;

  reports.map((report: any) => {
    report.key = report.uid;
    return report;
  });
  return <Table columns={columns} dataSource={reports} />;
};

export default Summary;
