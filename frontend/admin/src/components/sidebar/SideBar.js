import React from "react";
import TransitionBox from "./TransitionBox";
import Title from "./Title";
import "./sidebar.scss";
import GetDate from "./../toppage/GetDate";

// サイドバーに表示するものをまとめたコンポーネント

const SideBar = (props) => {
  return (
    <div className="sideBox">
      <Title />
      <TransitionBox url="/" pagename={<GetDate />} />
      <TransitionBox url="/approval-list" pagename={"承認リスト"} />
      <TransitionBox url="/unapproval-list" pagename={"未承認リスト"} />
      <TransitionBox url="/disapproval-list" pagename={"不承認リスト"} />
      <TransitionBox url="/cancel-list" pagename={"キャンセルリスト"} />
      <TransitionBox url="/user-list" pagename={"ユーザーリスト"} />
      <TransitionBox url="/document-list" pagename={"ドキュメントリスト"} />
      <TransitionBox url="/data-list" pagename={"データリスト"} />
      <TransitionBox url="/calendar" pagename={"カレンダー"} />
      <TransitionBox url="/mail" pagename={"メール"} />
      <TransitionBox url="/reserve" pagename={"予約"} />
    </div>
  );
};

export default SideBar;
