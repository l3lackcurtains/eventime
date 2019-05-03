import React, { useState } from "react";
import { Icon, Menu, Tag, Avatar, Input } from "antd";
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
import { reorderArray } from "../../../../utils/helpers";

const { TextArea } = Input;

const SingleProject = () => {
  /*
  const [addCardButton, setAddCardButton] = useState(true);

  const onShowAddCard = () => {
    setAddCardButton(false);
  };

  const onAddCard = (e: any) => {
    setAddCardButton(true);
    setProjectTasks(
      projectTasks.concat({
        id: "item",
        content: "More data"
      })
    );
  };

  // project Area addition
  const [addProjectAreaButton, setAddProjectAreaButton] = useState(true);

  const onShowAddProjectArea = () => {
    setAddProjectAreaButton(false);
  };

  const onAddProjectArea = (e: any) => {
    setAddProjectAreaButton(true);
  };

  */
  const [projectTasks, setProjectTasks] = useState(projectDatas);

  function onDragCardEnd(result: any, index: number) {
    const { destination } = result;

    if (!destination) {
      return;
    }

    const items: any = reorderArray(
      projectTasks[index].content,
      result.source.index,
      result.destination.index
    );

    const projectTasksData = projectTasks;
    projectTasksData[index].content = items;
    setProjectTasks(projectTasksData);
  }

  function onDragAreaEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const items: any = reorderArray(
      projectTasks,
      result.source.index,
      result.destination.index
    );
    setProjectTasks(items);
  }

  return (
    <div>
      <h1>Projects</h1>
      <DragDropContext onDragEnd={onDragAreaEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <ProjectWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {projectTasks.map((tasks, index) => (
                <Draggable key={tasks.id} draggableId={tasks.id} index={index}>
                  {(provided, snapshot) => (
                    <ProjectArea
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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

                      <DragDropContext
                        onDragEnd={res => onDragCardEnd(res, index)}
                      >
                        <Droppable droppableId={`droppable-${index}`}>
                          {(provided, snapshot) => (
                            <ProjectCards
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {tasks.content.map(
                                (subtask: any, index: number) => (
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
                                )
                              )}
                            </ProjectCards>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </ProjectArea>
                  )}
                </Draggable>
              ))}
              {/*
                  addCardButton ? (
                  <Button type="dashed" block onClick={onShowAddCard}>
                    Add Card
                  </Button>
                ) : (
                  <Fragment>
                    <TextArea rows={4} />
                    <Button type="primary" block onClick={onAddCard}>
                      Add
                    </Button>
                  </Fragment>
                )
                
                  */}
            </ProjectWrapper>
          )}
        </Droppable>
      </DragDropContext>

      {/*
          addProjectAreaButton ? (
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
        )
        */}
    </div>
  );
};

export default SingleProject;
