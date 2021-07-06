// 承認リスト全体のコンポーネント
import React,{ useState, useEffect } from "react";
import axios from "axios";
import ApprovalTable from "./ApprovalTable"
import Filter from "./../list/Filter"
import './approval.scss'
import dayjs from 'dayjs'
// import Modal from 'react-modal'

const ApprovalListBody = () => { 
  const [ApprovalListData, setApprovalListData] = useState([]);
  // 承認リストのデータをAPIから受け取るaxios
  const GetApporovalList = () => {
    axios.get('https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=2')
    .then(response => {
      const data = response.data;
      // console.log(data[0]["reservation"]["place"]["name"]);
      // console.log(data);
      // 承認リストのデータをuseStateに入れている
      setApprovalListData(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // ページレンダリング時に承認リストのデータを受け取っている
  useEffect(() => {
    GetApporovalList();
  }, [])

  const Table = (
      // データをmapで回している
      ApprovalListData.map((val, val_index) =>{
        return(
          // 承認リストの中のコンポーネント
          <ApprovalTable
            // propsでApprovalTable.jsに承認リストのデータを送っている
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
        {/* <Filter/> */}
        <tr>
          <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td>詳細</td>
        </tr>
        {Table}
      </table>
    </div>
    )
}

export default ApprovalListBody