import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { GET_TIMER } from "../../../../graphql/timer/getTimer";

const CardTimer = (props: any) => {
  const { task } = props;
  const { data, loading } = useQuery(GET_TIMER);

  if (loading) return null;

  if (!data.getTimer.result || task.id !== data.getTimer.result.task.id)
    return null;

  return <CardTimerInner currentTimer={data.getTimer.result} />;
};

const CardTimerInner = (props: any) => {
  const { currentTimer } = props;
  const now = moment();
  const timerStartedAt = currentTimer.startedAt;
  const timerDuration = moment.duration(now.diff(timerStartedAt));
  const [timer, setTimer] = useState(timerDuration);

  const runningTimer = setInterval(() => {
    const now = moment();
    const timerDuration = moment.duration(now.diff(timerStartedAt));
    setTimer(timerDuration);
  }, 1000);

  useEffect(() => {
    return function cleanup() {
      clearTimeout(runningTimer);
    };
  });

  return (
    <StyledBadge>{`${moment
      .utc(timer.asMilliseconds())
      .format("HH:mm:ss")}`}</StyledBadge>
  );
};

const StyledBadge = styled.div`
  background: #fff8e1;
  padding: 6px;
  width: 60px;
  border-radius: 8px;
  font-size: 11px;
  margin: 4px 0;
`;

export default CardTimer;
