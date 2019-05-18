import { Button, Card, Divider, Dropdown, Menu, Modal, Table } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AddProject from "./addProject";

const menu = (
  <Menu>
    <Menu.Item>Archive</Menu.Item>
    <Menu.Item>Unarchive</Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string) => {
      const projectUrl = text
        .toLowerCase()
        .split(" ")
        .join("-");
      return <NavLink to={`/dashboard/projects/${projectUrl}`}>{text}</NavLink>;
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 200,
    render: (text: string, record: any) => (
      <span>
        <a href="#">Edit</a>
        <Divider type="vertical" />
        <a href="#">Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "Time Management Application",
    actions: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "NNTask Application Development",
    actions: <p>hb</p>
  }
];

const Projects = () => {
  /**
   * Table Rows Selection
   */
  const [selectedRowKeys, setSelectedRowKey] = useState([]);

  const onTableRowSelection = (selKeys: any) => {
    setSelectedRowKey(selKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableRowSelection
  };

  const hasSelected = selectedRowKeys.length > 0;

  /**
   * Create Project Modal
   */

  const [createProjectModalVisible, setCreateProjectModalVisible] = useState(
    false
  );

  const onChangeProjectModalState = (state: boolean) => {
    setCreateProjectModalVisible(state);
  };

  return (
    <div>
      <Card
        title={
          <>
            <StyledCardTitle>
              <h1>Projects</h1>
              <Button
                type="primary"
                icon="plus"
                size="large"
                onClick={() => onChangeProjectModalState(true)}
              >
                Create Project
              </Button>
            </StyledCardTitle>
          </>
        }
      >
        <StyledAboveTable>
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            disabled={!hasSelected}
          >
            <Button type="dashed">Bulk Actions</Button>
          </Dropdown>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </StyledAboveTable>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Modal
        title="Create Project"
        visible={createProjectModalVisible}
        onOk={() => onChangeProjectModalState(false)}
        onCancel={() => onChangeProjectModalState(false)}
      >
        <AddProject />
      </Modal>
    </div>
  );
};

const StyledCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding: 8px 0;
  }
`;

const StyledAboveTable = styled.div`
  margin: 24px 0;
`;

export default Projects;
