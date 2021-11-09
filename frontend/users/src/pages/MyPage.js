// マイページ
import React from "react";
import './mypage.scss';
export const MyPage =()=> {
    return (
      <div className="mypage-wrapper">
        <p className="title">アカウント</p>
        <table className="mail-pass">
          <tr className="mail-address">
            <td className="mail-pass-title">メールアドレス</td>
            <td className="mail-pass-body">sample@example.jp</td>
            <td className="change-link" hrel="/MailAddressChange">メールアドレスの変更</td>
          </tr>
          <tr className="pass-word">
            <td className="mail-pass-title">パスワード</td>
            <td className="mail-pass-body">***************</td>
            <td className="change-link">パスワードの変更</td>
          </tr>
        </table>
      </div>
    )
}