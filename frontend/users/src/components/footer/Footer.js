import React from "react";
import Logo from '../header/logo/Logo'
import logo from '../../assets/image/logo.png'
import './footer.scss'

const Footer = () => {
    return (
        <div className='footer-box'>
            <div className='footer-left'><Logo logo={logo}/></div>
            <p className="copyright">Copyright © 2022 特定非営利活動法人稚内カーリング協会 All Rights Reserved.</p>
        </div>
    )
}

export default Footer
