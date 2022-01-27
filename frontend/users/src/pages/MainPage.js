import React, { useEffect } from "react";
import axios from "axios";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  document.title = "施設予約"; // ページタイトルを変更
  const unmountRef = useUnmountRef();
  const [placeListData, setPlaceListData] = useSafeState(unmountRef, []);
  const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
  // const [placeName, setPlaceName] = useState([]);
  const [divideFeeList, setDivideFeeList] = useSafeState(unmountRef, []);
  const [age, setAge] = useSafeState(unmountRef, []);
  const [, setTime] = useSafeState(unmountRef, []);
  const [, setUsage] = useSafeState(unmountRef, []);
  const [loading, setLoading] = useSafeState(unmountRef, true);
  const setTabState = useSetRecoilState(tabState);
  const tabStates = useRecoilValue(tabState);
  const CheckAuth = useRecoilValue(authState);
  const [value, setValue] = useSafeState(unmountRef, tabStates.placeId);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  //場所データ取得
  const GetPlaceList = () => {
    axios
      .get(ReservationUrls.PLACE)
      .then((response) => {
        const placeLists = response.data;
        setPlaceListData(placeLists);
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

  const divide = (place_id, pn, min, max) => {
    setTabState({
      placeId: place_id.toString(),
      placeName: pn,
      min: min,
      max: max,
    });
    const divide_feelist = feeListData.filter((fld) => {
      return fld.place === pn;
    });
    return setDivideFeeList(divide_feelist[0].data);
  };

  const tab = placeListData.map((place, p_id) => {
    return (
      <Tab
        key={p_id}
        label={place.name}
        value={place.id.toString()}
        onClick={() => divide(place.id, place.name, place.min, place.max)}
        tabindicatorprops={{
          style: {
            color: "#23ad39",
          },
        }}
      />
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
        <TabPanel key={p_id} value={place.id.toString()}>
          <Box className="list-wrapper">
            {/* <div className="scroll_box-wrapper"> */}
            {/* <div className="scroll_box"> */}
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <FeeList key={p_id} feelist={divideFeeList} age={age} />
            </details>
            {CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={placeListData} />
            )}
            {/* </div> */}
            {/* </div> */}
          </Box>
        </TabPanel>
      );
    } else if (timeId4.length === 0) {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="list-wrapper">
            {/* <div className="scroll_box-wrapper"> */}
            {/* <div className="scroll_box"> */}
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <GroupFeeList key={p_id} feelist={divideFeeList} age={age} />
            </details>
            {CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={placeListData} />
            )}
            {/* </div> */}
            {/* </div> */}
          </div>
        </TabPanel>
      );
    } else {
      return (
        <TabPanel key={p_id} value={place.id.toString()}>
          <div className="list-wrapper">
            {/* <div className="scroll_box-wrapper"> */}
            {/* <div className="scroll_box"> */}
            <details open={true}>
              <summary>カレンダー</summary>
              <Calendar />
            </details>
            <details>
              <summary>料金一覧</summary>
              <CurlingFeeList key={p_id} feelist={divideFeeList} age={age} />
            </details>
            {CheckAuth.isAuthenticated === true && (
              <ReservationForm placeLists={placeListData} />
            )}
            {/* </div> */}
            {/* </div> */}
          </div>
        </TabPanel>
      );
    }
  });

  return (
    <>
      <TabContext className="main-page" value={value}>
        <TabList
          className="main-page__tablist"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: { backgroundColor: "#23ad39" },
          }}
        >
          {tab}
        </TabList>
        {tabitems}
      </TabContext>
      {loading && <Loading />}
    </>
  );
};

export default MainPage;
