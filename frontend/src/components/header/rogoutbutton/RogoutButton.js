import React from 'react'
import './rogoutbutton.scss'

const RogoutButton = (props) => {
    return(
        <div className="rogbtn">
            <p>{props.btn_title}</p>
        </div>
    )
}

export default RogoutButton