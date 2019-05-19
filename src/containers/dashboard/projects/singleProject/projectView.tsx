import { Avatar, Button, Form, Icon, Input, Menu, Popover, Tag } from "antd";
import React, { Fragment, useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import {
  REORDER_TASK,
  REORDER_TASK_BETWEEN_SECTIONS
} from "../../../../graphql/project/reorderTask";
import { dragItemsBetweenArray, reorderArray } from "../../../../utils/helpers";
import {
  ProjectArea,
  ProjectAreaEmpty,
  ProjectCard,
  ProjectCards,
  ProjectWrapper,
  TaskDropdown
} from "./styled";

const { TextArea } = Input;

const ProjectView = (props: any) => {
  /**
   * *********************************************
   * Get Project Data
   * *********************************************
   */
  const { projectData } = props;

  const [projectTasks, setProjectTasks] = useState(projectData);
  /**
   * *********************************************
   * Reorder API call
   * *********************************************
   */

  const reorderTask = useMutation(REORDER_TASK);
  const reorderTaskBetweenSections = useMutation(REORDER_TASK_BETWEEN_SECTIONS);

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
      name: "More data"
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
      tasks: []
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
        projectTasks.sections[taskId].tasks,
        source.index,
        destination.index
      );
      const projectTasksData = projectTasks;
      projectTasksData.sections[taskId].tasks = items;
      setProjectTasks(projectTasksData);
      reorderTask({
        variables: {
          sectionId: projectTasks.sections[taskId].id,
          from: source.index,
          to: destination.index
        }
      });
    } else {
      const srcTaskId = source.droppableId.split("-")[1];
      const destTaskId = destination.droppableId.split("-")[1];
      const result = dragItemsBetweenArray(
        projectTasks.sections[srcTaskId].tasks,
        projectTasks.sections[destTaskId].tasks,
        source,
        destination
      );
      const projectTasksData = projectTasks;
      Object.keys(result).map((key: any) => {
        const keyId = key.split("-")[1];
        projectTasksData.sections[keyId].tasks = result[key];
        return result[key];
      });
      setProjectTasks(projectTasksData);
      reorderTaskBetweenSections({
        variables: {
          sourceSectionId: projectTasks.sections[srcTaskId].id,
          destinationSectionId: projectTasks.sections[destTaskId].id,
          from: source.index,
          to: destination.index
        }
      });
    }
  };

  return (
    <>
      <h1>{projectData.name}</h1>
      <ProjectWrapper>
        <DragDropContext onDragEnd={res => onDragCardEnd(res)}>
          {projectTasks.sections.map((section: any, index: any) => (
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
                  <span>{section.name}</span>
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
                    {section.tasks.map((subtask: any, index: number) => (
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
                              <p>{subtask.name}</p>
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

export default ProjectView;
