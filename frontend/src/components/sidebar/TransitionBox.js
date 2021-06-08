import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const TransitionBox = (props) => {
    return (
        <div className="transBox">
            <Link to={props.url} className="linkdeco">
                <p><img className="icon" src={props.icon}/>{props.pagename}</p>
            </Link>
        </div>
    )
}

export default TransitionBox