import React,{ useState, useEffect } from "react";
import axios from "axios";

const CancelListBody = () => {
  const [CancelListId, setCancelListId] = useState([]);
  const GetCancelList = () => {
    axios.get('https://webhok.net/reservation_system/api/reservations/9999-01-01T00:00/approval-applications/?approval=2')
    .then(response => {
      const data = response.data;
      // console.log(data.[0].reservation);
      setCancelListId(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    GetCancelList();
  }, [])

    return (
        <div>
          <table className="userlistall">
            <tr>
            <td>日付</td><td>団体者名</td><td>個人/団体</td><td>時間</td><td>人数</td><td>場所</td><td>詳細</td>
            </tr>
          </table>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>     
          <p>aaaaaaaaa</p>  
          <p>aaaaaaaaa</p>
          <p>aaaaaaaaa</p>
          {CancelListId.map(val =>(
            <p>{val.id} {val.place}</p>
          ))}
        </div>
    )
}

export default CancelListBody