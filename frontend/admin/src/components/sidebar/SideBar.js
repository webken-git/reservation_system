import React from 'react'
import TransitionBox from './TransitionBox'
import Title from './Title'
import folder from '../../assets/image/folder.png'
import calendar from '../../assets/image/calendar_white.png'
import './sidebar.scss'

// サイドバーに表示するものをまとめたコンポーネント

const SideBar = (props) => {
    return (
        <div className="sideBox">
            <Title url="/TopPage"/>
            <TransitionBox url="/ApprovalList" icon={folder} pagename={"承認リスト"}/>
            <TransitionBox url="/UnapprovalList" icon={folder} pagename={"未承認リスト"}/>
            <TransitionBox url="/DisapprovalList" icon={folder} pagename={"不承認リスト"}/>
            <TransitionBox url="/CancelList" icon={folder} pagename={"キャンセルリスト"}/>
            <TransitionBox url="/UserList" icon={folder} pagename={"ユーザーリスト"}/>
            <TransitionBox url="/calendar"icon={calendar} pagename={"カレンダー"}/>
        </div>
    )
}

export default SideBar