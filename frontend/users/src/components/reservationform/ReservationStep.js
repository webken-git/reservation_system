import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
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
    <>
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
      <div style={{ display: activeStep === 0 ? "" : "none" }}>
        <ReservationList />
        {/* local環境のみ反転 */}
        {!data.length === 0 ? (
          <div>
            <Link to="/">施設予約する</Link>
          </div>
        ) : (
          <div>
            <Button
              variant={"contained"}
              onClick={Step1}
              style={{
                backgroundColor: "#9CCC65",
              }}
            >
              次へ
            </Button>
          </div>
        )}
      </div>
      <div style={{ display: activeStep === 1 ? "" : "none" }}>
        <div>
          <PersonalForm />
        </div>
      </div>
      <div style={{ display: activeStep === 2 ? "" : "none" }}>
        <PersonalData />
        <ReservationList />
        <Button
          variant={"contained"}
          onClick={Step1}
          style={{
            backgroundColor: "#9CCC65",
          }}
        >
          戻る
        </Button>
        <Button variant={"contained"} onClick={Step3}>
          post
        </Button>
      </div>
      <div style={{ display: activeStep === 3 ? "" : "none" }}>
        <p>hel</p>
      </div>
    </>
  );
};
