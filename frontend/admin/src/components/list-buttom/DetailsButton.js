// 詳細ボタンのコンポーネント
import React from 'react';
import axios from 'axios';
import './detailsbutton.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { ReservationUrls } from '../../utils/reservationUrls';
import Loading from '../loading/Loading';


const DetailsButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [usage, setUsage] = React.useState([]);
  const [age, setAge] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const modalToggle = () => {
    setLoading(true);
    getUsage(props.reservation_id);
    getAge(props.reservation_id);
    setLoading(false);
    setModalIsOpen(!modalIsOpen);
  }

  const getUsage = (reservationId) => {
    axios.get(`${ReservationUrls.USAGE_CATEGORY}?reservation=${reservationId}`)
        .then((res) => {
            setUsage(res.data);
            // console.log(res.data);
        })
        .catch((err) => {
        });
  };

  const getAge = (reservationId) => {
      axios.get(`${ReservationUrls.AGE_CATEGORY}?reservation=${reservationId}`)
          .then((res) => {
              setAge(res.data);
          })
          .catch((err) => {
          });
  };

  return (
    <>
      <p className="details-button" onClick={modalToggle}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </p>
      <Modal isOpen={modalIsOpen} onRequestClose={modalToggle} className="modal-content" overlayClassName="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal-title">
            <h2>詳細</h2>
          </div>
          <ul>
            <li>
              <label>団体名：</label>
              <span>{props.group_name}</span>
            </li>
            <li>
              <label>代表者名：</label>
              <span>{props.reader_name}</span>
            </li>
            <li>
              <label>連絡者名：</label>
              <span>{props.contact_name}</span>
            </li>
            <li>
              <label>住所：</label>
              <span>{props.address}</span>
            </li>
            <li>
              <label>電話番号：</label>
              <span>{props.tel}</span>
            </li>
            <li>
              <label>メールアドレス：</label>
              <span>{props.email}</span>
            </li>
            <li>
              <label>場所：</label>
              <span>{props.place}</span>
            </li>
            <li>
              <label>使用(利用)日時：</label>
              <p>{props.start_day}  {props.start_time}  ~  {props.end_day}  {props.end_time}</p>
            </li>
            <li>
              <label>使用(利用)目的：</label>
              <span>{props.purpose}</span>
            </li>
            <li>
              <label>利用区分：</label>
              {usage[0] && usage[0].usage.map((item, index) => (
                  <span key={index}>{item.name}　</span>
              ))}
            </li>
            <li>
              <label>年齢区分：</label>
              {age[0] && age[0].age.map((item, index) => (
                  <span key={index}>{item.name}　</span>
              ))}
            </li>
            <li>
              <label>ステータス：</label>
              <span>{props.approval}</span>
            </li>
            <li>
              <label>使用(利用)予定人数：</label>
              <span>{(props.organizer_number) + (props.participant_number)}人</span>
            </li>
            <li>
              <label>入場料を徴収：</label>
              <span>{props.admission_fee}円</span>
            </li>
            <li>
              <label>特別設備等：</label>
              {/* <span>{props.special_equipment}</span> */}
            </li>
            <li>
              <label>利用料金：</label>
              <span>{props.usage_fee}円</span>
            </li>
            <li>
              <label>電気料金：</label>
              <span>{props.electric_fee}円</span>
            </li>
            <li>
              <label>暖房料金：</label>
              <span>{props.heating_fee}円</span>
            </li>
          </ul>
          <button type="button" className="back-btn" onClick={() => setModalIsOpen(false)}>閉じる</button>
        </div>
        {loading ? <Loading /> : <></>}
      </Modal>
    </>
  );
}

export default DetailsButton
