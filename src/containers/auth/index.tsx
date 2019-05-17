import React from "react";
import { Switch, Route } from "react-router";
import Login from "./login";

const Auth = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  );
};

export default Auth;
