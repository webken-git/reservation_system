import React from "react";

import AccountDelete from "../components/account/AccountDelete";

export const AccountDeletePage = () => {
  document.title = "アカウント削除 | 予約管理アプリ"; // ページタイトルを変更
  return <AccountDelete />;
};
