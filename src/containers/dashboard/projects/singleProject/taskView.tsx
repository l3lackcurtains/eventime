import { Button, Col, Divider, Modal, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import EditTask from "./editTask";

const TaskView = (props: any) => {
  // Task Modal
  const {
    taskModalVisible,
    currentTask,
    toggleTaskView,
    refetchProject
  } = props;

  // Edit Task
  const [showEditTask, setShowEditTask] = useState(false);

  if (!currentTask) return null;

  return (
    <Modal
      title={null}
      visible={taskModalVisible}
      onOk={() => toggleTaskView(false)}
      onCancel={() => toggleTaskView(false)}
      footer={null}
      width={700}
    >
      <Row>
        <h3>{currentTask.name}</h3>
      </Row>
      <Divider />
      {showEditTask ? (
        <EditTask
          setShowEditTask={setShowEditTask}
          toggleTaskView={toggleTaskView}
          refetchProject={refetchProject}
          task={currentTask}
        />
      ) : (
        <>
          <Row>
            <Col xs={24} sm={20}>
              <p>{currentTask.description || "No description."}</p>
            </Col>
            <Col xs={24} sm={4}>
              <ActionButton type="primary" block>
                Start Timer
              </ActionButton>
              <ActionButton type="primary" block>
                Add Time
              </ActionButton>
              <ActionButton block onClick={() => setShowEditTask(true)}>
                Edit Task
              </ActionButton>
              <ActionButton block>Edit Estimate</ActionButton>
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
