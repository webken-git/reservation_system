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
  console.log(data);
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
                                  <Controller
                                    name="StartDate"
                                    control={control}
                                    defaultValue={data.startDate}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <div>開始日：</div>
                                        <LocalizationProvider
                                          dateAdapter={DateAdapter}
                                          locale={ja}
                                        >
                                          <DesktopDatePicker
                                            {...field}
                                            label="利用日時:年/月/日"
                                            mask="____/__/__"
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="modalStart">
                                開始時間
                                <div>
                                  <Controller
                                    name="Start"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <TextField
                                          style={{ width: "100px" }}
                                          size="Normal"
                                          select
                                          defaultValue={data.Start}
                                          label=" 開始時間"
                                          error={"Start" in errors}
                                          helperText={
                                            errors.Start
                                              ? "入力してください"
                                              : ""
                                          }
                                          {...field}
                                        >
                                          {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                          {data.placeId === 1
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
                                </div>
                              </div>
                              <div className="modalEndDate">
                                <div>
                                  <Controller
                                    name="EndDate"
                                    control={control}
                                    defaultValue={data.endDate}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <div>終了日：</div>
                                        <LocalizationProvider
                                          dateAdapter={DateAdapter}
                                          locale={ja}
                                        >
                                          <DesktopDatePicker
                                            {...field}
                                            label="利用日時:年/月/日"
                                            mask="____/__/__"
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </div>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="modalEnd">
                                終了時間:
                                <div>
                                  <Controller
                                    name="End"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <TextField
                                          style={{ width: "100px" }}
                                          size="Normal"
                                          select
                                          defaultValue={data.Start}
                                          label="終了時間"
                                          error={"Start" in errors}
                                          helperText={
                                            errors.Start
                                              ? "入力してください"
                                              : ""
                                          }
                                          {...field}
                                        >
                                          {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                          {data.placeId === 1
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
                                </div>
                              </div>
                              <div className="modalStaffNum">
                                <div>
                                  <Controller
                                    //   TextFiledを制御するController
                                    name="staffNum"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <div> 主催者:</div>
                                        <TextField
                                          {...field}
                                          label="主催者人数を入力してください。"
                                          variant="outlined"
                                          error={"staffNum" in errors}
                                          helperText={
                                            errors.staffNum
                                              ? "入力してください"
                                              : ""
                                          }
                                          type="tel"
                                        />
                                      </div>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="modalUseNum">
                                <div>
                                  <Controller
                                    //   TextFiledを制御するController
                                    name="useNum"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <div> 参加者：</div>
                                        <TextField
                                          {...field}
                                          label="参加者人数を入力してください。"
                                          variant="outlined"
                                          error={"useNum" in errors}
                                          helperText={
                                            errors.useNum
                                              ? "入力してください"
                                              : ""
                                          }
                                          type="tel"
                                        />
                                      </div>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="modalReason">
                                <div>
                                  <Controller
                                    //   TextFiledを制御するController
                                    name="reason"
                                    control={control}
                                    rules={{ required: "選択してください。" }}
                                    render={({ field }) => (
                                      <div>
                                        <div>利用目的：</div>
                                        <TextField
                                          {...field}
                                          label="利用目的を入力してください。"
                                          variant="outlined"
                                          error={"reason" in errors}
                                          helperText={
                                            errors.reason
                                              ? "入力してください"
                                              : ""
                                          }
                                        />
                                      </div>
                                    )}
                                  />
                                </div>
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
