import { Card, Radio } from "antd";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Summary from "./summary";
import Timesheet from "./timesheet";

const Reports = (props: any) => {
  let currentReportType = "summary";
  const currentPath = props.history.location.pathname;
  if (currentPath.includes("detailed")) {
    currentReportType = "detailed";
  }
  if (currentPath.includes("timesheet")) {
    currentReportType = "timesheet";
  }
  const [reportType, setReportType] = useState(currentReportType);
  const onReportTypeChange = (e: any) => {
    let path = e.target.value;
    setReportType(path);
    if (path === "summary") {
      path = "";
    }
    // @ts-ignore
    props.history.push(`/dashboard/reports/${path}`);
  };

  return (
    <>
      <Card
        title={
          <>
            <StyledCardTitle>
              <h1>Reports</h1>
            </StyledCardTitle>
            <Radio.Group value={reportType} onChange={onReportTypeChange}>
              <Radio.Button value="summary">Summary</Radio.Button>
              <Radio.Button value="timesheet">Timesheet</Radio.Button>
            </Radio.Group>
          </>
        }
      >
        <Switch>
          <Route path={`/dashboard/reports`} exact component={Summary} />
          <Route path={`/dashboard/reports/timesheet`} component={Timesheet} />
        </Switch>
      </Card>
    </>
  );
};

const StyledCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding: 8px 0;
  }
`;

export default Reports;
