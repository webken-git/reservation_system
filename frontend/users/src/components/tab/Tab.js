import React, { useEffect } from "react";
import axios from "axios";
import { Tab, styled } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useSetRecoilState, useRecoilValue } from "recoil";
import tabState from "../../recoil/tab";
import authState from "../../recoil/auth";
import { ReservationUrls } from "../../utils/reservationUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import Loading from "../loading/Loading";
import TabContent from "./TabContent";
import "./tab.scss";

const TabContainer = () => {
  const unmountRef = useUnmountRef();
  const [place, setPlace] = useSafeState(unmountRef, []);
  const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
  const [facilityFee, setFacilityFee] = useSafeState(unmountRef, []);
  const [age, setAge] = useSafeState(unmountRef, []);
  const [time, setTime] = useSafeState(unmountRef, []);
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
        setPlace(placeLists);
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
        setFacilityFee(feelists[1].data);
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
    return setFacilityFee(divide_feelist[0].data);
  };

  // tabのスタイルをカスタマイズ
  const StyledTab = styled((props) => <Tab {...props} />)(() => ({
    fontSize: "1.2rem",
    fontFamily: "Noto Sans JP",
    //   メディアクエリで指定した値を反映
    [`@media (max-width: 767px)`]: {
      fontSize: "1rem",
    },
    "&.Mui-selected": {
      color: "#23ad39",
      fontWeight: "bold",
    },
  }));

  const tabitem = place.map((place, p_id) => {
    return (
      <StyledTab
        key={p_id}
        label={place.name}
        value={place.id.toString()}
        onClick={() => divide(place.id, place.name, place.min, place.max)}
      />
    );
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
            style: {
              backgroundColor: "#23ad39",
              color: "#23ad39",
            },
          }}
        >
          {tabitem}
        </TabList>
        <TabContent
          place={place}
          facilityFee={facilityFee}
          age={age}
          time={time}
          CheckAuth={CheckAuth}
        />
      </TabContext>
      {loading && <Loading />}
    </>
  );
};

export default TabContainer;
