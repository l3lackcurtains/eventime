import React, { Component, useState, Fragment } from "react";
import { Card, Dropdown, Icon, Menu, Tag, Avatar, Button } from "antd";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";

const ProjectWrapper = styled.section`
  display: flex;
  flex-direction: "row";
  overflow-x: "auto";
  overflow-y: hidden;
  min-height: 700px;
  ::-webkit-scrollbar {
    height: 0.6em;
    @media (max-width: 500px) {
      height: 0;
      width: 0;
    }
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 4px;
    outline: 1px solid slategrey;
  }
`;

const ProjectArea = styled.div`
  padding: 8px;
  margin: 0 16px;
  background: #fcfcfc;
  width: auto;
`;

const ProjectCard = styled(Card)`
  width: 300px;
  margin-bottom: 16px;
  border-left: 4px solid #000;
  .ant-card-body {
    padding: 16px 16px 4px 24px;
  }
  .card-meta {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.8em;
    color: #999;
  }
`;

const ProjectCards = styled.div`
  margin-top: 24px;
  padding-right: 6px;
`;

const TaskDropdown = styled(Dropdown)`
  margin: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    margin-right: 24px;
  }
`;

const SingleProject = () => {
  const [addCardButton, setAddCardButton] = useState(true);
  const onShowAddCard = () => {
    setAddCardButton(false);
  };

  const onAddCard = (e: any) => {
    setAddCardButton(true);
    setSubTasks(subTasks.concat("More data"));
  };

  const tasks: string[] = [];

  for (let i = 1; i < 7; i++) {
    tasks.push(`Sub Task Card ${i}`);
  }

  const [subTasks, setSubTasks] = useState(tasks);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectWrapper>
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
          <ProjectCards>
            {subTasks.map(task => (
              <ProjectCard>
                <p>{task}</p>
                <div className="card-meta">
                  <p>11h 2m of 16h</p>
                  <div>
                    <Avatar
                      size="small"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Avatar
                      size="small"
                      style={{ backgroundColor: "#87d068" }}
                      icon="user"
                    />
                  </div>
                </div>
              </ProjectCard>
            ))}
          </ProjectCards>
          {addCardButton ? (
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
          )}
        </ProjectArea>
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
          <ProjectCards>
            <ProjectCard>
              <p>Sub Task card</p>
              <div className="card-meta">
                <p>11h 2m of 16h</p>
                <div>
                  <Avatar
                    size="small"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon="user"
                  />
                </div>
              </div>
            </ProjectCard>
            <ProjectCard>
              <p>Sub Task card</p>
              <div className="card-meta">
                <p>11h 2m of 16h</p>
                <div>
                  <Avatar
                    size="small"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon="user"
                  />
                </div>
              </div>
            </ProjectCard>
            <ProjectCard>
              <p>Sub Task card</p>
              <div className="card-meta">
                <p>11h 2m of 16h</p>
                <div>
                  <Avatar
                    size="small"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon="user"
                  />
                </div>
              </div>
            </ProjectCard>
          </ProjectCards>
        </ProjectArea>
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
          <ProjectCards>
            <ProjectCard>
              <p>Sub Task card</p>
              <div className="card-meta">
                <p>11h 2m of 16h</p>
                <div>
                  <Avatar
                    size="small"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon="user"
                  />
                </div>
              </div>
            </ProjectCard>
            <ProjectCard>
              <p>Sub Task card</p>
              <div className="card-meta">
                <p>11h 2m of 16h</p>
                <div>
                  <Avatar
                    size="small"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon="user"
                  />
                </div>
              </div>
            </ProjectCard>
          </ProjectCards>
        </ProjectArea>
      </ProjectWrapper>
    </div>
  );
};

export default SingleProject;
