import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAuthSelector } from "../../store/auth";

function PrivateRoute(props) {
  const isAuth = props
  console.log(isAuth)
 return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
