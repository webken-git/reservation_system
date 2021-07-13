// キャンセルリストのページ
import React from "react";
import CancelListBody from "../../components/cancellist/CancelListBody"
import './approvallist.scss'
export const CancelList =()=> {
  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          {/* キャンセルリスト全体コンポーネント */}
          <CancelListBody/>
        </div> 
      </div>
    </div>
  )
}