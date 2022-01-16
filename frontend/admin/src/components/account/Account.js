import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { AuthUrls } from "../../utils/authUrls";
import Loading from "../loading/Loading";
import AppSettings from "./AppSettings";
import './account.scss';

export const Account = (props) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const GET_USER = AuthUrls.GET_USER_DATA;
    const pullUserData = () => {
        setLoading(true);
        axios.get(GET_USER)
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    useEffect(() => {
        pullUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="account-wrapper">
                <table className="mail-pass">
                    <tbody>
                        <tr className="mail-address">
                            <td className="mail-pass-title">メールアドレス：</td>
                            <td className="mail-pass-body">{user.email}</td>
                            <td>
                                <Link to='/account/email' className='link'>
                                    <span>変更</span>
                                </Link>
                            </td>
                        </tr>
                        <tr className="pass-word">
                            <td className="mail-pass-title">パスワード：</td>
                            <td className="mail-pass-body">***************</td>
                            <td className="change-link">
                                <Link to='/account/password' className='link'>
                                    <span>変更</span>
                                </Link>
                            </td>
                        </tr>
                        <AppSettings />
                        <tr className="mail-address">
                            <td>
                                <Link to='/account/delete' className='link'>
                                    <span>アカウント削除</span>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {loading && <Loading />}
        </>
    );
}

export default Account;
