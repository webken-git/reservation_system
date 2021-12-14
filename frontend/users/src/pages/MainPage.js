import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FeeList from '../components/feelist/FeeList'

const MainPage = () => {
    const [PlaceListData, setPlaceListData] = useState([]);
    const [FeeListData, setFeeListData] = useState([]);
    const [PlaceName, setPlaceName] = useState([]);
    const [DivideFeeList, setDivideFeeList] = useState([]);
    const [Age, setAge] = useState([]);
    const [Time, setTime] = useState([]);
    const [Usage, setUsage] = useState([]);
    
    //場所データ取得
    const GetPlaceList = () => {
      axios.get(`${process.env.REACT_APP_API}/places/`)
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
      axios.get(`${process.env.REACT_APP_API}/facility-fees/`)
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
      axios.get(`${process.env.REACT_APP_API}/ages/`)
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
      axios.get(`${process.env.REACT_APP_API}/times/`)
      .then(response => {
        const times = response.data;
        setTime(times)
      })
      .catch((error) => {
        console.log(error);
      })
    }

    const GetUsage = () => {
      axios.get(`${process.env.REACT_APP_API}/usages`)
      .then(response => {
        const usages = response.data;
        setUsage(usages)
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
    }, [])

    const divide = (pn) => {
      setPlaceName(pn)
      const divide_feelist = FeeListData.filter(fld => {
        return fld.place === pn
      })
      return (
        setDivideFeeList(divide_feelist[0].data)
      )
    }

    const tab = PlaceListData.map((place, p_id) => {
      return (
          <Tab key={p_id} onClick={() => divide(place.name)}>{place.name}</Tab>
      )
    })

    const tabitems = PlaceListData.map((place, p_id) => {
        return (
            <TabPanel>
              <FeeList key={p_id} feelist={DivideFeeList} age={Age} time={Time} usage={Usage}/>
            </TabPanel>

        )
    })
    
    return (
        <Tabs>
            <TabList>
                {tab}
            </TabList>
            <p>{PlaceName}です</p>

            {/* <FeeList data={divide_feelist}/> */}

            {tabitems}
        </Tabs>
    )
}

export default MainPage