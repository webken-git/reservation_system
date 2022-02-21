import React from "react";
import { TabPanel } from "@mui/lab";
import Calendar from "../calendar/Calendar.js";
import FeeList from "../feelist/FeeList";
import GroupFeeList from "../feelist/GroupFeeList";
import CurlingFeeList from "../feelist/CurlingFeeList";
import { ReservationForm } from "../reservationform/ReservationForm";

const TabContent = (props) => {
  return props.place.map((place, p_id) => {
    const isGroup = props.facilityFee.filter((fld) => {
      return fld.place.name === place.name && fld.is_group === true;
    });
    const timeId4 = props.facilityFee.filter((fld) => {
      return (
        fld.place.name === place.name &&
        fld.is_group === true &&
        fld.time.name.indexOf("１時間につき") !== -1
      );
    });
    if (isGroup.length === 0) {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="tab-content">
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar placeId={place.id.toString()}/>
            </details>
            <details>
              <summary>料金一覧</summary>
              <FeeList key={p_id} feelist={props.facilityFee} age={props.age} />
            </details>
            {props.CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={place} />
            )}
          </div>
        </TabPanel>
      );
    } else if (timeId4.length === 0) {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="tab-content">
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar placeId={place.id.toString()}/>
            </details>
            <details>
              <summary>料金一覧</summary>
              <GroupFeeList
                key={p_id}
                feelist={props.facilityFee}
                age={props.age}
              />
            </details>
            {props.CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={place} />
            )}
          </div>
        </TabPanel>
      );
    } else {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="tab-content">
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar placeId={place.id.toString()}/>
            </details>
            <details>
              <summary>料金一覧</summary>
              <CurlingFeeList
                key={p_id}
                feelist={props.facilityFee}
                age={props.age}
              />
            </details>
            {props.CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={place} />
            )}
          </div>
        </TabPanel>
      );
    }
  });
};

export default TabContent;
