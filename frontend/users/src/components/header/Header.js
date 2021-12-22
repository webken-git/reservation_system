import React from 'react'
import { useRecoilValue } from "recoil";
import './header.scss';

import Logo from './logo/Logo';
import logo from '../../assets/image/logo.png';

import UserIcon from './usericon/UserIcon';
import Cart from './cart/Cart';
// import { FontAwesomeIcon } from "@fontawsome/fontawesome-svg-core@next";
// import { faCalendar } from "@fontawsome/free-regular-svg-icons@next";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import authState from "../../recoil/auth/atom";
import { LoginButton } from '../auth/LoginButton';
import { RegistrationButton } from '../auth/RegistrationButton';


const Header = () => {
    const auth = useRecoilValue(authState);

    return (
        <div className='header-box'>
            <Logo logo={logo} />
            <div className='box'>
            </div>
            {
                // isAuthenticatedがtrueならUserIcon及びCartを表示、
                // falseならLoginButtonとRegistrationButtonを表示
                auth.isAuthenticated ?
                    <div className='rightside'>
                        <UserIcon icon={faUser} />
                        <Cart icon={faBoxOpen} />
                    </div>
                    :
                    <div className='rightside-login'>
                        <LoginButton />
                        <span></span>
                        <RegistrationButton />
                        {/* <Cart icon={faCalendarCheck} /> */}
                    </div>
            }
        </div>
    )
}

export default Header
