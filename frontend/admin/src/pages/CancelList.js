// キャンセルリストのページ
import React from "react";
import CancelListBody from "../components/cancellist/CancelListBody"
export const CancelList = () => {
  document.title = "予約管理アプリ | キャンセルリスト";
  return (
    <div className="list-wrapper">
      {/* キャンセルリスト全体コンポーネント */}
      <CancelListBody/>
    </div>
  )
}
