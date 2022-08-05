import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";

const VerifyEmail = (props) => {
  const unmountRef = useUnmountRef();
  const [loading, setLoading] = useSafeState(unmountRef, false);
  const [email, setEmail] = useSafeState(unmountRef, "");
  const [message, setMessage] = useSafeState(
    unmountRef,
    "メールアドレスを入力してください。"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = AuthUrls.RESET_PASSWORD;
  const onSubmit = () => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("protocol", props.protocol);
    formData.append("domain", props.domain);
    formData.append("path", props.path);
    setLoading(true);
    setMessage("メールを送信しています。");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setMessage(
          "新規パスワード発行の案内メールを送信しました。確認してください。"
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-page">
      <div className="link">
        <h2 className="auth-page__title">{message}</h2>
      </div>
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
        <div className="auth-btn-wrapper">
          <button
            className="back-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            戻る
          </button>
          <span className="btn-space"></span>
          <button className="verify-btn" type="submit">
            完了
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default VerifyEmail;
