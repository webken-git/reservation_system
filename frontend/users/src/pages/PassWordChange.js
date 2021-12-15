import { useState } from "react";
import React from "react";
import axios from "axios";
import Modal from 'react-modal'
import './pass-word-change.scss';
import RegisterButtom from "./../components/register-button/RegisterButtom";
import { AuthUrls } from "../utils/authUrls";

import { useForm } from "react-hook-form";
import Loading from "../components/loading/Loading";


export const PassWordChange = () => {
  const [loading, setLoading] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  let formdata = new FormData();


  const onsubmit = () => {
    // let formdata = new FormData();
    formdata.append('old_password', password1);
    formdata.append('new_password1', password2);
    formdata.append('new_password2', password2);
    setIsOpen(true);
  }

  const changePassword = () => {
    const url = AuthUrls.CHANGE_PASSWORD;
    setLoading(true);
    axios.post(url, formdata)
      .then(res => {
        setLoading(false);
        console.log(res.data);
        setIsOpen(false);
      })
      .catch(err => {
        // console.log(err.response.data);
      })

  }





  // 登録ボタンのモーダルウィンドウ
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.60)"
    },
    content: {
      position: "absolute",
      top: "13rem",
      left: "32rem",
      right: "32rem",
      bottom: "13rem",
      backgroundColor: "white",
      // borderRadius: "1rem",
      padding: "1.5rem"
    }
  };
  return (
    <div className="pass-word-change-wrapper">
      <p className="title">パスワードの変更</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          {errors.password1 && <span className="auth-page__form-error">※この項目は必須です</span>}
          <input type="password" className="now-mail-address" name="password1" maxlength="50" placeholder="現在のパスワード" size="50"
            {...register("password1", {
              required: true,
              minLength: 6,
            })}
            value={password1} onChange={(e) => setPassword1(e.target.value)} />
        </div>
        <div>
          {errors.password2 && <span className="auth-page__form-error">※この項目は必須です</span>}
          <input type="password" className="now-mail-address" name="password2" maxlength="50" placeholder="新しいパスワード" size="50"
            {...register("password2", {
              required: true,
              minLength: 6,
            })}
            value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </div>
        <button type="submit">確認</button>
      </form>
      <div className="register-chancel-wrapper">
        <span className="register-buttom-wrapper" onClick={() => setIsOpen(true)}>
          <RegisterButtom />
        </span>
        <Modal isOpen={modalIsOpen} style={modalStyle}>
          <div className="buttom-modal-wrapper">
            <div className="modal-question-wrapper">
              <p className="modal-question">本当に変更しますか？</p>
            </div>
            <div className="modal-yesno-wrapper">
              <p className="modal-no" onClick={() => setIsOpen(false)}>キャンセル</p>
              <p className="modal-yes" onClick={changePassword}>変更する</p>
            </div>
          </div>
        </Modal>
        {/* <ChancelButtom/> */}
      </div>
    </div>
  )
}