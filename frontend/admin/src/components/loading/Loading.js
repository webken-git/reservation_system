import React from "react";
import "./loading.scss"

/*
  Loading.jsについて：
  ・API通信中など、ページ遷移時に表示するローディング画面です。
*/
/*
  使用方法：
  １．Loadingコンポーネントをimport
  ２．const [loading, setLoading] = useState(true); の様に、stateを定義
  ３．API通信が終わったらsetLoading(false);を実行
  ４．return (
    loading ? <Loading /> : "API通信完了後に表示するコンテンツ"
  )
*/

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading"></div>
        </div>
    )
}

export default Loading;
