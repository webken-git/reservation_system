import React from 'react'
import { Link } from 'react-router-dom'
import './pagelink.scss'
const PageLink = (props) => {
    return (
        <div>
            <Link to={props.url} className='linkdeco'>
                <p className='pagename' style={{color: props.namecolor}}>{props.pagename}</p>
            </Link>
        </div>
    )
}

export default PageLink