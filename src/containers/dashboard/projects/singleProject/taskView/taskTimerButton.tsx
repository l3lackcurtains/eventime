import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { GET_TIMER } from "../../../../../graphql/timer/getTimer";
import { START_TIMER } from "../../../../../graphql/timer/startTimer";
import { STOP_TIMER } from "../../../../../graphql/timer/stopTimer";

const TaskTimerButton = (props: any) => {
  const { currentTask } = props;
  // Get current Timer
  const { data, error, loading, refetch } = useQuery(GET_TIMER);
  if (loading) return null;
  const isTimerStarted = data.getTimer.result
    ? data.getTimer.result.task.id === currentTask.id
    : false;
  let timerStartedAt = null;
  if (isTimerStarted) {
    timerStartedAt = data.getTimer.result.startedAt;
  }
  return (
    <TaskTimerButtonInner
      currentTask={currentTask}
      isTimerStarted={isTimerStarted}
      timerStartedAt={timerStartedAt}
      refetchTimer={refetch}
    />
  );
};

const TaskTimerButtonInner = (props: any) => {
  const { currentTask, isTimerStarted, timerStartedAt, refetchTimer } = props;
  const [timerStarted, setTimerStarted] = useState(isTimerStarted);
  const now = moment();
  const timerDuration = moment.duration(now.diff(timerStartedAt));

  const [timer, setTimer] = useState(timerDuration);

  const [starting, setStarting] = useState(false);

  // start Timer
  const startTimer = useMutation(START_TIMER);
  const startTaskTimer = async () => {
    setStarting(true);
    const taskId = currentTask.id;
    await startTimer({
      variables: {
        taskId
      }
    });
    setTimerStarted(true);
    refetchTimer();
    setTimeout(() => {
      setStarting(false);
    }, 1200);
  };

  const stopTimer = useMutation(STOP_TIMER);
  const stopTaskTimer = async () => {
    const taskId = currentTask.id;
    await stopTimer({
      variables: {
        taskId
      }
    });
    setTimerStarted(false);
    refetchTimer();
  };

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
    <>
      {timerStarted ? (
        <ActionButtonStop block onClick={() => stopTaskTimer()}>
          {!starting
            ? `${moment.utc(timer.asMilliseconds()).format("HH:mm:ss")}`
            : "starting"}
        </ActionButtonStop>
      ) : (
        <ActionButtonStart
          type="primary"
          block
          onClick={() => startTaskTimer()}
        >
          Start Timer
        </ActionButtonStart>
      )}
    </>
  );
};

const ActionButtonStart = styled(Button)`
  margin: 8px 0;
`;

const ActionButtonStop = styled(Button)`
  margin: 8px 0;
  background: red;
  color: #fff;
  &:hover {
    background: red;
    color: #fff;
  }
`;

export default TaskTimerButton;
