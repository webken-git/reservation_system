import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../store/auth";

function GuestRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  return isAuth
    ? <Redirect to="/" />
    : <Route {...props} />;
}

export default GuestRoute;
