import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import authState from "../../recoil/auth";
import { useRecoilState, useRecoilValue } from "recoil";
// import { useFetch } from "../../hooks/useFetch";
// import { PostAgeCategories } from "../Post/postlogic";
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
  const next = () => {
    setStep(3);
  };
  const back = () => {
    setStep(0);
  };

  const postAgeCategories = (reservation) => {
    const age = {
      age_id: FormData.age,
      reservation: reservation,
    };
    // console.log(age);
    axios
      .post(ReservationUrls.AGE_CATEGORY, age)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
      })
      .catch((error) => {});
  };
  const postUsageID = (reservation) => {
    const data = {
      usage_id: FormData.usageList,
      reservation: reservation,
    };
    axios
      .post(ReservationUrls.USAGE_CATEGORY, data)
      .then((response) => {
        //  console.log("response body:", response.data);
        //  console.log("成功");
      })
      .catch((error) => {});
  };
  const postApprovalID = (reservation_id) => {
    const data = {
      approval_id: 1,
      reservation_id: reservation_id,
    };
    axios
      .post(ReservationUrls.APPROVAL_APPLICATION, data)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
      })
      .catch((error) => {});
  };

  const postReservations = () => {
    setLoading(true);
    const data = {
      user_id: auth.userId,
      group_name: PersonalData.group_name,
      reader_name: PersonalData.reader_name,
      contact_name: PersonalData.contact_name,
      address: PersonalData.address,
      // 国際番号で登録する必要があるため、telには+818000000000という形で入力する
      tel: `+${PersonalData.tel}`,
      is_group: true,
      delete_flag: true,
      start: FormData.start,
      end: FormData.end,
      organizer_number: FormData.staffNum,
      participant_number: FormData.useNum,
      purpose: FormData.reason,
      admission_fee: 0,
      place_number: FormData.placeNumber,
      place_id: FormData.placeId,
      equipment_id: [],
      special_equipment_id: [],
    };
    axios
      .post(ReservationUrls.RESERVATION, data)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
        postApprovalID(response.data.id);
        postAgeCategories(response.data.id);
        postUsageID(response.data.id);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const postData = () => {
    postReservations();
    setTimeout(() => {
      window.location.href = "/";
      back();
    }, 2000);
  };
  return (
    <>
      <Grid container alignItems="center" justify={"center"}>
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
      {loading ? <Loading /> : null}
    </>
  );
};
