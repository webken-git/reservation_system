import React from "react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import { showPassword } from "./Login";
import logo from "../../assets/image/logo.png";
import "./auth.scss";

const Registration = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // アカウント作成処理
  const url = AuthUrls.REGISTRATION;

  const onSubmit = (data) => {
    let formData = new FormData();

    // フォームデータを追加
    formData.append("email", email);
    formData.append("password1", password);
    formData.append("password2", password);
    formData.append("protocol", props.protocol);
    formData.append("domain", props.domain);
    // アカウント作成処理中はローディング画面を表示
    setLoading(true);
    setSuccess(null);
    axios
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        setSuccess("本人確認のため、メールを送信しました。");
      })
      .catch((err) => {
        // アカウント作成処理が失敗した場合
        // ローディング画面を非表示
        setLoading(false);
        setSuccess("アカウント作成に失敗しました。");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__logo">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="auth-page__title-registration">アカウント登録</h1>
      {success && <p className="success">{success}</p>}
      <form
        className="auth-page__form"
        onSubmit={handleSubmit(onSubmit)}
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
            placeholder="samlple@example.com"
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
        <div className="auth-btn-wrapper">
          <button type="submit" className="btn auth-btn">
            アカウント作成
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default Registration;
