import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { personalData, stepValue } from "../../recoil/form/atom";
import authState from "../../recoil/auth";
import { Grid } from "@material-ui/core";
import "./PersonalForm.scss";
import {
  FormControl,
  TextField,
  FormHelperText,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useFetch } from "../../hooks/useFetch";
import { ReservationUrls } from "../../utils/reservationUrls";
import Label from "./ReservationForm";
import Loading from "../loading/Loading";

export const PersonalForm = (props) => {
  const [, setData] = useRecoilState(personalData);
  const [, setStep] = useRecoilState(stepValue);
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    // resolver: yupResolver(stepSchema),
    reValidateMode: "onSubmit",
  });
  const error = Object.values(errors); // エラーがあるかどうか

  const scrollToTop = () => {
    // 画面の一番上までスクロール
    window.scrollTo(0, 0);
  };

  const next = () => {
    setStep(2);
    scrollToTop();
  };
  const back = () => {
    setStep(0);
    scrollToTop();
  };

  const UserInfoData = useFetch({
    url: `${ReservationUrls.USER_INFO}?user__id=${auth.userId}`,
  });

  const onSubmit = (e) => {
    const list = { ...e };
    setData(list);
    if (e.userInfo === "true") {
      setLoading(true);
      if (UserInfoData.length === 0) {
        // ユーザー情報が保存されていない場合
        axios
          .post(ReservationUrls.USER_INFO, {
            user_id: auth.userId,
            group_name: e.group_name,
            reader_name: e.reader_name,
            contact_name: e.contact_name,
            address: e.address,
            tel: e.tel,
            is_group: true,
          })
          .then((res) => {
            // console.log(res.data);
          })
          .catch((err) => {});
        setLoading(false);
      } else {
        // 既にデータがある場合は更新
        axios
          .patch(`${ReservationUrls.USER_INFO}${UserInfoData[0].id}/`, {
            user_id: auth.userId,
            group_name: e.group_name,
            reader_name: e.reader_name,
            contact_name: e.contact_name,
            address: e.address,
            tel: e.tel,
            is_group: true,
          })
          .then((res) => {
            // console.log(res.data);
          })
          .catch((err) => {});
        setLoading(false);
      }
    }
    next();
  };

  return (
    UserInfoData && (
      <Grid container alignItems="center" justifyContent="center" row-gap="1em">
        <div className="PF-root">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="PF-title">個人情報入力</h2>
            {error.length > 0 && (
              <>
                {scrollToTop()}
                <div className="reserve-error">
                  <p>
                    正しく入力されていない項目があります。
                    <br />
                    メッセージをご確認の上、
                    <br />
                    もう一度ご入力ください。
                  </p>
                </div>
              </>
            )}
            <div>
              <FormControl error>
                <Label>団体名：</Label>
                <FormHelperText>
                  {errors.group_name && errors.group_name.message}
                </FormHelperText>
                <Controller
                  //   TextFiledを制御するController
                  name="group_name"
                  control={control}
                  defaultValue={
                    UserInfoData && UserInfoData.length !== 0
                      ? UserInfoData[0].group_name
                      : ""
                  }
                  render={({ field }) => (
                    <TextField
                      type={"text"}
                      className="personal-input"
                      {...field}
                      variant="outlined"
                      placeholder="稚内市みどりスポーツパーク"
                      {...register("group_name", {
                        required: "必須項目です",
                      })}
                      error={"group_name" in errors}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div>
              <FormControl error>
                <Label>代表者名：</Label>
                <FormHelperText>
                  {errors.reader_name && errors.reader_name.message}
                </FormHelperText>
                <Controller
                  //   TextFiledを制御するController
                  name="reader_name"
                  control={control}
                  defaultValue={
                    UserInfoData && UserInfoData.length !== 0
                      ? UserInfoData[0].reader_name
                      : ""
                  }
                  render={({ field }) => (
                    <TextField
                      type={"text"}
                      className="personal-input"
                      {...field}
                      variant="outlined"
                      placeholder="稚内太郎"
                      {...register("reader_name", {
                        required: "必須項目です",
                      })}
                      error={"reader_name" in errors}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div>
              <FormControl error>
                <Label>連絡者名：</Label>
                <FormHelperText>
                  {errors.contact_name && errors.contact_name.message}
                </FormHelperText>
                <Controller
                  //   TextFiledを制御するController
                  name="contact_name"
                  control={control}
                  defaultValue={
                    UserInfoData && UserInfoData.length !== 0
                      ? UserInfoData[0].contact_name
                      : ""
                  }
                  render={({ field }) => (
                    <TextField
                      type={"text"}
                      className="personal-input"
                      {...field}
                      variant="outlined"
                      placeholder="稚内太郎"
                      {...register("contact_name", {
                        required: "必須項目です",
                      })}
                      error={"contact_name" in errors}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div>
              <FormControl error>
                <Label>住所：</Label>
                <FormHelperText>
                  {errors.address && errors.address.message}
                </FormHelperText>
                <Controller
                  //   TextFiledを制御するController
                  name="address"
                  control={control}
                  defaultValue={
                    UserInfoData && UserInfoData.length !== 0
                      ? UserInfoData[0].address
                      : ""
                  }
                  render={({ field }) => (
                    <TextField
                      type={"text"}
                      className="personal-input"
                      {...field}
                      variant="outlined"
                      placeholder="稚内市緑3丁目14番1号"
                      {...register("address", {
                        required: "必須項目です",
                      })}
                      error={"address" in errors}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div>
              <FormControl error>
                <Label>
                  電話番号：<span className="red">※ハイフンなし</span>
                </Label>
                <FormHelperText>
                  {errors.tel && errors.tel.message}
                </FormHelperText>
                <Controller
                  //   TextFiledを制御するController
                  name="tel"
                  control={control}
                  defaultValue={
                    UserInfoData && UserInfoData.length !== 0
                      ? UserInfoData[0].tel
                      : ""
                  }
                  render={({ field }) => (
                    <TextField
                      className="personal-input"
                      {...field}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      variant="outlined"
                      placeholder="半角数字で入力"
                      {...register("tel", {
                        required: "必須項目です",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "半角数字で入力してください",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "桁数が足りません。正しい電話番号が入力されているか確認してください。",
                        },
                        maxLength: {
                          value: 11,
                          message:
                            "桁数が多過ぎます。正しい電話番号が入力されているか確認してください。",
                        },
                      })}
                      error={"tel" in errors}
                    />
                  )}
                />
              </FormControl>
            </div>
            <div>
              <FormControl error>
                <Label>
                  入力情報を保存：
                  <span className="red">
                    <br />
                    ※保存することで次回から自動入力されます。
                    <br />
                    ※既に保存されている場合、
                    <br />
                    「保存する」を選択すると上書きされます。
                  </span>
                </Label>
                <FormHelperText>
                  {errors.userInfo && errors.userInfo.message}
                </FormHelperText>
                <Controller
                  //Checkboxを制御するController
                  control={control}
                  name="userInfo"
                  defaultValue={""}
                  rules={{ required: "選択してください。" }}
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        {...field}
                        row
                        value={field.value === undefined ? "" : field.value}
                      >
                        <FormControlLabel
                          label={"保存する"}
                          value={true}
                          control={<Radio />}
                        />
                        <FormControlLabel
                          label={"保存しない"}
                          value={false}
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </>
                  )}
                />
              </FormControl>
            </div>
            <button
              type="button"
              className="back-btn"
              style={{
                marginTop: "10%",
                marginRight: "30px",
              }}
              onClick={back}
            >
              戻る
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                marginTop: "10%",
                marginLeft: "30px",
              }}
            >
              次へ
            </button>
          </form>
        </div>
        {loading && <Loading />}
      </Grid>
    )
  );
};
