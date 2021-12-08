import React from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Redirect } from "react-router-dom";
import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth/atom";

const LoginRoute = (props) => {
    const [auth, setAuth] = useRecoilState(authState);
    // トークンが有効か確認
    const GET_USER = AuthUrls.GET_USER_DATA;
    const loginCheck = () => {
        axios.get(GET_USER)
            .catch((err) => {
                // トークンが無効な場合、authStateをfalseにする
                if (err.response.status === 401) {
                    setAuth({
                        isAuthenticated: false,
                    });
                }

            });
    };
    loginCheck();

    if(auth.isAuthenticated === true) {
        return props.children;
    } else {
        // alert("再度ログインしてください");
        return <Redirect to="/login" />;
    }
}

export default LoginRoute;
