import React from "react";
import { useParams } from "react-router-dom";
import RegistrationComplete from "../components/auth/RegistrationComplete";

export const RegistrationCompletePage = () => {
  document.title = "アカウント確認 | 施設予約"; // ページタイトルを変更
  // パラメーターを取得
  let { key } = useParams();
  // console.log(uid);
  return <RegistrationComplete keys={key} />;
};
