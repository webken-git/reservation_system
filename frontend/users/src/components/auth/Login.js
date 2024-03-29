import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth";
import { RegistrationButton } from "./RegistrationButton";
import logo from "../../assets/image/logo.png";
import "./auth.scss";

export function login(
  email,
  password,
  setLoading,
  setError,
  setAuthState,
  url
) {
  let formData = new FormData();

  // フォームデータを追加
  formData.append("email", email);
  formData.append("password", password);
  // ログイン処理中はローディング画面を表示
  setLoading(true);
  setError(null);
  axios
    .post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // ログイン処理が成功した場合
      // ローディング画面を非表示
      setLoading(false);
      setAuthState({
        isAuthenticated: true,
        userId: res.data.user.pk,
      });
      // ログイン成功後、とりあえずトップページに遷移
      window.location.href = "/";
    })
    .catch((err) => {
      // ログイン処理が失敗した場合
      // ローディング画面を非表示
      setLoading(false);
      // エラーメッセージを表示
      // setError(err.response.data.non_field_errors);
      setError("メールアドレスまたはパスワードが間違っています。");
    });
}

// パスワード表示切り替え
export function showPassword(setShowPassword, element) {
  let passwordInput = document.getElementById(element);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    // アイコンをfaEyeに変更
    setShowPassword(true);
  } else {
    passwordInput.type = "password";
    // アイコンをfaEyeSlashに変更
    setShowPassword(false);
  }
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setAuthState = useSetRecoilState(authState);

  // ログイン処理
  const url = AuthUrls.LOGIN;

  return (
    <div className="auth-page">
      <div className="auth-page__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="link">
        <h1 className="auth-page__title">ログイン</h1>
        <RegistrationButton />
      </div>
      {error && <p className="auth-page__error">{error}</p>}
      <form
        className="auth-page__form"
        onSubmit={handleSubmit(
          login.bind(
            this,
            email,
            password,
            setLoading,
            setError,
            setAuthState,
            url
          )
        )}
        noValidate
      >
        <div className="auth-page__form-group">
          <label className="auth-page__form-label" htmlFor="email">
            メールアドレス
          </label>
          {errors.email && (
            <span className="auth-page__form-error">
              {errors.email.message}
            </span>
          )}
          <input
            className="auth-page__form-input"
            type="email"
            name="email"
            placeholder="sample@example.com"
            autoComplete="off"
            // id="email"
            {...register("email", {
              required: "※必須項目です",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "※メールアドレスの形式で入力してください",
              },
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-page__form-group">
          <label className="auth-page__form-label" htmlFor="password">
            パスワード
          </label>
          {errors.password && (
            <span className="auth-page__form-error">
              {errors.password.message}
            </span>
          )}
          <div className="password-container">
            <input
              className="password"
              type="password"
              name="password"
              id="password"
              {...register("password", {
                required: "※必須項目です",
                minLength: {
                  value: 8,
                  message: "※パスワードは8文字以上入力してください",
                },
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="全角半角英数字8文字以上"
            />
            {isShowPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                id="btn-eye"
                onClick={showPassword.bind(this, setIsShowPassword, "password")}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                id="btn-eye"
                onClick={showPassword.bind(this, setIsShowPassword, "password")}
              />
            )}
          </div>
        </div>
        <div>
          <Link to="/password" className="link">
            <span>パスワードを忘れた方はこちら</span>
          </Link>
        </div>
        <div className="auth-btn-wrapper">
          <button className="btn auth-btn" type="submit">
            ログイン
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
