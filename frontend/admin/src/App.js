import React from "react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginRoute from "./components/rooter/LoginRoute";
import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import SideBarRoute from "./components/rooter/SideBarRoute";

import { LoginPage } from "./pages/home/LoginPage";
import Registration from "./components/auth/Registration";
import { TopPage } from "./pages/home/TopPage";
import { AccountPage } from "./pages/home/AccountPage";
import { EmailChangePage } from "./pages/home/EmailChangePage";
import { AccountDeletePage } from "./pages/home/AccountDeletePage";
import { PassWordChangePage } from "./pages/home/PasswordChangePage";
import { VerifyEmailPage } from "./pages/home/VerifyEmailPage";
import { PasswordResetPage } from "./pages/home/PasswordResetPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";
import { DataList } from "./pages/home/DataList"
import { CalendarPage } from "./pages/home/CalendarPage";
import { DocumentListPage } from "./pages/home/DocumentListPage";
import { ApprovalInfoPage } from "./pages/home/ApprovalInfoPage";
import "./index.scss"
import GetDate from "./components/toppage/GetDate"

// var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
};

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Switch>
          <Route path="/login" exact children={<LoginPage />} />
          <Route path="/password"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <Route path={`${url}/`} exact children={<VerifyEmailPage />} />
                    <Route path={`${url}/reset/:uid/:token`} exact children={<PasswordResetPage />} />
                  </Switch>
                </>
            )}
          />
          <LoginRoute>
            <Route path="/registration" exact children={<Registration />} />
            <SideBarAndHeaderRoute pagename={<GetDate />} path="/" exact children={<Route path="/" exact children={<TopPage />} />} />
            {/* ネストされたルーティングを定義 */}
            <Route path="/account"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <SideBarAndHeaderRoute path={`${url}/`} pagename={"アカウント"} exact children={<AccountPage />} />
                    <SideBarAndHeaderRoute path={`${url}/email`} exact children={<EmailChangePage />} />
                    <SideBarAndHeaderRoute path={`${url}/password`} pagename={"アカウント"} exact children={<PassWordChangePage />} />
                    <SideBarAndHeaderRoute path={`${url}/password/verify`} pagename={"アカウント"} exact children={<VerifyEmailPage />} />
                    <Route path={`${url}/password/reset/:uid/:token`}>
                      <SideBarAndHeaderRoute pagename={"アカウント"} exact children={<PasswordResetPage />} />
                    </Route>
                    <SideBarAndHeaderRoute
                      path={`${url}/delete`}
                      pagename={"アカウント"}
                      exact
                      children={<AccountDeletePage />}
                    />
                  </Switch>
                </>
              )}
           />
            <SideBarAndHeaderRoute pagename="承認リスト" exact children={<Route path="/approval-list" exact children={<ApprovalList/>} />} />
            <SideBarAndHeaderRoute pagename="不承認リスト" exact children={<Route path="/disapproval-list" exact children={<DisapprovalList/>} />} />
            <SideBarAndHeaderRoute pagename="未承認リスト" exact children={<Route path="/unapproval-list" exact children={<UnapprovalList/>} />} />
            <SideBarAndHeaderRoute pagename="キャンセルリスト" exact children={<Route path="/cancel-list" exact children={<CancelList />} />} />
            <SideBarAndHeaderRoute pagename="ドキュメントリスト" exact children={<Route path="/document-list" exact children={<DocumentListPage />} />} />
            <SideBarAndHeaderRoute pagename="ユーザーリスト" exact children={<Route path="/user-list" exact children={<UserList />} />} />
            <SideBarAndHeaderRoute pagename="データリスト" exact children={<Route path="/data-list" exact children={<DataList />} />} />
            <Route path="/calendar"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <SideBarRoute path={`${url}/`} pagename={"カレンダー"} exact children={<CalendarPage />} />
                    <Route path={`${url}/approval-info/:id`}>
                      <SideBarAndHeaderRoute pagename={"予約詳細"} exact children={<ApprovalInfoPage />} />
                    </Route>
                  </Switch>
                </>
              )}
           />
          </LoginRoute>
        </Switch>
      </CookiesProvider>
    </BrowserRouter>
  );
}

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

export default App;
