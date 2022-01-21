import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import "./Content.scss";
import { useFetch } from "../../hooks/useFetch";
import { formData, personalData, stepValue } from "../../recoil/form/atom";
import { ReservationList } from "./ReservationList";
import { Link } from "react-router-dom";
import { PersonalForm } from "./PersonalForm";
import { Stepper } from "react-form-stepper";
import { PersonalData } from "./PersonalData";
import { ReservationPost } from "./ReservationPost";
import { Thanks } from "./Thanks";

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
  formHelperTextClasses,
  Button,
} from "@mui/material";

export const ReservationStep = () => {
  const data = useRecoilValue(formData);
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useRecoilState(stepValue);
  console.log(activeStep);
  const data2 = useRecoilValue(personalData);
  // console.log(data2);
  const Step1 = () => {
    setActiveStep(step);
    setStep(1);
  };

  const Step3 = () => {
    setActiveStep(3);
  };
  useEffect(() => {
    setActiveStep(step);
  }, [step]);
  return (
    <div>
      {data.length === 0 ? (
        ""
      ) : (
        <div>
          <Stepper
            steps={[
              { label: "予約施設一覧" },
              { label: "個人情報入力" },
              { label: "予約する" },
            ]}
            styleConfig={{
              size: "3em",
              labelFontSize: "1rem",
              completedBgColor: "#00895e",
              completedTextColor: "black",
              inactiveBgColor: "#fffff",
              inactiveTextColor: "black",
              activeBgColor: "#00895e",
            }}
            activeStep={activeStep}
          />
        </div>
      )}
      {/* <Grid container alignItems="center" justify="center"> */}
      <div style={{ display: activeStep === 0 ? "" : "none" }}>
        <ReservationList />
        {data.length === 0 ? (
          <Grid container alignItems="center" justify={"center"} margin>
            <Button
              style={{
                backgroundColor: "#9CCC65",
                color: "black",
                // marginLeft: "100px",
                marginTop: "200px",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "25px",
                }}
              >
                施設予約する
              </Link>
            </Button>
          </Grid>
        ) : (
          <div>
            <Grid container alignItems="center" justify={"center"}>
              <Button
                variant={"contained"}
                onClick={Step1}
                style={{
                  backgroundColor: "#9CCC65",
                  width: "20%",
                }}
              >
                次へ
              </Button>
            </Grid>
          </div>
        )}
      </div>
      <div style={{ display: activeStep === 1 ? "" : "none" }}>
        <div>
          <PersonalForm />
        </div>
      </div>
      <div style={{ display: activeStep === 2 ? "" : "none" }}>
        <Grid container alignItems="center" justify={"center"}>
          <div style={{ color: "red", fontSize: "40px" }}>
            以下の情報で予約します
          </div>
          <Thanks />
        </Grid>
        <PersonalData />
        <ReservationList />
        <ReservationPost />
      </div>
      <div style={{ display: activeStep === 3 ? "" : "none" }}>
        <Thanks />
      </div>
      {/* </Grid> */}
    </div>
  );
};
