import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/userAuth";

const LoginRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
        />
    );
};

export default LoginRoute;
