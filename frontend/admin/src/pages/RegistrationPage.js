import React from "react";
import Registration from "../components/auth/Registration";

export const RegistrationPage = () => {
  document.title = "アカウント追加 | 予約管理アプリ"; // ページタイトルを変更
  // 現在開いているページのurlを取得
  const url = window.location.href;
  const protocol = window.location.protocol;
  const domain = url.split("/")[2];
  return <Registration protocol={protocol} domain={domain} />;
};
