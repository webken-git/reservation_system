import React from "react";
import axios from "axios";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Redirect } from "react-router-dom";
import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth";
import tabState from "../../recoil/tab";
import { formData, personalData, stepValue } from "../../recoil/form/atom";

const LoginRoute = (props) => {
  const [auth, setAuth] = useRecoilState(authState);
  const resetTab = useResetRecoilState(tabState);
  const resetFormData = useResetRecoilState(formData);
  const resetPersonalData = useSetRecoilState(personalData);
  const resetStepValue = useSetRecoilState(stepValue);
  // トークンが有効か確認
  const getUser = AuthUrls.GET_USER_LIST;
  const logout = AuthUrls.LOGOUT;
  const loginCheck = () => {
    axios
      .get(`${getUser}${auth.userId}/`)
      .then((res) => {
        // setUser(res.data);
      })
      .catch((err) => {
        // トークンが無効な場合ログアウト
        axios
          .post(logout)
          .then((res) => {
            // ログアウト成功時、authStateをfalseにする
            setAuth({
              isAuthenticated: false,
              userId: "",
            });
            resetTab();
            resetFormData();
            resetPersonalData([]);
            resetStepValue(0);
          })
          .catch((err) => {
            // console.log(err);
          });
      });
  };
  loginCheck();

  // props.childrenにuserをpropsとして渡す
  if (auth.isAuthenticated === true) {
    return props.children;
  } else {
    // alert("再度ログインしてください");
    return <Redirect to="/" />;
  }
};

export default LoginRoute;
