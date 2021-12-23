// 未承認リスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import UnApprovalTable from "./UnApprovalTable"
// import './approval.scss'
import dayjs from 'dayjs';
import CsvExportButton from "../csvexport/CsvExportButton";

const UnapprovalListBody = () => {
  const placeFiltering = (e) => {
    setPlaceFilter(e.target.value);
    // console.log(e.target.value);
  }

  const groupFiltering = (e) => {
    setGroupFilter(e.target.value);
    // setGroupFilter(true);
  }

  const dateFiltering = (e) => {
    setDateFilter(e.target.value);
  }

  const [placeFilter, setPlaceFilter] = useState();
  const [groupFilter, setGroupFilter] = useState();
  const [dateFilter, setDateFilter] = useState();

  const [UnApprovalListData, setUnApprovalListData] = useState([]);
  // 未承認リストのデータをAPIから受け取るaxios
  const GetUnApprovalList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=1`, {
      params: {
        'reservation__place': placeFilter,
        'reservation__is_group': groupFilter,
        'reservation__start': dateFilter
      }
    })
      .then(response => {
        const data = response.data;
        // console.log(data);
        // 未承認リストのデータをuseStateに入れている
        setUnApprovalListData(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // ページレンダリング時に未承認リストのデータを受け取っている
  useEffect(() => {
    GetUnApprovalList();
  }, [placeFilter, groupFilter, dateFilter])

  const Table = (
    // データをmapで回している
    UnApprovalListData.map((val, val_index) => {
      return (
        // 未承認リストの中のコンポーネント
        <UnApprovalTable
          // propsでUnApprovalTable.jsに未承認リストのデータを送っている
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
          admission_fee={val.reservation.admission_fee}
        />
      )
    })
  )
  return (
    <>
      <div className="functions">
        <span className="space">
          <CsvExportButton approval={1} />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          <table className="list-body">
            <tr>
              <td>
                <input type="date" className="datefilter" onChange={(e) => dateFiltering(e)} />
              </td>
              <td></td>
              <td></td>
              <td>
                <select className="groupfilter" onChange={(e) => groupFiltering(e)}>
                  <option value="">全部</option>
                  <option value="false">個人</option>
                  <option value="true">団体</option>
                </select>
              </td>
              <td></td>
              <td></td>
              <td>
                <select className="placefilter" onChange={(e) => placeFiltering(e)}>
                  <option value="" selected>全部</option>
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
            <thead>
              <tr>
                <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td></td><td></td><td>詳細</td>
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

export default UnapprovalListBody
