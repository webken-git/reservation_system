import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Loading from "../loading/Loading";
import authState from "../../recoil/auth/atom";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import { showPassword } from "../auth/Login";

const AccountDelete = (props) => {
  const unmountRef = useUnmountRef();
  const [loading, setLoading] = useSafeState(unmountRef, false);
  const [auth, setAuth] = useRecoilState(authState);
  const [email, setEmail] = useSafeState(unmountRef, "");
  const [password, setPassword] = useSafeState(unmountRef, "");
  const [isShowPassword, setIsShowPassword] = useSafeState(unmountRef, false);
  const [message, setMessage] = useSafeState(
    unmountRef,
    "以下の項目を入力して下さい。"
  );
  const [error, setError] = useSafeState(unmountRef, null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 一度アカウントの確認を行い、成功したらアカウントを削除する
  const url = AuthUrls.STAFF_LOGIN;
  const logout = AuthUrls.LOGOUT;
  const userDeleteUrl = AuthUrls.GET_USER_LIST;

  const logoutUser = async () => {
    try {
      axios.post(logout);
    } catch (error) {
      // console.log(error);
    }
  };

  const onSubmit = () => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    setLoading(true);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMessage("アカウント削除処理中です。");
        // ログアウト
        logoutUser();
        axios
          .delete(`${userDeleteUrl}${auth.userId}/`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            setMessage("アカウントを削除しました。");
            setTimeout(() => {
              setAuth({
                isAuthenticated: false,
                user: "",
              });
              window.location.href = "/login";
            }, 500);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.non_field_errors);
      });
  };

  return (
    <div className="auth-page">
      <div className="link">
        <h2 className="auth-page__title">{message}</h2>
      </div>
      {error && <p className="error">{error}</p>}
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
            <span className="error">{errors.email.message}</span>
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
            <span className="error">{errors.password.message}</span>
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
          <button
            className="back-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            戻る
          </button>
          <span className="btn-space"></span>
          <button className="btn auth-btn" type="submit">
            アカウント削除
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default AccountDelete;
