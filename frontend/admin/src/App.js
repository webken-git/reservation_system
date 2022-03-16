import React from "react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginRoute from "./components/rooter/LoginRoute";
import SideBarAndHeaderRoute from "./components/rooter/SideBarAndHeaderRoute";
import SideBarRoute from "./components/rooter/SideBarRoute";

import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RegistrationCompletePage } from "./pages/RegistrationCompletePage";
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
import { DataList } from "./pages/DataList";
import { CalendarPage } from "./pages/CalendarPage";
import { DocumentListPage } from "./pages/DocumentListPage";
import { ApprovalInfoPage } from "./pages/ApprovalInfoPage";
import { MailPage } from "./pages/MailPage";
import { SendEmailPage } from "./pages/SendEmailPage";
import { ReservePage } from "./pages/ReservePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ReserveCompletePage } from "./pages/ReserveCompletePage";
import GetDate from "./components/toppage/GetDate";
import NotFound from "./pages/error/NotFound";
import InternalServer from "./pages/error/InternalServer";
import "./index.scss";

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

var csrftoken = getCookie("csrftoken");
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
          <Route
            path="/password"
            render={({ match: { url } }) => (
              <>
                <Switch>
                  <Route
                    path={`${url}/`}
                    exact
                    children={<VerifyEmailPage />}
                  />
                  <Route
                    path={`${url}/reset/:uid/:token`}
                    exact
                    children={<PasswordResetPage />}
                  />
                  <Route component={NotFound} />
                </Switch>
              </>
            )}
          />
          <Route path="/500" children={<InternalServer />} />
          <LoginRoute>
            <Switch>
              <SideBarAndHeaderRoute
                pagename={<GetDate />}
                path="/"
                exact
                children={<Route path="/" exact children={<TopPage />} />}
              />
              <Route
                path="/registration"
                render={({ match: { url } }) => (
                  <>
                    <Switch>
                      <Route
                        path={`${url}/`}
                        exact
                        children={<RegistrationPage />}
                      />
                      <Route
                        path={`${url}/complete/:key`}
                        children={<RegistrationCompletePage />}
                      />
                      <Route children={<NotFound />} />
                    </Switch>
                  </>
                )}
              />
              {/* ネストされたルーティングを定義 */}
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
                      <SideBarAndHeaderRoute
                        path={`${url}/email`}
                        exact
                        children={<EmailChangePage />}
                      />
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
                      <Route component={NotFound} />
                    </Switch>
                  </>
                )}
              />
              <SideBarAndHeaderRoute
                path="/approval-list"
                pagename="承認リスト"
                exact
                children={<ApprovalList />}
              />
              <SideBarAndHeaderRoute
                path="/disapproval-list"
                pagename="不承認リスト"
                exact
                children={<DisapprovalList />}
              />
              <SideBarAndHeaderRoute
                path="/unapproval-list"
                pagename="未承認リスト"
                exact
                children={<UnapprovalList />}
              />
              <SideBarAndHeaderRoute
                path="/cancel-list"
                pagename="キャンセルリスト"
                exact
                children={<CancelList />}
              />
              <SideBarAndHeaderRoute
                path="/document-list"
                pagename="ドキュメントリスト"
                exact
                children={<DocumentListPage />}
              />
              <SideBarAndHeaderRoute
                path="/user-list"
                pagename="ユーザーリスト"
                exact
                children={<UserList />}
              />
              <SideBarAndHeaderRoute
                path="/data-list"
                pagename="データリスト"
                exact
                children={<DataList />}
              />
              <Route
                path="/calendar"
                render={({ match: { url } }) => (
                  <>
                    <Switch>
                      <SideBarRoute
                        path={`${url}/`}
                        pagename={"カレンダー"}
                        exact
                        children={<CalendarPage />}
                      />
                      <Route path={`${url}/approval-info/:id`}>
                        <SideBarAndHeaderRoute
                          pagename={"予約詳細"}
                          exact
                          children={<ApprovalInfoPage />}
                        />
                      </Route>
                      <Route component={NotFound} />
                    </Switch>
                  </>
                )}
              />
              <Route
                path="/mail"
                render={({ match: { url } }) => (
                  <>
                    <Switch>
                      <SideBarAndHeaderRoute
                        path={`${url}/`}
                        pagename={"メール"}
                        exact
                        children={<MailPage />}
                      />
                      <Route path={`${url}/send`}>
                        <SideBarAndHeaderRoute
                          pagename={"メール一斉送信"}
                          exact
                          children={<SendEmailPage />}
                        />
                      </Route>
                      <Route component={NotFound} />
                    </Switch>
                  </>
                )}
              />
              <Route
                path="/reserve"
                render={({ match: { url } }) => (
                  <>
                    <Switch>
                      <SideBarAndHeaderRoute
                        path={`${url}/`}
                        pagename={"予約"}
                        exact
                        children={<ReservePage />}
                      />
                      <SideBarAndHeaderRoute
                        path={`${url}/checkout`}
                        pagename={"予約"}
                        exact
                        children={<CheckoutPage />}
                      />
                      <SideBarAndHeaderRoute
                        path={`${url}/complete`}
                        pagename={"予約"}
                        exact
                        children={<ReserveCompletePage />}
                      />
                      <Route component={NotFound} />
                    </Switch>
                  </>
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </LoginRoute>
        </Switch>
      </CookiesProvider>
    </BrowserRouter>
  );
}

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

export default App;
