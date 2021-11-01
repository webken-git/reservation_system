import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { withCookies } from "react-cookie";
import Cookies from 'universal-cookie'

const LoggedIn = (props) => {
    const cookies = new Cookies();
    // tokenが有効か確認
    if (cookies.get("access_token")) {
        // tokenが有効ならログインしていると判断
        // axios.defaults.headers.common["Authorization"] = props.cookies.get("token");

        let formData = new FormData();
        formData.append("token", cookies.get("access_token"));

        axios
        .post(`${process.env.REACT_APP_END_POINT}account/token/verify/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .catch((error) => {
            alert("再度ログインしてください");
            cookies.remove("access_token");
            cookies.remove("refresh_token");
            window.location.href = "/login";
        });

        return props.children;
        // return <Redirect to="/home" />;
    } else {
        // tokenが無効ならログインしていないと判断
        return <Redirect to="/login" />;
    }
}

export default LoggedIn;
