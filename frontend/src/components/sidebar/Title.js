import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const Title = (props) => {
    return (
        <div className="TitleBox">
            <Link to={props.url} className="linkdeco">
                <div className="TitleString">管理システム</div>
            </Link>
        </div>
    )
}

export default Title