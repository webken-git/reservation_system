// ユーザーリスト全体のコンポーネント
import React,{ useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";
// import './detailsbutton.scss';
import { RegistrationButton } from "../auth/RegistrationButton";

const UserListBody = () => {
  const [UserListData, setUserListData] = useState([]);
  // ユーザーリストのデータをAPIから受け取るaxios
  const GetUserList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/users/`)
    .then(response => {
      const data = response.data;
      // ユーザーリストのデータをuseStateに入れている
      setUserListData(data);
    })
    .catch((error) => {
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
        <div className="functions">
          <RegistrationButton />
        </div>
        <div className="scroll_box-wrapper">
          {/* スクロールバーボックス */}
          <div className="scroll_box">
            <table className="list-body">
              <thead>
                <tr>
                  <td>id</td><td>メールアドレス</td><td>詳細</td>
                </tr>
              </thead>
              <tbody>
                {Table}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

export default UserListBody
    // axios.get('${process.env.REACT_APP_API}/users/')
