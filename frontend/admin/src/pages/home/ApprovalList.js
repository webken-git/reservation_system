// 承認リストページ
import React from "react";
import ApprovalListBody from "../../components/approvallist/ApprovalListBody"
// import './approvallist.scss'
// import DocumentLayout from "../../components/document/DocumentLayout";  // 申請書選択画面のコンポーネント

export const ApprovalList =()=> {
    return (
        <div className="list-wrapper">
            <ApprovalListBody/>
        </div>
    )
}
