import React, { useState, useEffect } from "react";
import axios from "axios";
import FeeList from "../../components/datalist/FeeList";
// import './datalist.scss'
import Modal from "react-modal";
import FeeEdit from "../../components/editdatas/FeeEdit";

Modal.setAppElement("#root");

export const DataList = () => {
  const [placeListData, setPlaceListData] = useState([]);
  const [feeListData, setFeeListData] = useState([]);
  const [placeName, setPlaceName] = useState([]);
  const [divideFeeList, setDivideFeeList] = useState([]);
  const [age, setAge] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  //場所データ取得
  const GetPlaceList = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/places/`)
      .then((response) => {
        const placelists = response.data;
        setPlaceListData(placelists);
        setPlaceName(placelists[0].name); //最初の場所名をセット
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //料金表データ取得
  const GetFeeList = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/facility-fees/`)
      .then((response) => {
        const feelists = response.data;
        setFeeListData(feelists);
        setDivideFeeList(feelists[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //年齢データの取得
  const GetAge = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/ages/`)
      .then((response) => {
        const ages = response.data;
        setAge(ages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetFeeList();
    GetPlaceList();
    GetAge();
  }, []);

  const divide = (pn) => {
    setPlaceName(pn);
    const divide_feelist = feeListData.filter((fld) => {
      return fld.place === pn;
    });
    return setDivideFeeList(divide_feelist[0].data);
  };

  const fees = placeListData.map((place, p_id) => {
    return (
      <details>
        <summary onClick={() => divide(place.name)}>
          <span className="open">{place["name"]}</span>
          <span className="detailsclose">{place["name"]}</span>
        </summary>
        <button className="button" onClick={() => setIsOpen(true)}>
          編集
        </button>
        <FeeList
          key={p_id}
          feelist={divideFeeList}
          age={age}
          placename={placeName}
        />
        <Modal
          overlayClassName="overlay"
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <button onClick={() => setIsOpen(false)}>Close</button>
          <FeeEdit
            key={p_id}
            feelist={divideFeeList}
            age={age}
            placename={placeName}
          />
        </Modal>
      </details>
    );
  });

  return (
    <div className="list-wrapper">
      <div className="scroll_box-wrapper">
        <div className="scroll_box">
          <h2>料金表</h2>
          {fees}
        </div>
      </div>
    </div>
  );
};
