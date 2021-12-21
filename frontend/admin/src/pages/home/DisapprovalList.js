// 不承認リストのページ
import React from "react";
import DisapprovalListBody from "../../components/disapprovallist/DisapprovalListBody";
import DocumentLayout from "../../components/document/DocumentLayout";  // 申請書選択画面のコンポーネント
// import './approvallist.scss'
export const DisapprovalList = () => {
  return (
    <div className="list-wrapper">
      <div className="printingbutton-wrapper-wrapper">
        <DocumentLayout/>
      </div>
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
