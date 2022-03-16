import React from "react";

import Login from "../components/auth/Login";

export const LoginPage = () => {
  document.title = "ログイン | 予約管理アプリ"; // ページタイトルを変更
  return <Login />;
};
