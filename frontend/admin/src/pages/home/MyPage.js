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
}