// ユーザーリスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import UserTable from "./UserTable";
import authState from "../../recoil/auth/atom";
import { AuthUrls } from "../../utils/authUrls";
import { RegistrationButton } from "../auth/RegistrationButton";
// import { useSortData } from "../../hooks/useSortData";

const UserListBody = () => {
  const [UserListData, setUserListData] = useState([]);
  // const [sortBy] = useSortData(UserListData, setUserListData);
  const auth = useRecoilValue(authState);
  // ユーザーリストのデータをAPIから受け取るaxios
  const GetUserList = () => {
    axios
      .get(`${AuthUrls.GET_USER_LIST}`)
      .then((response) => {
        const data = response.data;
        // 自分のデータを削除する
        // const myData = data.filter((user) => user.id !== auth.userId);
        // ユーザーリストのデータをuseStateに入れている
        setUserListData(data);
      })
      .catch((error) => {});
  };

  // ページレンダリング時にユーザーリストのデータを受け取っている
  useEffect(() => {
    GetUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Table =
    // データをmapで回している
    UserListData.map((val, val_index) => {
      return (
        // ユーザーリストの中のコンポーネント
        <UserTable
          // propsでUserTable.jsにユーザーリストのデータを送っている
          key={val_index}
          id={val.id}
          email={val.email}
          password={val.password}
          is_staff={val.is_staff}
          is_superuser={val.is_superuser}
          last_login={val.last_login}
          created_at={val.created_at}
          auth={auth}
        />
      );
    });

  return (
    <>
      <div className="functions">
        <span className="space">
          <RegistrationButton />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        {/* スクロールバーボックス */}
        <div className="scroll_box">
          <table className="list-body">
            <thead>
              <tr>
                <th>id</th>
                <th>メールアドレス</th>
                <th>管理者権限</th>
                <th>スーパーユーザー権限</th>
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>{Table}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserListBody;
// axios.get('${process.env.REACT_APP_API}/users/')
