import { Button, Card, Divider, Dropdown, Menu, Modal, Table } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GET_PROJECTS } from "../../../graphql/project/getProjects";
import CreateProject from "./createProject";

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
    render: (text: string, data: any) => {
      return <NavLink to={`/dashboard/projects/${data.slug}`}>{text}</NavLink>;
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 200,
    render: (text: string, record: any) => (
      <div>
        <Button>Edit</Button>
        <Divider type="vertical" />
        <Button>Delete</Button>
      </div>
    )
  }
];

const Projects = () => {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  let projects = [];
  if (!loading) {
    projects = data.getProjects.results.map((p: any) => {
      p.key = p.id;
      return p;
    });
  }

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

  if (loading && !!error) return null;
  // TODO: Show starting point to create project, if no projects exist

  return (
    <>
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
          dataSource={projects}
        />
      </Card>
      <Modal
        title="Create Project"
        visible={createProjectModalVisible}
        footer={null}
        onOk={() => onChangeProjectModalState(false)}
        onCancel={() => onChangeProjectModalState(false)}
      >
        <CreateProject />
      </Modal>
    </>
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
