import React from "react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginRoute from "./components/rooter/LoginRoute";

import { LoginPage } from "./pages/home/LoginPage";
import Registration from "./components/auth/Registration";
import { TopPage } from "./pages/home/TopPage";
import { AccountPage } from "./pages/home/AccountPage";
import { AccountDeletePage } from "./pages/home/AccountDeletePage";
import { PassWordChangePage } from "./pages/home/PasswordChangePage";
import { VerifyEmailPage } from "./pages/home/VerifyEmailPage";
import { PasswordResetPage } from "./pages/home/PasswordResetPage";
import { ApprovalList } from "./pages/home/ApprovalList";
import { UnapprovalList } from "./pages/home/UnapprovalList";
import { DisapprovalList } from "./pages/home/DisapprovalList";
import { CancelList } from "./pages/home/CancelList";
import { UserList } from "./pages/home/UserList";
import { CalendarPage } from "./pages/home/CalendarPage";
import { DocumentListPage } from "./pages/home/DocumentListPage";
import "./index.scss";
import GetDate from "./components/toppage/GetDate";

import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHEaderRouter";
import SideBarRoute from "./components/rooter/SideBarRoute";

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
          <LoginRoute>
            <Route path="/registration" exact children={<Registration />} />
            <SideBarAndHeaderRoute
              pagename={<GetDate />}
              path="/"
              exact
              children={<Route path="/" exact children={<TopPage />} />}
            />
            <Route
              path="/account"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <SideBarAndHeaderRoute
                      path={`${url}/`}
                      pagename={"アカウント"}
                      exact
                      children={<AccountPage />}
                    />
                    {/* <HeaderRoute path={`${url}/email`} exact children={<MailAddressChange />} /> */}
                    <SideBarAndHeaderRoute
                      path={`${url}/password`}
                      pagename={"アカウント"}
                      exact
                      children={<PassWordChangePage />}
                    />
                    <SideBarAndHeaderRoute
                      path={`${url}/password/verify`}
                      pagename={"アカウント"}
                      exact
                      children={<VerifyEmailPage />}
                    />
                    <Route path={`${url}/password/reset/:uid/:token`}>
                      <SideBarAndHeaderRoute
                        pagename={"アカウント"}
                        exact
                        children={<PasswordResetPage />}
                      />
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
            <SideBarAndHeaderRoute
              pagename="承認リスト"
              path="/approvalList"
              exact
              children={
                <Route path="/approvalList" exact children={<ApprovalList />} />
              }
            />
            <SideBarAndHeaderRoute
              pagename="不承認リスト"
              path="/disapprovalList"
              exact
              children={
                <Route
                  path="/disapprovalList"
                  exact
                  children={<DisapprovalList />}
                />
              }
            />
            <SideBarAndHeaderRoute
              pagename="未承認リスト"
              path="/unapprovalList"
              exact
              children={
                <Route
                  path="/unapprovalList"
                  exact
                  children={<UnapprovalList />}
                />
              }
            />
            <SideBarAndHeaderRoute
              pagename="キャンセルリスト"
              path="/cancellist"
              exact
              children={
                <Route path="/cancelList" exact children={<CancelList />} />
              }
            />
            <SideBarAndHeaderRoute
              pagename="ドキュメントリスト"
              path="/documentlist"
              exact
              children={
                <Route
                  path="/documentList"
                  exact
                  children={<DocumentListPage />}
                />
              }
            />
            <SideBarAndHeaderRoute
              pagename="ユーザーリスト"
              path="/userlist"
              exact
              children={
                <Route path="/userlist" exact children={<UserList />} />
              }
            />
            <SideBarRoute
              path="/calendar"
              exact
              children={
                <Route path="/calendar" exact children={<CalendarPage />} />
              }
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
