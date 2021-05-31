import React from 'react'

let logoBox = {
    width: "250px",
    height: "100px",
    backgroundColor: "#1A8D89",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

let logoString = {
    color: "#FFFFFF",
    fontSize: "30px",
}

const Logo = (props) => {
    return (
        <div style={logoBox}>
            <div style={logoString}>管理システム</div>
        </div>
    )
}

export default Logo