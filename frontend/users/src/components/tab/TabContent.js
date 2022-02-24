import React, { useEffect } from "react";
import { TabPanel } from "@mui/lab";
import Calendar from "../calendar/Calendar.js";
import FeeList from "../feelist/FeeList";
import GroupFeeList from "../feelist/GroupFeeList";
import CurlingFeeList from "../feelist/CurlingFeeList";
import { ReservationForm } from "../reserve/ReservationForm";
import { createAppSetting } from "../account/AppSettings.js";
import { ReservationUrls } from "../../utils/reservationUrls.js";

const TabContent = (props) => {
  useEffect(() => {
    if (props.CheckAuth.isAuthenticated === true) {
      createAppSetting(props.CheckAuth.userId, ReservationUrls.APP_SETTING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.place.map((place, p_id) => {
    const isGroup = props.facilityFee.filter((fld) => {
      return fld.place.name === place.name && fld.is_group === true;
    });

    if (isGroup.length === 0) {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="tab-content">
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <FeeList
                key={p_id}
                feelist={props.facilityFee}
                age={props.age}
                time={props.time}
              />
            </details>
            {props.CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={place} />
            )}
          </div>
        </TabPanel>
      );
    } else if (place.max > 1) {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="tab-content">
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <CurlingFeeList
                key={p_id}
                feelist={props.facilityFee}
                age={props.age}
                time={props.time}
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
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <GroupFeeList
                key={p_id}
                feelist={props.facilityFee}
                age={props.age}
                time={props.time}
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
