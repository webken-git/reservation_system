import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Redirect } from "react-router-dom";
import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth/atom";

const LoginRoute = (props) => {
    const [auth, setAuth] = useRecoilState(authState);
    const [user, setUser] = useState([]);
    // トークンが有効か確認
    const GET_USER = AuthUrls.GET_USER_DATA;
    const loginCheck = () => {
        axios.get(GET_USER)
            .then((res) => {
                setUser(res.data);
                // console.log(res.status);
            })
            .catch((err) => {
                // トークンが無効な場合、authStateをfalseにする
                if (err.response.status === 401
                ) {
                    setAuth({
                        isAuthenticated: false,
                    });
                }

            });
    };
    useEffect(() => {
        loginCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // props.childrenにuserをpropsとして渡す
    if (auth.isAuthenticated === true) {
        return props.children;
    } else {
        // alert("再度ログインしてください");
        return <Redirect to="/login" />;
    }
}

export default LoginRoute;
