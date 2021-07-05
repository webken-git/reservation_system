// 不承認リスト全体のコンポーネント
import React,{ useState, useEffect } from "react";
import axios from "axios";
import DisApprovalTable from "./DisapprovalTable"
// import './approval.scss'
import dayjs from 'dayjs'


const DisapprovalListBody = () => {
  const [DisApprovalListData, setDisApprovalListData] = useState([]);
  // 不承認リストのデータをAPIから受け取るaxios
  const GetDisApprovalList = () => {
    axios.get('https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=3')
    .then(response => {
      const data = response.data;
      // console.log(data);
      // 不承認リストのデータをuseStateに入れている
      setDisApprovalListData(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // ページレンダリング時に不承認リストのデータを受け取っている
  useEffect(() => {
    GetDisApprovalList();
  }, [])

  const Table = (
    // データをmapで回している
      DisApprovalListData.map((val, val_index) =>{
        return(
          // 不承認リストの中のコンポーネント
          <DisApprovalTable
          // propsでDisapprovalTable.jsに不承認リストのデータを送っている
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
          />
        )
    })
  )
    return (
      <div>
      <table className="list-body">
        <tr>
          <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td>詳細</td>
        </tr>
        {Table}
      </table>
    </div>
    )
}

export default DisapprovalListBody