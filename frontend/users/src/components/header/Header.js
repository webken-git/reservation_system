import React from 'react'
import axios from "axios";
import Cookies from 'universal-cookie'
import './header.scss'

import Logo from './logo/Logo'
import logo from '../../assets/image/logo.png'

import UserIcon from './usericon/UserIcon'
import Cart from './cart/Cart'
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { AuthUrls } from "../../utils/authUrls";
import { LoginButton } from '../auth/LoginButton';
import { RegistrationButton } from '../auth/RegistrationButton';
import Loading from '../loading/Loading';

const Header = () => {
    const cookies = new Cookies();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // アクセストークンが有効かどうかをチェックする
    const url = AuthUrls.TOKEN_VERIFY;
    const verifyToken = async () => {
        let formData = new FormData();
        formData.append("token", cookies.get("access_token"));
        // 処理中はローディング画面を表示
        setLoading(true);

        axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            // ログインフラグをtrueにする
            setIsLoggedIn(true);
            // ローディング画面を非表示
            setLoading(false);
        }).catch(err => {
            // ログインフラグをfalseにする
            setIsLoggedIn(false);
            // ローディング画面を非表示
            setLoading(false);
        });
    };

    React.useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className='header-box'>
            <Logo logo={logo}/>
            <div className='box'>
            </div>
            {
                // isLoggedInがtrueならUserIcon及びCartを表示、
                // falseならLoginButtonとRegistrationButtonを表示
                isLoggedIn ?
                <div className='rightside'>
                    <UserIcon icon={faUser}/>
                    <Cart icon={faShoppingCart}/>
                </div>
                :
                <div className='rightside-login'>
                    <LoginButton />
                    <span></span>
                    <RegistrationButton />
                </div>
            }
            {
                // loadingがtrueならローディング画面を表示
                loading ? <Loading /> : null
            }
        </div>
    )
}

export default Header
