import React from "react";
import Account from "../components/account/Account";

export const AccountPage = (props) => {
  document.title = "アカウント | 予約管理アプリ"; // ページタイトルを変更
  return <Account />;
};
