import React from "react";
import UserListBody from "../../components/userlist/UserListBody"
export const UserList =()=> {
  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <UserListBody/>
        </div>
      </div>
    </div>
  )
}