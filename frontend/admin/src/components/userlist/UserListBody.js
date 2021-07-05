import React,{ useState, useEffect } from "react";
import axios from "axios";
// import './detailsbutton.scss'

const UserListBody = () => {
  const [UserId, setUserId] = useState([]);
  const GetUserList = () => {
    // axios.get('${process.env.REACT_APP_API}/users/')
    axios.get('https://webhok.net/reservation_system/api/users/')
    .then(response => {
      const data = response.data;
      console.log(data);
      setUserId(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    GetUserList();
  }, [])

    return (
        <div>
          <table className="userlistall">
            <tr>
              <td>id</td><td>メールアドレス</td><td>詳細</td>
            </tr>
          </table>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>     
          <p>aaaaaaaaa</p>  
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          {UserId.map(val =>(
            <p>{val.id} {val.email}</p>
          ))}
        </div>
    )
}

export default UserListBody