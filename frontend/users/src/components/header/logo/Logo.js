import React from 'react'
import './logo.scss'

const Logo = (props) => {
    return (
        <div className='logobox'>
            <img src={props.logo}/>
        </div>
    )
}

export default Logo