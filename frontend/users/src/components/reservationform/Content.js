import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useRecoilState, useRecoilValue } from "recoil";
import "./Content.scss";

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
  styled,
  formHelperTextClasses,
} from "@mui/material";
function getSteps() {
  return ["text1", "text2", "text3"];
}

function getStepContent(stepIndex) {
  const { handleSubmit, errors, reset, control } = useForm();
  const [checkValue, setCheckValue] = useState("0");
  const handleChange = (e) => {
    setCheckValue(e.target.value);
  };
  switch (stepIndex) {
    case 0:
      return (
        <div className="root">
          <form>
            <div>
              <Controller
                //radio buttonを制御するController
                name="group"
                control={control}
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <div className="radio">
                    <RadioGroup
                      {...field}
                      row
                      value={field.value === undefined ? "" : field.value}
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio onChange={handleChange} />}
                        label="個人"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio onChange={handleChange} />}
                        label="団体"
                      />
                    </RadioGroup>
                  </div>
                )}
              />
            </div>
            <div>
              {checkValue === "1" && (
                <Controller
                  style={{ width: "100px", height: "20px" }}
                  control={control}
                  name="groupname"
                  defaultValue=""
                  // label="団体名"
                  rules={{ required: "選択してください。" }}
                  render={({ field }) => (
                    <>
                      <div>団体名</div>
                      <TextField {...field} />
                    </>
                  )}
                />
              )}
            </div>
            <div>
              <Controller
                style={{ width: "100px", height: "20px" }}
                control={control}
                name="Representativename"
                defaultValue=""
                label="代表名"
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <div>代表名</div>
                    <TextField {...field} />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                style={{ width: "100px", height: "20px" }}
                control={control}
                name="contactpersonname"
                defaultValue=""
                label="連絡者名"
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <div>連絡者名</div>
                    <TextField {...field} />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                style={{ width: "100px", height: "20px" }}
                control={control}
                name="addres"
                defaultValue=""
                label="住所"
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <div>住所</div>
                    <TextField {...field} />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                style={{ width: "100px", height: "20px" }}
                control={control}
                name="number"
                defaultValue=""
                label="電話番号"
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <div>電話番号</div>
                    <TextField {...field} />
                  </>
                )}
              />
            </div>
          </form>
        </div>
      );
    case 1:
      return <>予約一覧が表示される</>;
    case 2:
      return "";
    default:
      return "Unknown stepIndex";
  }
}

function Content() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Grid container>
      <Grid sm={2} />
      <Grid lg={8} sm={8} spacing={10}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <div>
            <Typography>仮予約が完了しました</Typography>
            <Button onClick={handleReset}>戻る</Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              戻る
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "送信" : "次へ"}
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default Content;
