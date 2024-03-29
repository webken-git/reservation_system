import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import authState from "../../recoil/auth";
import tabState from "../../recoil/tab";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { ReservationUrls } from "../../utils/reservationUrls";

export const ReservationPost = (props) => {
  const setStep = useSetRecoilState(stepValue);
  const auth = useRecoilValue(authState);
  const FormData = useRecoilValue(formData);
  const PersonalData = useRecoilValue(personalData);
  // recoilで保存しているStateを初期化
  const resetTab = useResetRecoilState(tabState);
  const resetFormData = useResetRecoilState(formData);
  const resetPersonalData = useSetRecoilState(personalData);

  const scrollToTop = () => {
    // 画面の一番上までスクロール
    window.scrollTo(0, 0);
  };

  const next = () => {
    setStep(3);
  };
  const back = () => {
    setStep(1);
    scrollToTop();
  };
  const reset = () => {
    setStep(0);
    scrollToTop();
  };

  // age-categoriesにPOSTする
  const postAgeCategories = (reservation, ageList) => {
    const age = {
      age_id: ageList,
      reservation: reservation,
    };
    axios
      .post(ReservationUrls.AGE_CATEGORY, age)
      .then((response) => {})
      .catch((error) => {});
  };
  // usage-categoriesにPOSTする
  const postUsageID = (reservation, usageList) => {
    const data = {
      usage_id: usageList,
      reservation: reservation,
    };
    axios
      .post(ReservationUrls.USAGE_CATEGORY, data)
      .then((response) => {})
      .catch((error) => {});
  };
  // approval-applicationsにPOSTする
  const postApprovalID = (reservation_id) => {
    const data = {
      approval_id: 1,
      reservation_id: reservation_id,
      heating_fee: 0,
      electric_fee: 0,
    };
    axios
      .post(ReservationUrls.APPROVAL_APPLICATION, data)
      .then((response) => {})
      .catch((error) => {});
  };

  // reservationにPOSTする
  const postReservations = () => {
    props.setLoading(true);
    FormData.map((item) => {
      let data = {
        user_id: auth.userId,
        group_name: PersonalData.group_name,
        leader_name: PersonalData.leader_name,
        contact_name: PersonalData.contact_name,
        address: PersonalData.address,
        tel: PersonalData.tel,
        is_group: true,
        delete_flag: true,
        start: item.start,
        end: item.end,
        organizer_number: item.staffNum,
        participant_number: item.useNum,
        purpose: item.reason,
        admission_fee: item.admissionFee ? item.admissionFee : 0,
        place_number: item.placeNumber ? parseFloat(item.placeNumber) : 1.0,
        place_id: item.placeId,
        equipment_id: item.equipment ? item.equipment : [],
        special_equipment: item.specialEquipment ? item.specialEquipment : null,
      };
      axios
        .post(ReservationUrls.RESERVATION, data)
        .then((response) => {
          // api/reservations/へのPOSTリクエストが成功したら、
          // そのレコードのidを取得し、以下のPOSTリクエストに渡す
          if (item.deferredPayment === "true") {
            axios.post(ReservationUrls.DEFFERD_PAYMENT, {
              reservation: response.data.id,
              // reason: item.deferredPaymentReason,
            });
          }
          postApprovalID(response.data.id);
          postAgeCategories(response.data.id, item.age);
          postUsageID(response.data.id, item.usageList);
          // 最後の予約情報をPOSTしたら、リセットする
          if (item === FormData[FormData.length - 1]) {
            resetTab();
            resetFormData();
            resetPersonalData([]);
            reset();
            props.setLoading(false);
            window.location.href = "/reserve/complete";
          }
        })
        .catch((error) => {
          props.setLoading(false);
          if (error.response.status === 500) {
            window.location.href = "/500";
          }
          if (error.response.status === 400) {
            window.scrollTo(0, 0);
            props.setError(
              "※追加された予約情報の中に「予約停止期間」を含む予約があるため、予約手続きに失敗しました。"
            );
          }
          // mapを終了させる
          // return false;
        });
      return item;
    });
  };

  const postData = () => {
    postReservations();
  };
  return (
    <>
      <Grid container alignItems="center" justifyContent={"center"}>
        <div>
          <button
            type="button"
            className="back-btn"
            onClick={back}
            style={{
              marginTop: "10%",
              marginLeft: "30px",
            }}
          >
            戻る
          </button>
          <button
            type="submit"
            className="btn"
            onClick={(next, postData)}
            style={{
              marginTop: "10%",
              marginLeft: "30px",
            }}
          >
            予約する
          </button>
        </div>
      </Grid>
    </>
  );
};
