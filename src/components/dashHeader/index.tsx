import Button from "antd/lib/button/button";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import LOGOUT from "../../graphql/user/logout";

const DashHeader = (props: any) => {
  const doLogout = useMutation(LOGOUT);
  return (
    <div>
      Dash Board Header...
      <Button
        onClick={async () => {
          const result = await doLogout();
          console.log(result);
          if (result && result.data && result.data.logout) {
            props.history.push("/login");
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default DashHeader;
