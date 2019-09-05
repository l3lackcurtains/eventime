import { Avatar, Dropdown, Icon, Menu } from "antd";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { LOGOUT } from "../../graphql/user/logout";

const DashHeader = (props: any) => {
  const doLogout = useMutation(LOGOUT);
  return (
    <StyledHeader>
      <div className="header-left" />
      <div className="header-right">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a>Edit Profile</a>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={async (e: any) => {
                    e.preventDefault();
                    const logout = await doLogout();
                    if (logout && logout.data) {
                      props.history.push("/login");
                    }
                  }}
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <a className="ant-dropdown-link" href="#">
            <span>
              Madhav Poudel <Icon type="down" />
            </span>
            <Avatar size={48} icon="user" />
          </a>
        </Dropdown>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  width: 100%;
  .header-right {
    span {
      margin-right: 16px;
    }
  }
`;

export default DashHeader;
