import axios from 'axios';
import Cookies from 'universal-cookie';

import { AuthUrls } from "../../utils/authUrls";
import './auth.scss';

const Logout = (props) => {
    const cookies = new Cookies();
    // const [loading, setLoading] = useState(false);

    const url = AuthUrls.LOGOUT;
    const onSubmit = () => {
        // setLoading(true);
        axios.post(url, {
            headers: {
                'Authorization': `JWT ${cookies.get('access_token')}`
            }
        })
            .then(res => {
                // setLoading(false);
                cookies.remove('access_token');
                cookies.remove('refresh_token');
                window.location.href = "/";
            })
            .catch(err => {
                // setLoading(false);
                console.log(err);
            })
    }

    return (
        // loading ? <Loading /> :
        <div className="logout-container" onClick={onSubmit}>
            {/* <button type="button" className="logout-content" onClick={onSubmit}> */}
                ログアウト
            {/* </button> */}
        </div>
    );
};

export default Logout;
