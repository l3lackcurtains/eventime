import { Button, Col, Form, Row } from "antd";
import { Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import * as Yup from "yup";
import { CustomCascader } from "../../../components/fields/formFields";
import { GET_PROJECTS_WITH_TASKS } from "../../../graphql/project/getProjects";
import { GET_TIMER } from "../../../graphql/timer/getTimer";
import { START_TIMER } from "../../../graphql/timer/startTimer";
import { STOP_TIMER } from "../../../graphql/timer/stopTimer";

const startTimerSchema = Yup.object().shape({
  task: Yup.string().required("Task is Required")
});

const TimerBox = (props: any) => {
  const { refetchTimerRecords } = props;
  const getProjects = useQuery(GET_PROJECTS_WITH_TASKS);
  const startTimer = useMutation(START_TIMER);
  const getTimer = useQuery(GET_TIMER);
  let currentTimer: any = null;
  if (getTimer.loading) return null;
  if (!getTimer.loading && !getTimer.error) {
    currentTimer = getTimer.data.getTimer.result;
  }
  const handleStartTimer = async (values: any, { resetForm }: any) => {
    const { task } = values;
    const started = await startTimer({
      variables: {
        taskId: task[2]
      }
    });

    if (started.data.startTimer.success) {
      resetForm();
      getTimer.refetch();
    }
  };

  let projectsData: any[] = [];
  if (!getProjects.loading && !getProjects.error) {
    const projects = getProjects.data.getProjectWithTasks.results;
    if (projects) {
      projectsData = projects.map((p: any) => {
        p.label = p.name;
        p.value = p.id;
        p.children = p.sections;
        p.children.map((s: any) => {
          s.label = s.name;
          s.value = s.id;
          s.children = s.tasks;
          s.children.map((t: any) => {
            t.label = t.name;
            t.value = t.id;
            return t;
          });
          return s;
        });
        return p;
      });
    }
  }

  return (
    <Formik
      initialValues={{}}
      validationSchema={startTimerSchema}
      onSubmit={handleStartTimer}
      render={(props: any) => (
        <Form layout="vertical" onSubmit={props.handleSubmit}>
          <Row gutter={4} type="flex" justify="space-between" align="top">
            <Col xs={24} lg={20}>
              {currentTimer ? (
                <StyledTaskName>{currentTimer.task.name}</StyledTaskName>
              ) : (
                <CustomCascader
                  name="task"
                  options={projectsData}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select task from the projects."
                />
              )}
            </Col>
            <Col xs={24} lg={4}>
              {currentTimer ? (
                <TimerButton
                  currentTimer={currentTimer}
                  refetchTimer={getTimer.refetch}
                  refetchTimerRecords={refetchTimerRecords}
                />
              ) : (
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  htmlType="submit"
                >
                  Start Timer
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
    />
  );
};

const TimerButton = (props: any) => {
  const { currentTimer, refetchTimer, refetchTimerRecords } = props;
  const now = moment();
  const timerStartedAt = currentTimer.startedAt;
  const timerDuration = moment.duration(now.diff(timerStartedAt));
  const [timer, setTimer] = useState(timerDuration);

  const stopTimer = useMutation(STOP_TIMER);
  const stopTaskTimer = async () => {
    const taskId = currentTimer.task.id;
    await stopTimer({
      variables: {
        taskId
      }
    });
    refetchTimer();
    refetchTimerRecords();
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
    <StyledButton size="large" onClick={() => stopTaskTimer()}>{`${moment
      .utc(timer.asMilliseconds())
      .format("HH:mm:ss")}`}</StyledButton>
  );
};

const StyledButton = styled(Button)`
  background: red;
  width: 100%;
  color: #fff;
  &:hover {
    background: red;
    color: #fff;
  }
`;

const StyledTaskName = styled.p`
  font-size: 20px;
  padding: 10px 0;
`;
export default TimerBox;
