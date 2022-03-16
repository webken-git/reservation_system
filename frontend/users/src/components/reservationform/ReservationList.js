import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue, useRecoilState, selector } from "recoil";
import "./ReservationList.scss";
import Loading from "../loading/Loading";
import Modal from "react-modal";
import { useForm, Controller, useController } from "react-hook-form";
import { inputUnstyledClasses } from "@mui/material";
import { useNextMonthDisabled } from "@mui/lab/internal/pickers/hooks/date-helpers-hooks";
import { useEffect } from "react";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { ja } from "date-fns/locale";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  timetable,
  useDevice,
  deferredPayment,
  curlingTimetable,
} from "./FormDataList";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  MenuItem,
  Button,
  styled,
  FormHelperText,
} from "@mui/material";
import { format } from "date-fns";
export const ReservationList = () => {
  const [data, setData] = useRecoilState(formData);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [indexCheck, setIndexCheck] = useState(0);
  const {
    register,
    reset,
    handleSubmit,
    getValue,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({});
  const UsageData = useFetch({
    url: ReservationUrls.PLACE,
  });
  console.log(UsageData);
  useEffect(() => {
    //modalIsOpenの値が変わる度にformをresetする
    //resetしないとdefaultValueが前の値のままになる
    reset();
  }, [modalIsOpen]);
  const modalStyle = {
    overlay: {
      //modalの外側
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.85)",
    },
    content: {
      //modalの内側
      position: "absolute",
      top: "5rem",
      left: "5rem",
      right: "5rem",
      bottom: "5rem",
      backgroundColor: "FFFFF",
      borderRadius: "1rem",
      padding: "1.5rem",
    },
  };
  const checkIndex = (index) => {
    //編集するために予約でのmapのindexを知る必要がある。
    setIndexCheck(index);
    console.log(indexCheck);
  };
  const deleteIndexCheck = (index) => {
    setDeleteIndex(index);
  };
  const onSubmit = (e) => {
    // const startDate = format(e.StartDate, "yyyy-LL-dd");
    // const endDate = format(e.EndDate, "yyyy-LL-dd");
    // const listAfterChang = e;
    const id = indexCheck;
    const list = data[id];
    const start = list.start;
    const end = list.end;
    const placeName = list.placeName;
    const age = list.age;
    const placeId = list.placeId;
    // const startDate = list.startDate;
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = list.endDate;
    // const endDate = format(e.EndDate, "yyyy-LL-dd");
    const usageList = list.usageList;
    const collect = list.collect;
    const deferredPayment = list.deferredPayment;
    const device = list.device;
    const payLater = list.payLater;
    const reason = list.reason;
    const profits = list.profits;
    const staffNum = list.staffNum;
    const useNum = list.useNum;
    const usage = list.usage;
    const useDevice = list.useDevice;
    console.log(e);
    // console.log(list);
    // setData((oldData) => [
    //   ...oldData,
    //   {
    //     ...e,
    //     start,
    //     end,
    //     placeName,
    //     age,
    //     placeId,
    //     placeName,
    //     startDate,
    //     endDate,
    //     usageList,
    //     collect,
    //     deferredPayment,
    //     device,
    //     payLater,
    //     reason,
    //     profits,
    //     staffNum,
    //     useNum,
    //     usage,
    //     useDevice,
    //   },
    // ]);
    // console.log(data);
  };
  const remove = () => {
    //spliceを使うためにlistに
    const list = [...data];
    const id = deleteIndex;
    list.splice([id], 1);
    setData([...list]);
  };
  return (
    <>
      <div className="RL-root">
        {data.length === 0 ? (
          <Grid container alignItems="center" justifyContent={"center"}>
            <div className="notFacility">追加した予約がありません</div>
          </Grid>
        ) : (
          <div className="reservation-list">
            <div className="title">追加した予約一覧</div>
            {/* 追加されたデータを1件ずつ表示 */}
            <Grid container>
              {data &&
                data.map((item, index) => {
                  return (
                    <Grid
                      className="reserve-data"
                      key={index}
                      item
                      lg={2}
                      md={3}
                    >
                      <div className="place">施設名：{item.placeName}</div>
                      <div className="reservation">{item.reservation}</div>
                      <div className="usage">
                        利用区分：{item.id}
                        {
                          // usage nameを表示する
                        }
                      </div>
                      <div className="start">
                        開始日時:
                        {item.startDate} {item.Start}から
                      </div>
                      <div className="end">
                        終了日時：{item.endDate} {item.End}まで
                      </div>
                      <div className="number">
                        主催者：{item.staffNum}人 参加者：{item.useNum}人
                      </div>
                      利用目的：
                      <div className="box">{item.reason}</div>
                      <div className="RL-btn">
                        <button
                          className="removeBtn"
                          onClick={() => {
                            deleteIndexCheck(index);
                            remove();
                          }}
                        >
                          削除
                        </button>
                        <button
                          className="removeBtn"
                          onClick={() => {
                            setIsOpen(true);
                            checkIndex(index);
                          }}
                        >
                          編集
                        </button>
                        <Modal
                          isOpen={modalIsOpen}
                          style={modalStyle}
                          onRequestClose={() => setIsOpen(false)}
                        >
                          <div className="rootModal">
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="modalPlaceName">
                                <div>
                                  施設名:
                                  <Controller
                                    name="placeId"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <TextField
                                        style={{ width: "100px" }}
                                        select
                                        size="Normal"
                                        defaultValue=""
                                        label="施設名"
                                        error={"placeName" in errors}
                                        helperText={
                                          errors.placeName
                                            ? "入力してください"
                                            : ""
                                        }
                                        {...field}
                                      >
                                        {UsageData.map((i, index) => (
                                          <MenuItem
                                            key={index}
                                            label={i.name}
                                            value={
                                              i.id === undefined ? "" : i.id
                                            }
                                          >
                                            {i.name}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="modalStartDate">
                                <div>
                                  <FormControl error>
                                    <Label>利用開始日時：</Label>
                                    <FormHelperText>
                                      {errors.startDate && (
                                        <>
                                          {errors.startDate.message}
                                          <br />
                                          <br />
                                        </>
                                      )}
                                    </FormHelperText>
                                    <div>
                                      <Controller
                                        name="startDate"
                                        control={control}
                                        defaultValue={
                                          // 初期値は現在の日付 + 1日
                                          new Date().getTime() +
                                          1000 * 60 * 60 * 24
                                        }
                                        // rules={{ required: "入力" }}
                                        render={({ field }) => (
                                          <div className={form.StartDate}>
                                            <LocalizationProvider
                                              dateAdapter={DateAdapter}
                                              locale={ja}
                                            >
                                              <DesktopDatePicker
                                                {...field}
                                                label="年/月/日"
                                                mask="____/__/__"
                                                minDate={
                                                  new Date().getTime() +
                                                  1000 * 60 * 60 * 24
                                                }
                                                renderInput={(params) => (
                                                  <TextField
                                                    {...params}
                                                    {...register("startDate", {
                                                      validate: (value) => {
                                                        if (value === "") {
                                                          return "必須項目です";
                                                        }
                                                        // 現在または過去の日付を選択された場合はエラー
                                                        if (
                                                          value < new Date()
                                                        ) {
                                                          return "現在及び過去の日付は選択できません";
                                                        }
                                                      },
                                                    })}
                                                  />
                                                )}
                                              />
                                            </LocalizationProvider>
                                          </div>
                                        )}
                                      />
                                      <br />
                                    </div>
                                  </FormControl>
                                </div>
                              </div>
                              <div className="modalStart">
                                開始時間
                                <div>
                                  <FormControl error>
                                    <FormHelperText>
                                      {errors.startTime && (
                                        <>
                                          {errors.startTime.message}
                                          <br />
                                          <br />
                                        </>
                                      )}
                                    </FormHelperText>
                                    <Controller
                                      name="startTime"
                                      defaultValue=""
                                      control={control}
                                      render={({ field }) => (
                                        <div className={form.start}>
                                          <TextField
                                            style={{ width: "150px" }}
                                            size="Normal"
                                            select
                                            defaultValue=""
                                            label="利用開始時間"
                                            {...register("startTime", {
                                              required: "選択してください",
                                            })}
                                            error={"startTime" in errors}
                                            {...field}
                                          >
                                            {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                            {placeName === "カーリング場"
                                              ? curlingTimetable.map(
                                                  (timetables, id) => (
                                                    <MenuItem
                                                      key={id}
                                                      label={timetables.label}
                                                      value={
                                                        timetables.value ===
                                                        undefined
                                                          ? ""
                                                          : timetables.value
                                                      }
                                                    >
                                                      {timetables.label}
                                                    </MenuItem>
                                                  )
                                                )
                                              : timetable.map(
                                                  (timetables, id) => (
                                                    <MenuItem
                                                      key={id}
                                                      label={timetables.label}
                                                      value={
                                                        timetables.value ===
                                                        undefined
                                                          ? ""
                                                          : timetables.value
                                                      }
                                                    >
                                                      {timetables.label}
                                                    </MenuItem>
                                                  )
                                                )}
                                          </TextField>
                                        </div>
                                      )}
                                    />
                                  </FormControl>
                                </div>
                              </div>
                              <div className="modalEndDate">
                                <FormControl error>
                                  <Label>利用終了日時：</Label>
                                  <FormHelperText>
                                    {errors.endDate && (
                                      <>
                                        {errors.endDate.message}
                                        <br />
                                        <br />
                                      </>
                                    )}
                                  </FormHelperText>
                                  <div>
                                    <Controller
                                      name="endDate"
                                      control={control}
                                      defaultValue={
                                        // 初期値は現在の日付 + 1日
                                        new Date().getTime() +
                                        1000 * 60 * 60 * 24
                                      }
                                      render={({ field }) => (
                                        <div className={form.endDate}>
                                          <LocalizationProvider
                                            dateAdapter={DateAdapter}
                                            locale={ja}
                                          >
                                            <DesktopDatePicker
                                              {...field}
                                              label="年/月/日"
                                              mask="____/__/__"
                                              minDate={
                                                new Date().getTime() +
                                                1000 * 60 * 60 * 24
                                              }
                                              renderInput={(params) => (
                                                <TextField
                                                  {...params}
                                                  {...register("endDate", {
                                                    validate: (value) => {
                                                      if (value === "") {
                                                        return "必須項目です";
                                                      }
                                                      // startDateより過去の日付を選択された場合はエラー
                                                      if (
                                                        value <
                                                        getValues("startDate")
                                                      ) {
                                                        return "利用開始日時より前の日付は選択できません";
                                                      }
                                                    },
                                                  })}
                                                  error={"endDate" in errors}
                                                />
                                              )}
                                            />
                                          </LocalizationProvider>
                                        </div>
                                      )}
                                    />
                                    <br />
                                  </div>
                                </FormControl>
                              </div>
                              <div className="modalEnd">
                                終了時間:
                                <FormControl error>
                                  <FormHelperText>
                                    {errors.endTime && (
                                      <>
                                        {errors.endTime.message}
                                        <br />
                                        <br />
                                      </>
                                    )}
                                  </FormHelperText>
                                  <Controller
                                    name="endTime"
                                    defaultValue=""
                                    control={control}
                                    rules={{
                                      required: "選択してください",
                                    }}
                                    render={({ field }) => (
                                      <div className={form.end}>
                                        <TextField
                                          style={{ width: "150px" }}
                                          select
                                          size="Normal"
                                          defaultValue=""
                                          label="利用終了時間"
                                          {...register("endTime", {
                                            required: "選択してください",
                                          })}
                                          error={"endTime" in errors}
                                          {...field}
                                        >
                                          {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}

                                          {placeName === "カーリング場"
                                            ? curlingTimetable.map(
                                                (timetables, id) => (
                                                  <MenuItem
                                                    key={id}
                                                    label={timetables.label}
                                                    value={
                                                      timetables.value ===
                                                      undefined
                                                        ? ""
                                                        : timetables.value
                                                    }
                                                  >
                                                    {timetables.label}
                                                  </MenuItem>
                                                )
                                              )
                                            : timetable.map(
                                                (timetables, id) => (
                                                  <MenuItem
                                                    key={id}
                                                    label={timetables.label}
                                                    value={
                                                      timetables.value ===
                                                      undefined
                                                        ? ""
                                                        : timetables.value
                                                    }
                                                  >
                                                    {timetables.label}
                                                  </MenuItem>
                                                )
                                              )}
                                        </TextField>
                                      </div>
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <div className="modalStaffNum">
                                <FormControl error>
                                  <Label>
                                    主催関係者数：
                                    <span className="red">
                                      <br />
                                      ※単位は不要です
                                    </span>
                                  </Label>
                                  <FormHelperText>
                                    {errors.staffNum && errors.staffNum.message}
                                  </FormHelperText>
                                  <Controller
                                    name="staffNum"
                                    defaultValue={item.staffNum}
                                    control={control}
                                    render={({ field }) => (
                                      <>
                                        <TextField
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          style={{ width: "150px" }}
                                          placeholder="半角数字で入力"
                                          {...register("staffNum", {
                                            required: "必須項目です",
                                            pattern: {
                                              value: /^[0-9]+$/,
                                              message: "数字を入力してください",
                                            },
                                            maxLength: {
                                              value: 3,
                                              message:
                                                "1000人以下で入力してください",
                                            },
                                          })}
                                          error={"staffNum" in errors}
                                          {...field}
                                        />
                                      </>
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <div className="modalUseNum">
                                <FormControl error>
                                  <Label>
                                    参集人員数：
                                    <span className="red">
                                      <br />
                                      ※単位は不要です
                                    </span>
                                  </Label>
                                  <FormHelperText>
                                    {errors.useNum && errors.useNum.message}
                                  </FormHelperText>
                                  <Controller
                                    name="useNum"
                                    defaultValue={item.useNum}
                                    control={control}
                                    render={({ field }) => (
                                      <>
                                        <TextField
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          style={{ width: "150px" }}
                                          placeholder="半角数字で入力"
                                          {...register("useNum", {
                                            required: "必須項目です",
                                            pattern: {
                                              value: /^[0-9]+$/,
                                              message: "数字を入力してください",
                                            },
                                            maxLength: {
                                              value: 3,
                                              message:
                                                "1000人以下で入力してください",
                                            },
                                          })}
                                          error={"useNum" in errors}
                                          {...field}
                                        />
                                      </>
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <div className="modalReason">
                                <FormControl error>
                                  <Label>利用目的：</Label>
                                  <FormHelperText>
                                    {errors.reason && errors.reason.message}
                                  </FormHelperText>
                                  <Controller
                                    //   TextFiledを制御するController
                                    name="reason"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => (
                                      <div className={form.reason}>
                                        <TextField
                                          inputProps={{ inputMode: "text" }}
                                          {...field}
                                          type={"text"}
                                          style={{ width: "300px" }}
                                          {...register("reason", {
                                            required: "必須項目です",
                                          })}
                                          error={"reason" in errors}
                                        />
                                      </div>
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <button
                                className="removeBtn"
                                ｄ
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                              >
                                閉じる
                              </button>
                              <button type="submit" className="removeBtn">
                                編集する
                              </button>
                            </form>
                          </div>
                        </Modal>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};
