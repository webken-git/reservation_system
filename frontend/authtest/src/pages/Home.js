import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'

/**
 * @author
 * @function Home
**/

const Home = (props) => {
    const cookies = new Cookies();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_END_POINT}api/users/`, {
                headers: {
                    // 'Accept' : 'application/json',
                    'Content-Type': "application/json",
                    'Authorization': `JWT ${cookies.get('access_token')}`
                }
            })
            .then(res => {
                const userList = res.data;
                setUserList(userList);
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        <div>
            {
                userList.map(user => {
                    return (
                        <table key={user.id}>
                            <tr>
                                <td>id</td>
                                <td>email</td>
                            </tr>
                            <tr>
                                <Link key={user.id} to={`/${user.id}`}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                </Link>
                            </tr>
                        </table>
                )
            })
          }
        </div>
    )
}

export default Home;
