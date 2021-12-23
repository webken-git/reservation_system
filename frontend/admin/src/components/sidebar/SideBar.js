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
            <TransitionBox url="/approvalList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"承認リスト"} />
            <TransitionBox url="/unapprovalList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"未承認リスト"} />
            <TransitionBox url="/disapprovalList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"不承認リスト"} />
            <TransitionBox url="/cancelList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"キャンセルリスト"} />
            <TransitionBox url="/userList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"ユーザーリスト"} />
            <TransitionBox url="/documentList" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"ドキュメントリスト"} />
            <TransitionBox url="/datalist" icon={<FontAwesomeIcon icon={faFolder} />} pagename={"データリスト"} />
            <TransitionBox url="/calendar" icon={<FontAwesomeIcon icon={faCalendarAlt} />} pagename={"カレンダー"} />
        </div>
    )
}

export default SideBar
