import React from "react";
import PassWordChange  from "../components/account/PasswordChange";

export const PassWordChangePage = () => {
  document.title = "パスワード変更 | 施設予約"; // ページタイトルを変更
  return <PassWordChange />;
};
