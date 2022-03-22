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
          auth={props.auth}
        />
      </td>
      <td>
        <ChangePermission
          id={props.id}
          email={props.email}
          password={props.password}
          changeData={props.is_superuser}
          permission="is_superuser"
          auth={props.auth}
        />
      </td>
      <td>
        <UserDetailButton id={props.id} auth={props.auth} />
      </td>
    </tr>
  );
};

export default UserTable;
