import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/";
import PrivateRoute from "./components/api/PrivateRoute";
import GuestRoute from "./components/api/GuestRoute";

import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import { TopPage } from "./pages/home/TopPage";
import { MyPage }from "./pages/home/MyPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";
import { Calendar } from "./pages/home/Calendar";
import"./index.css"
import GetDate from "./components/toppage/GetDate"

import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import SideBarRoute from "./components/rooter/SideBarRoute";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact  children={<Login />} />
          <GuestRoute path="/login" children={<Login />} />
          <SideBarAndHeaderRoute pagename={<GetDate />} path="/toppage" exact children={<PrivateRoute path="/topPage" exact children={<TopPage/>} />} />
          <SideBarAndHeaderRoute path="/mypage" exact children={<PrivateRoute path="/MyPage" exact children={<MyPage/>} />} />
          <SideBarAndHeaderRoute pagename="承認リスト" path="/approvalList" exact children={<PrivateRoute path="/approvalList" exact children={<ApprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="不承認リスト" path="/disapprovalList" exact children={<PrivateRoute path="/disapprovalList" exact children={<DisapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="未承認リスト"　path="/unapprovalList" exact children={<PrivateRoute path="/unapprovalList" exact children={<UnapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="キャンセルリスト" path="/cancellist" exact children={<PrivateRoute path="/cancelList" exact children={<CancelList/>} />} />
          <SideBarAndHeaderRoute pagename="ユーザーリスト" path="/userlist" exact children={<PrivateRoute path="/userlist" exact children={<UserList/>} />} />
          <SideBarRoute path="/calendar" exact children={<PrivateRoute path="/calendar" exact children={<Calendar/>} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
