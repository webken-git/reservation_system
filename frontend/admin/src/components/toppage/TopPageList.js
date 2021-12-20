import React,{ useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table"
import './toppage.scss'
import dayjs from 'dayjs'

const TopPageList = () => {
  const [TodayList, setTodayList] = useState([])
  const GetTodayList = () => {
    axios.get('https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=2')
    .then(response => {
      const data = response.data;
      console.log(data)
      var today = dayjs().format('YYYY-MM-DD')
      // var today = dayjs().add(1, 'y').add(19, 'd').format('YYYY-MM-DD')
      // var today = dayjs().add(1, 'd').format('YYYY-MM-DD')
      // console.log(today)
      // let i = 0
      // console.log(r_start_format)
      // console.log(r_start_format === today)

      var todaydata = []

      for(let i = 0; data.length > i; i++){
        var r_start = data[i]["reservation"]["start"]
        var r_start_format = dayjs(r_start).format('YYYY-MM-DD')
        console.log(r_start_format)
        if(r_start_format === today){
          todaydata.push(data[i])
          setTodayList(todaydata)
        }
      }
      
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    GetTodayList();
  }, [])

  const TodayTable = (
      TodayList.map((val, val_index) =>{
        return(
          <Table
            key={val_index}
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
        <table className="approvallistall">
          <thead>
            <tr>
              <td>日付</td><td>団体者名</td><td>代表者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td>詳細</td>
            </tr>
          </thead>
          <tbody>
            {TodayTable}
          </tbody>
        </table>
      </div>
    )
}

export default TopPageList
