import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import "./Content.scss";
// import { useFetch } from "../../hooks/useFetch";
import { formData, stepValue } from "../../recoil/form/atom";
import { ReservationList } from "./ReservationList";
import { PersonalForm } from "./PersonalForm";
import { Stepper } from "react-form-stepper";
import { PersonalData } from "./PersonalData";
import { ReservationPost } from "./ReservationPost";
import { Thanks } from "./Thanks";

export const ReservationStep = () => {
  const data = useRecoilValue(formData);
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useRecoilState(stepValue);
  const Step1 = () => {
    setActiveStep(step);
    setStep(1);
    scrollToTop();
  };

  // const Step3 = () => {
  //   setActiveStep(3);
  // };

  const scrollToTop = () => {
    // 画面の一番上までスクロール
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setActiveStep(step);
  }, [step]);
  return (
    <div className="reservation__step">
      {data.length === 0 ? (
        ""
      ) : (
        <div>
          <Stepper
            steps={[
              { label: "予約施設一覧" },
              { label: "個人情報入力" },
              { label: "予約情報確認" },
            ]}
            styleConfig={{
              size: "3em",
              labelFontSize: "1rem",
              completedBgColor: "#707070",
              completedTextColor: "#ffffff",
              inactiveBgColor: "#707070",
              inactiveTextColor: "#ffffff",
              activeBgColor: "#23ad39",
            }}
            activeStep={activeStep}
          />
        </div>
      )}
      {/* <Grid container alignItems="center" justify="center"> */}
      <div style={{ display: activeStep === 0 ? "" : "none" }}>
        <ReservationList />
        {data.length > 0 && (
          <Grid container alignItems="center" justifyContent={"center"}>
            <div>
              <button
                type="button"
                className="back-btn"
                onClick={() => {
                  window.history.back();
                }}
                style={{
                  marginRight: "30px",
                }}
              >
                戻る
              </button>
              <button
                type="button"
                className="btn"
                onClick={Step1}
                style={{
                  marginLeft: "30px",
                }}
              >
                次へ
              </button>
            </div>
          </Grid>
        )}
      </div>
      <div style={{ display: activeStep === 1 ? "" : "none" }}>
        <div>
          <PersonalForm />
        </div>
      </div>
      <div style={{ display: activeStep === 2 ? "" : "none" }}>
        <Grid container className="title-grid">
          <h2 className="verify-title">
            以下の入力内容で予約いたします。
            <br />
            入力内容を確認後、「予約する」ボタンを押してください。
          </h2>
        </Grid>
        <PersonalData />
        <ReservationList />
        <ReservationPost />
      </div>
      <div style={{ display: activeStep === 3 ? "" : "none" }}>
        <Grid container alignItems="center" justifyContent={"center"}>
          <Thanks />
        </Grid>
      </div>
    </div>
  );
};
