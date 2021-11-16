// 承認リストページ
import React from "react";
import ApprovalListBody from "../../components/approvallist/ApprovalListBody"
import './approvallist.scss'
export const ApprovalList =()=> {
    return (
    <div className="list-wrapper">
        <div className="scroll_box-wrapper">
            <div className="scroll_box">
                {/* 承認リスト全体コンポーネント */}
                <ApprovalListBody/>
            </div> 
        </div>
    </div>
    )
}