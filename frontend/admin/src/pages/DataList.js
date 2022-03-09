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
import { ReservationUrls } from "../utils/reservationUrls";
import useSafeState from "../hooks/useSafeState";
import useUnmountRef from "../hooks/useUnmountRef";
import FeeList from "../components/datalist/FeeList";
import GroupFeeList from "../components/datalist/GroupFeeList";
import CurlingFeeList from "../components/datalist/CurlingFeeList";
import Loading from "../components/loading/Loading";
import Modal from "react-modal";
import EditFeeList from "../components/datalist/edit/EditFeeList";
import EditGroupFeeList from "../components/datalist/edit/EditGroupFeeList";
import EditCurlingFeeList from "../components/datalist/edit/EditCurlingFeeList";

// import { Link as Scroll } from 'react-scroll';
// import "./datalist.scss";

// Modal.setAppElement("#root");

export const DataList = () => {
    document.title = "データリスト | 予約管理アプリ"; // ページタイトルを変更
    const unmountRef = useUnmountRef();
    const [placeListData, setPlaceListData] = useSafeState(unmountRef, []);
    const [feeListData, setFeeListData] = useSafeState(unmountRef, []);
    const [editPlaceData, setEditPlaceData] = useSafeState(unmountRef, []);
    const [divideFeeList, setDivideFeeList] = useSafeState(unmountRef, []);
    const [age, setAge] = useSafeState(unmountRef, []);
    const [, setTime] = useSafeState(unmountRef, []);
    const [usage, setUsage] = useSafeState(unmountRef, []);
    const [loading, setLoading] = useSafeState(unmountRef, true);
    const [modalIsOpen, setIsOpen] = useState(false);

    //場所データ取得
    const GetPlaceList = () => {
        axios
            .get(ReservationUrls.PLACE)
            .then((response) => {
                setPlaceListData(response.data);
            })
            .catch((error) => { });
    };

    //料金表データ取得
    const GetFeeList = () => {
        axios
            .get(ReservationUrls.FACILITY_FEE)
            .then((response) => {
                const feelists = response.data;
                setFeeListData(feelists);
            })
            .catch((error) => { });
    };

    //年齢データの取得
    const GetAge = () => {
        axios
            .get(ReservationUrls.AGE)
            .then((response) => {
                const ages = response.data;
                setAge(ages);
            })
            .catch((error) => { });
    };

    //時間区分の取得
    const GetTime = () => {
        axios
            .get(ReservationUrls.TIME)
            .then((response) => {
                const times = response.data;
                setTime(times);
            })
            .catch((error) => { });
    };

    const GetUsage = () => {
        axios
            .get(ReservationUrls.USAGE)
            .then((response) => {
                const usages = response.data;
                setUsage(usages);
            })
            .catch((error) => { });
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

    const divide = (place) => {
        setLoading(true);
        setEditPlaceData(place);
        const divide_feelist = feeListData.filter((fld) => {
            return fld.place === place.name;
        });
        setDivideFeeList(divide_feelist[0].data);
        setLoading(false);
    };

    const fees = placeListData.map((place, p_id) => {
        const feeData = feeListData.filter((fee) => {
            return fee.place === place.name;
        });

        const isGroup = feeListData.filter((fld) => {
            // console.log(fld.data);
            return (
                fld.place === place.name && fld.data.find((f) => f.is_group === true)
            );
        });

        const FacilityFee = () => {
            if (isGroup.length === 0) {
                return <FeeList key={p_id} feelist={feeData[0].data} age={age} />;
            } else if (place.max > 1) {
                return (
                    <CurlingFeeList key={p_id} feelist={feeData[0].data} age={age} />
                );
            } else {
                return <GroupFeeList key={p_id} feelist={feeData[0].data} age={age} />;
            }
        };

        if (feeData.length === 0) {
            return <Loading key={place.id} />;
        } else {
            return (
                <AccordionItem key={place.id}>
                    <AccordionItemHeading>
                        <AccordionItemButton>{place["name"]}</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <button
                            className="btn"
                            onClick={() => {
                                divide(place);
                                setIsOpen(true);
                            }}
                        >
                            編集
                        </button>
                        <FacilityFee />
                    </AccordionItemPanel>
                </AccordionItem>
            );
        }
    });

    // 編集画面
    const EditFacilityFee = () => {
        if (editPlaceData.name.indexOf("会議室") !== -1) {
            return (
                <EditFeeList
                    feelist={divideFeeList}
                    age={age}
                    place={editPlaceData}
                    setIsOpen={setIsOpen}
                />
            );
        } else if (editPlaceData.name.indexOf("カーリング場") !== -1) {
            return (
                <EditCurlingFeeList
                    feelist={divideFeeList}
                    age={age}
                    place={editPlaceData}
                    setIsOpen={setIsOpen}
                />
            );
        } else {
            return (
                <EditGroupFeeList
                    feelist={divideFeeList}
                    age={age}
                    place={editPlaceData}
                    setIsOpen={setIsOpen}
                />
            );
        }
    };

    return (
        <div className="list-wrapper">
            <div className="scroll_box-wrapper">
                <div className="scroll_box data-list__scroll">
                    <Accordion allowZeroExpanded>
                        {fees}
                        <Modal
                            className="modal-content"
                            overlayClassName="modal-overlay"
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsOpen(false)}
                        >
                            <div className="modal-wrapper data-list-modal">
                                <h2 className="modal-title">料金データ編集</h2>
                                <EditFacilityFee />
                            </div>
                        </Modal>
                        {loading && <Loading />}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};
