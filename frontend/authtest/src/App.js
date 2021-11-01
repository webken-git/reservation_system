import React from 'react';
import Auth from './components/Auth';
import Home from './pages/Home';
import Header from './components/Header';
import Detail from './pages/Detail';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';

function App() {
  return (
    <Router>
      {console.log(process.env)}
      <div className="App">
        <CookiesProvider>
          <Header />
          <LoggedIn>
            {/* LoggedIn Only */}
            <Route exact path="/" component={Home} />
            <Route exact path="/:userId" component={Detail} />
          </LoggedIn>
          <LoggedOut>
            {/* LoggedOut Only */}
            <Route exact path="/login" component={Auth} />
          </LoggedOut>
        </CookiesProvider>
      </div>
    </Router>
  );
}

export default withCookies(App);
