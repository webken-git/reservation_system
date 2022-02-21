import React, { useEffect } from "react";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import Loading from "../loading/Loading";
import "./history.scss";

const ReservationDetail = (props) => {
  const unmountRef = useUnmountRef();
  const [reservation, setReservation] = useSafeState(unmountRef, []);
  const [usage, setUsage] = useSafeState(unmountRef, []);
  const [age, setAge] = useSafeState(unmountRef, []);
  const [defferdPayment, setDefferdPayment] = useSafeState(unmountRef, []);
  // const [, setIsLoading] = useSafeState(unmountRef, true);

  const getReservation = () => {
    axios
      .get(`${ReservationUrls.APPROVAL_APPLICATION}${props.id}/`)
      .then((res) => {
        setReservation(res.data);
        getUsage(res.data.reservation.id);
        getAge(res.data.reservation.id);
        getDefferdPayment(res.data.reservation.id);
      })
      .catch((err) => {
        // setIsLoading(false);
        // 前のページに戻る
        window.history.back();
      });
  };

  const getUsage = (reservationId) => {
    axios
      .get(`${ReservationUrls.USAGE_CATEGORY}?reservation=${reservationId}`)
      .then((res) => {
        setUsage(res.data);
        // console.log(res.data);
      })
      .catch((err) => {});
  };

  const getAge = (reservationId) => {
    axios
      .get(`${ReservationUrls.AGE_CATEGORY}?reservation=${reservationId}`)
      .then((res) => {
        setAge(res.data);
      })
      .catch((err) => {});
  };

  const getDefferdPayment = (reservationId) => {
    axios
      .get(`${ReservationUrls.DEFFERD_PAYMENT}?reservation=${reservationId}`)
      .then((res) => {
        setDefferdPayment(res.data);
      })
      .catch((err) => {});
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
              <label>利用開始日時：</label>
              <span>{reservation.reservation.start}</span>
            </li>
            <li>
              <label>利用終了日時：</label>
              <span>{reservation.reservation.end}</span>
            </li>
            <li>
              <label>年齢区分：</label>
              {age[0] &&
                age[0].age.map((item, index) => (
                  <span key={index}>{item.name}　</span>
                ))}
            </li>
            <li>
              <label>利用区分：</label>
              {usage[0] &&
                usage[0].usage.map((item, index) => (
                  <span key={index}>{item.name}　</span>
                ))}
            </li>
            <li>
              <label>主催関係者：</label>
              <span className="table-cell">
                {reservation.reservation.organizer_number}人{" "}
              </span>
            </li>
            <li>
              <label>参集人員：</label>
              <span className="table-cell">
                {reservation.reservation.participant_number}人
              </span>
            </li>
            {usage[0] &&
              usage[0].usage.find(
                (item) => item.name === "入場料を徴収する"
              ) && (
                <li>
                  <label>徴収する入場料の最高額：</label>
                  <span>{reservation.reservation.admission_fee}円</span>
                </li>
              )}
            {reservation.reservation.equipment.length > 0 && (
              <li>
                <label>附属設備・器具の使用：</label>
                {reservation.reservation.equipment.map((item, index) => (
                  <span key={index}>{item.name}　</span>
                ))}
              </li>
            )}
            {reservation.reservation.special_equipment !== null && (
              <li>
                <label>特別設備：</label>
                <span>{reservation.reservation.special_equipment}</span>
              </li>
            )}
            {defferdPayment[0] && (
              <>
                <li>
                  <label>後納の理由：</label>
                  <span>{defferdPayment[0].reason}　</span>
                </li>
                <li>
                  <label>後納使用料：</label>
                  <span>
                    {defferdPayment[0].fee
                      ? defferdPayment[0].fee + "円"
                      : "まだ金額が確定しておりません"}
                  </span>
                </li>
              </>
            )}
            {reservation.usage_fee ? (
              <>
                <li>
                  <label>利用料：</label>
                  <span>{reservation.usage_fee}円</span>
                </li>
                <li>
                  <label>電気料：</label>
                  <span>{reservation.electric_fee}円</span>
                </li>
                <li>
                  <label>暖房料：</label>
                  <span>{reservation.heating_fee}円</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <label>利用料：</label>
                  <span>まだ金額が確定しておりません</span>
                </li>
                <li>
                  <label>電気料：</label>
                  <span>まだ金額が確定しておりません</span>
                </li>
                <li>
                  <label>暖房料：</label>
                  <span>まだ金額が確定しておりません</span>
                </li>
              </>
            )}
            <li>
              <label>ステータス：</label>
              <span>{reservation.approval.name}</span>
            </li>
          </ul>
          <button
            className="back-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            戻る
          </button>
        </div>
      </>
    );
  }
};

export default ReservationDetail;
