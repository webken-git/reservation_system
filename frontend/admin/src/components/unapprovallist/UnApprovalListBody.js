// 未承認リスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import UnApprovalTable from "./UnApprovalTable";
import "../approvallist/approval.scss";
import dayjs from "dayjs";
import CsvExportLayout from "../csvexport/CsvExportLayout";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";

const UnapprovalListBody = () => {
  const placeFiltering = (e) => {
    setPlaceFilter(e.target.value);
    // console.log(e.target.value);
  };
  const dateFiltering = (e) => {
    setDateFilter(e.target.value);
  };
  const [placeFilter, setPlaceFilter] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [UnApprovalListData, setUnApprovalListData] = useState([]);

  const getDefferdPayment = useFetch({
    url: `${ReservationUrls.DEFFERD_PAYMENT}`,
  });
  // 未承認リストのデータをAPIから受け取るaxios
  const GetUnApprovalList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=1`,
        {
          params: {
            reservation__place: placeFilter,
            reservation__start: dateFilter,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        // 未承認リストのデータをuseStateに入れている
        setUnApprovalListData(data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  // ページレンダリング時に未承認リストのデータを受け取っている
  useEffect(() => {
    GetUnApprovalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeFilter, dateFilter]);

  const Table =
    // データをmapで回している
    UnApprovalListData.map((val, val_index) => {
      let defferdPayment = getDefferdPayment.filter(
        (item) => item.reservation === val.reservation.id
      );
      return (
        // 未承認リストの中のコンポーネント
        <UnApprovalTable
          // propsでUnApprovalTable.jsに未承認リストのデータを送っている
          key={val_index}
          id={val.id}
          reservation_id={val.reservation.id}
          // dayjsのformatで〇/〇と日付を表示できるようにしている
          date={dayjs(val.reservation.start).format("YYYY-MM-DD")}
          group_name={val.reservation.group_name}
          reader_name={val.reservation.reader_name}
          contact_name={val.reservation.contact_name}
          tel={val.reservation.tel}
          address={val.reservation.address}
          purpose={val.reservation.purpose}
          start_day={dayjs(val.reservation.start).format("YYYY-MM-DD")}
          start_time={dayjs(val.reservation.start).format("HH:mm")}
          end_day={dayjs(val.reservation.end).format("YYYY-MM-DD")}
          end_time={dayjs(val.reservation.end).format("HH:mm")}
          organizer_number={val.reservation.organizer_number}
          participant_number={val.reservation.participant_number}
          place={val.reservation.place.name}
          place_min={val.reservation.place.min}
          place_max={val.reservation.place.max}
          place_number={val.reservation.place_number}
          admission_fee={val.reservation.admission_fee}
          equipment={val.reservation.equipment}
          special_equipment={val.reservation.special_equipment}
          email={val.reservation.user.email}
          approval={val.approval.name}
          usage_fee={val.usage_fee}
          electric_fee={val.electric_fee}
          heating_fee={val.heating_fee}
          defferd_payment={defferdPayment}
        />
      );
    });
  return (
    <>
      <div className="functions">
        <span className="space">
          <CsvExportLayout />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          <table className="list-body">
            <thead>
              <tr>
                <td>
                  <input
                    type="date"
                    className="datefilter"
                    onChange={(e) => dateFiltering(e)}
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <select
                    className="placefilter"
                    defaultValue=""
                    onChange={(e) => placeFiltering(e)}
                  >
                    <option value="">全体</option>
                    <option value="1">カーリング場</option>
                    <option value="2">大会議室</option>
                    <option value="3">中会議室</option>
                    <option value="4">小会議室</option>
                    <option value="5">アーチェリー場</option>
                    <option value="6">武道場</option>
                  </select>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>日付</th>
                <th>団体者名</th>
                <th>代表者名</th>
                <th>時間</th>
                <th>場所</th>
                <th>後納申請</th>
                <th>操作</th>
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>{Table}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UnapprovalListBody;
