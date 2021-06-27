import React,{useState} from "react";
import axios from "axios";
import './approval.scss'

const Approval = () => {
  // const [a,setA] = useState = ([]);
  // const [state, setstate] = useState([])
  // const UserListGet = () => {
  //   const url=axios.get('https://webhok.net/reservation_system/api/users/')
  //   .then(url=> {
  //     // console.log(url);
  //     const data =url.data
  //     console.log(data)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  
  // }
  

  // UserListGet()

    return (
        <div>
          <table className="approvallistall">
            <tr>
              <td>日付</td><td>団体者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td>詳細</td>
            </tr>
          </table>
          {/* <p>{data.id}</p> */}
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>     
          <p>aaaaaaaaa</p>  
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          {/* <div>{UserListGet}</div> */}
        </div>
    )
}

export default Approval