import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import authState from "../../recoil/auth/atom";
import "./auth.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setAuthState = useSetRecoilState(authState);

  // ログイン処理
  const url = AuthUrls.STAFF_LOGIN;
  const onSubmit = () => {
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
        // console.log(err.response.data.non_field_errors);
        setError("このアカウントは管理者権限がありません。");
      });
  };

  // パスワード表示切り替え
  const hidePassword = () => {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      // アイコンをfaEyeに変更
      setShowPassword(true);
    } else {
      passwordInput.type = "password";
      // アイコンをfaEyeSlashに変更
      setShowPassword(false);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">管理者ログイン</h1>
      {error && <p className="auth-page__error">{error}</p>}
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-page__form-group">
          <label className="auth-page__form-label" htmlFor="email">
            メールアドレス
          </label>
          {errors.email && (
            <span className="auth-page__form-error">※この項目は必須です</span>
          )}
          <input
            className="auth-page__form-input"
            type="email"
            name="email"
            placeholder="samlple@example.com"
            autoComplete="off"
            // id="email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
            <span className="auth-page__form-error">※この項目は必須です</span>
          )}
          <div className="password-container">
            <input
              className="password"
              type="password"
              name="password"
              id="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="全角半角英数字8文字以上"
            />
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                id="btn-eye"
                onClick={hidePassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                id="btn-eye"
                onClick={hidePassword}
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
