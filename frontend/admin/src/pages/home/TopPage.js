import React from "react";
import TopPageList from "../../components/toppage/TopPageList"
import './approvallist.scss'

export const TopPage =()=> {
  return (
    <div className="approvallist-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <TopPageList/>
        </div> 
      </div> 
    </div>
  )
}