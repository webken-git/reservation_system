import React from 'react'

let transBox = {
    width: "250px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #707070",
    color: "#FFFFFF",
    fontSize: "20px",
}

const TransitionBox = (props) => {
    return (
        <div style={transBox}>
            <p><img src={props.icon}/>{props.pagename}</p>
        </div>
    )
}

export default TransitionBox