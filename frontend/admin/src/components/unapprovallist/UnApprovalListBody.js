// 未承認リスト全体のコンポーネント
import React,{ useState, useEffect } from "react";
import axios from "axios";
import UnApprovalTable from "./UnApprovalTable"
// import './approval.scss'
import dayjs from 'dayjs'

const UnapprovalListBody = () => {
  const [UnApprovalListData, setUnApprovalListData] = useState([]);
  // 未承認リストのデータをAPIから受け取るaxios
  const GetUnApprovalList = () => {
    axios.get('https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=1')
    .then(response => {
      const data = response.data;
      // console.log(data);
      // 未承認リストのデータをuseStateに入れている
      setUnApprovalListData(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  // ページレンダリング時に未承認リストのデータを受け取っている
  useEffect(() => {
    GetUnApprovalList();
  }, [])

  const Table = (
      // データをmapで回している
      UnApprovalListData.map((val, val_index) =>{
        return(
          // 未承認リストの中のコンポーネント
          <UnApprovalTable
            // propsでUnApprovalTable.jsに未承認リストのデータを送っている
            key={val_index}
            // dayjsのformatで〇/〇と日付を表示できるようにしている
            date={dayjs(val.reservation.start).format('MM/DD')}
            group_name={val.reservation.group_name}
            reader_name={val.reservation.reader_name}
            purpose={val.reservation.purpose}
            start={dayjs(val.reservation.start).format('HH:mm')}
            end={dayjs(val.reservation.end).format('HH:mm')}
            organizer_number={val.reservation.organizer_number}
            participant_number={val.reservation.participant_number}
            place={val.reservation.place.name}
            id={val.reservation.id}
          />
        )
    })
  )
    return (
      <div>
      <table className="list-body">
        <tr>
          <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td></td><td></td><td></td><td>詳細</td>
        </tr>
        {Table}
      </table>
    </div>
    )
}

export default UnapprovalListBody