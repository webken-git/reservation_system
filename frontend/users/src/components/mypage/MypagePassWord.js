// マイページのパスワードのコンポーネント
import React from 'react'
import './mypage-pass-word.scss';

const MyPagePassWord = () => {

  return (
    <div className="mypage-pass-word-wrapper">
      <p className="pass-word-title">パスワード</p>
      <p className="pass-word">***************</p>
      <p className="pass-word-change-link" url="">パスワードの変更</p>
    </div>
  )
}

export default MyPagePassWord