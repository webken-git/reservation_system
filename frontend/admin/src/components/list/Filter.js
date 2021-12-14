import React,{ useState } from "react";
// import axios from "axios";
import './../approvallist/approval.scss'
import './filter.scss'
// import DatePicker from "react-datepicker"
import dayjs from 'dayjs'
// import "react-datepicker/dist/react-datepicker.css"

const Filter = () => {
  // const initialDate = new Date()
  // const [startDate, setStartDate] = useState(initialDate)
  // const handleChange = (date) => {
  //   setStartDate(date)
  // }
  
  // カレンダーreact
  // const toUtcIso8601str = (momentInstance) => {
  //   return momentInstance
  //     .clone()
  //     .utc()
  //     .format('YYYY-MM-DDTHH:mm:00Z')
  // }
  // const [startDate, setStartDate] = useState(toUtcIso8601str(dayjs().subtract(7, 'days')))
  // const [endDate, setEndDate] = useState(toUtcIso8601str(dayjs()))
  // const handleChangeStart = (selectedDate) => {
  //   setStartDate(toUtcIso8601str(dayjs(selectedDate)))
  // }
  // const handleChangeEnd = (selectedDate) => {
  //   setEndDate(toUtcIso8601str(dayjs(selectedDate)))
  // }

  // 場所FilterのuseState
  // const [toggle, setToggle] = useState(false);
  
  return (
    <div>
      <tr>
        {/* <DatePicker
          selected={startDate}
          // minDate={startDate}
          onChange={handleChange}
          dateFormat="MM/dd"
        /> */}

    {/* <React.Fragment>
      <DatePicker
        selected={dayjs(startDate).toDate()}
        selectsStart
        startDate={dayjs(startDate).toDate()}
        endDate={dayjs(endDate).toDate()}
        onChange={handleChangeStart}
      />
      <DatePicker
        selected={dayjs(endDate).toDate()}
        selectsEnd
        startDate={dayjs(startDate).toDate()}
        endDate={dayjs(endDate).toDate()}
        onChange={handleChangeEnd}
      />
    </React.Fragment> */}
      </tr>
      {/* 場所Filter */}
      {/* <div className="place-pulldown-wrapper" onClick={() => setToggle(!toggle)}>
        <p>場所</p>
        { toggle ? <li className="panel">カーリングA</li> : null}
      </div> */}
      
    </div>
  )
}

export default Filter