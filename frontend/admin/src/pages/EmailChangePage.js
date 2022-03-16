import React from "react";
import EmailChange from "../components/account/EmailChange";

export const EmailChangePage = () => {
  document.title = "メールアドレス変更 | 予約管理アプリ"; // ページタイトルを変更
  return <EmailChange />;
};
