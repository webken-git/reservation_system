// マイページ
import React from "react";
import './mypage.scss';
import PageLink from "../components/pagelink/PageLink";
export const MyPage =()=> {
    return (
      <div className="mypage-wrapper">
        <p className="title">アカウント</p>
        <table className="mail-pass">
          <tr className="mail-address">
            <td className="mail-pass-title">メールアドレス</td>
            <td className="mail-pass-body">sample@example.jp</td>
            <td><PageLink url='/account/email' namecolor={'#2699FB'} pagename={'メールアドレスの変更'}/></td>
          </tr>
          <tr className="pass-word">
            <td className="mail-pass-title">パスワード</td>
            <td className="mail-pass-body">***************</td>
            <td className="change-link"><PageLink url='/account/password' namecolor={'#2699FB'} pagename={'パスワードの変更'}/></td>
          </tr>
          <tr className="mail-address">
            <td><PageLink url='/account/delete' namecolor={'#2699FB'} pagename={'アカウント削除'}/></td>
          </tr>
        </table>
      </div>
    )
}
