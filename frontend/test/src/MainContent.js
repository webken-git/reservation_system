import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Custom routing
import { PrivateRoute } from "./route/PrivateRoute";
import { LoginRoute } from "./route/LoginRoute";
import { LogoutRoute } from "./route/LogoutRoute";
// randing
import Home from "./components/user/Home";
// Involved with user routing

// 404 error
import Nomatch from "./components/user/Nomatch";

const MainContent = () => (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route component={Nomatch} />
    </Switch>
)

export default MainContent;
