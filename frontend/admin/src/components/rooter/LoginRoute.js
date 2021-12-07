import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

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
        const refreshUrl = AuthUrls.TOKEN_REFRESH;
        axios
        .post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                let formData = new FormData();
                formData.append("refresh", cookies.get("refresh_token"));
                axios.post(refreshUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        },
                })
                .then((res) => {
                    // アクセストークンを更新
                    cookies.set('access_token', res.data.access, { path: '/' }, { httpOnly: true });
                    console.log("アクセストークンを更新しました");
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((err) => {
            // トークンが有効期限切れの場合
            cookies.remove("access_token");
            cookies.remove("refresh_token");
            cookies.remove("user_id");
            window.location.href = "/login";
            alert("再度ログインしてください");
        });

        return props.children;
    } else {
        // トークンが無効ならログインしていないと判断
        return <Redirect to="/login" />;
    }
}

export default LoginRoute;
