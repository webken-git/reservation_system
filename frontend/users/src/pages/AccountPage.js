// マイページ
import React from "react";
import Account from "../components/account/Account";

export const AccountPage = () => {
  document.title = "アカウント | 施設予約"; // ページタイトルを変更
  return <Account />;
};
