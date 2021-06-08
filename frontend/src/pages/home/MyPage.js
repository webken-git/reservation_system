import React from "react";
// import SideBar from "../../components/sidebar/SideBar"
// import Header from "../../components/header/Header"
import Approval from "./Approval"
import SideBarAndHeaderRoute from "../../components/sidebarandheaderoute/SideBarAndHeaderRoute"
//import './mypage.scss'

export const MyPage =()=> {
  // return <h1>MyPage</h1>;
  // return (
  //   <div className="allbox">
  //     <div className="sidebar">
  //       <SideBar/>
  //     </div>
  //     <div className="mainbox">
  //       <Header/>
  //     </div>
  //   </div>
  // )
  return (
      <SideBarAndHeaderRoute path="/Approval" exact children={<Approval/>} />
  )

}

