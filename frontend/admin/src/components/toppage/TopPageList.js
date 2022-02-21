import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import "./toppage.scss";
import dayjs from "dayjs";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";

const TopPageList = () => {
  const [TodayList, setTodayList] = useState([]);
  const getDefferdPayment = useFetch({
    url: `${ReservationUrls.DEFFERD_PAYMENT}`,
  });
  const GetTodayList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=2`
      )
      .then((response) => {
        const data = response.data;
        var today = dayjs().format("YYYY-MM-DD");
        // var today = dayjs().add(1, 'y').add(19, 'd').format('YYYY-MM-DD')
        // var today = dayjs().add(1, 'd').format('YYYY-MM-DD')
        // console.log(today)
        // let i = 0
        // console.log(r_start_format)
        // console.log(r_start_format === today)

        var todaydata = [];

        for (let i = 0; data.length > i; i++) {
          var r_start = data[i]["reservation"]["start"];
          var r_start_format = dayjs(r_start).format("YYYY-MM-DD");
          if (r_start_format === today) {
            todaydata.push(data[i]);
            setTodayList(todaydata);
          }
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetTodayList();
  }, []);

  const TodayTable = TodayList.map((val, val_index) => {
    let defferdPayment = getDefferdPayment.filter(
      (item) => item.reservation === val.reservation.id
    );
    return (
      <Table
        key={val_index}
        id={val.id}
        reservation_id={val.reservation.id}
        // dayjsのformatで〇/〇と日付を表示できるようにしている
        date={dayjs(val.reservation.start).format("YYYY-MM-DD")}
        group_name={val.reservation.group_name}
        reader_name={val.reservation.reader_name}
        contact_name={val.reservation.contact_name}
        tel={val.reservation.tel}
        address={val.reservation.address}
        purpose={val.reservation.purpose}
        start_day={dayjs(val.reservation.start).format("YYYY-MM-DD")}
        start_time={dayjs(val.reservation.start).format("HH:mm")}
        end_day={dayjs(val.reservation.end).format("YYYY-MM-DD")}
        end_time={dayjs(val.reservation.end).format("HH:mm")}
        organizer_number={val.reservation.organizer_number}
        participant_number={val.reservation.participant_number}
        place={val.reservation.place.name}
        admission_fee={val.reservation.admission_fee}
        equipment={val.reservation.equipment}
        special_equipment={val.reservation.special_equipment}
        email={val.reservation.user.email}
        approval={val.approval.name}
        usage_fee={val.usage_fee}
        electric_fee={val.electric_fee}
        heating_fee={val.heating_fee}
        defferd_payment={defferdPayment}
      />
    );
  });

  return (
    <div className="scroll_box-wrapper">
      <div className="scroll_box">
        <table className="list-body">
          <thead>
            <tr>
              <th>日付</th>
              <th>団体者名</th>
              <th>連絡者名</th>
              <th>時間</th>
              <th>場所</th>
              <th>後納申請</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>{TodayTable}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPageList;
