import React from 'react'
import './logo.scss'

const Logo = (props) => {
    // ロゴをクリックしたらトップページに戻る
    const handleClick = () => {
        window.location.href = '/';
    }

    return (
        <div className='logobox' onClick={handleClick}>
            <img src={props.logo}/>
        </div>
    )
}

export default Logo
