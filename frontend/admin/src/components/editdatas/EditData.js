import React from "react";
import './editdata.scss';

const EditData = (props) => {
    return (
        <>
            <td className="tdnotclick">{props.tdnotclick}</td>
            <td className="tdclick"><textarea>{props.tdclick}</textarea></td>
        </>
    )
}

export default EditData