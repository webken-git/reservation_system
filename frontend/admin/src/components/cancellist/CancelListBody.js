// キャンセルリスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import CancelTable from "./CancelTable"
// import './../approvallist/approval.scss'
import dayjs from 'dayjs'

const CancelListBody = () => {
  const [CancelListData, setCancelListData] = useState([]);
  // キャンセルリストのデータをAPIから受け取るaxios
  const GetCancelList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=4`)
      .then(response => {
        const data = response.data;
        // console.log(data);
        // キャンセルリストのデータをuseStateに入れている
        setCancelListData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // ページのレンダリング時にキャンセルリストのデータを受け取っている
  useEffect(() => {
    GetCancelList();
  }, [])

  const Table = (
    CancelListData.map((val, val_index) => {
      return (
        // キャンセルリストの中のコンポーネント
        <CancelTable
          // propsでCancelTable.jsに承認リストのデータを送っている
          key={val_index}
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
          id={val.reservation.id}
          purpose={val.reservation.purpose}
          admission_fee={val.reservation.admission_fee}
        />
      )
    })
  )
  return (
    <div>
      <table className="list-body">
        <tr>
          <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td></td><td>詳細</td>
        </tr>
        {Table}
      </table>
    </div>
  )
}

export default CancelListBody
