import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilState } from "recoil";
import { personalData, stepValue } from "../../recoil/form/atom";
import "react-phone-input-2/lib/style.css";
import { stepSchema } from "./stepYup";
import { Grid } from "@material-ui/core";
import "./PersonalForm.scss";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
export const PersonalForm = () => {
  const [, setData] = useRecoilState(personalData);
  const [, setStep] = useRecoilState(stepValue);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(stepSchema),
  });
  const next = () => {
    setStep(2);
  };
  const back = () => {
    setStep(0);
  };
  const onSubmit = (e) => {
    const userinfo = true;
    const list = { ...e, userinfo };
    setData(list);
    next();
  };
  return (
    <Grid container alignItems="center" justifyContent="center" row-gap="1em">
      <div className="PF-root">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="PF-title">予約情報入力</div>
            <Controller
              //   TextFiledを制御するController
              name="group_name"
              control={control}
              rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <p>団体名</p>

                  <TextField
                    helperText={
                      errors.group_name ? "入力してください" : "※必須事項です"
                    }
                    {...field}
                    error={"group_name" in errors}
                    label="団体名を入力してください。"
                    variant="outlined"
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              //   TextFiledを制御するController
              name="reader_name"
              control={control}
              rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <p>代表者名</p>
                  <TextField
                    {...field}
                    label="代表者名を入力してください。"
                    variant="outlined"
                    error={"reader_name" in errors}
                    helperText={
                      errors.reader_name ? "入力してください" : "※必須事項です"
                    }
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              //   TextFiledを制御するController
              name="contact_name"
              control={control}
              rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <p>連絡者名</p>
                  <TextField
                    {...field}
                    label="連絡者名を入力してください。"
                    variant="outlined"
                    error={"contact_name" in errors}
                    helperText={
                      errors.contact_name ? "入力してください" : "※必須事項です"
                    }
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              //   TextFiledを制御するController
              name="address"
              control={control}
              rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <p>住所</p>
                  <TextField
                    {...field}
                    label="住所を入力してください。"
                    variant="outlined"
                    error={"address" in errors}
                    helperText={
                      errors.address ? "入力してください" : "※必須事項です"
                    }
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              //   TextFiledを制御するController
              name="tel"
              control={control}
              rules={{
                required: "入力してください",
                pattern: /^[0-9]+$/,
                maxLength: 11,
              }}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <div>電話番号</div>
                  <TextField
                    {...field}
                    type="tel"
                    label="電話番号を入力してください。"
                    variant="outlined"
                    error={"tel" in errors}
                    helperText={
                      errors.tel ? "入力してください" : "※必須事項です"
                    }
                  />
                </div>
              )}
            />
          </div>
          <div></div>
          <button
            type="button"
            className="back-btn"
            style={{
              marginTop: "20%",
              marginRight: "80px",
              marginBottom: "10%",
            }}
            onClick={back}
          >
            戻る
          </button>
          <button
            type="submit"
            className="btn"
            style={{
              marginTop: "20%",
              marginLeft: "80px",
              marginBottom: "10%",
            }}
          >
            次へ
          </button>
        </form>
      </div>
    </Grid>
  );
};
