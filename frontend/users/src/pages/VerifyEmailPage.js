import React from "react";
import VerifyEmail from "../components/account/VerifyEmail";

export const VerifyEmailPage = () => {
  document.title = "メールアドレスの確認 | 施設予約"; // ページタイトルを変更
  // 現在開いているページのurlを取得
  const url = window.location.href;
  const protocol = window.location.protocol;
  const domain = url.split("/")[2];
  let path = url.split("/").slice(3).join("/");
  if (path.includes("verify")) {
    path = path.replace("/verify", "");
  }
  return <VerifyEmail protocol={protocol} domain={domain} path={path} />;
};
