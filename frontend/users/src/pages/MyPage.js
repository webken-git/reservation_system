// マイページ
import React from "react";
import './mypage.scss';
import PageLink from "../components/pagelink/PageLink";
export const MyPage = () => {
  return (
    <div className="mypage-wrapper">
      <p className="title">アカウント</p>
      <table className="mail-pass">
        <tr className="mail-address">
          <td className="mail-pass-title">メールアドレス</td>
          <td className="mail-pass-body">sample@example.jp</td>
          <td><PageLink url='/mypage/email' namecolor={'#2699FB'} pagename={'メールアドレスの変更'} /></td>
        </tr>
        <tr className="pass-word">
          <td className="mail-pass-title">パスワード</td>
          <td className="mail-pass-body">***************</td>
          <td><PageLink url='/mypage/password' namecolor={'#2699FB'} pagename={'パスワードの変更'} /></td>
        </tr>
      </table>
    </div>
  )
}
