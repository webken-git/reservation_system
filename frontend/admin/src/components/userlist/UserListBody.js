// ユーザーリスト全体のコンポーネント
import React,{ useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable"
// import './detailsbutton.scss'

const UserListBody = () => {
  const [UserListData, setUserListData] = useState([]);
  // ユーザーリストのデータをAPIから受け取るaxios
  const GetUserList = () => {
    axios.get('https://webhok.net/reservation_system/api/users/')
    .then(response => {
      const data = response.data;
      // console.log(data);
      // ユーザーリストのデータをuseStateに入れている
      setUserListData(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // ページレンダリング時にユーザーリストのデータを受け取っている
  useEffect(() => {
    GetUserList();
  }, [])

  const Table = (
    // データをmapで回している
    UserListData.map((val, val_index) =>{
      return(
        // ユーザーリストの中のコンポーネント
        <UserTable
        // propsでUserTable.jsにユーザーリストのデータを送っている
          key={val_index}
          id={val.id}
          email={val.email}
        />
      )
  })
)

    return (
        <div>
          <table className="list-body">
            <tr>
              <td>id</td><td>メールアドレス</td><td>詳細</td>
            </tr>
            {Table}
          </table>
        </div>
    )
}

export default UserListBody
    // axios.get('${process.env.REACT_APP_API}/users/')