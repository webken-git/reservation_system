import React from "react";
import PrintingButton from "../../components/approvallist/PrintingButton"
import Approval from "../../components/approvallist/Approval"
import DetailsButton from "../../components/approvallist/DetailsButton"
import './approvallist.scss'
export const ApprovalList =()=> {
  return (
    <div className="approvallist-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <Approval/>
          <DetailsButton/>
        </div> 
      </div> 
      <div className="printingbutton-wrapper-wrapper">
        <PrintingButton/>
      </div>
    </div>
  )
}