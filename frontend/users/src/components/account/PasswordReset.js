import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import { showPassword } from "../auth/Login";

const PasswordReset = (props) => {
  const unmountRef = useUnmountRef();
  const [loading, setLoading] = useSafeState(unmountRef, false);
  const [password, setPassword] = useSafeState(unmountRef, "");
  const [isShowPassword, setIsShowPassword] = useSafeState(unmountRef, false);
  const [message, setMessage] = useSafeState(
    unmountRef,
    "新規パスワードを入力して下さい。"
  );
  const [error, setError] = useSafeState(unmountRef, null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = `${AuthUrls.RESET_PASSWORD_CONFIRM}${props.uid}/${props.token}/`;
  const onSubmit = () => {
    let formData = new FormData();
    formData.append("new_password1", password);
    formData.append("new_password2", password);
    formData.append("uid", props.uid);
    formData.append("token", props.token);
    setLoading(true);
    setMessage("新規パスワードを登録しています...");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        setMessage("新規パスワードを登録しました。");
        setError(null);
        setTimeout(() => {
          window.location.href = "/account";
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setMessage("新規パスワードの登録に失敗しました。");
        // setError(err.response.data.detail);
      });
  };

  return (
    <div className="auth-page">
      <div className="link">
        <h2 className="auth-page__title">{message}</h2>
      </div>
      {error && <p className="auth-page__error">{error}</p>}
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-page__form-group">
          <label className="auth-page__form-label" htmlFor="password">
            新規パスワード
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
          <button className="btn auth-btn" type="submit">
            パスワード変更
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default PasswordReset;
