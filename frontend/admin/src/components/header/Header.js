import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'
import UserIcon from './usericon/UserIcon'

// ヘッダーはサイドバーのTitleコンポーネントの右横の部分を指す
// ヘッダーの下に承認リストページやユーザーリストページなどが表示される

{/* <Header pagename="現在表示しているページの名前"/> */}

const Header = (props) => {
    return (
        <div className="headerBox">
            <div className="header">
                <div className="header_title">{props.pagename}</div>
                {/* 各ページにあった名前に変更できるようにpropsにする */}
                <UserIcon />
                {/* <Logout /> */}
            </div>
        </div>
    )
}

export default Header
