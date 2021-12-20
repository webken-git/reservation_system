// 不承認リストのページ
import React from "react";
import DisapprovalListBody from "../../components/disapprovallist/DisapprovalListBody";
// import './approvallist.scss'
export const DisapprovalList = () => {
  return (
    <div className="list-wrapper">
      {/* 不承認リスト全体コンポーネント */}
      <DisapprovalListBody/>
    </div>
  )
}
