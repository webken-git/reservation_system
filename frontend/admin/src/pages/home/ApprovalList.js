// 承認リストページ
import React from "react";
import ApprovalListBody from "../../components/approvallist/ApprovalListBody"
import './approvallist.scss'
import DocumentLayout from "../../components/document/DocumentLayout";  // 申請書選択画面のコンポーネント

export const ApprovalList =()=> {
    return (
        <div className="list-wrapper">
            <div className="printingbutton-wrapper-wrapper">
                <DocumentLayout/>
            </div>
            <div className="scroll_box-wrapper">
                <div className="scroll_box">
                    {/* 承認リスト全体コンポーネント */}
                    <ApprovalListBody/>
                </div>
            </div>
        </div>
    )
}
