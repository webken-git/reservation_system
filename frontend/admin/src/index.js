import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/";
import LoginRoute from "./components/rooter/LoginRoute";
import PrivateRoute from "./components/api/PrivateRoute";
import GuestRoute from "./components/api/GuestRoute";

import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import { LoginPage } from "./pages/home/LoginPage";
import Registration from "./components/auth/Registration";
import { TopPage } from "./pages/home/TopPage";
import { MyPage } from "./pages/home/MyPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";
import { CalendarPage } from "./pages/home/CalendarPage";
import { DocumentListPage } from "./pages/home/DocumentListPage";
import "./index.css"
import GetDate from "./components/toppage/GetDate"

import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import SideBarRoute from "./components/rooter/SideBarRoute";

// var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `JWT ${Cookies.get('access_token')}`,
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <Switch>
            <Route path="/login" exact children={<LoginPage />} />
            <LoginRoute>
              <Route path="/registration" exact children={<Registration />} />
              <SideBarAndHeaderRoute pagename={<GetDate />} path="/" exact children={<PrivateRoute path="/" exact children={<TopPage />} />} />
              <SideBarAndHeaderRoute path="/mypage" exact children={<PrivateRoute path="/MyPage" exact children={<MyPage/>} />} />
              <SideBarAndHeaderRoute pagename="承認リスト" path="/approvalList" exact children={<PrivateRoute path="/approvalList" exact children={<ApprovalList/>} />} />
              <SideBarAndHeaderRoute pagename="不承認リスト" path="/disapprovalList" exact children={<PrivateRoute path="/disapprovalList" exact children={<DisapprovalList/>} />} />
              <SideBarAndHeaderRoute pagename="未承認リスト"　path="/unapprovalList" exact children={<PrivateRoute path="/unapprovalList" exact children={<UnapprovalList/>} />} />
              <SideBarAndHeaderRoute pagename="キャンセルリスト" path="/cancellist" exact children={<PrivateRoute path="/cancelList" exact children={<CancelList />} />} />
              <SideBarAndHeaderRoute pagename="ドキュメントリスト" path="/documentlist" exact children={<PrivateRoute path="/documentList" exact children={<DocumentListPage />} />} />
              <SideBarAndHeaderRoute pagename="ユーザーリスト" path="/userlist" exact children={<PrivateRoute path="/userlist" exact children={<UserList/>} />} />
              <SideBarRoute path="/calendar" exact children={<PrivateRoute path="/calendar" exact children={<CalendarPage/>} />} />
            </LoginRoute>
          </Switch>
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  );
}

const root = document.querySelector("#root");
ReactDOM.render(<App />, root);
