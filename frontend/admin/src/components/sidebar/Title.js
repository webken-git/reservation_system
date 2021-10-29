import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

// タイトルはサイドバーの一番上に表示するコンポーネント。

const Title = (props) => {
    return (
        <div className="TitleBox">
            <div className="TitleString">管理システム</div>
        </div>
    )
}

export default Title