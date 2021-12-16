// 登録ボタンのコンポーネント
import React from "react";
// import axios from "axios";
import './register-buttom.scss';

const RegisterButtom = () => {
  return (
    <div className="register-buttom-wrapper">
      <button type="button" className="auth-btn">登録する</button>
    </div>
  )
}

export default RegisterButtom
