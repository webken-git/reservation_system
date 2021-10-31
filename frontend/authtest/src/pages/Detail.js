import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'

/**
 * @author
 * @function Detail
**/

const Detail = (props) => {
    const cookies = new Cookies();
    const [userList, setUserList] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_END_POINT}api/users/${props.match.params.userId}/`, {
                headers: {
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

                        <table key={userList.id}>
                            <tr>
                                <td>id</td>
                                <td>email</td>
                            </tr>
                            <tr>
                                <td>{userList.id}</td>
                                <td>{userList.email}</td>
                            </tr>
                        </table>

        </div>
    )
}

export default Detail;
