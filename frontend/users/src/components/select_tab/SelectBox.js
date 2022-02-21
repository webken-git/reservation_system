import React from 'react'
import './selectbox.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SelectBox = (props) => {
    return (
        <div className="selectBox">
            <Link to={props.url} className="linkdeco">
                <p><FontAwesomeIcon icon={props.icon}/> {props.pagename}</p>
            </Link>
        </div>
    )
}

export default SelectBox