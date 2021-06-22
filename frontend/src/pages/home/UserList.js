import React from "react";
import axios from "axios";
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
    <div>
      <p>UserList</p>
    </div>
  )
}