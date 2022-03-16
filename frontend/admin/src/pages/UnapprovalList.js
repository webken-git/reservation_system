// 未承認リストのページ
import React from "react";
import UnApprovalListBody from "../components/unapprovallist/UnApprovalListBody";
// import './approvallist.scss'
export const UnapprovalList = () => {
  document.title = "未承認リスト | 予約管理アプリ"; // ページタイトルを変更
  return (
    <div className="list-wrapper">
      {/* 未承認リスト全体コンポーネント */}
      <UnApprovalListBody />
    </div>
  );
};
