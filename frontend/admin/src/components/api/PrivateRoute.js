import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../store/auth";

function PrivateRoute(props) {
  const isAuth = useSelector(isAuthSelector);

  // return isAuth
  //   ? <Route {...props} />
  //   : <Redirect to="/login" />;
    return <Route {...props} />
}

export default PrivateRoute;
