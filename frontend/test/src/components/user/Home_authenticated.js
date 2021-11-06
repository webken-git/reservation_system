import React from "react";
import { useHistory } from "react-router";
import _ from "lodash";
import axios from "axios";
import { useState, useEffect } from "react";

import useUser from "../../hooks/useUser";
import useAlert from "../../hooks/useAlert";

import { AuthUrls } from "../../utils/authUrls";

const Home_authenticated = () => {
    const history = useHistory();
    const [loginUser, setUser] = useState();
    const [userList, setUserList] = useState([]);

    const { createAlert } = useAlert();
    const { getUserList, resetUserList, users } = useUser();

    const get_user_ListUrl = AuthUrls.GET_USER_LIST;
    const get_userUrl = AuthUrls.GET_USER_DATA;

    const pullUserList = async () => {
        resetUserList();

        try {
            const response = await axios.get(get_user_ListUrl);
            const responseMap = response.data.map((obj) => {
                return obj;
            });
            const responseData = _.mapKeys(responseMap, "id");
            getUserList(responseData);
            const userList = responseMap;
            setUserList(userList);
        } catch (error) {
            createAlert({
                message: "ユーザーの取得に失敗しました。",
                type: "danger"
            });
        }

        try {
            const response = await axios.get(get_userUrl);
            setUser(response.data.email);
        } catch (error) {
            createAlert({
                message: "セッションタイムアウトです。",
                type: "danger"
            });
        }
    };

    const UserList = Object.values(users);

    useEffect(() => {
        pullUserList();
    }, []);

    return (
        <div>
            <h1>ユーザー一覧</h1>
            <div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        history.push("/registration");
                    }}
                >
                    ユーザー登録
                </button>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>メールアドレス</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserList.map((user) => {
                            console.log(user);
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                history.push(`/user/edit/${user.id}`);
                                            }}
                                        >
                                            編集
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                history.push(`/user/delete/${user.id}`);
                                            }}
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home_authenticated;
