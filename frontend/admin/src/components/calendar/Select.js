import { useEffect } from 'react';
import { withCookies } from 'react-cookie'

const Select = (props) =>{
    const type = props.type;
    const setCalendarType = props.setCalendarType;

    // console.log(type);
    // console.log(type != null);

    function jump(link) {
        setCalendarType(link);
    }

    useEffect(()=>{
        if (type != null) {
            const elements = document.getElementById(type);
            // console.log(elements)
            // const element = elements[0];
            // const classList = element.classList;
            elements.classList.add("add")
            // calendarType.classList.add("add");
        }
    });

    return (
        <div className="select">
            {/* <form action="">
            <select name="select" onChange="jump(this);">
                <option><Link to="/dailycalendar">日</Link></option>
                <option><Link to="/weeklycalendar">週</Link></option>
                <option><Link to="/monthlycalendar">月</Link></option>
                <Link to="/dailycalendar"><option>日</option></Link>
                <Link to="/weeklycalendar"><option>週</option></Link>
                <Link to="/monthlycalendar"><option>月</option></Link>
                <option value="dailycalendar">日</option>
                <option value="weeklycalendar">週</option>
                <option value="monthlycalendar">月</option>
            </select>
            </form> */}
            <button type="button" className="btn calendar-btn" id="day" onClick={() => jump("daily")}>日</button>
            <button type="button" className="btn calendar-btn" id="week" onClick={() => jump("weekly")}>週</button>
            <button type="button" className="btn calendar-btn" id="month" onClick={() => jump("monthly")}>月</button>
            {/* <div className="week" onClick="jump(weekly)">週</div>
            <div className="month" onClick="jump(monthly)">月</div> */}
        </div>
    )
}

export default withCookies(Select);
