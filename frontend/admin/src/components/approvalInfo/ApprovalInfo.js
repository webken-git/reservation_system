import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loading from "../loading/Loading";
import './approvalInfo.scss';
import useUnmountRef from '../../hooks/useUnmountRef';
import useSafeState from '../../hooks/useSafeState';
import { formatDate, formatTime } from './formatData';

const ApprovalInfo = (props) =>{
    const unmountRef = useUnmountRef();
    const [reservation, setReservation] = useState([]);
    const [loading, setLoading] = useState(false);
<<<<<<< HEAD
    const [usage, setUsage] = useSafeState(unmountRef, []);
    const [age, setAge] = useSafeState(unmountRef, []);
=======
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
>>>>>>> feb0658adc8531a1b92335c7e8adbeed99159e33
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
            getUsage(id);
            getAge(id);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const getUsage = (id) => {
        axios.get(`${process.env.REACT_APP_API}/api/usage-categories/?reservation=${id}`)
            .then((res) => {
                setUsage(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
            });
    };

    const getAge = (id) => {
        axios.get(`${process.env.REACT_APP_API}/api/age-categories/?reservation=${id}`)
            .then((res) => {
                setAge(res.data);
            })
            .catch((err) => {
            });
    };

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
                        {/* <tr className="name-base">
                            <td className="name-title">氏名：</td>
                            {reservation.is_group === false ? (
                                <td className="name-body">{reservation.reader_name}</td>
                            ) : (
                                <td className="name-body">{reservation.group_name}</td>
                            )
                            }
                        </tr> */}
                        <tr>
                            <td>団体名：</td>
                            <td>{reservation.group_name}</td>
                        </tr>
                        <tr>
                            <td>代表者名：</td>
                            <td>{reservation.reader_name}</td>
                        </tr>
                        <tr>
                            <td>連絡者名：</td>
                            <td>{reservation.contact_name}</td>
                        </tr>
                        <tr>
                            <td>住所：</td>
                            <td>{reservation.address}</td>
                        </tr>
                        <tr>
                            <td>場所：</td>
                            <td>{reservation.place.name}</td>
                        </tr>
                        <tr>
                            <td>予約日：</td>
                            <td>{formatDate(new Date(reservation.start.replace(/-/g,"/")))}</td>
                        </tr>
                        <tr>
                            <td>予約時間：</td>
                            <td>
                                {formatTime(new Date(reservation.start.replace(/-/g,"/")))}
                                ～
                                {formatTime(new Date(reservation.end.replace(/-/g,"/")))}
                            </td>
                        </tr>
                        <tr>
                            <td>利用区分：</td>
                            {usage[0] && usage[0].usage.map((item, index) => (
                                <td key={index}>{item.name}　</td>
                            ))}
                        </tr>
                        <tr>
                            <td>年齢区分：</td>
                            <td>
                                {age[0] && age[0].age.map((item, index) => (
                                    <span key={index}>{item.name}　</span>
                                ))}
                            </td>
                        </tr>
                        {/* <tr>
                            <td>ステータス：</td>
                            <td>{reservation.approval.name}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            {loading && <Loading />}
        </>
        )
    }    
}

export default ApprovalInfo;
