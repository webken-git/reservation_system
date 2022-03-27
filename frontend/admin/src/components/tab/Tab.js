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
  // const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
  const [facilityFee, setFacilityFee] = useSafeState(unmountRef, []);
  const [selectFeeList, setSelectFeeList] = useSafeState(unmountRef, []);
  const [age, setAge] = useSafeState(unmountRef, []);
  const [time, setTime] = useSafeState(unmountRef, []);
  const [, setUsage] = useSafeState(unmountRef, []);
  const [equipment, setEquipment] = useSafeState(unmountRef, []);
  const [selectEquipment, setSelectEquipment] = useSafeState(unmountRef, []);
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
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
      });
  };

  //料金表データ取得
  const GetFeeList = () => {
    axios
      .get(ReservationUrls.FACILITY_FEE)
      .then((response) => {
        const feelists = response.data;
        setFacilityFee(feelists);
        setSelectFeeList(
          feelists.filter((fee) => fee.place === tabStates.placeName)[0].data
        );
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
      });
  };

  //年齢データの取得
  const GetAge = () => {
    axios
      .get(ReservationUrls.AGE)
      .then((response) => {
        const ages = response.data;
        setAge(ages);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
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
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
      });
  };

  const GetUsage = () => {
    axios
      .get(ReservationUrls.USAGE)
      .then((response) => {
        const usages = response.data;
        setUsage(usages);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
      });
  };

  const GetEquipment = () => {
    axios
      .get(ReservationUrls.EQUIPMENT)
      .then((response) => {
        const equipments = response.data;
        setEquipment(equipments);
        setSelectEquipment(
          equipments.filter(
            (equipment) => equipment.place[0].name === tabStates.placeName
          )
        );
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetPlaceList();
    GetFeeList();
    GetAge();
    GetTime();
    GetEquipment();
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
    const divide_feelist = facilityFee.filter((fld) => {
      return fld.place === pn;
    });
    // divide_feelistにデータがある場合
    if (divide_feelist.length > 0) {
      setSelectFeeList(divide_feelist[0].data);
      return true;
    }
    const selectEquipment = equipment.filter((eq) => {
      return eq.place[0].name === pn;
    });
    setSelectEquipment(selectEquipment);
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
      color: "#1a8d89",
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
              backgroundColor: "#1a8d89",
              color: "#1a8d89",
            },
          }}
        >
          {tabitem}
        </TabList>
        <TabContent
          place={place}
          facilityFee={selectFeeList}
          age={age}
          time={time}
          equipment={selectEquipment}
          CheckAuth={CheckAuth}
        />
      </TabContext>
      {loading && <Loading />}
    </>
  );
};

export default TabContainer;
