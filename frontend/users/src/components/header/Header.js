import React from 'react'
import './header.scss'

import Logo from './logo/Logo'
import logo from '../../assets/image/logo.png'

import UserIcon from './usericon/UserIcon'
import Cart from './cart/Cart'
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
    return (
        <div className='header-box'>
            <Logo logo={logo}/>
            <div className='box'>        
            </div>
            <div className='rightside'>
                <UserIcon icon={faUser}/>
                <Cart icon={faShoppingCart}/>
            </div>
        </div>
    )
}

export default Header