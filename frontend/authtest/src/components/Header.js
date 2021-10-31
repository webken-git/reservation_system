import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'

/**
* @author
* @function Header
**/

const Header = (props) => {
  const cookies = new Cookies();
  const token = cookies.get('access_token');
  const logout = () => {
    // ログアウト処理を記述
    axios.post(`${process.env.REACT_APP_END_POINT}account/logout/`, {
      headers: {
        // 'Accept' : 'application/json',
        'Content-Type': "application/json",
        'Authorization': `JWT ${cookies.get('access_token')}`
      },
    })
    .then(res => {
      // Logout successful
      console.log(res);
      cookies.remove('access_token');
      cookies.remove('refresh_token');
      window.location.href = '/login';
    })
    .catch(err => {
      console.log(err);
    })
  }

  return(
    <div className="header">
      <div className="container">
        <Link to={token ? "/" : "/login"}>
          <div className="title">
            <h1>Auth Test</h1>
          </div>
        </Link>
        {token ?
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* tokenを利用してアカウント作成処理もできそう */}
            {/* <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link> */}
            <Link to="/login">
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </Link>
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default Header;
