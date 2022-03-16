import React from "react";
import PassWordChange from "../components/account/PasswordChange";

export const PassWordChangePage = () => {
  document.title = "パスワード変更 | 予約管理アプリ"; // ページタイトルを変更
  return <PassWordChange />;
};
