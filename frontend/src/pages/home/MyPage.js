import React from "react";
import SideBar from "../../components/Simaya/SideBar"
import Header from "../../components/Simaya/Header"
export const MyPage =()=> {
  // return <h1>MyPage</h1>;
  return (
    <div>
      <div>
        <SideBar/>
      </div>
      <div className="main">
        <Header/>
        
      </div>
    </div>
  )
}

