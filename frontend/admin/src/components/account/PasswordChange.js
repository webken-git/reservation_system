import { useState } from "react";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import { showPassword } from "../auth/Login";

const PassWordChange = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState([]);

  const url = AuthUrls.CHANGE_PASSWORD;
  const onSubmit = () => {
    let formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password1", newPassword);
    formData.append("new_password2", newPassword);
    // setIsOpen(true);
    setLoading(true);
    axios
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        setError("パスワードを変更しました。");
        setTimeout(() => {
          window.location.href = "/account";
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setError("現在のパスワードが違います。");
      });
  };

  return (
    <div className="auth-page">
      <div className="link">
        <h2 className="auth-page__title">パスワードの変更</h2>
      </div>
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="auth-page__form-label" htmlFor="password">
          現在のパスワード
        </label>
        {error && <p className="error">{error}</p>}
        <div className="auth-page__form-group">
          {errors.old_password && (
            <p className="error">{errors.old_password.message}</p>
          )}
          <div className="password-container">
            <input
              type="password"
              className="password"
              name="old_password"
              id="old_password"
              {...register("old_password", {
                required: "※必須項目です",
                minLength: {
                  value: 8,
                  message: "※パスワードは8文字以上入力してください",
                },
              })}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="全角半角英数字8文字以上"
            />
            {showOldPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                id="btn-eye"
                onClick={showPassword.bind(
                  this,
                  setShowOldPassword,
                  "old_password"
                )}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                id="btn-eye"
                onClick={showPassword.bind(
                  this,
                  setShowOldPassword,
                  "old_password"
                )}
              />
            )}
          </div>
          <label className="auth-page__form-label" htmlFor="password">
            新規パスワード
          </label>
          {errors.new_password && (
            <p className="error">{errors.new_password.message}</p>
          )}
          <div className="password-container">
            <input
              type="password"
              className="password"
              name="new_password"
              id="new_password"
              {...register("new_password", {
                required: "※必須項目です",
                minLength: {
                  value: 8,
                  message: "※パスワードは8文字以上入力してください",
                },
              })}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="全角半角英数字8文字以上"
            />
            {showNewPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                id="btn-eye"
                onClick={showPassword.bind(
                  this,
                  setShowNewPassword,
                  "new_password"
                )}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                id="btn-eye"
                onClick={showPassword.bind(
                  this,
                  setShowNewPassword,
                  "new_password"
                )}
              />
            )}
          </div>
        </div>
        <div>
          <Link to="/account/password/verify" className="link">
            <span>パスワードを忘れた方はこちら</span>
          </Link>
        </div>
        <div className="auth-btn-wrapper">
          <button
            className="back-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            戻る
          </button>
          <span>　</span>
          <button type="submit" className="auth-btn">
            確認
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default PassWordChange;
