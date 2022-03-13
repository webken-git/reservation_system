import React from "react";
import { Route } from "react-router-dom";
import Header from "../header/Header";
import "./headerroute.scss";
import Footer from "../footer/Footer";

// サイドバーとヘッダーを表示するページに使用するルーティング

/* <HeaderRoute/>の使い方
<HeaderRoute pagename="ページの名前(必要なければかかなくてよい)" path="/遷移したいページのファイル名" exact children={<PrivateRoute path="/遷移したいページのファイル名" exact children={<ページ名/>} />} /> */

const HeaderRoute = (props) => {
  const children = props.children;
  return (
    <Route
      exact
      path={children.props.path}
      children={
        <>
          <div className="allbox">
            <Header />
            <main>
              {children}
              {/* ここにページを表示する */}
            </main>
            <Footer />
          </div>
        </>
      }
    />
  );
};

HeaderRoute.defaultProps = {};

export default HeaderRoute;
