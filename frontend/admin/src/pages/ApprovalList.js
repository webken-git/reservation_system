// 承認リストページ
import React from "react";
import ApprovalListBody from "../components/approvallist/ApprovalListBody";
// import './approvallist.scss'
// import DocumentLayout from "../../components/document/DocumentLayout";  // 申請書選択画面のコンポーネント

export const ApprovalList = () => {
  document.title = "承認リスト | 予約管理アプリ"; // ページタイトルを変更
  return (
    <div className="list-wrapper">
      <ApprovalListBody />
    </div>
  );
};
