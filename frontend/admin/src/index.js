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

import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";

function Menu() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      {" "}|{" "}
      <Link to="/mypage">MyPage</Link> 
      {" "}|{" "}
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact children={<Home />} />
          <GuestRoute path="/login" children={<Login />} />
          <SideBarAndHeaderRoute path="/toppage" exact children={<PrivateRoute path="/TopPage" exact children={<TopPage/>} />} />
          <SideBarAndHeaderRoute path="/mypage" exact children={<PrivateRoute path="/MyPage" exact children={<MyPage/>} />} />
          <SideBarAndHeaderRoute pagename="承認リスト" path="/approvalList" exact children={<PrivateRoute path="/ApprovalList" exact children={<ApprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="未承認リスト" path="/disapprovalList" exact children={<PrivateRoute path="/DisapprovalList" exact children={<DisapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="不承認リスト"　path="/unapprovalList" exact children={<PrivateRoute path="/UnapprovalList" exact children={<UnapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="キャンセルリスト" path="/cancellist" exact children={<PrivateRoute path="/CancelList" exact children={<CancelList/>} />} />
          <SideBarAndHeaderRoute pagename="ユーザーリスト" path="/userlist" exact children={<PrivateRoute path="/userlist" exact children={<UserList/>} />} />
          <SideBarAndHeaderRoute pagename="カレンダー" path="/calendar" exact children={<PrivateRoute path="/calendar" exact children={<Calendar/>} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
