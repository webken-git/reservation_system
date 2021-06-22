import React from 'react'
import './header.scss'
import RogoutButton from './rogoutbutton/RogoutButton'

const Header = (props) => {
    return (
        <div className="headerBox">
            <div className="header">
                <div className="header_title">{props.title}</div>
                <div className="rogoutbtn"><RogoutButton btn_title="ログアウト" /></div>
            </div>
        </div>
    )
}

export default Header