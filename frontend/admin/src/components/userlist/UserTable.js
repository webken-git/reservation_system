// ユーザーリストの中身
import React from "react";
import UserDetailsButton from "./UserDetailsButton"
// import './approval.scss'

const UserTable = (props) => {
  return(
    <tr>
      {/* id */}
      <td>{props.id}</td>
      {/* メールアドレス */}
      <td>{props.email}</td>
      <td><UserDetailsButton/></td>
    </tr>
  )
}

export default UserTable