import React from 'react'
import './logo.scss'

const Logo = (props) => {
    // ロゴをクリックしたらトップページに戻る
    const handleClick = () => {
        window.location.href = '/';
    }

    return (
        <span onClick={handleClick}>
            <img src={props.logo} alt='logo' className='logo'/>
        </span>
    )
}

export default Logo
