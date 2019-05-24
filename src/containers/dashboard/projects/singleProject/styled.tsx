import { Card, Dropdown } from "antd";
import styled from "styled-components";

export const ProjectWrapper = styled.section`
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

export const ProjectArea = styled.div`
  padding: 8px;
  margin-right: 16px;
  background: #fcfcfc;
  width: 300px;
`;

export const ProjectCard = styled(Card)`
  margin-bottom: 16px;
  border-left: 5px solid #000;
  .ant-card-body {
    padding: 16px 16px 4px 24px;
  }
  .card-meta {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    font-size: 0.8em;
    color: #999;
    margin: 8px 0;
  }
`;

export const ProjectCards = styled.div`
  width: 300px;
  margin-top: 24px;
  padding-right: 6px;
  min-height: 600px;
`;

export const TaskDropdown = styled(Dropdown)`
  margin: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    margin-right: 24px;
  }
`;

export const ProjectAreaEmpty = styled.div`
  padding: 24px 8px;
  margin: 0 16px;
  .add-project-area {
    padding: 80px 0;
  }
`;

export const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .left-actions {
    display: flex;
  }
  h1 {
    margin-right: 16px;
  }
`;
