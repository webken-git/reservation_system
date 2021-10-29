import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

const Select = (props) =>{
    const type = props.type;
    const url = window.location.host;

    function jump(n) {
        console.log(n);
        window.location.href = 'url+n';
    }

    return (
        <div className="select">
            <form action="">
            <select name="select" onChange="jump(this);">
                {/* <option><Link to="/dailycalendar">日</Link></option>
                <option><Link to="/weeklycalendar">週</Link></option>
                <option><Link to="/monthlycalendar">月</Link></option>
                <Link to="/dailycalendar"><option>日</option></Link>
                <Link to="/weeklycalendar"><option>週</option></Link>
                <Link to="/monthlycalendar"><option>月</option></Link> */}
                <option value="dailycalendar">日</option>
                <option value="weeklycalendar">週</option>
                <option value="monthlycalendar">月</option>
            </select>
            </form>
        </div>
    )
}

export default withCookies(Select);