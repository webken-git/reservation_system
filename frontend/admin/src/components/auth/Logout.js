import axios from 'axios';
import { useSetRecoilState } from "recoil";
import authState from "../../recoil/auth/atom";
import { AuthUrls } from "../../utils/authUrls";
import './auth.scss';

const Logout = (props) => {
    const setAuthState = useSetRecoilState(authState);

    // ログアウト処理
    const url = AuthUrls.LOGOUT;
    const onSubmit = () => {
        axios.post(url)
            .then(res => {
                // ログアウト成功時、authStateをfalseにする
                setAuthState({
                    isAuthenticated: false,
                });
                window.location.href = "/";
            })
            .catch(err => {
                // console.log(err);
            })
    }

    return (
        <span className="logout-container" onClick={onSubmit}>
        {/* <button type="button" className="logout-btn" onClick={onSubmit}> */}
            ログアウト
            {/* </button> */}
        </span>
    );
};

export default Logout;