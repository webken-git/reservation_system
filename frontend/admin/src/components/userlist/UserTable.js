// ユーザーリストの中身
import React from "react";
import UserDetailsButton from "./UserDetailsButton"
import ChangePermission from "./ChangePermission";
// import './approval.scss'

const UserTable = (props) => {
  return(
    <tr>
      {/* id */}
      <td>{props.id}</td>
      {/* メールアドレス */}
      <td>{props.email}</td>
      <ChangePermission id={props.id} email={props.email} password={props.password} changeData={props.is_staff} permission="is_staff" />
      <ChangePermission id={props.id} email={props.email} password={props.password} changeData={props.is_superuser} permission="is_superuser" />
      <td><UserDetailsButton/></td>
    </tr>
  )
}

export default UserTable
