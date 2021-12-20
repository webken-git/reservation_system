import React from "react";
import './mail-address-change.scss';
export const MailAddressChange =()=> {
  return (
    <div className="mail-address-change-wrapper">
      <p className="title">メールアドレスの変更</p>
      <p className="new-mail-address">新しいメールアドレス</p>
      <p className="register">登録</p>
      <p>キャンセル</p>
    </div>
  )
}