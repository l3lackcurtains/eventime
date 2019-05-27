import { Card, Col, Collapse, Icon, List, Row, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { GET_USER_TIMER_RECORDS } from "../../../graphql/timerRecords/getUserTimerRecords";
import { groupedTimerRecords } from "../../../utils/helpers";
import TimerBox from "./timerBox";

const Panel = Collapse.Panel;

const Timer = () => {
  const getTimerRecords = useQuery(GET_USER_TIMER_RECORDS);
  if (!!getTimerRecords.error) {
    return <div>No Timer Records</div>;
  }

  if (getTimerRecords.loading) {
    return null;
  }
  const timerRecords = getTimerRecords.data.getUserTimerRecords.results;

  const formattedTmerRecords = groupedTimerRecords(timerRecords);

  console.log(formattedTmerRecords);

  return (
    <div>
      <Row>
        <Card
          title={<TimerBox refetchTimerRecords={getTimerRecords.refetch} />}
        >
          {formattedTmerRecords.map((timerRecord: any) => (
            <>
              <DateTitle>
                <h3>{moment(timerRecord.date).fromNow()}</h3>
                <p>{moment(timerRecord.date).format("LL")}</p>
              </DateTitle>
              <List
                itemLayout="horizontal"
                dataSource={timerRecord.dateRecords}
                renderItem={(item: any) => (
                  <List.Item style={{ margin: "24px 0" }}>
                    <Row gutter={36} type="flex" justify="space-between">
                      <Col>
                        <div style={{ width: 100 }}>
                          <Icon
                            type="clock-circle"
                            style={{ fontSize: 24, margin: "4px 16px" }}
                          />
                          <p>
                            {moment
                              .utc(item.totalDuration * 1000)
                              .format("HH:mm:ss")}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <h3>{item.task}</h3>
                        <StyledCollapse
                          bordered={false}
                          defaultActiveKey={["0"]}
                          expandIcon={({ isActive }) => (
                            <Icon
                              type="caret-right"
                              rotate={isActive ? 90 : 0}
                            />
                          )}
                        >
                          <StyledPanel header={<span>History</span>} key="1">
                            {item.taskRecords.map((taskRecord: any) => (
                              <RecordHistory>
                                <p>
                                  <Tag color="magenta">{taskRecord.type}</Tag>
                                  {taskRecord.startedAt
                                    ? moment(taskRecord.startedAt).format("LLL")
                                    : moment(taskRecord.date).format("LL")}
                                </p>
                                <p className="timer-duration">
                                  {moment
                                    .utc(taskRecord.duration * 1000)
                                    .format("HH:mm:ss")}
                                </p>
                              </RecordHistory>
                            ))}
                          </StyledPanel>
                        </StyledCollapse>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </>
          ))}
        </Card>
      </Row>
    </div>
  );
};

const DateTitle = styled.div`
  display: inline-block;
  display: flex;
  align-items: baseline;
  h3 {
    margin-right: 12px;
  }
`;

const StyledPanel = styled(Panel)`
  border-bottom: 0px !important;
  i {
    left: 0 !important;
    color: #888;
  }
`;

const StyledCollapse = styled(Collapse)`
  margin: 0;
  .ant-collapse-header {
    padding-left: 16px !important;
    span {
      color: #666;
    }
  }
`;

const RecordHistory = styled.div`
  display: flex;
  padding-top: 8px;
  .timer-duration {
    color: #1da57a;
    margin-left: 16px;
  }
`;

export default Timer;
