import React, { useState, createContext,useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TopPage } from "./TopPage";
import ErrorHandle from "../../components/error/Errortest"
import Errortest from "../../components/error/Errortest";
// import PrivateRoute from "../../components/api/PrivateRoute";
// import GuestRoute from "../../components/api/GuestRoute";

export const statusContext = React.createContext()
// export const AuthContext = createContext();
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();
  //  const [handel, setHandel] = useState();
  const submit = async () => {
    const users = {
      email: username,
      password: password
    };
    try {
         const res = await axios.post(
      `${process.env.REACT_APP_LOGIN}
/account/staff-logi/`,
           users
         );
       console.log(users)
      console.log(res.status)
      // history.push("/toppage");
      // setCookie("acc", accesstoken);
      // setCookie("ref", refresh_token);
      return (
        <TopPage/>
      )
      // const token = api.data;
    // const accesstoken = token.access_token;
    // const refresh_token = token.refresh_token;
    } catch (error) {
      return <div>
        <statusContext.Provider value={error.response.status}>
        <Errortest/>
        </statusContext.Provider>
        </div>
    }
  };

  
  return (
    <div>
      <div className={styles.root}>
        <h1>管理者ログイン</h1>
        <div className={styles.username}></div>
        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.username}>
            <label htmlFor="username">
              ユーザーID
              <br />
            </label>
            <input
              className={styles.inputColumn}
              type="text"
              {...register("username", { required: true })}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.password}>
            <label htmlFor="password">
              パスワード
              <br />
            </label>
            <input
              className={styles.inputColumn}
              type="password"
              {...register("password", { required: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.btn} type="submit">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};
