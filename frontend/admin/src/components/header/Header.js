import React from 'react'
import './header.scss'
import axios from 'axios'
import RogoutButton from './rogoutbutton/RogoutButton'
import { Link } from 'react-router-dom'

// ヘッダーはサイドバーのTitleコンポーネントの右横の部分を指す
// ヘッダーの下に承認リストページやユーザーリストページなどが表示される

{/* <Header pagename="現在表示しているページの名前"/> */}
const ClickLogout = async () => {
    const api_call= await axios.post(`${process.env.REACT_APP_LOGOUT}/account/logout/`)

}
const Header = (props) => {
    return (
        <div className="headerBox">
            <div className="header">
                <div className="header_title">{props.pagename}</div>
                {/* 各ページにあった名前に変更できるようにpropsにする */}
                 <Link style={{ textDecoration: 'none',color: 'black' }}to="/Login" >
                <div className="rogoutbtn"onClick={ClickLogout}><RogoutButton btn_title="ログアウト" />
                    </div>
                    </Link>
            </div>
        </div>
    )
}

export default Header