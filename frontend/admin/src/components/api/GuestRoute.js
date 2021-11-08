import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuestRoute(props) {
    const isAuth = props

  return isAuth
    ? <Redirect to="/" />
    : <Route {...props} />;
}

export default GuestRoute;
