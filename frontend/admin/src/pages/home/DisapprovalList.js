// 不承認リストのページ
import React from "react";
import DisapprovalListBody from "../../components/disapprovallist/DisapprovalListBody"
// import './approvallist.scss'
export const DisapprovalList =()=> {
  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          {/* 不承認リスト全体コンポーネント */}
          <DisapprovalListBody/>
        </div> 
      </div>
    </div>
  )
}