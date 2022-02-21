import React from "react";
import axios from "axios";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HeaderRoute from "./components/rooter/HeaderRoute";
import LoginRoute from "./components/rooter/LoginRoute";
import { AccountPage } from "./pages/AccountPage";
import { EmailChangePage } from "./pages/EmailChangePage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { PassWordChangePage } from "./pages/PasswordChangePage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReservationDetailPage } from "./pages/ReservationDetailPage";
import { ReservationCancelPage } from "./pages/ReservationCancelPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { AccountDeletePage } from "./pages/AccountDeletePage";
import { ReservationStepPage } from "./pages/ReservationStepPage";
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
  document.title = "施設予約"; // ページタイトルを変更
  return (
    <BrowserRouter>
      <Switch>
        <HeaderRoute path="/" exact children={<MainPage />} />
        <Route path="/login" exact children={<LoginPage />} />
        <Route path="/registration" exact children={<RegistrationPage />} />
        <Route
          path="/password"
          render={({ match: { url } }) => (
            <>
              <Switch>
                <Route path={`${url}/`} exact children={<VerifyEmailPage />} />
                <Route
                  path={`${url}/reset/:uid/:token`}
                  exact
                  children={<PasswordResetPage />}
                />
              </Switch>
            </>
          )}
        />
        <HeaderRoute path="/500" children={<InternalServer />} />
        <LoginRoute>
          <Switch>
            <HeaderRoute
              path="/reserve"
              exact
              children={<ReservationStepPage />}
            />
            <Route
              path="/account"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <HeaderRoute
                      path={`${url}/`}
                      exact
                      children={<AccountPage />}
                    />
                    <HeaderRoute
                      path={`${url}/email`}
                      exact
                      children={<EmailChangePage />}
                    />
                    <HeaderRoute
                      path={`${url}/password`}
                      exact
                      children={<PassWordChangePage />}
                    />
                    <HeaderRoute
                      path={`${url}/password/verify`}
                      exact
                      children={<VerifyEmailPage />}
                    />
                    <Route path={`${url}/password/reset/:uid/:token`}>
                      <HeaderRoute exact children={<PasswordResetPage />} />
                    </Route>
                    <HeaderRoute
                      path={`${url}/delete`}
                      exact
                      children={<AccountDeletePage />}
                    />
                    <HeaderRoute children={<NotFound />} />
                  </Switch>
                </>
              )}
            />
            <Route
              path="/history"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <HeaderRoute
                      path={`${url}/`}
                      exact
                      children={<HistoryPage />}
                    />
                    <Route path={`${url}/cancel/:id/:reservationId`}>
                      <HeaderRoute exact children={<ReservationCancelPage />} />
                    </Route>
                    <Route path={`${url}/:id`}>
                      <HeaderRoute exact children={<ReservationDetailPage />} />
                    </Route>
                  </Switch>
                </>
              )}
            />
            <HeaderRoute children={<NotFound />} />
          </Switch>
        </LoginRoute>
      </Switch>
    </BrowserRouter>
  );
}

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

export default App;
