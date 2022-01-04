import React, { useEffect } from 'react';
import axios from 'axios';
import { ReservationUrls } from '../../utils/reservationUrls';
import useUnmountRef from '../../hooks/useUnmountRef';
import useSafeState from '../../hooks/useSafeState';
import Loading from '../loading/Loading';
import './history.scss';

const ReservationCancel = (props) => {
    const unmountRef = useUnmountRef();
    const [reservation, setReservation] = useSafeState(unmountRef, []);
    const [isLoading, setIsLoading] = useSafeState(unmountRef, true);
    const [message, setMessage] = useSafeState(unmountRef, '');

    const approvalApplication = ReservationUrls.APPROVAL_APPLICATION;

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

    const getReservation = () => {
        axios.get(`${approvalApplication}${props.id}/`)
            .then((res) => {
                setReservation(res.data);
                // console.log(res.data.approval.name);
                setIsLoading(false);
            })
            .catch((err) => {
                // console.log(err);
                setIsLoading(false);
                // 前のページに戻る
                window.history.back();
            });
    };

    const onClick = () => {
        setIsLoading(true);
        axios.patch(`${approvalApplication}${props.id}/`, {
            'reservation_id': props.reservationId,
            'approval_id': '4',
        })
            .then((res) => {
                setMessage("キャンセル手続きが完了しました。");
                setIsLoading(false);
                setTimeout(() => {
                    window.location.href = '/history';
                }, 500);
            })
            .catch((err) => {
                // console.log(err);
                // 前のページに戻る
                setIsLoading(false);
                setMessage("キャンセル手続きに失敗しました。");
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
                    <h2 className="title">キャンセル手続き</h2>
                    <p>こちらの予約をキャンセルしてもよろしいでしょうか。</p>
                    {message && <p className="message">{message}</p>}
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
                            <span>{formatDate(new Date(reservation.reservation.start))}</span>
                        </li>
                        <li>
                            <label>予約時間：</label>
                            <span>
                                {formatTime(new Date(reservation.reservation.start))}
                                ～
                                {formatTime(new Date(reservation.reservation.end))}
                            </span>
                        </li>
                        <li>
                            <label>ステータス：</label>
                            <span>{reservation.approval.name}</span>
                        </li>
                    </ul>
                    <div className="auth-btn-wrapper">
                        <button className="back-btn" type="button" onClick={() => window.history.back()}>戻る</button>
                        <button type="button" className="btn auth-btn" onClick={() => onClick()}>キャンセル</button>
                    </div>
                </div>
                {isLoading && <Loading />}
            </>
        );
    }
};

export default ReservationCancel;
