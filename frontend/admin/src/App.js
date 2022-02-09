import React from "react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginRoute from "./components/rooter/LoginRoute";
import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import SideBarRoute from "./components/rooter/SideBarRoute";

import { LoginPage } from "./pages/LoginPage";
import Registration from "./components/auth/Registration";
import { TopPage } from "./pages/TopPage";
import { AccountPage } from "./pages/AccountPage";
import { EmailChangePage } from "./pages/EmailChangePage";
import { AccountDeletePage } from "./pages/AccountDeletePage";
import { PassWordChangePage } from "./pages/PasswordChangePage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { ApprovalList } from "./pages/ApprovalList";
import { UnapprovalList } from "./pages/UnapprovalList";
import { DisapprovalList } from "./pages/DisapprovalList";
import { CancelList } from "./pages/CancelList";
import { UserList } from "./pages/UserList";
import { DataList } from "./pages/DataList"
import { CalendarPage } from "./pages/CalendarPage";
import { DocumentListPage } from "./pages/DocumentListPage";
import { ApprovalInfoPage } from "./pages/ApprovalInfoPage";
import { MailPage } from "./pages/MailPage";
import { SendEmailPage } from "./pages/SendEmailPage";
import "./index.scss"
import GetDate from "./components/toppage/GetDate"

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie('csrftoken');
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRFToken": csrftoken,
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
            <Route path="/mail"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <SideBarAndHeaderRoute path={`${url}/`} pagename={"メール"} exact children={<MailPage />} />
                    <Route path={`${url}/send`}>
                      <SideBarAndHeaderRoute pagename={"メール一斉送信"} exact children={<SendEmailPage />} />
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
