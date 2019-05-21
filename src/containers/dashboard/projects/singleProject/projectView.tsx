import { Avatar, Button, Form, Icon, Menu, Popover, Tag } from "antd";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { CustomTextArea } from "../../../../components/fields/formFields";
import { CREATE_SECTION } from "../../../../graphql/project/createSection";
import { CREATE_TASK } from "../../../../graphql/project/createTask";
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
import TaskView from "./taskView";

const CreateTaskSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required")
});

const ProjectView = (props: any) => {
  // Get projects data
  const { projectTasks, refetchProject } = props;

  // Reorder Tasks API
  const reorderTask = useMutation(REORDER_TASK);
  const reorderTaskBetweenSections = useMutation(REORDER_TASK_BETWEEN_SECTIONS);

  // Add Task card api
  const createTask = useMutation(CREATE_TASK);

  // Add section
  const createSection = useMutation(CREATE_SECTION);

  // Task View Modal
  const [taskModalVisible, setTaskModalVisible] = useState(false);

  const toggleTaskView = (state: boolean) => {
    setTaskModalVisible(state);
  };

  const [currentTask, setCurrentTask] = useState({
    sectionIndex: 0,
    taskIndex: 0
  });

  /**
   * **********************************************
   * Project area addition
   * **********************************************
   */
  const [addProjectAreaButton, setAddProjectAreaButton] = useState(true);

  const onShowAddProjectArea = () => {
    setAddProjectAreaButton(false);
  };

  // Handle section create
  const handleCreateSection = async (
    values: any,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    try {
      const { name } = values;
      await createSection({
        variables: {
          projectId: projectTasks.id,
          name
        }
      });

      resetForm();
      refetchProject();
    } catch (e) {
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  // handle create task
  const handleCreateTask = async (
    sectionIndex: number,
    values: any,
    { setSubmitting, setStatus, resetForm }: any
  ) => {
    try {
      const { name } = values;
      const allTasks = JSON.parse(JSON.stringify(projectTasks));
      await createTask({
        variables: {
          sectionId: allTasks.sections[sectionIndex].id,
          name
        }
      });
      resetForm();
      refetchProject();
    } catch (e) {
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  /**
   * ********************************
   * Drag and Drop Logic
   * @param result
   * *******************************
   */

  const onDragCardEnd = async (result: any) => {
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
      await reorderTask({
        variables: {
          sectionId: projectTasks.sections[taskId].id,
          from: source.index,
          to: destination.index
        }
      });
      refetchProject();
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
      await reorderTaskBetweenSections({
        variables: {
          sourceSectionId: projectTasks.sections[srcTaskId].id,
          destinationSectionId: projectTasks.sections[destTaskId].id,
          from: source.index,
          to: destination.index
        }
      });
      refetchProject();
    }
  };

  return (
    <>
      <h1>{projectTasks.name}</h1>
      <ProjectWrapper>
        <DragDropContext onDragEnd={res => onDragCardEnd(res)}>
          {projectTasks.sections.map((section: any, sectionIndex: any) => (
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

              <Droppable droppableId={`droppable-${sectionIndex}`}>
                {provided => (
                  <ProjectCards
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {section.tasks.map((subTask: any, taskIndex: number) => (
                      <>
                        <Draggable
                          key={subTask.id}
                          draggableId={subTask.id}
                          index={taskIndex}
                        >
                          {provided => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <ProjectCard
                                onClick={() => {
                                  setCurrentTask({ sectionIndex, taskIndex });
                                  toggleTaskView(true);
                                }}
                              >
                                <p>{subTask.name}</p>
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
                      </>
                    ))}
                    <Popover
                      placement="rightBottom"
                      content={
                        <Fragment>
                          <Formik
                            initialValues={{ name: "" }}
                            validationSchema={CreateTaskSchema}
                            onSubmit={(...args) =>
                              handleCreateTask(sectionIndex, ...args)
                            }
                            render={(props: any) => (
                              <Form onSubmit={props.handleSubmit}>
                                <CustomTextArea
                                  rows={4}
                                  name="name"
                                  placeholder="Task Name"
                                />
                                <Form.Item>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                  >
                                    Add Card
                                  </Button>
                                </Form.Item>
                              </Form>
                            )}
                          />
                        </Fragment>
                      }
                      trigger="hover"
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
                  <Formik
                    initialValues={{ name: "" }}
                    validationSchema={CreateTaskSchema}
                    onSubmit={handleCreateSection}
                    render={(props: any) => (
                      <Form onSubmit={props.handleSubmit}>
                        <CustomTextArea
                          rows={4}
                          name="name"
                          placeholder="Section Name"
                        />
                        <Form.Item>
                          <Button type="primary" htmlType="submit" block>
                            Add Section
                          </Button>
                        </Form.Item>
                      </Form>
                    )}
                  />
                </ProjectAreaEmpty>
              )}
            </ProjectCards>
          </ProjectArea>
        </DragDropContext>
        {currentTask ? (
          <TaskView
            currentTask={
              projectTasks.sections[currentTask.sectionIndex].tasks[
                currentTask.taskIndex
              ]
            }
            taskModalVisible={taskModalVisible}
            toggleTaskView={toggleTaskView}
            refetchProject={refetchProject}
          />
        ) : null}
      </ProjectWrapper>
    </>
  );
};

export default ProjectView;
