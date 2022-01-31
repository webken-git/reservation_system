import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import authState from "../../recoil/auth";
import tabState from "../../recoil/tab";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
// import { useFetch } from "../../hooks/useFetch";
import { ReservationUrls } from "../../utils/reservationUrls";
import Loading from "../loading/Loading";

export const ReservationPost = () => {
  const [, setStep] = useRecoilState(stepValue);
  const auth = useRecoilValue(authState);
  // const AgeData = useFetch({
  //   url: ReservationUrls.AGE_CATEGORY,
  // });
  const [loading, setLoading] = useState(false);
  const FormData = useRecoilValue(formData);
  const PersonalData = useRecoilValue(personalData);
  // recoilで保存しているStateを初期化
  const resetTab = useResetRecoilState(tabState);
  const resetFormData = useResetRecoilState(formData);
  const resetPersonalData = useSetRecoilState(personalData);

  const next = () => {
    setStep(3);
  };
  const back = () => {
    setStep(0);
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
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {});
  };
  // approval-applicationsにPOSTする
  const postApprovalID = (reservation_id) => {
    const data = {
      approval_id: 1,
      reservation_id: reservation_id,
    };
    axios
      .post(ReservationUrls.APPROVAL_APPLICATION, data)
      .then((response) => {})
      .catch((error) => {});
  };

  // reservationにPOSTする
  const postReservations = () => {
    setLoading(true);
    FormData.map((item) => {
      let data = {
        user_id: auth.userId,
        group_name: PersonalData.group_name,
        reader_name: PersonalData.reader_name,
        contact_name: PersonalData.contact_name,
        address: PersonalData.address,
        // 国際番号で登録する必要があるため、telには+818000000000という形で入力する
        tel: PersonalData.tel,
        is_group: true,
        delete_flag: true,
        start: item.start,
        end: item.end,
        organizer_number: item.staffNum,
        participant_number: item.useNum,
        purpose: item.reason,
        admission_fee: 0,
        place_number: item.placeNumber,
        place_id: item.placeId,
        equipment_id: [],
        special_equipment_id: [],
      };
      axios
        .post(ReservationUrls.RESERVATION, data)
        .then((response) => {
          // api/reservations/へのPOSTリクエストが成功したら、
          // そのレコードのidを取得し、以下のPOSTリクエストに渡す
          postApprovalID(response.data.id);
          postAgeCategories(response.data.id, item.age);
          postUsageID(response.data.id, item.usageList);
        })
        .catch((error) => {
          setLoading(false);
        });
    });
  };

  const postData = () => {
    postReservations();
    setTimeout(() => {
      resetTab();
      resetFormData();
      resetPersonalData([]);
      back();
      window.location.href = "/";
    }, 2000);
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
              marginTop: "20%",
              marginLeft: "80px",
              marginBottom: "10%",
            }}
          >
            戻る
          </button>
          <button
            type="submit"
            className="btn"
            onClick={(next, postData)}
            style={{
              marginTop: "20%",
              marginLeft: "80px",
              marginBottom: "10%",
            }}
          >
            予約する
          </button>
        </div>
      </Grid>
      {loading && <Loading />}
    </>
  );
};
