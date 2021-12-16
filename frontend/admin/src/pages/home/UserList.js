// ユーザーリストのページ
import React from "react";
import UserListBody from "../../components/userlist/UserListBody";
import { RegistrationButton } from "../../components/auth/RegistrationButton";
export const UserList =()=> {
  return (
    <div className="list-wrapper">
      <RegistrationButton />
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          {/* ユーザーリスト全体コンポーネント */}
          <UserListBody/>
        </div>
      </div>
    </div>
  )
}
