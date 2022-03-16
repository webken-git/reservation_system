import React from "react";
import TopPageList from "../components/toppage/TopPageList"
// import './approvallist.scss'
export const TopPage = () => {
    document.title = '予約管理アプリ';
    return (
    <div className="list-wrapper">
        <TopPageList/>
    </div>
    )
}
