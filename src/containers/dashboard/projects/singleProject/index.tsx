import { Avatar, Button, Form, Icon, Input, Menu, Popover, Tag } from "antd";
import React, { Fragment, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import { dragItemsBetweenArray, reorderArray } from "../../../../utils/helpers";
import { projectDatas } from "./data";
import {
  ProjectArea,
  ProjectAreaEmpty,
  ProjectCard,
  ProjectCards,
  ProjectWrapper,
  TaskDropdown
} from "./styled";

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
      id: `item`,
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
        return result[key];
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
                      <NavLink to="/">1st menu item</NavLink>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <NavLink to="/">2nd menu item</NavLink>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                  </Menu>
                }
                trigger={["click"]}
              >
                <p className="ant-dropdown-link">
                  <span>Task 1</span>
                  <span>
                    <Tag color="magenta">4</Tag> <Icon type="down" />
                  </span>
                </p>
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
