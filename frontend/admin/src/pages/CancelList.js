// キャンセルリストのページ
import React from "react";
import CancelListBody from "../components/cancellist/CancelListBody";
export const CancelList = () => {
  document.title = "キャンセルリスト | 予約管理アプリ"; // ページタイトルを変更
  return (
    <div className="list-wrapper">
      {/* キャンセルリスト全体コンポーネント */}
      <CancelListBody />
    </div>
  );
};
