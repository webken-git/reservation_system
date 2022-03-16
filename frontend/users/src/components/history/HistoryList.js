import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { ReservationUrls } from "../../utils/reservationUrls";
import authState from "../../recoil/auth/atom";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import Loading from "../loading/Loading";
import HistoryListData from "./HistoryListData";
import "./history.scss";

const HistoryList = () => {
  const unmountRef = useUnmountRef();
  const [reservations, setReservations] = useSafeState(unmountRef, []);
  const [isLoading, setIsLoading] = useSafeState(unmountRef, true);
  const auth = useRecoilValue(authState);

  const getReservations = () => {
    axios
      .get(
        `${ReservationUrls.APPROVAL_APPLICATION}?reservation__user=${auth.userId}`
      )
      .then((res) => {
        setIsLoading(false);
        setReservations(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="history-list">
        <h2 className="title">予約履歴</h2>
        <div className="history-table-wrapper">
          <HistoryListData data={reservations} />
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default HistoryList;
