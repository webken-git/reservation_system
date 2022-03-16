// ユーザーリストの中身
import React from "react";
import UserDetailButton from "./UserDetailButton";
import ChangePermission from "./ChangePermission";
// import './approval.scss'

const UserTable = (props) => {
  return (
    <tr>
      {/* id */}
      <td>{props.id}</td>
      {/* メールアドレス */}
      <td>{props.email}</td>
      <td>
        <ChangePermission
          id={props.id}
          email={props.email}
          password={props.password}
          changeData={props.is_staff}
          permission="is_staff"
        />
      </td>
      <td>
        <ChangePermission
          id={props.id}
          email={props.email}
          password={props.password}
          changeData={props.is_superuser}
          permission="is_superuser"
        />
      </td>
      <td>
        <UserDetailButton
          id={props.id}
          email={props.email}
          is_staff={props.is_staff}
          is_superuser={props.is_superuser}
          last_login={props.last_login}
          created_at={props.created_at}
        />
      </td>
    </tr>
  );
};

export default UserTable;
