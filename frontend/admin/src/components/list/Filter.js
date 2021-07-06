import React,{ useState } from "react";
// import axios from "axios";
import './../approvallist/approval.scss'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Filter = () => {
  const initialDate = new Date()
  const [startDate, setStartDate] = useState(initialDate)
  const handleChange = (date) => {
    setStartDate(date)
  }
  
  return (
    <div>
      <tr>
        <DatePicker
          selected={startDate}
          // minDate={startDate}
          onChange={handleChange}
          dateFormat="MM/dd"
        />
      </tr>
        aaaaa
    </div>
  )
}

export default Filter