import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'

const LogoutRoute = ({ component: Component, ...rest }) => {
    const cookies = new Cookies();

    return (
        <Route
            {...rest}
            render={(props) =>
                // cookies.get('access_token') ? <Component {...props} /> : <Redirect to="/login" />
                cookies.get('access_token') ? <Redirect to="/login" /> : <Component {...props} />
            }
        />
    );
};

// const LogoutRoute = props =>
    // cookies.get('access_token') ? null : props.children;

export default LogoutRoute;
