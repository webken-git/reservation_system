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
import { MyPage } from "./pages/home/MyPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";
import { Wcalendar } from "./pages/home/WeeklyCalendar";
import { Dcalendar } from "./pages/home/DailyCalendar";
import { Mcalendar } from "./pages/home/MonthlyCalendar";
import "./index.css"
import GetDate from "./components/toppage/GetDate"

import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact  children={<Login />} />
          <GuestRoute path="/login" children={<Login />} />
          <SideBarAndHeaderRoute pagename={<GetDate />} path="/toppage" exact children={<PrivateRoute path="/TopPage" exact children={<TopPage/>} />} />
          <SideBarAndHeaderRoute path="/mypage" exact children={<PrivateRoute path="/MyPage" exact children={<MyPage/>} />} />
          <SideBarAndHeaderRoute pagename="承認リスト" path="/approvalList" exact children={<PrivateRoute path="/ApprovalList" exact children={<ApprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="不承認リスト" path="/disapprovalList" exact children={<PrivateRoute path="/DisapprovalList" exact children={<DisapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="未承認リスト"　path="/unapprovalList" exact children={<PrivateRoute path="/UnapprovalList" exact children={<UnapprovalList/>} />} />
          <SideBarAndHeaderRoute pagename="キャンセルリスト" path="/cancellist" exact children={<PrivateRoute path="/CancelList" exact children={<CancelList/>} />} />
          <SideBarAndHeaderRoute pagename="ユーザーリスト" path="/userlist" exact children={<PrivateRoute path="/userlist" exact children={<UserList/>} />} />
          <SideBarAndHeaderRoute pagename="ウィークリーカレンダー" path="/weeklycalendar" exact children={<PrivateRoute path="/weeklycalendar" exact children={<Wcalendar/>} />} />
          <SideBarAndHeaderRoute pagename="デイリーカレンダー" path="/dailycalendar" exact children={<PrivateRoute path="/dailycalendar" exact children={<Dcalendar/>} />} />
          <SideBarAndHeaderRoute pagename="マンスリーカレンダー" path="/monthlycalendar" exact children={<PrivateRoute path="/monthlycalendar" exact children={<Mcalendar/>} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
