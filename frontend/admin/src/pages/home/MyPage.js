import React from "react";
import SideBarAndHeaderRoute from "../../components/rooter/SideBarAndHeaderRoute"
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import { TopPage } from "./TopPage";
import { ApprovalList } from "./ApprovalList"
import { DisapprovalList } from "./DisapprovalList"
import { UnapprovalList } from "./UnapprovalList"
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "../../components/api/PrivateRoute"
//import './mypage.scss'

export const MyPage =()=> {
  return <h1>MyPage</h1>;
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

  // return (
  //   <BrowserRouter>
  //     <Switch>
  //         <SideBarAndHeaderRoute path="/TopPage" exact children={<PrivateRoute path="/TopPage" exact children={<TopPage/>} />} />
  //         <SideBarAndHeaderRoute path="/ApprovalList" exact children={<PrivateRoute path="/ApprovalList" exact children={<ApprovalList/>} />} />
  //         <SideBarAndHeaderRoute path="/DisapprovalList" exact children={<PrivateRoute path="/DisapprovalList" exact children={<DisapprovalList/>} />} />
  //         <SideBarAndHeaderRoute path="/UnapprovalList" exact children={<PrivateRoute path="/UnapprovalList" exact children={<UnapprovalList/>} />} />
  //     </Switch>
  //   </BrowserRouter>
  // )
}

