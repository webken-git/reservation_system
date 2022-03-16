// ユーザーリストのページ
import React from "react";
import UserListBody from "../components/userlist/UserListBody";
export const UserList = () => {
  document.title = "ユーザーリスト | 予約管理アプリ"; // ページタイトルを変更
  return (
    <div className="list-wrapper">
      {/* ユーザーリスト全体コンポーネント */}
      <UserListBody />
    </div>
  );
};
