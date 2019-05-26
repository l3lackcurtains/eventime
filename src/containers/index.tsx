import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import ProtectedRoute from "../utils/components";
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard";

function Home() {
  return <Redirect to="/dashboard" />;
}

function MainApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default MainApp;
