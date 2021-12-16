import { useState } from "react";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash  } from "@fortawesome/free-regular-svg-icons";
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import PageLink from "../pagelink/PageLink";


const PassWordChange = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState([]);

  const url = AuthUrls.CHANGE_PASSWORD;
  const onSubmit = () => {
    let formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password1', newPassword);
    formData.append('new_password2', newPassword);
    // setIsOpen(true);
    setLoading(true);
    axios.post(url, formData)
      .then(res => {
        setLoading(false);
        setError("パスワードを変更しました。");
        setTimeout(() => {
          window.location.href = "/account";
        }, 1000);
      })
      .catch(err => {
        // console.log(err.response.data);
        setLoading(false);
        setError("現在のパスワードが違います。");
      })
  }

  // パスワード表示切り替え
  const hidePassword = (setState, element) => {
    let passwordInput = document.getElementById(element);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // アイコンをfaEyeに変更
        setState(true);
    } else {
        passwordInput.type = 'password';
        // アイコンをfaEyeSlashに変更
        setState(false);
    }
  };

  return (
    <div className="auth-page">
        <div className="link">
          <h2 className="auth-page__title">パスワードの変更</h2>
        </div>
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="error">{error}</p>}
        <div className="auth-page__form-group">
          {errors.old_password && <p className="auth-page__form-error">※この項目は必須です</p>}
          <div className="password-container">
            <input
              type="password"
              className="password"
              name="old_password"
              id="old_password"
              placeholder="現在のパスワード"
              {...register("old_password", {
                required: true,
                minLength: 6,
              })}
              value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            {
              showOldPassword ?
                <FontAwesomeIcon icon={faEye} id="btn-eye" onClick={() => hidePassword(setShowOldPassword, "old_password")} /> :
                <FontAwesomeIcon icon={faEyeSlash} id="btn-eye" onClick={() => hidePassword(setShowOldPassword, "old_password")} />
            }
          </div>
          {errors.new_password && <p className="auth-page__form-error">※この項目は必須です</p>}
          <div className="password-container">
            <input
              type="password"
              className="password"
              name="new_password"
              id="new_password"
              placeholder="新しいパスワード"
              {...register("new_password", {
                required: true,
                minLength: 6,
              })}
              value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            {
              showNewPassword ?
                <FontAwesomeIcon icon={faEye} id="btn-eye" onClick={() => hidePassword(setShowNewPassword, "new_password")} /> :
                <FontAwesomeIcon icon={faEyeSlash} id="btn-eye" onClick={() => hidePassword(setShowNewPassword, "new_password")} />
            }
          </div>
        </div>
        <div>
          <PageLink url='/account/password/verify' namecolor={'#2699FB'} pagename={'パスワードを忘れた方はこちら'}/>
        </div>
        <div className="auth-btn-wrapper">
          <button className="back-btn" type="button" onClick={() => window.history.back()}>戻る</button>
          <span>　</span>
          <button type="submit" className="auth-btn">確認</button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  )
}

export default PassWordChange;
