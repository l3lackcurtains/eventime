import React, { Component } from "react";
import { Tabs, Radio } from "antd";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Summary from "./summary";
import Detailed from "./detailed";
import Timesheet from "./timesheet";
import Filters from "./filters";
const TabPane = Tabs.TabPane;

class Reports extends Component {
  state = {
    type: "summary"
  };
  handleSizeChange = (e: any) => {
    this.setState({ type: e.target.value });
    let path = e.target.value;
    if (path === "summary") {
      path = "";
    }
    // @ts-ignore
    this.props.history.push(`/reports/${path}`);
  };

  render() {
    return (
      <div>
        <h1>Reports</h1>
        <Radio.Group value={this.state.type} onChange={this.handleSizeChange}>
          <Radio.Button value="summary">Summary</Radio.Button>
          <Radio.Button value="detailed">Detailed</Radio.Button>
          <Radio.Button value="timesheet">Timesheet</Radio.Button>
        </Radio.Group>
        <Filters />
        <Switch>
          <Route path={`/reports`} exact component={Summary} />
          <Route path={`/reports/detailed`} component={Detailed} />
          <Route path={`/reports/timesheet`} component={Timesheet} />
        </Switch>
      </div>
    );
  }
}

export default Reports;
