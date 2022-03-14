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
import { Box, HStack, Stack } from "@chakra-ui/react";
import DrawerMenu from "../sidebar/DrawerMenu";
import "../header/header.scss";
import UserIcon from "../header/usericon/UserIcon";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ja } from "date-fns/locale";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  FormControl,
  FormControlLabel,
  TextField,
  FormGroup,
  MenuItem,
  styled,
  FormHelperText,
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
  const dayList = ["日", "月", "火", "水", "木", "金", "土"];
  const [date, setDate] = useState(new Date());
  const [dateList, setDateList] = useState([]); //表示用のリスト
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [st, setSt] = useState(0);
  const [filterType, setFilterType] = useState("カーリング場");
  const [calendarType, setCalendarType] = useState("weekly");
  const [approvalFilter, setApprovalFilter] = useState(2);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMain = true;
  const [FormData, setFormData] = useRecoilState(formData);
  const setPopup = useSetRecoilState(popupState);

  const {
    control,
    handleSubmit,
    // getValues,
    // setValue,
    // register,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  let tab = useRecoilValue(tabState);

  const placeName = tab.placeName;

  const modalToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // 検索する施設名を変数に代入
  const filtering = (e) => {
    console.log("filtering");
    setFilterType(e.target.value);
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
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);

    // console.log(startDate)
    // console.log(startTime)
    console.log(start);

    // const suspensionStart = new Date(start)
    // const suspensionStart = format(start, "yyyy-LL-dd HH:mm")
    // const suspensionEnd = format(end, "yyyy-LL-dd HH:mm")
    // console.log(suspensionStart)

    axios
      .post(`${ReservationUrls.SUSPENSION}`, {
        start: start,
        end: end,
      })
      .then((res) => {
        console.log(res.data);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        // setModalIsOpen(false)
      });

    // const n = new Date(start);
    // console.log(n)

    delete e["StartDate"];
    delete e["EndDate"];
    const data = {
      ...e,
      start,
      end,
      // equipmentName,
      // id,
      // age,
      // ageName,
      // placeId,
      // placeName,
      startDate,
      endDate,
      // usageList,
      // usageName,
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

    //現在時刻までスクロール
    let margin = window.innerHeight * 0.02;
    let blockHeight = window.innerHeight * 0.06;
    let now = new Date();
    let hours = now.getHours() - 4;
    let st = now.getHours() < 4 ? 0 : margin + blockHeight * hours;
    if (!unmounted) {
      setSt(margin + blockHeight * now.getHours());
    }
    document.getElementsByClassName("content-row")[0].scrollTo({
      top: st,
      left: 0,
      behavior: "smooth",
    });

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
                <p>
                  {year}年{month}月{day}日
                </p>
              ) : (
                <p>
                  {year}年{month}月
                </p>
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
                          <Controller
                            name="StartDate"
                            control={control}
                            defaultValue={new Date()}
                            rules={{ required: "入力" }}
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
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            )}
                          />
                        </div>
                        <div>
                          <Controller
                            name="Start"
                            defaultValue=""
                            control={control}
                            rules={{ required: "選択してください" }}
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
                        </div>
                      </li>
                      <li>
                        <div>
                          <Controller
                            name="EndDate"
                            control={control}
                            defaultValue={new Date()}
                            rules={{ required: "入力" }}
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
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            )}
                          />
                        </div>
                        <div>
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
                        </div>
                      </li>
                    </ul>
                    <div className="submit-btn">
                      <button type="submit" className="btn">
                        設定する
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
            <UserIcon />
          </div>
          <div className="main">
            <div className="main-header">
              <div className="filter-base">
                <select
                  className="filter"
                  defaultValue="カーリング場"
                  onChange={(e) => filtering(e)}
                >
                  <option value="カーリング場">カーリング場</option>
                  <option value="小会議室">小会議室</option>
                  <option value="中会議室">中会議室</option>
                  <option value="武道場">武道場</option>
                  <option value="多目的体育館">多目的体育館</option>
                </select>
              </div>
              <div className="filter-base">
                <select
                  className="filter"
                  defaultValue="2"
                  onChange={(e) => approvalFiltering(e)}
                >
                  <option value="2">承認済み</option>
                  <option value="1">未承認</option>
                  <option value="3">不承認</option>
                  <option value="4">キャンセル</option>
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
                      // setScheduleDict={setScheduleDict}
                      // openModal={openModal}
                      updateFlag={updateFlag}
                      setUpdateFlag={setUpdateFlag}
                      isMain={isMain}
                      // individualOrGroup={props.individualOrGroup}
                      homeUpdateFlag={props.homeUpdateFlag}
                      setHomeUpdateFlag={props.setHomeUpdateFlag}
                      filterType={filterType}
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
                  filterType={filterType}
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
