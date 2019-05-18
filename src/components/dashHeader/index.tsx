import React from "react";
import { useMutation } from "react-apollo-hooks";
import LOGOUT from "../../graphql/auth/logout";

const DashHeader = (props: any) => {
  const doLogout = useMutation(LOGOUT);
  return (
    <div>
      Dash Board Header...
      <a
        onClick={async () => {
          const result = await doLogout();
          if (result && result.data && result.data.logout) {
            props.history.push("/login");
          }
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default DashHeader;
