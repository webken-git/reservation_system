import React, { useEffect } from 'react';
import axios from 'axios';
import { ReservationUrls } from '../../utils/reservationUrls';
import useUnmountRef from '../../hooks/useUnmountRef';
import useSafeState from '../../hooks/useSafeState';
import { formatDate, formatTime } from './formatData';
import Loading from '../loading/Loading';
import './history.scss';

const ReservationDetail = (props) => {
    const unmountRef = useUnmountRef();
    const [reservation, setReservation] = useSafeState(unmountRef, []);
    const [, setIsLoading] = useSafeState(unmountRef, true);

    const getReservation = () => {
        axios.get(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`)
            .then((res) => {
                setReservation(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                // 前のページに戻る
                window.history.back();
            });
    };

    useEffect(() => {
        getReservation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (reservation.length === 0) {
        return <Loading />;
    } else {
        return (
            <>
                <div className="history-list">
                    <h2 className="title">予約詳細</h2>
                    <ul>
                        <li>
                            <label>団体名：</label>
                            <span>{reservation.reservation.group_name}</span>
                        </li>
                        <li>
                            <label>代表者名：</label>
                            <span>{reservation.reservation.reader_name}</span>
                        </li>
                        <li>
                            <label>連絡者名：</label>
                            <span>{reservation.reservation.contact_name}</span>
                        </li>
                        <li>
                            <label>住所：</label>
                            <span>{reservation.reservation.address}</span>
                        </li>
                        <li>
                            <label>場所：</label>
                            <span>{reservation.reservation.place.name}</span>
                        </li>
                        <li>
                            <label>予約日：</label>
                            <span>{formatDate(new Date(reservation.reservation.start.replace(/-/g,"/")))}</span>
                        </li>
                        <li>
                            <label>予約時間：</label>
                            <span>
                                {formatTime(new Date(reservation.reservation.start.replace(/-/g,"/")))}
                                ～
                                {formatTime(new Date(reservation.reservation.end.replace(/-/g,"/")))}
                            </span>
                        </li>
                        <li>
                            <label>ステータス：</label>
                            <span>{reservation.approval.name}</span>
                        </li>
                    </ul>
                    <button className="back-btn" type="button" onClick={() => window.history.back()}>戻る</button>
                </div>
            </>
        );
    }
};

export default ReservationDetail;
