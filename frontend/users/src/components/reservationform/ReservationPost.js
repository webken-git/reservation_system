import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  SelectField,
  Button,
  styled,
  formHelperTextClasses,
} from "@mui/material";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFetch } from "../../hooks/useFetch";
// import { PostAgeCategories } from "../Post/postlogic";

export const ReservationPost = () => {
  const [data, setStep] = useRecoilState(stepValue);
  const AgeData = useFetch({
    url: "http://127.0.0.1:8000/api/age-categories/",
  });
  // console.log(AgeData);
  const FormData = useRecoilValue(formData);
  const PersonalData = useRecoilValue(personalData);
  console.log(FormData);
  const next = () => {
    setStep(3);
  };
  const back = () => {
    setStep(0);
  };
  const postAgeCategories = () => {
    console.log(FormData);
    const age = {
      age_id: FormData.age,
      reservation: FormData.reservationId,
    };
    // console.log(age);
    axios
      .post("http://127.0.0.1:8000/api/age-categories/", age)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
      })
      .catch((error) => {});
  };
  const postReservations = () => {
    const data = {
      place_id: FormData.placeNumber,
      group_name: PersonalData.group_name,
      reader_name: PersonalData.reader_name,
      contact_name: PersonalData.contact_name,
      address: PersonalData.address,
      tel: PersonalData.tel,
      is_group: true,
      delete_flag: true,
      start: FormData.start,
      end: FormData.end,
      organizer_number: FormData.staffNum,
      participant_number: FormData.useNum,
      purpose: FormData.reason,
      admission_fee: 0,
      place_number: FormData.placeNumber,
    };
    axios
      .post("http://127.0.0.1:8000/api/reservations/", data)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
      })
      .catch((error) => {});
  };
  const postApprovalID = () => {
    const data = {
      approval_id: 1,
      reservation_id: FormData.id,
    };
    axios
      .post("http://127.0.0.1:8000/api/approval-applications/", data)
      .then((response) => {
        // console.log("response body:", response.data);
        // console.log("成功");
      })
      .catch((error) => {});
  };
  const postUsageID = () => {
    const data = {
      usage_id: FormData.usageList,
      reservation_id: FormData.id,
    };
    axios
      .post("http://127.0.0.1:8000/api/usage-categories/", data)
      .then((response) => {
        //  console.log("response body:", response.data);
        //  console.log("成功");
      })
      .catch((error) => {});
  };
  const postData = () => {
    postAgeCategories();
    postReservations();
    postApprovalID();
    postUsageID();
  };
  return (
    <Grid container alignItems="center" justify={"center"}>
      <div>
        <Button
          variant={"contained"}
          onClick={back}
          style={{
            backgroundColor: "#9CCC65",
            color: "black",
            marginTop: "20%",
            marginLeft: "80px",
            marginBottom: "10%",
            width: "120px",
          }}
        >
          戻る
        </Button>
        <Button
          variant={"contained"}
          style={{
            backgroundColor: "#9CCC65",
            color: "black",
            marginTop: "20%",
            marginLeft: "80px",
            marginBottom: "10%",
            width: "120px",
          }}
          onClick={(next, postData)}
        >
          予約する
        </Button>
      </div>
    </Grid>
  );
};
