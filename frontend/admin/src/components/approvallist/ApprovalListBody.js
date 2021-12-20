// 承認リスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApprovalTable from "./ApprovalTable"
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import './approval.scss'
import dayjs from 'dayjs'
import DocumentLayout from "../document/DocumentLayout";
import CsvExportButton from "../csvexport/CsvExportButton";

const ApprovalListBody = () => {
  const filtering = (e) => {
    setFilterType(e.target.value);
  }

  // const filtering = (e) => {
  //   sethateFilterType(e.target.value);
  //   // console.log(e.target.value);
  // }

  const [filterType, setFilterType] = useState();
  // const [DateFilterType, sethateFilterType] = useState();

  const [ApprovalListhata, setApprovalListhata] = useState([]);
  // 承認リストのデータをAPIから受け取るaxios
  // const GetApporovalList = () => {
  //   axios.get(`${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=2`)
  //     .then(response => {
  //       const data = response.data;
  // console.log(data[0]["reservation"]["place"]["name"]);
  // console.log(data);
  // 承認リストのデータをuseStateに入れている
  //       setApprovalListhata(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // ページレンダリング時に承認リストのデータを受け取っている
  // useEffect(() => {
  //   GetApporovalList();
  // }, [])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=2`, {
      params: {
        'reservation__place': filterType
      }
      // params: {
      //   'reservation__start': DateFilterType
      // }
    })
      .then(response => {
        const data = response.data;
        // console.log(data[0]["reservation"]["place"]["name"]);
        // 承認リストのデータをuseStateに入れている
        setApprovalListhata(data);
      })
      .catch((error) => {
      })
  }, [filterType])

  const Table = (
      // データをmapで回している
      ApprovalListhata.map((val, val_index) =>{
        return(
          // 承認リストの中のコンポーネント
          <ApprovalTable
            // propsでApprovalTable.jsに承認リストのデータを送っている
            key={val_index}
            id={val.id}
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
          />
        )
    })
  )
  return (
    <>
      <div className="functions">
        <select className="filter" onChange={(e) => filtering(e)} defaultValue="">
          <option value="">施設選択</option>
          <option value="">全て</option>
          <option value="1">カーリング場</option>
          <option value="2">大会議室</option>
          <option value="3">中会議室</option>
          <option value="4">小会議室</option>
          <option value="5">アーチェリー場</option>
          <option value="6">武道場</option>
        </select>
        <span className="space">
          <DocumentLayout />
        </span>
        <span className="space">
          <CsvExportButton approval={2} />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          {/* 承認リスト全体コンポーネント */}
          <table className="list-body">
            <thead>
              <tr>
                <th></th>
                <th>日付</th>
                <th>団体者名</th>
                <th>連絡者名</th>
                <th>個人/団体</th>
                <th>時間</th>
                <th>人数</th>
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
    </>
  )
}

export default ApprovalListBody
