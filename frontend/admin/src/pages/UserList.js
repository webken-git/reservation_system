// ユーザーリストのページ
import React from "react";
import UserListBody from "../components/userlist/UserListBody";
export const UserList = () => {
  document.title = "予約管理アプリ | ユーザーリスト";
  return (
    <div className="list-wrapper">
      {/* ユーザーリスト全体コンポーネント */}
      <UserListBody/>
    </div>
  )
}
