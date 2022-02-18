// 承認リスト全体のコンポーネント
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApprovalTable from "./ApprovalTable";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./approval.scss";
import dayjs from "dayjs";
import DocumentLayout from "../document/DocumentLayout";
import CsvExportLayout from "../csvexport/CsvExportLayout";
import ReservationDeleteLayout from "../reservationdelete/ReservationDeleteLayout";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";
import {
  useSortedPlaces,
  useSortedStartDate,
  useSortedGroupName,
  useSortedLeaderName,
} from "../../hooks/useSortData";
import useSearch from "../../hooks/useFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const ApprovalListBody = () => {
  const [ApprovalListData, setApprovalListData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [sortStartDate] = useSortedStartDate(allData, setApprovalListData);
  const [sortGroupName] = useSortedGroupName(
    ApprovalListData,
    setApprovalListData
  );
  const [sortLeaderName] = useSortedLeaderName(
    ApprovalListData,
    setApprovalListData
  );
  const [sortPlace] = useSortedPlaces(ApprovalListData, setApprovalListData);
  const [search] = useSearch(allData, setApprovalListData);

  const getDefferdPayment = useFetch({
    url: `${ReservationUrls.DEFFERD_PAYMENT}`,
  });
  const getPlace = useFetch({
    url: `${ReservationUrls.PLACE}`,
  });

  // 承認リストのデータをAPIから受け取るaxios
  const GetApporovalList = () => {
    // console.log(dateFilter);
    axios
      .get(
        `${process.env.REACT_APP_API}/api/reservations/9999-01-01T00:00/approval-applications/?approval=2`
      )
      .then((response) => {
        const data = response.data;
        // 承認リストのデータをuseStateに入れている
        setApprovalListData(data);
        setAllData(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetApporovalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Table =
    // データをmapで回している
    ApprovalListData.map((val, val_index) => {
      let defferdPayment = getDefferdPayment.filter(
        (item) => item.reservation === val.reservation.id
      );
      return (
        // 承認リストの中のコンポーネント
        <ApprovalTable
          // propsでApprovalTable.jsに承認リストのデータを送っている
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
          place_min={val.reservation.place.min}
          place_max={val.reservation.place.max}
          place_number={val.reservation.place_number}
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
    <>
      <div className="functions">
        <span className="space">
          <DocumentLayout />
        </span>
        <span className="space">
          <CsvExportLayout />
        </span>
        <span className="space">
          <ReservationDeleteLayout />
        </span>
      </div>
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          {/* 承認リスト全体コンポーネント */}
          <table className="list-body">
            <thead>
              <tr>
                <td></td>
                <td>
                  <input
                    type="date"
                    className="datefilter"
                    onChange={(e) => search("start", e.target.value)}
                  />
                </td>
                <td></td>
                <td></td>
                <td>
                  <select
                    className="placefilter"
                    defaultValue=""
                    onChange={(e) => search("place", e.target.value)}
                  >
                    <option value="">全体</option>
                    {getPlace &&
                      getPlace.map((val, val_index) => {
                        return (
                          <option value={val.id} key={val_index}>
                            {val.name}
                          </option>
                        );
                      })}
                  </select>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th></th>
                <th className="table-sort" onClick={sortStartDate}>
                  利用開始日時
                  <FontAwesomeIcon icon={faSort} className="sort-icon" />
                </th>
                <th className="table-sort" onClick={sortGroupName}>
                  団体者名
                  <FontAwesomeIcon icon={faSort} className="sort-icon" />
                </th>
                <th className="table-sort" onClick={sortLeaderName}>
                  連絡者名
                  <FontAwesomeIcon icon={faSort} className="sort-icon" />
                </th>
                <th className="table-sort" onClick={sortPlace}>
                  場所
                  <FontAwesomeIcon icon={faSort} className="sort-icon" />
                </th>
                <th>後納申請</th>
                <th>操作</th>
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>{Table}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApprovalListBody;
