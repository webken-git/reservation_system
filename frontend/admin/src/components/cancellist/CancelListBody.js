// キャンセルリスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import CancelTable from "./CancelTable"
// import './../approvallist/approval.scss'
import dayjs from 'dayjs'
import CsvExportButton from "../csvexport/CsvExportButton";

const CancelListBody = () => {
  const placeFiltering = (e) => {
    setPlaceFilter(e.target.value);
    // console.log(e.target.value);
  }

  const dateFiltering = (e) => {
    setDateFilter(e.target.value);
  }

  const [placeFilter, setPlaceFilter] = useState();
  const [dateFilter, setDateFilter] = useState();

  const [CancelListData, setCancelListData] = useState([]);
  // キャンセルリストのデータをAPIから受け取るaxios
  const GetCancelList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=4`, {
      params: {
        'reservation__place': placeFilter,
        'reservation__start': dateFilter
      }
    })
      .then(response => {
        const data = response.data;
        // キャンセルリストのデータをuseStateに入れている
        setCancelListData(data);
      })
      .catch((error) => {
      })
  }

  // ページのレンダリング時にキャンセルリストのデータを受け取っている
  useEffect(() => {
    GetCancelList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeFilter, dateFilter])

  const Table = (
    CancelListData.map((val, val_index) => {
      return (
        // キャンセルリストの中のコンポーネント
        <CancelTable
          // propsでCancelTable.jsに承認リストのデータを送っている
          key={val_index}
          id={val.id}
          reservation_id={val.reservation.id}
          // dayjsのformatで〇/〇と日付を表示できるようにしている
          date={dayjs(val.reservation.start).format('YYYY-MM-DD')}
          group_name={val.reservation.group_name}
          reader_name={val.reservation.reader_name}
          contact_name={val.reservation.contact_name}
          tel={val.reservation.tel}
          address={val.reservation.address}
          purpose={val.reservation.purpose}
          start_day={dayjs(val.reservation.start).format('YYYY-MM-DD')}
          start_time={dayjs(val.reservation.start).format('HH:mm')}
          end_day={dayjs(val.reservation.end).format('YYYY-MM-DD')}
          end_time={dayjs(val.reservation.end).format('HH:mm')}
          organizer_number={val.reservation.organizer_number}
          participant_number={val.reservation.participant_number}
          place={val.reservation.place.name}
          reservation_id={val.reservation.id}
          admission_fee={val.reservation.admission_fee}
          email={val.reservation.user.email}
          approval={val.approval.name}
        />
      )
    })
  )
  return (
    <div>
      <div className="functions">
        <span className="space">
          <CsvExportButton approval={4} />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          <table className="list-body">
            <thead>
              <tr>
                <td>
                  <input type="date" className="datefilter" onChange={(e) => dateFiltering(e)} />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <select className="placefilter" defaultValue="" onChange={(e) => placeFiltering(e)}>
                    <option value="" selected>全体</option>
                    <option value="1">カーリング場</option>
                    <option value="2">大会議室</option>
                    <option value="3">中会議室</option>
                    <option value="4">小会議室</option>
                    <option value="5">アーチェリー場</option>
                    <option value="6">武道場</option>
                  </select>
                </td>
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
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>
              {Table}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CancelListBody
