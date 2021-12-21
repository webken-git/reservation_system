import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FeeList from '../components/feelist/FeeList';
import Loading from "../components/loading/Loading";
import { Link as Scroll } from 'react-scroll';
import './mainpage.scss'

const MainPage = () => {
  const [placeListData, setPlaceListData] = useState([]);
  const [feeListData, setFeeListData] = useState([]);
  const [placeName, setPlaceName] = useState([]);
  const [divideFeeList, setDivideFeeList] = useState([]);
  const [age, setAge] = useState([]);
  const [time, setTime] = useState([]);
  const [usage, setUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  //場所データ取得
  const GetPlaceList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/places/`)
      .then(response => {
        const placelists = response.data;
        setPlaceListData(placelists)
        setPlaceName(placelists[0].name)  //最初の場所名をセット
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //料金表データ取得
  const GetFeeList = () => {
    axios.get(`${process.env.REACT_APP_API}/api/facility-fees/`)
      .then(response => {
        const feelists = response.data;
        setFeeListData(feelists);
        setDivideFeeList(feelists[1].data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //年齢データの取得
  const GetAge = () => {
    axios.get(`${process.env.REACT_APP_API}/api/ages/`)
      .then(response => {
        const ages = response.data;
        setAge(ages)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //時間区分の取得
  const GetTime = () => {
    axios.get(`${process.env.REACT_APP_API}/api/times/`)
      .then(response => {
        const times = response.data;
        setTime(times)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const GetUsage = () => {
    axios.get(`${process.env.REACT_APP_API}/api/usages`)
      .then(response => {
        const usages = response.data;
        setUsage(usages)
        console.log(usages)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    GetFeeList();
    GetPlaceList();
    GetAge();
    GetTime();
    GetUsage();
    setLoading(false);
  }, [])

  const divide = (pn) => {
    setPlaceName(pn)
    const divide_feelist = feeListData.filter(fld => {
      return fld.place === pn
    })
    return (
      setDivideFeeList(divide_feelist[0].data)
    )
  }

  const tab = placeListData.map((place, p_id) => {
    return (
      <Tab key={p_id} onClick={() => divide(place.name)}>{place.name}</Tab>
    )
  })

  const tabitems = placeListData.map((place, p_id) => {
    return (
      <TabPanel>
        <FeeList key={p_id} feelist={divideFeeList} age={age} placename={placeName} time={time} />
      </TabPanel>
    )
  })

  return (
    <Tabs>
      <TabList>
        {tab}
      </TabList>
      <div className="list-wrapper">
        <div className="scroll_box-wrapper">
          <div className="scroll_box">
            {tabitems}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </Tabs>
  )
}

export default MainPage
