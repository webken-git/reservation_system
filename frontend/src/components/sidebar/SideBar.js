import React from 'react'
import TransitionBox from './TransitionBox'
import Title from './Title'
import folder from './../../assets/image/folder.png'
import './sidebar.scss'

const SideBar = (props) => {
    return (
        <div className="sideBox">
            <Title/>
            <TransitionBox url="/Approval" icon={folder} pagename={"承認リスト"}/>
            <TransitionBox icon={folder} pagename={"未承認リスト"}/>
            <TransitionBox icon={folder} pagename={"不承認リスト"}/>
            <TransitionBox icon={folder} pagename={"キャンセルリスト"}/>
            <TransitionBox icon={folder} pagename={"ユーザーリスト"}/>
            <TransitionBox icon={folder} pagename={"カレンダー"}/>
        </div>
    )
}

export default SideBar