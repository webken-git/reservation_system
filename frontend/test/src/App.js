import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import MainContent from './MainContent';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderComponent from './components/Header';
import Auth from './components/Auth';
import Home from './pages/Home';
// import Header from './components/Header';
import Detail from './pages/Detail';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';
import { CookiesProvider, withCookies } from 'react-cookie';

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="app">
            <HeaderComponent />
            <MainContent />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

// function App() {
//   return (
//     <Router>
//       {console.log(process.env)}
//       <div className="App">
//         <CookiesProvider>
//           <Header />
//           <LoggedIn>
//             {/* LoggedIn Only */}
//             <Route exact path="/" component={Home} />
//             <Route exact path="/:userId" component={Detail} />
//           </LoggedIn>
//           <LoggedOut>
//             {/* LoggedOut Only */}
//             <Route exact path="/login" component={Auth} />
//           </LoggedOut>
//         </CookiesProvider>
//       </div>
//     </Router>
//   );
// }

// export default App;
