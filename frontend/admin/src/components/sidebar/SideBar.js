import React from 'react'
import TransitionBox from './TransitionBox'
import Title from './Title';
import './sidebar.scss'
import GetDate from './../toppage/GetDate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-regular-svg-icons"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

// サイドバーに表示するものをまとめたコンポーネント

const SideBar = (props) => {

    return (
        <div className="sideBox">
            <Title />
            <TransitionBox url="/" pagename={<GetDate />} />
            <TransitionBox url="/approval-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"承認リスト"} />
            <TransitionBox url="/unapproval-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"未承認リスト"} />
            <TransitionBox url="/disapproval-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"不承認リスト"} />
            <TransitionBox url="/cancel-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"キャンセルリスト"} />
            <TransitionBox url="/user-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"ユーザーリスト"} />
            <TransitionBox url="/document-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"ドキュメントリスト"} />
            <TransitionBox url="/data-list" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"データリスト"} />
            <TransitionBox url="/calendar" icon={<FontAwesomeIcon icon={faCalendarAlt} />} pagename={"カレンダー"} />
        </div>
    )
}

export default SideBar
