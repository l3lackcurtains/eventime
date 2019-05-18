import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Redirect, Route } from "react-router";
import GET_USER from "../graphql/auth/getUser";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { data, error, loading } = useQuery(GET_USER);
  const isAuthenticated = !error && data;

  if (loading) return null;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
