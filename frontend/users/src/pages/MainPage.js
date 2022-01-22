import React, { useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { useSetRecoilState, useRecoilValue } from "recoil";
import tabState from "../recoil/tab";
import authState from "../recoil/auth";
import { ReservationUrls } from "../utils/reservationUrls";
import useSafeState from "../hooks/useSafeState";
import useUnmountRef from "../hooks/useUnmountRef";
import Calendar from "../components/calendar/Calendar.js";
import FeeList from "../components/feelist/FeeList";
import GroupFeeList from "../components/feelist/GroupFeeList";
import CurlingFeeList from "../components/feelist/CurlingFeeList";
import { ReservationForm } from "../components/reservationform/ReservationForm";
import Loading from "../components/loading/Loading";
import "./mainpage.scss";

const MainPage = () => {
  const unmountRef = useUnmountRef();
  const [placeListData, setPlaceListData] = useSafeState(unmountRef, []);
  const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
  const [divideFeeList, setDivideFeeList] = useSafeState(unmountRef, []);
  // const [id, setID] = useSafeState(unmountRef, []);
  const [age, setAge] = useSafeState(unmountRef, []);
  const [, setTime] = useSafeState(unmountRef, []);
  const [, setUsage] = useSafeState(unmountRef, []);
  const [loading, setLoading] = useSafeState(unmountRef, true);
  const setTabState = useSetRecoilState(tabState);
  const tabStates = useRecoilValue(tabState);
  const CheckAuth = useRecoilValue(authState);
  //場所データ取得
  const GetPlaceList = () => {
    axios
      .get(ReservationUrls.PLACE)
      .then((response) => {
        const placeLists = response.data;
        setPlaceListData(placeLists);
        // setPlaceName(placelists[0].name);  //最初の場所名をセット
        // setID(placeLists[0].id);
      })
      .catch((error) => {});
  };

  //料金表データ取得
  const GetFeeList = () => {
    axios
      .get(ReservationUrls.FACILITY_FEE)
      .then((response) => {
        const feelists = response.data;
        setFeeListData(feelists);
        setDivideFeeList(feelists[1].data);
      })
      .catch((error) => {});
  };

  //年齢データの取得
  const GetAge = () => {
    axios.get(ReservationUrls.AGE).then((response) => {
      const ages = response.data;
      setAge(ages);
    });
  };

  //時間区分の取得
  const GetTime = () => {
    axios
      .get(ReservationUrls.TIME)
      .then((response) => {
        const times = response.data;
        setTime(times);
      })
      .catch((error) => {});
  };

  const GetUsage = () => {
    axios
      .get(ReservationUrls.USAGE)
      .then((response) => {
        const usages = response.data;
        setUsage(usages);
        // console.log(usages)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetPlaceList();
    GetFeeList();
    GetAge();
    GetTime();
    GetUsage();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const divide = (pn, place_id) => {
    setTabState(place_id);
    const divide_feelist = feeListData.filter((fld) => {
      return fld.place === pn;
    });
    return setDivideFeeList(divide_feelist[0].data);
  };
  const tab = placeListData.map((place, p_id) => {
    return (
      <Tab key={p_id} onClick={() => divide(place.name, place.id)}>
        {place.name}
      </Tab>
    );
  });

  const tabitems = placeListData.map((place, p_id) => {
    const isGroup = divideFeeList.filter((fld) => {
      return fld.place.name === place.name && fld.is_group === true;
    });
    const timeId4 = divideFeeList.filter((fld) => {
      return (
        fld.place.name === place.name &&
        fld.is_group === true &&
        fld.time.name.indexOf("１時間につき") !== -1
      );
    });
    if (isGroup.length === 0) {
      return (
        <TabPanel key={p_id}>
          <FeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      );
    } else if (timeId4.length === 0) {
      return (
        <TabPanel key={p_id}>
          <GroupFeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      );
    } else {
      return (
        <TabPanel key={p_id}>
          <CurlingFeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      );
    }
  });

  return (
    <Tabs>
      <TabList>{tab}</TabList>
      <div className="list-wrapper">
        <div className="scroll_box-wrapper">
          <div className="scroll_box">
            <details open={true}>
              <summary>カレンダー</summary>
              <div className="detail-content">
                <Calendar />
              </div>
            </details>
            <details>
              <summary>料金一覧</summary>
              {tabitems}
            </details>
            {CheckAuth.isAuthenticated === true && <ReservationForm />}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </Tabs>
  );
};

export default MainPage;
