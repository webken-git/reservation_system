import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loading from "../loading/Loading";
import './approvalInfo.scss';


const ApprovalInfo = (props) =>{
    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
    const id = props.id;

    // setYear(reservation.start.substr(0, 4));
    // setMonth(reservation.start.substr(5, 2));
    // setDate(reservation.start.substr(8, 2));

    const pullReservation = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/api/reservations/${id}`,{
        })
        .then(res => {
            console.log(res.data)
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

    if(reservation.length === 0) {
        return <Loading />;
    } else {
        return (
            <>
                <div className="info-wrapper">
                    <table className="info-table">
                        <tbody>
                            <tr className="name-base">
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
    }    
}

export default ApprovalInfo;