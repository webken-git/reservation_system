import { useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { useSetRecoilState } from "recoil";
import tabState from "../recoil/tab/atom";
import { ReservationUrls } from "../utils/reservationUrls";
import useSafeState from "../hooks/useSafeState";
import useUnmountRef from "../hooks/useUnmountRef";
import FeeList from '../components/feelist/FeeList';
import GroupFeeList from "../components/feelist/GroupFeeList";
import CurlingFeeList from "../components/feelist/CurlingFeeList";
import Loading from "../components/loading/Loading";
// import { Link as Scroll } from 'react-scroll';
import './mainpage.scss'

const MainPage = () => {
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

  //場所データ取得
  const GetPlaceList = () => {
    axios.get(ReservationUrls.PLACE)
      .then(response => {
        // const placelists = response.data;
        setPlaceListData(response.data);
        // setPlaceName(placelists[0].name);  //最初の場所名をセット
      })
      .catch((error) => {
      })
  }

  //料金表データ取得
  const GetFeeList = () => {
    axios.get(ReservationUrls.FACILITY_FEE)
      .then(response => {
        const feelists = response.data;
        setFeeListData(feelists);
        setDivideFeeList(feelists[1].data);
      })
      .catch((error) => {
      })
  }

  //年齢データの取得
  const GetAge = () => {
    axios.get(ReservationUrls.AGE)
      .then(response => {
        const ages = response.data;
        setAge(ages)
      })
      .catch((error) => {
      })
  }

  //時間区分の取得
  const GetTime = () => {
    axios.get(ReservationUrls.TIME)
      .then(response => {
        const times = response.data;
        setTime(times)
      })
      .catch((error) => {
      })
  }

  const GetUsage = () => {
    axios.get(ReservationUrls.USAGE)
      .then(response => {
        const usages = response.data;
        setUsage(usages)
        // console.log(usages)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    GetPlaceList();
    GetFeeList();
    GetAge();
    GetTime();
    GetUsage();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const divide = (pn) => {
    setTabState(pn);
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
    const isGroup = divideFeeList.filter(fld => {
      return fld.place.name === place.name && fld.is_group === true;
    });
    const timeId4 = divideFeeList.filter(fld => {
      return fld.place.name === place.name && fld.is_group === true && fld.time.name.indexOf('１時間につき') !== -1;
    });

    console.log('isGroup', isGroup)
    console.log('timeId4', timeId4)
    console.log('divideFeeList', divideFeeList)
    if (isGroup.length === 0) {
      return (
        <TabPanel key={p_id}>
          <FeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      )
    } else if (timeId4.length === 0) {
      return (
        <TabPanel key={p_id}>
          <GroupFeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      )
    } else {
      return (
        <TabPanel key={p_id}>
          <CurlingFeeList key={p_id} feelist={divideFeeList} age={age} />
        </TabPanel>
      )
    }
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
