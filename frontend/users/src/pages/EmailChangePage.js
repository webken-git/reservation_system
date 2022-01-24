import React from "react";
import EmailChange from "../components/account/EmailChange";

export const EmailChangePage = () => {
  document.title = "メールアドレス変更 | 施設予約"; // ページタイトルを変更
  return <EmailChange />;
};
