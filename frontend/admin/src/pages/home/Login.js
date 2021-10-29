import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import styles from "./Login.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const submit = async () => {
    await dispatch(login(username, password));
    history.push("/mypage");
  };

  return (
    <>
      <div className={styles.root}>
      <h1>管理者ログイン</h1>
      <div className={ styles.username}></div>
      <form onSubmit={submit}>
        <div className={ styles.username}>
            <label htmlFor="username">ユーザーID<br/>
            </label>
        <input className={styles.inputColumn}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
              />
        </div>
        <div className={ styles.password}>
        <label htmlFor="password">パスワード<br/></label>
            <input className={styles.inputColumn}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
              />
          </div>
          <button className={ styles.btn}type="submit">ログイン</button>
        </form>
        </div>
    </>
  );
}
