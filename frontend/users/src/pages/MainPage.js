import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FeeList from "../components/feelist/FeeList";
import authState from "../recoil/auth/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReservationForm } from "../components/reservationform/ReservationForm";
const MainPage = () => {
  const [PlaceListData, setPlaceListData] = useState([]);
  const [FeeListData, setFeeListData] = useState();
  const [PlaceName, setPlaceName] = useState([]);
  const [DivideFeeList, setDivideFeeList] = useState();
  const [Age, setAge] = useState();
  const [Time, setTime] = useState();
  const CheckAuth = useRecoilValue(authState);
  //場所データ取得
  const GetPlaceList = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/places/`)
      .then((response) => {
        const placeLists = response.data;
        setPlaceListData(placeLists);
        setPlaceName(placeLists[0].name); //最初の場所名をセット
      })
      .catch((error) => {});
  };

  //料金表データ取得
  const GetFeeList = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/facility-fees/`)
      .then((response) => {
        const feelists = response.data;
        setFeeListData(feelists);
        setDivideFeeList(feelists[1]);
      })
      .catch((error) => {});
  };

  //年齢データの取得
  const GetAge = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/ages/`)
      .then((response) => {
        const ages = response.data;
        setAge(ages);
      })
      .catch((error) => {});
  };

  //時間区分の取得
  const GetTime = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/times/`)
      .then((response) => {
        const times = response.data;
        setTime(times);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetFeeList();
    GetPlaceList();
    GetAge();
    GetTime();
  }, []);

  const divide = (pn) => {
    setPlaceName(pn);
    const divide_feelist = FeeListData.filter((fld) => {
      return fld.place === pn;
    });
    return setDivideFeeList(divide_feelist[0]);
  };

  const tab = PlaceListData.map((place) => {
    return (
      <Tab onClick={() => divide(place.name)} key={place.id}>
        {place.name}
      </Tab>
    );
  });

  const tabitems = PlaceListData.map((place) => {
    return (
      <TabPanel key={place.id}>
        <FeeList feelist={DivideFeeList} age={Age} time={Time} />
      </TabPanel>
    );
  });

  return (
    <>
      <Tabs>
        <TabList>{tab}</TabList>
        <p>{PlaceName}です</p>

        {/* <FeeList data={divide_feelist} /> */}

        {tabitems}
      </Tabs>
      {CheckAuth.isAuthenticated === true && (
        <>
          <ReservationForm placeName={PlaceName} />
          {/* <Test placeName={PlaceName} /> */}
        </>
      )}
    </>
  );
};

export default MainPage;
