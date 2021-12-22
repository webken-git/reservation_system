import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loading from "../loading/Loading";
import './approvalInfo.scss';


const ApprovalInfo = (props) =>{
    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [year, setYear] = useState("");
    // const [month, setMonth] = useState("");
    // const [date, setDate] = useState("");
    const id = props.id;


    const pullReservation = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/api/reservations/${id}`,{
        })
        .then(res => {
            setReservation(res.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        pullReservation();
    }, [])

    
    return (
    <>
        <div className="info-wrapper">
            <table className="info-table">
                <tbody>
                    <tr className="name">
                        <td className="name-title">氏名：</td>
                        {reservation.is_group === false ? (
                            <td className="name-body">{reservation.reader_name}</td>
                        ) : (
                            <td className="name-body">{reservation.group_name}</td>
                        )
                        }
                    </tr>
                    <tr className="place">
                        <td className="place-title">場所：</td>
                        <td className="place-body">{reservation.place.name}</td>
                    </tr>
                    <tr className="time">
                        <td className="time-title">時間：</td>
                        <td className="time-body">{reservation.start}</td>
                    </tr>

                </tbody>
            </table>
        </div>
        {loading && <Loading />}
    </>
        
    )

    // const calendarType = props.calendarType;

    // const dayOfWeek = props.date.getDay() ;
    // const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];

    // if (calendarType === 'weekly') {
    //     return (
    //         <div className="head">
    //             <p className="day">{props.day}</p>
    //             <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
    //         </div>
    //     )
    // } else if (calendarType === 'daily') {
    //     return (
    //         <div className="daily-head">
    //             <p className="day">{dayOfWeekStr}</p>
    //             <p className="date"><span className={(new Date(new Date().toDateString()).getTime()===new Date(props.date.toDateString()).getTime() ? "today" : "")}>{props.date.getDate()}</span></p>
    //         </div>
    //     )
    // }

    
}

export default ApprovalInfo;