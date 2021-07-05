import React from "react";
import CancelListBody from "../../components/cancellist/CancelListBody"
export const CancelList =()=> {
  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <CancelListBody/>
        </div>
      </div>
    </div>
  )
}