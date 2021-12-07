import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import HeaderRoute from './components/rooter/HeaderRoute';
import LoginRoute from './components/rooter/LoginRoute';
import { MyPage } from './pages/MyPage';
import { MailAddressChange } from './pages/MailAddressChange';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { PasswordResetPage } from './pages/PasswordResetPage';
import { LoginPage } from './pages/LoginPage';
import Registration from './components/auth/Registration';
import { AccountDeletePage } from './pages/AccountDeletePage';

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Switch>
          <Route path="/login" exact children={<LoginPage />} />
          <Route path="/registration" exact children={<Registration />} />
          {/* <HeaderRoute path="/sample" exact children={<Sample/>} /> */}
          <HeaderRoute path="/" exact children={<MainPage />} />
          <LoginRoute>
            <Route path="/account"
              render={({ match: { url } }) => (
                <>
                  <Switch>
                    <HeaderRoute path={`${url}/`} exact children={<MyPage />} />
                    <HeaderRoute path={`${url}/email`} exact children={<MailAddressChange />} />
                    <HeaderRoute path={`${url}/password`} exact children={<VerifyEmailPage />} />
                    <Route path={`${url}/password/reset/:uid/:token`}>
                      <HeaderRoute exact children={<PasswordResetPage />} />
                    </Route>
                    <HeaderRoute path={`${url}/delete`} exact children={<AccountDeletePage />} />
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

export default App
