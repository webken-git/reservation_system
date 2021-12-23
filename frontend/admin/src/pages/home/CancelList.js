// キャンセルリストのページ
import React from "react";
import CancelListBody from "../../components/cancellist/CancelListBody"
export const CancelList =()=> {
  return (
    <div className="list-wrapper">
      {/* キャンセルリスト全体コンポーネント */}
      <CancelListBody/>
    </div>
  )
}
