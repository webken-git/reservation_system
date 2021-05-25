import React from 'react'
import TransitionBox from './TransitionBox'
import Logo from './Logo'

let sideBox = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#233B62",
}

const SideBar = (props) => {
    return (
        <div style={sideBox}>
            <Logo/>
            <TransitionBox icon="./../../assets/image/folder.png" pagename={"承認リスト"}/>
            <TransitionBox pagename={"未承認リスト"}/>
            <TransitionBox pagename={"不承認リスト"}/>
            <TransitionBox pagename={"キャンセルリスト"}/>
            <TransitionBox pagename={"ユーザーリスト"}/>
            <TransitionBox pagename={"カレンダー"}/>
        </div>
    )
}

export default SideBar