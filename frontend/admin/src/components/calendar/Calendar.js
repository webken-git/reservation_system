import React, { useEffect, useState } from "react";
import "./calendar.scss";
import Head from "./Head";
import Content from "./Content";
import Select from "./Select";
import MonthlyCalendar from "./MonthlyCalendar";
import Loading from "./../loading/Loading.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Box, HStack, ModalCloseButton, Stack } from "@chakra-ui/react";
import DrawerMenu from "../sidebar/DrawerMenu";
import "../header/header.scss";
import UserIcon from "../header/usericon/UserIcon";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ja } from "date-fns/locale";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";
import {
  FormControl,
  FormControlLabel,
  TextField,
  FormGroup,
  MenuItem,
  styled,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import {
  timetable,
  useDevice,
  deferredPayment,
  curlingTimetable,
} from "./FormDataList";
import form from "./ReservationForm.module.scss";
import tabState from "../../recoil/tab";
import { format } from "date-fns";
import { formData, popupState } from "../../recoil/form/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { ReservationUrls } from "../../utils/reservationUrls";

const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

const Calendar = (props) => {
  const unmountRef = useUnmountRef();
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  const [date, setDate] = useState(new Date());
  const [dateList, setDateList] = useState([]); //表示用のリスト
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [st, setSt] = useState(0);
  const [placeFilter, setPlaceFilter] = useState();
  const [calendarType, setCalendarType] = useState("weekly");
  const [approvalFilter, setApprovalFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMain = true;
  const [FormData, setFormData] = useRecoilState(formData);
  const setPopup = useSetRecoilState(popupState);
  const [place, setPlace] = useSafeState(unmountRef, []);
  const [approvals, setApprovals] = useSafeState(unmountRef, []);

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

  const getPlaceList = () => {
    axios
      .get(ReservationUrls.PLACE)
      .then((response) => {
        const placeLists = response.data;
        setPlace(placeLists);
        setPlaceFilter(placeLists[0].name)
      })
      .catch((error) => {});    
  };

  const getApprovalList = () => {
    axios
      .get(ReservationUrls.APPROVALS)
      .then((response) => {
        const approvalLists = response.data;
        setApprovals(approvalLists);
        setApprovalFilter(approvalLists[0].id)
      })
      .catch((error) => {});    
  };

  let tab = useRecoilValue(tabState);

  const placeName = tab.placeName;

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // 検索する施設名を変数に代入
  const filtering = (e) => {
    console.log("filtering");
    setPlaceFilter(e.target.value);
  };

  const approvalFiltering = (e) => {
    setApprovalFilter(e.target.value);
  };

  const dateChange = (e) => {
    if (calendarType === "weekly") {
      if (e === "next") {
        const nextDate = new Date(date.setDate(date.getDate() + 7));
        setDate(nextDate);
      } else if (e === "last") {
        const nextDate = new Date(date.setDate(date.getDate() - 7));
        setDate(nextDate);
      }
    } else if (calendarType === "daily") {
      if (e === "next") {
        const nextDate = new Date(date.setDate(date.getDate() + 1));
        setDate(nextDate);
      } else if (e === "last") {
        const nextDate = new Date(date.setDate(date.getDate() - 1));
        setDate(nextDate);
      }
    }
  };


  const onSubmit = (e) => {

    console.log("aaa")
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const place = e.place;
    
    axios.post(ReservationUrls.SUSPENSION,{
        start: start,
        end: end,
        place_id: place,
      })
    .then(res => {
      setModalIsOpen(false)
    })
    .catch( error => {
      console.log(error);
      // setModalIsOpen(false)
    })

    // const n = new Date(start);
    // console.log(n)

    delete e["StartDate"];
    delete e["EndDate"];
    const data = {
      ...e,
      start,
      end,
      startDate,
      endDate,
    };
    const list = [...FormData, data];
    setFormData(list);
    // フォームをリセット
    reset();
    setPopup({
      isOpen: true,
      message: "予約情報を追加しました",
    });

    // setTimeout(() => {
    //   setPopup({
    //     isOpen: false,
    //     message: "",
    //   });
    // }, 1500);
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
    console.log(newValues)
    setValue(name, newValues);
    // console.log(newValues)
    return newValues;
  };

  useEffect(() => {
    setLoading(true);
    let unmounted = false;
    let dateDict = {};
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + i
      );
      dateDict["date" + i] = newDate;
    }
    for (let i = 1; i < 7; i++) {
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - i
      );
      dateDict["mdate" + i] = newDate;
    }
    const sortDateList = () => {
      let dateList = [];
      for (let day = dateDict["date0"].getDay(); day > 0; day--) {
        dateList.push(dateDict["mdate" + day]);
      }
      for (let day = 0; day < 7 - dateDict["date0"].getDay(); day++) {
        dateList.push(dateDict["date" + day]);
      }
      if (!unmounted) {
        setDateList(dateList);
      }
    };
    sortDateList();
    getPlaceList();
    getApprovalList();

    return () => {
      unmounted = true;
    };
  }, [date, setDate, setCalendarType]);

  return (
    <div className="calendar-base">
      {calendarType === "monthly" ? (
        <MonthlyCalendar
          dayList={dayList}
          date={date}
          setDate={setDate}
          setCalendarType={setCalendarType}
          calendarType={calendarType}
          setLoading={setLoading}
        />
      ) : (
        <div className="maii">
          <div className="header">
            <Stack>
              <HStack p={5} className="drawer-menu">
                <Box display={{ base: "block", md: "none" }}>
                  <DrawerMenu />
                </Box>
              </HStack>
            </Stack>
            {/* <div className="header_title">{props.pagename}</div> */}
            <div className="header_title">カレンダー</div>
            {/* 各ページにあった名前に変更できるようにpropsにする */}
            {/* 表示するカレンダーの種類 */}
            <Select
              calendarType={calendarType}
              setCalendarType={setCalendarType}
            />
            {/* 日付表示・変更するボタン */}
            <div className="date-selector">
              <div className="last-button" onClick={() => dateChange("last")}>
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
              </div>
              {calendarType === "daily" ? (
                <div className="date-base">
                <p>
                  {year}年{month}月{day}日
                </p>
                {/* <input type="date" className="date-input"/> */}
              </div>
              ) : (
                <div className="date-base">
                  <p>
                    {year}月{month}月
                  </p>
                  {/* <input type="date" className="date-input"/> */}
                </div>
              )}
              <div className="next-button" onClick={() => dateChange("next")}>
                <FontAwesomeIcon icon={faChevronRight} size="2x" />
              </div>
            </div>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ul>
                      <li>
                        <div>
                          <FormControl error>
                            <FormHelperText>
                              {errors.StartDate && errors.StartDate.message}
                            </FormHelperText>
                            <FormGroup>
                              <Controller
                                name="StartDate"
                                control={control}
                                defaultValue={new Date().getTime() + 1000 * 60 * 60 * 24}
                                // rules={{ required: "入力" }}
                                render={({ field }) => (
                                  <div className={form.StartDate}>
                                    <Label>開始日時：</Label>
                                    <LocalizationProvider
                                      dateAdapter={DateAdapter}
                                      locale={ja}
                                    >
                                      <DesktopDatePicker
                                        {...field}
                                        label="年/月/日"
                                        mask="____/__/__"
                                        minDate={new Date().getTime() + 1000 * 60 * 60 * 24}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            {...register("startDate", {
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
                              {errors.usage && errors.usage.message}
                            </FormHelperText>
                            <FormGroup>
                              <Controller
                                name="Start"
                                defaultValue=""
                                control={control}
                                // rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <div className={form.start}>
                                    <TextField
                                      style={{ width: "150px" }}
                                      size="Normal"
                                      select
                                      defaultValue=""
                                      label="開始時間"
                                      error={"Start" in errors}
                                      {...field}
                                    >
                                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                      {placeName === "カーリング場"
                                        ? curlingTimetable.map((timetables, id) => (
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
                                          ))
                                        : timetable.map((timetables, id) => (
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
                          <FormControl error>
                            <FormHelperText>
                              {errors.usage && errors.usage.message}
                            </FormHelperText>
                            <FormGroup>
                              <Controller
                                name="EndDate"
                                control={control}
                                defaultValue={
                                  new Date().getTime() + 1000 * 60 * 60 * 24
                                }
                                render={({ field }) => (
                                  <div className={form.EndDate}>
                                    <Label>終了日時</Label>
                                    <LocalizationProvider
                                      dateAdapter={DateAdapter}
                                      locale={ja}
                                    >
                                      <DesktopDatePicker
                                        {...field}
                                        label="年/月/日"
                                        mask="____/__/__"
                                        minDate={new Date().getTime() + 1000 * 60 * 60 * 24}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            {...register("endDate", {
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
                              {errors.usage && errors.usage.message}
                            </FormHelperText>
                            <FormGroup>
                              <Controller
                                name="End"
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
                                      label="終了時間"
                                      {...register("endTime", {
                                        required: "選択してください",
                                      })}
                                      error={"End" in errors}
                                      {...field}
                                    >
                                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}

                                    {placeName === "カーリング場"
                                      ? curlingTimetable.map((timetables, id) => (
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
                                        ))
                                      : timetable.map((timetables, id) => (
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
                        <Label>施設名：</Label>
                        {place.map((i, index) => {
                          return (
                            <label key={index} onChange={(e) => handleCheck(i.id, "place", e)}>
                              <span><input name="place" type="checkbox" value={i.id}/></span>
                              <span>{i.name}</span>
                            </label>
                          )
                        })}
                      </div>
                    </li>
                    </ul>
                    <div className="submit-btn">
                      <button type="submit" className="btn">
                        設定する
                      </button>
                      {/* <button type="button" className="back-btn" onClick={() => setModalIsOpen(false)}>
                        閉じる
                      </button> */}
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
            <UserIcon />
          </div>
          <div className="main">
            <div className="main-header">
              <div className="date-selector">
                <div className="last-button" onClick={() => dateChange("last")}>
                  <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </div>
                {calendarType === "daily" ? (
                  <div className="date-base">
                  <p>
                    {month}月{day}日
                  </p>
                  {/* <input type="date" className="date-input"/> */}
                </div>
                ) : (
                  <div className="date-base">
                    <p>
                      {year}年{month}月
                    </p>
                    {/* <input type="date" className="date-input"/> */}
                  </div>
                )}
                <div className="next-button" onClick={() => dateChange("next")}>
                  <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </div>
              </div>
              <div className="filter-base">
                <select
                  className="filter"
                  defaultValue={place[0] && place[0].name}
                  onChange={(e) => filtering(e)}
                >
                  {place.map((i, index) => {
                    return (
                      <option value={i.name} key={index}>{i.name}</option>
                    )                    
                  })}
                </select>
              </div>
              <div className="filter-base">
                <select
                  className="filter"
                  defaultValue={approvals[0] && approvals[0].name}
                  onChange={(e) => approvalFiltering(e)}
                >
                  {approvals.map((i, index) => {
                    return (
                      <option value={i.id} key={index}>{i.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="head-row">
              <div className="timeline"></div>
              {calendarType === "weekly" ? (
                dateList.map((date, index) => {
                  return (
                    <Head
                      key={index}
                      day={dayList[index]}
                      date={date}
                      calendarType={calendarType}
                    />
                  );
                })
              ) : (
                <Head
                  // key={index}
                  // day={dayList[index]}
                  date={date}
                  calendarType={calendarType}
                />
              )}
            </div>
            <div className="content-row">
              {/* 現在時刻を表示する */}
              <div className="now-time" style={{ top: st }}>
                <div className="circle"></div>
                <div className="border"></div>
              </div>
              <div className="timeline">
                <div>
                  <p>9</p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div>
                  <p>11</p>
                </div>
                <div>
                  <p>12</p>
                </div>
                <div>
                  <p>13</p>
                </div>
                <div>
                  <p>14</p>
                </div>
                <div>
                  <p>15</p>
                </div>
                <div>
                  <p>16</p>
                </div>
                <div>
                  <p>17</p>
                </div>
                <div>
                  <p>18</p>
                </div>
                <div>
                  <p>19</p>
                </div>
                <div>
                  <p>20</p>
                </div>
                <div>
                  <p>21</p>
                </div>
              </div>
              {calendarType === "weekly" ? (
                dateList.map((date, index) => {
                  return (
                    <Content
                      key={index}
                      date={date}
                      updateFlag={updateFlag}
                      setUpdateFlag={setUpdateFlag}
                      isMain={isMain}
                      homeUpdateFlag={props.homeUpdateFlag}
                      setHomeUpdateFlag={props.setHomeUpdateFlag}
                      placeFilter={placeFilter}
                      setLoading={setLoading}
                      approvalFilter={approvalFilter}
                      calendarType={calendarType}
                    />
                  );
                })
              ) : (
                // <div className="daily-content">
                <Content
                  // key={index}
                  date={date}
                  // setScheduleDict={setScheduleDict}
                  // openModal={openModal}
                  updateFlag={updateFlag}
                  setUpdateFlag={setUpdateFlag}
                  isMain={isMain}
                  // individualOrGroup={props.individualOrGroup}
                  homeUpdateFlag={props.homeUpdateFlag}
                  setHomeUpdateFlag={props.setHomeUpdateFlag}
                  placeFilter={placeFilter}
                  setLoading={setLoading}
                  calendarType={calendarType}
                  approvalFilter={approvalFilter}
                />
                // </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Calendar;
