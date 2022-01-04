import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReservationUrls } from '../../utils/reservationUrls';
import authState from "../../recoil/auth/atom";
import useUnmountRef from '../../hooks/useUnmountRef';
import useSafeState from '../../hooks/useSafeState';
import Loading from '../loading/Loading';
import './history.scss';

const HistoryList = () => {
    const unmountRef = useUnmountRef();
    const [reservations, setReservations] = useSafeState(unmountRef, []);
    const [isLoading, setIsLoading] = useSafeState(unmountRef, true);
    const auth = useRecoilValue(authState);

    // date型をyyyy-mm-ddに変換
    const formatDate = (date) => {
        // 0埋め
        const zeroPadding = (num) => {
            return ('0' + num).slice(-2);
        };
        const year = date.getFullYear();
        const month = zeroPadding(date.getMonth() + 1);
        const day = zeroPadding(date.getDate());
        return `${year}-${month}-${day}`;
    };
    // date型をhh:mmに変換
    const formatTime = (date) => {
        // minutesは2桁表示する
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${date.getHours()}:${minutes}`;
    };

    const getReservations = () => {
        axios.get(`${ReservationUrls.APPROVAL_APPLICATION}?reservation__user=${auth.userId}`)
            .then((res) => {
                setIsLoading(false);
                setReservations(res.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    useEffect(() => {
        getReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="history-list">
                <h2 className="title">予約履歴</h2>
                <div className='history-table-wrapper'>
                    <table className='history-table'>
                        <thead>
                            <tr>
                                <th className='history-table-thead'></th>
                                <th>場所</th>
                                <th>予約日</th>
                                <th>予約時間</th>
                                <th>ステータス</th>
                                <th>詳細</th>
                                <th>キャンセル</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.reservation.reader_name}</td>
                                    <td data-label="場所">{reservation.reservation.place.name}</td>
                                    <td data-label="予約日">{formatDate(new Date(reservation.reservation.start))}</td>
                                    <td data-label="予約時間">
                                        {formatTime(new Date(reservation.reservation.start))}
                                        ～
                                        {formatTime(new Date(reservation.reservation.end))}
                                    </td>
                                    <td data-label="ステータス">{reservation.approval.name}</td>
                                    <td data-label="詳細">
                                        <Link to={`/history/${reservation.id}`}>
                                            <button type='button' className='detail-btn'>詳細</button>
                                        </Link>
                                    </td>
                                    <td data-label="キャンセル">
                                        <Link to={`/history/cancel/${reservation.id}/${reservation.reservation.id}`}>
                                            <button type='button' className='cancel-btn'>キャンセル</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isLoading && <Loading />}
        </>
    );
};

export default HistoryList;
