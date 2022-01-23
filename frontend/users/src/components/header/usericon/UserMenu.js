import React from 'react'
import { Link } from 'react-router-dom'
import './usericon.scss'

const UserMenu = (props) => {
    return (
        <div>
            <Link to={props.url} className='linkdeco'>
                <p className='pagename'>{props.pagename}</p>
            </Link>
        </div>
    )
}

export default UserMenu
