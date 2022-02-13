import React from "react";
import { useParams } from "react-router-dom";
import ApprovalInfo from "../components/approvalInfo/ApprovalInfo";

export const ApprovalInfoPage = () => {
  const { id } = useParams();
  document.title = "予約詳細 | 予約管理アプリ"; // ページタイトルを変更
  return <ApprovalInfo id={id} />;
};
