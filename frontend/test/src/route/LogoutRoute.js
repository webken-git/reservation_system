import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/userAuth";

const LogoutRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
            {...rest}
            render={(props) =>
              isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default LogoutRoute;
