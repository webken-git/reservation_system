import React from "react";
import AutomaticMailList from "../components/mail/AutomaticMailList";

export const MailPage = () => {
  document.title = "メール管理 | 予約管理アプリ"; // ページタイトルを変更
  return <AutomaticMailList />;
};
