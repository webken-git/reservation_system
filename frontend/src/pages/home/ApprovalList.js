import React from "react";
import ApprovalListBody from "../../components/approvallist/ApprovalListBody"
import PrintingButton from "../../components/approvallist/PrintingButton"
import DetailsButton from "../../components/approvallist/DetailsButton"
import './approvallist.scss'
export const ApprovalList =()=> {
  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <ApprovalListBody/>
          <DetailsButton/>
        </div> 
      </div> 
      <div className="printingbutton-wrapper-wrapper">
        <PrintingButton/>
      </div>
    </div>
  )
}