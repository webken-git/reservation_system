import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'

import { AuthUrls } from "../../utils/authUrls";

const LoginRoute = (props) => {
    const cookies = new Cookies();
    // トークンが有効か確認
    if (cookies.get("access_token")) {
        // トークンが有効ならログインしていると判断
        // axios.defaults.headers.common["Authorization"] = props.cookies.get("token");

        let formData = new FormData();
        formData.append("token", cookies.get("access_token"));

        const url = AuthUrls.TOKEN_VERIFY;
        const refresh = AuthUrls.TOKEN_REFRESH;
        axios
        .post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                axios.post(refresh, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then((response) => {
                    cookies.remove("access_token");
                    cookies.remove("refresh_token");
                    cookies.set("access_token", response.data.token, { path: "/" });
                    cookies.set("refresh_token", response.data.refresh_token, { path: "/" });
                })
            })
            .catch((error) => {
            // トークンが有効期限切れの場合
            alert("再度ログインしてください");
            cookies.remove("access_token");
            cookies.remove("refresh_token");
            cookies.remove("user_id");
            window.location.href = "/login";
        });

        return props.children;
    } else {
        // トークンが無効ならログインしていないと判断
        return <Redirect to="/login" />;
    }
}

export default LoginRoute;
