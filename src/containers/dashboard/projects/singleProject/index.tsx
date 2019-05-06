import React, { useState, Fragment } from "react";
import { Icon, Menu, Tag, Avatar, Input, Button, Popover, Form } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  ProjectWrapper,
  ProjectArea,
  ProjectCard,
  ProjectCards,
  TaskDropdown,
  ProjectAreaEmpty
} from "./styled";

import { projectDatas } from "./data";
import { reorderArray, dragItemsBetweenArray } from "../../../../utils/helpers";

const { TextArea } = Input;

const SingleProject = (props: any) => {
  const [projectTasks, setProjectTasks] = useState(projectDatas);

  /**
   * *********************************************
   * Project add cards
   * *********************************************
   */

  const onAddCard = (e: any) => {
    e.preventDefault();
    const index = 0;
    projectTasks[index].content.push({
      id: "item",
      content: "More data"
    });

    setProjectTasks(projectTasks);
  };

  /**
   * **********************************************
   * Project area addition
   * **********************************************
   */
  const [addProjectAreaButton, setAddProjectAreaButton] = useState(true);

  const onShowAddProjectArea = () => {
    setAddProjectAreaButton(false);
  };

  const onAddProjectArea = (e: any) => {
    setAddProjectAreaButton(true);
    projectTasks.push({
      id: "asas",
      content: []
    });
    setProjectTasks(projectTasks);
  };

  /**
   * ********************************
   * Drag and Drop Logic
   * @param result
   * *******************************
   */

  const onDragCardEnd = (result: any) => {
    const { source, destination } = result;
    // dropped outside the
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const taskId = source.droppableId.split("-")[1];
      const items = reorderArray(
        projectTasks[taskId].content,
        source.index,
        destination.index
      );

      const projectTasksData = projectTasks;
      projectTasksData[taskId].content = items;
      setProjectTasks(projectTasksData);
    } else {
      const srcTaskId = source.droppableId.split("-")[1];
      const destTaskId = destination.droppableId.split("-")[1];
      const result = dragItemsBetweenArray(
        projectTasks[srcTaskId].content,
        projectTasks[destTaskId].content,
        source,
        destination
      );
      const projectTasksData = projectTasks;
      Object.keys(result).map((key: any) => {
        const keyId = key.split("-")[1];
        projectTasksData[keyId].content = result[key];
      });
      setProjectTasks(projectTasksData);
    }
  };

  return (
    <>
      <h1>Projects</h1>
      <ProjectWrapper>
        <DragDropContext onDragEnd={res => onDragCardEnd(res)}>
          {projectTasks.map((tasks, index) => (
            <ProjectArea>
              <TaskDropdown
                overlay={
                  <Menu>
                    <Menu.Item key="0">
                      <a href="http://www.alipay.com/">1st menu item</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <a href="http://www.taobao.com/">2nd menu item</a>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <a className="ant-dropdown-link" href="#">
                  <span>Task 1</span>
                  <span>
                    <Tag color="magenta">4</Tag> <Icon type="down" />
                  </span>
                </a>
              </TaskDropdown>
              <p>11h 35m</p>

              <Droppable droppableId={`droppable-${index}`}>
                {(provided, snapshot) => (
                  <ProjectCards
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.content.map((subtask: any, index: number) => (
                      <Draggable
                        key={subtask.id}
                        draggableId={subtask.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <ProjectCard>
                              <p>{subtask.content}</p>
                              <div className="card-meta">
                                <p>11h 2m of 16h</p>
                                <div>
                                  <Avatar
                                    size="small"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                  />
                                  <Avatar
                                    size="small"
                                    style={{
                                      backgroundColor: "#87d068"
                                    }}
                                    icon="user"
                                  />
                                </div>
                              </div>
                            </ProjectCard>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <Popover
                      placement="rightBottom"
                      content={
                        <Fragment>
                          <Form onSubmit={onAddCard}>
                            <TextArea rows={4} />
                            <Button type="primary" htmlType="submit" block>
                              Add Card
                            </Button>
                          </Form>
                        </Fragment>
                      }
                      trigger="click"
                    >
                      <Button type="dashed" block>
                        Add Card
                      </Button>
                    </Popover>
                  </ProjectCards>
                )}
              </Droppable>
            </ProjectArea>
          ))}
          <ProjectArea>
            <ProjectCards>
              {addProjectAreaButton ? (
                <ProjectAreaEmpty>
                  <Button
                    className="add-project-area"
                    type="dashed"
                    block
                    onClick={onShowAddProjectArea}
                  >
                    Add Task Section
                  </Button>
                </ProjectAreaEmpty>
              ) : (
                <ProjectAreaEmpty>
                  <TextArea rows={4} />
                  <Button type="primary" block onClick={onAddProjectArea}>
                    Add
                  </Button>
                </ProjectAreaEmpty>
              )}
            </ProjectCards>
          </ProjectArea>
        </DragDropContext>
      </ProjectWrapper>
    </>
  );
};

export default SingleProject;
