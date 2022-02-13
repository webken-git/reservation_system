import React from "react";
import { useParams } from "react-router-dom";
import RegistrationComplete from "../components/auth/RegistrationComplete";

export const RegistrationCompletePage = () => {
  document.title = "アカウント確認 | 予約管理アプリ"; // ページタイトルを変更
  // パラメーターを取得
  let { key } = useParams();
  return <RegistrationComplete keys={key} />;
};
