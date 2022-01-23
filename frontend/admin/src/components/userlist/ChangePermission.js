import React, { useState } from "react";
import axios from "axios";
import { AuthUrls } from "../../utils/authUrls";
import './userlist.scss';

export const ChangePermission = (props) => {
    const [data, setData] = useState(props.changeData);

    const userUrl = AuthUrls.GET_USER_LIST;

    const onChange = (_key) => {
        if (_key === "is_staff") {
            axios.put(`${userUrl}${props.id}/`, {
                email: props.email,
                password: props.password,
                is_staff: !data,
            })
                .then(res => {
                    setData(res.data.is_staff);
                })
                .catch((err) => {
                    // console.log(err);
                });
        } else if (_key === "is_superuser") {
            axios.put(`${userUrl}${props.id}/`, {
                email: props.email,
                password: props.password,
                is_superuser: !data,
            })
                .then(res => {
                    setData(res.data.is_superuser);
                })
                .catch((err) => {
                    // console.log(err);
                });
        }
    };

    // useEffect(() => {
    //     setData(props.data);
    // }, [data]);

    return (
        <>
            <td>
                <input type='checkbox' className="permission" checked={data} onChange={() => onChange(props.permission)} />
                {/* <label htmlFor="toggle" className="toggle-label"/> */}
            </td>
        </>
    );
}

export default ChangePermission;
