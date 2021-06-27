import React from "react";
import axios from "axios";
import UserListBody from "../../components/userlist/UserListBody"
export const UserList =()=> {
  const UserListGet =()=> {
    axios.get('https://webhok.net/reservation_system/api/users/1')
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  UserListGet();

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