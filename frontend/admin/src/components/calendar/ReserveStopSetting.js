import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ja } from "date-fns/locale";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { format } from "date-fns";
import {
  FormControl,
  TextField,
  FormGroup,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { timetable } from "./FormDataList";
import Loading from "../loading/Loading";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";

const ReserveStopSetting = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const getPlaceList = useFetch({
    url: ReservationUrls.PLACE,
  });

  const onSubmit = (e) => {
    console.log("onSubmit");
    setLoading(true);
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const place = e.place;

    axios
      .post(ReservationUrls.SUSPENSION, {
        start: start,
        end: end,
        place_id: place,
      })
      .then((res) => {
        setModalIsOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 500) {
          window.location.href = "/500";
        }
      });
    // フォームをリセット
    reset();
  };

  const handleCheck = (id, name, e) => {
    let values = getValues(name) || [];

    let newValues = [];
    // 選択されている場合
    if (e.target.checked) {
      // 選択されているidを追加
      newValues = [...values, id];
    } else {
      // 選択されていないidを削除
      newValues = values.filter((value) => value !== id);
    }
    console.log(newValues);
    setValue(name, newValues);
    // console.log(newValues)
    return newValues;
  };

  return (
    <>
      <div className="stop">
        <button type="button" className="btn" onClick={modalToggle}>
          予約停止
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={modalToggle}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="modal-wrapper">
            <div className="modal-title">
              <h2>予約停止の設定</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <ul>
                <li>
                  <div>
                    <p>開始日時：</p>
                    <FormControl error>
                      <FormHelperText>
                        {errors.StartDate && errors.StartDate.message}
                      </FormHelperText>
                      <FormGroup>
                        <Controller
                          name="StartDate"
                          control={control}
                          defaultValue={
                            new Date().getTime() + 1000 * 60 * 60 * 24
                          }
                          // rules={{ required: "入力" }}
                          render={({ field }) => (
                            <div>
                              <LocalizationProvider
                                dateAdapter={DateAdapter}
                                locale={ja}
                              >
                                <DesktopDatePicker
                                  {...field}
                                  label="年/月/日"
                                  mask="____/__/__"
                                  minDate={
                                    new Date().getTime() + 1000 * 60 * 60 * 24
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      {...register("StartDate", {
                                        validate: (value) => {
                                          if (value === "") {
                                            return "必須項目です";
                                          }
                                          // 現在または過去の日付を選択された場合はエラー
                                          if (value < new Date()) {
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
                      </FormGroup>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl error>
                      <FormHelperText>
                        {errors.Start && errors.Start.message}
                      </FormHelperText>
                      <FormGroup>
                        <Controller
                          name="Start"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <div>
                              <TextField
                                style={{ width: "150px" }}
                                size="Normal"
                                select
                                defaultValue=""
                                label="開始時間"
                                {...register("Start", {
                                  required: "選択してください",
                                })}
                                error={"Start" in errors}
                                {...field}
                              >
                                {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                {timetable.map((timetables, id) => (
                                  <MenuItem
                                    key={id}
                                    label={timetables.label}
                                    value={
                                      timetables.value === undefined
                                        ? ""
                                        : timetables.value
                                    }
                                  >
                                    {timetables.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          )}
                        />
                      </FormGroup>
                    </FormControl>
                  </div>
                </li>
                <li>
                  <div>
                    <p>終了日時</p>
                    <FormControl error>
                      <FormHelperText>
                        {errors.EndDate && errors.EndDate.message}
                      </FormHelperText>
                      <FormGroup>
                        <Controller
                          name="EndDate"
                          control={control}
                          defaultValue={
                            new Date().getTime() + 1000 * 60 * 60 * 24
                          }
                          render={({ field }) => (
                            <div>
                              <LocalizationProvider
                                dateAdapter={DateAdapter}
                                locale={ja}
                              >
                                <DesktopDatePicker
                                  {...field}
                                  label="年/月/日"
                                  mask="____/__/__"
                                  minDate={
                                    new Date().getTime() + 1000 * 60 * 60 * 24
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      {...register("EndDate", {
                                        validate: (value) => {
                                          if (value === "") {
                                            return "必須項目です";
                                          }
                                          // startDateより過去の日付を選択された場合はエラー
                                          if (value < getValues("startDate")) {
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
                      </FormGroup>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl error>
                      <FormHelperText>
                        {errors.End && errors.End.message}
                      </FormHelperText>
                      <FormGroup>
                        <Controller
                          name="End"
                          defaultValue=""
                          control={control}
                          render={({ field }) => (
                            <div>
                              <TextField
                                style={{ width: "150px" }}
                                select
                                size="Normal"
                                defaultValue=""
                                label="終了時間"
                                {...register("End", {
                                  required: "選択してください",
                                })}
                                error={"End" in errors}
                                {...field}
                              >
                                {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}

                                {timetable.map((timetables, id) => (
                                  <MenuItem
                                    key={id}
                                    label={timetables.label}
                                    value={
                                      timetables.value === undefined
                                        ? ""
                                        : timetables.value
                                    }
                                  >
                                    {timetables.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          )}
                        />
                      </FormGroup>
                    </FormControl>
                  </div>
                </li>
                <li>
                  <div>
                    <p>施設名：</p>
                    {getPlaceList &&
                      getPlaceList.map((i, index) => {
                        return (
                          <p
                            key={index}
                            onChange={(e) => handleCheck(i.id, "place", e)}
                            className="place-list"
                          >
                            <input
                              name="place"
                              id={i.id}
                              type="checkbox"
                              value={i.id}
                            />
                            <label htmlFor={i.id} className="modal-label">
                              {i.name}
                            </label>
                          </p>
                        );
                      })}
                  </div>
                </li>
              </ul>
              <div className="submit-btn">
                <button type="submit" className="btn">
                  設定する
                </button>
                <span className="btn-space"></span>
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setModalIsOpen(false)}
                >
                  閉じる
                </button>
              </div>
            </form>
          </div>
          {loading && <Loading />}
        </Modal>
      </div>
    </>
  );
};

export default ReserveStopSetting;
