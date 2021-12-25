import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

// サイドバーに表示する遷移ボタンのコンポーネント

/* <TransitionBox/>の使い方 */
/* <TransitionBox url="/遷移したいページのファイル名" icon={使用するアイコンの名前} pagename="遷移したいページの名前" /> */

const TransitionBox = (props) => {
    return (
        <div className="transBox">
            <Link to={props.url} className="linkdeco">
                <p>{props.icon} {props.pagename}</p>
            </Link>
        </div>
    )
}

export default TransitionBox
