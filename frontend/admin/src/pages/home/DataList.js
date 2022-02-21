import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import axios from "axios";
import 'react-tabs/style/react-tabs.scss';
import { useSetRecoilState } from "recoil";
import tabState from "../../recoil/tab/atom";
import { ReservationUrl } from "../../utils/reservationUrls";
import useSafeState from "../../hooks/useSafeState";
import useUnmountRef from "../../hooks/useUnmountRef";
import FeeList from '../../components/datalist/FeeList';
import GroupFeeList from "../../components/datalist/GroupFeeList";
import CurlingFeeList from "../../components/datalist/CurlingFeeList";
import Loading from "../../components/loading/Loading";
import Modal from 'react-modal'
import EditFeeList from '../../components/editdatas/EditFeeList'
import EditGroupFeeList from '../../components/editdatas/EditGroupFeeList'
import EditCurlingFeeList from '../../components/editdatas/EditCurlingFeeList'

// import { Link as Scroll } from 'react-scroll';
import './datalist.scss'
Modal.setAppElement('#root');

export const DataList = () => {
    const unmountRef = useUnmountRef();
    const [placeListData, setPlaceListData] = useSafeState(unmountRef, []);
    const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
    const [placeName, setPlaceName] = useState([]);
    const [divideFeeList, setDivideFeeList] = useSafeState(unmountRef, []);
    const [age, setAge] = useSafeState(unmountRef, []);
    const [, setTime] = useSafeState(unmountRef, []);
    const [, setUsage] = useSafeState(unmountRef, []);
    const [loading, setLoading] = useSafeState(unmountRef, true);
    const setTabState = useSetRecoilState(tabState);
    const [modalIsOpen, setIsOpen] = useState(false);

    //場所データ取得
    const GetPlaceList = () => {
        axios.get(ReservationUrl.PLACE)
            .then(response => {
                setPlaceListData(response.data);
            })
            .catch((error) => {
            })
    }

    //料金表データ取得
    const GetFeeList = () => {
        axios.get(ReservationUrl.FACILITY_FEE)
            .then(response => {
                const feelists = response.data;
                setFeeListData(feelists);
            })
            .catch((error) => {
            })
    }

    //年齢データの取得
    const GetAge = () => {
        axios.get(ReservationUrl.AGE)
            .then(response => {
                const ages = response.data;
                setAge(ages)
            })
            .catch((error) => {
            })
    }

    //時間区分の取得
    const GetTime = () => {
        axios.get(ReservationUrl.TIME)
            .then(response => {
                const times = response.data;
                setTime(times)
            })
            .catch((error) => {
            })
    }

    const GetUsage = () => {
        axios.get(ReservationUrl.USAGE)
            .then(response => {
                const usages = response.data;
                setUsage(usages)
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
        setPlaceName(pn)
        console.log(pn)
        const divide_feelist = feeListData.filter(fld => {
            return fld.place === pn
        })
        return (
            setDivideFeeList(divide_feelist[0].data)
        )
    }

    const fees = placeListData.map((place, p_id) => {
        const isGroup = divideFeeList.filter(fld => {
            return fld.place.name === place.name && fld.is_group === true;
        });

        const timeId4 = divideFeeList.filter(fld => {
            return fld.place.name === place.name && fld.is_group === true && fld.time.name.indexOf('１時間につき') !== -1;
        });

        const FacilityFee = () => {
            if (isGroup.length === 0) {
                return (
                    <FeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            } else if (timeId4.length === 0) {
                return (
                    <GroupFeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            } else {
                return (
                    <CurlingFeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            }
        }

        const EditFacilityFee = () => {
            if (placeName.indexOf("会議室") !== -1) {
                return (
                    <EditFeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            } else if (placeName.indexOf("カーリング場") !== -1) {
                return (
                    <EditCurlingFeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            } else {
                return (
                    <EditGroupFeeList key={p_id} feelist={divideFeeList} age={age} />
                )
            }
        }

        return (
            <AccordionItem key={place.id}>
                <AccordionItemHeading>
                    <AccordionItemButton onClick={() => divide(place.name)}>{place['name']}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <button className="btn" onClick={() => divide(place.name), () => setIsOpen(true)} >編集</button>
                    <FacilityFee />
                    <Modal
                        overlayClassName='mdoverlay'
                        isOpen={modalIsOpen}
                        onRequestClose={() => setIsOpen(false)}
                    >
                        <button onClick={() => setIsOpen(false)}>閉じる</button>
                        <EditFacilityFee />
                    </Modal>
                </AccordionItemPanel>
            </AccordionItem >
        )
    })

    return (
        <div className="list-wrapper">
            <div className="scroll_box-wrapper">
                <div className="scroll_box">
                    <Accordion allowZeroExpanded >
                        {fees}
                        {loading && <Loading />}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}