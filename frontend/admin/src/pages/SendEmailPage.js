import React from "react";
import SendEmail from "../components/mail/SendEmail";

export const SendEmailPage = () => {
  document.title = "メール一斉送信 | 予約管理アプリ"; // ページタイトルを変更
  return <SendEmail />;
};
