import React from "react";
import './toppage.scss'


const Table = (props) => {
  return(
    <tr>
      <td>{props.date}</td>
      <td>{props.group_name}</td>
      <td>{props.reader_name}</td>
      <td>{props.purpose}</td>
      <td>{props.start}~{props.end}</td> 
      <td>{(props.organizer_number)+(props.participant_number)}</td>
      <td>{props.place}</td> 
    </tr>
  )
}

export default Table