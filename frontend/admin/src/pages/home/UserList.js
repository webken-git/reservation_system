// ユーザーリストのページ
import React from "react";
import UserListBody from "../../components/userlist/UserListBody";
export const UserList =()=> {
  return (
    <div className="list-wrapper">
      {/* ユーザーリスト全体コンポーネント */}
      <UserListBody/>
    </div>
  )
}
