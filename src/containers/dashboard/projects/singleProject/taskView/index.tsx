import { Button, Col, Divider, Modal, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import AddEstimateButton from "./addEstimate";
import AddTimeButton from "./addTimeButton";
import EditTask from "./editTask";
import TaskTimerButton from "./taskTimerButton";

const TaskView = (props: any) => {
  // Task Modal
  const { taskModalVisible, currentTask, setTaskModalVisible } = props;

  // Edit Task
  const [showEditTask, setShowEditTask] = useState(false);

  if (!currentTask) return null;

  return (
    <Modal
      title={currentTask.name}
      visible={taskModalVisible}
      onOk={() => setTaskModalVisible(false)}
      onCancel={() => {
        setTaskModalVisible(false);
        setShowEditTask(false);
      }}
      footer={null}
      width={700}
      destroyOnClose
    >
      {showEditTask ? (
        <EditTask
          setShowEditTask={setShowEditTask}
          setTaskModalVisible={setTaskModalVisible}
          currentTask={currentTask}
        />
      ) : (
        <>
          <Row>
            <Col xs={24} sm={20}>
              <p>{currentTask.description || "No description."}</p>
            </Col>
            <Col xs={24} sm={4}>
              <TaskTimerButton currentTask={currentTask} />
              <AddTimeButton currentTask={currentTask} />
              <ActionButton block onClick={() => setShowEditTask(true)}>
                Edit Task
              </ActionButton>
              <AddEstimateButton currentTask={currentTask} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <span>
              Created at {moment(currentTask.createdAt).format("LLL")}
            </span>
          </Row>
        </>
      )}
    </Modal>
  );
};

const ActionButton = styled(Button)`
  margin: 8px 0;
`;

export default TaskView;
