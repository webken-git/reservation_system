import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import ReactModal from 'react-modal';

import Loading from "../loading/Loading";
import { AuthUrls } from "../../utils/authUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import "./account.scss";

const EmailChange = () => {
  const unmountRef = useUnmountRef();
  // 登録ボタンのモーダルウィンドウ
  // const [modalIsOpen, setIsOpen] = useSafeState(unmountRef, false);
  const [loading, setLoading] = useSafeState(unmountRef, false);
  const [email, setEmail] = useSafeState(unmountRef, []);
  const [user, setUser] = useSafeState(unmountRef, []);
  const [error, setError] = useSafeState(unmountRef, null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userData = AuthUrls.GET_USER_DATA;
  const url = AuthUrls.GET_USER_LIST;

  // ログインユーザー情報を取得
  const getUserData = async () => {
    try {
      const response = await axios.get(userData);
      setUser(response.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const onSubmit = () => {
    let formData = new FormData();
    formData.append("email", email);
    setLoading(true);
    axios
      .patch(`${url}${user.pk}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        setError("パスワードを変更しました。");
        setTimeout(() => {
          setError(null);
          window.location.href = "/account";
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        setError("パスワードの変更に失敗しました。");
      });
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth-page">
      <div className="link">
        <h2 className="auth-page__title">メールアドレスの変更</h2>
      </div>
      {error && <p className="auth-page__error">{error}</p>}
      <form
        className="auth-page__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="auth-page__form-group">
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
        <div className="auth-btn-wrapper">
          <button
            className="back-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            戻る
          </button>
          <span>　</span>
          <button className="verify-btn" type="submit">
            変更
          </button>
        </div>
      </form>
      {loading && <Loading />}
      {/* <ReactModal
                isOpen={modalIsOpen}
                // onRequestClose={() => setIsOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
                ariaHideApp={false}
            >
                <div className="buttom-modal-wrapper">
                    <p className="modal-question">本当に変更しますか？</p>
                    <div className="auth-btn-wrapper">
                        <button type="button" className="back-btn" onClick={() => setIsOpen(false)}>キャンセル</button>
                        <span>　</span>
                        <button type="button" className="auth-btn">変更する</button>
                    </div>
                </div>
                </ReactModal> */}
    </div>
  );
};

export default EmailChange;
