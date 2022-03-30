import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import ja from "date-fns/locale/ja";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
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
  FormHelperText,
} from "@mui/material";
import Loading from "../loading/Loading";
import "./ReservationList.scss";
export const ReservationList = () => {
  const [data, setData] = useRecoilState(formData);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [indexCheck, setIndexCheck] = useState(0);
  const [place, setPlace] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  const UsageData = useFetch({
    url: ReservationUrls.USAGE,
  });
  const AgeData = useFetch({
    url: ReservationUrls.AGE,
  });
  const EquipmentData = useFetch({
    url: ReservationUrls.EQUIPMENT,
  });
  const PlaceNameData = useFetch({
    url: ReservationUrls.PLACE,
  });
  useEffect(() => {
    //modalIsOpenの値が変わる度にformをresetする
    //resetしないとdefaultValueが前の値のままになる
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);
  const checkIndex = (index) => {
    editPlaceData(data[index].placeId);
    //編集するために予約でのmapのindexを知る必要がある。
    setIndexCheck(index);
  };

  const editPlaceData = (id) => {
    //placeのidを取得し、PlaceNameDataを検索する
    PlaceNameData.find((data) => (data.id === id ? setPlace(data) : null));
  };

  const handleCheck = (ageGroupId, name, e) => {
    let values = getValues(name) || [];

    let newValues = [];
    // 選択されている場合
    if (e.target.checked) {
      // 選択されているageGroupIdを追加
      newValues = [...values, ageGroupId];
    } else {
      // 選択されていないageGroupIdを削除
      newValues = values.filter((value) => value !== ageGroupId);
    }
    setValue(name, newValues);
    return newValues;
  };

  // const defaultValues = [data[0].ageName];
  const onSubmit = (e) => {
    setLoading(true);
    setErrorMessage("");
    const formDataList = data;
    const id = indexCheck;
    // e.startDateをyyyy-mm-dd形式に変換
    const startDate =
      new Date(e.startDate).getFullYear() +
      "-" +
      ("0" + (new Date(e.startDate).getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date(e.startDate).getDate()).slice(-2);
    // e.endDateをyyyy-mm-dd形式に変換
    const endDate =
      new Date(e.endDate).getFullYear() +
      "-" +
      ("0" + (new Date(e.endDate).getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date(e.endDate).getDate()).slice(-2);
    const startTime = e.startTime;
    const endTime = e.endTime;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const placeId = e.placeId;
    const age = getValues("ageGroup");
    const placeNumber = getValues("placeNumber") ? getValues("placeNumber") : 0;

    // 予約情報が予約停止期間に含まれているかどうかチェック
    axios
      .get(ReservationUrls.SUSPENSION_CHECK, {
        params: {
          places__id: placeId,
          start: start,
          end: end,
        },
      })
      .then((res) => {
        // 予約情報が他の承認済みの予約と重なっているかどうかチェック
        axios
          .get(ReservationUrls.RESERVE_CHECK, {
            params: {
              reservation__place: placeId,
              reservation__start: start,
              reservation__end: end,
              reservation__place_number: placeNumber,
            },
          })
          .then((res) => {
            //placeNameを取得
            const a = PlaceNameData.find((i) => i.id === placeId);
            const placeName = a.name;
            // 配列ageに入っている値をAgeDataから取得
            const ageName = [];
            age.map((age) => {
              const a = AgeData.find((data) => data.id === age).name;
              ageName.push(a);
              return ageName;
            });
            const equipmentName = [];
            if (e.device === "true") {
              e.equipment.map((equipment) => {
                const equip = EquipmentData.find(
                  (data) => data.id === equipment
                ).name;
                equipmentName.push(equip);
                return equipmentName;
              });
            }
            const usageList = ["1", e.usage, e.profits, e.collect];
            const usageName = [];
            usageList.map((usage) => {
              const u = UsageData.find(
                (data) => data.id === Number(usage)
              ).name;
              usageName.push(u);
              return usageName;
            });
            delete e["ageGroup"];
            delete e["startDate"];
            delete e["endDate"];
            formDataList[id].age = age;
            formDataList[id].ageName = ageName;
            formDataList[id].usage = e.usage;
            formDataList[id].profits = e.profits;
            formDataList[id].collect = e.collect;
            formDataList[id].usageList = usageList;
            formDataList[id].usageName = usageName;
            formDataList[id].startDate = startDate;
            formDataList[id].endDate = endDate;
            formDataList[id].start = start;
            formDataList[id].end = end;
            formDataList[id].equipmentName = equipmentName;
            formDataList[id].placeId = placeId;
            formDataList[id].placeName = placeName;
            formDataList[id].reason = e.reason;
            formDataList[id].staffNum = e.staffNum;
            formDataList[id].useNum = e.useNum;
            formDataList[id].deferredPayment = e.deferredPayment;
            formDataList[id].device = e.device;
            if (e.collect === "6") {
              formDataList[id].admissionFee = e.admissionFee;
            } else {
              delete formDataList[id].admissionFee;
            }
            if (place.max - place.min > 0) {
              formDataList[id].placeNumber = e.placeNumber;
            } else if (place.max - place.min === 0) {
              // formDataList[id].placeNumberを削除
              delete formDataList[id].placeNumber;
            }
            if (e.specialEquipment === "" || e.specialEquipment === null) {
              delete formDataList[id].specialEquipment;
            } else if (e.device === "true") {
              formDataList[id].equipment = e.equipment;
              formDataList[id].specialEquipment = e.specialEquipment;
            } else {
              delete formDataList[id].equipment;
              delete formDataList[id].specialEquipment;
            }
            setData([...formDataList]);
            setLoading(false);
            setModalIsOpen(false);
          })
          .catch((err) => {
            setLoading(false);
            setErrorMessage(
              "既に承認済みの予約と重なっています。利用開始日時及び利用終了日時を変更してください。"
            );
          });
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(
          "予約停止期間に予約することはできません。利用開始日時及び利用終了日時を変更してください。"
        );
      });
  };
  const remove = (index) => {
    const list = [...data];
    //削除ボタンをクリックでitem.mapのindexをidに指定
    const id = index;
    //listのid番目以外で新しい配列を作成
    const newArray = list.filter((n) => n !== list[id]);
    setData([...newArray]);
    window.location.reload();
  };

  return (
    <>
      <div className="RL-root">
        {data.length === 0 ? (
          // <Grid container alignItems="center" justifyContent={"center"}>
          <div className="reservation-list">
            <h2 className="title">追加された予約情報がありません</h2>
            <Link to="/">
              <button type="button" className="back-btn">
                戻る
              </button>
            </Link>
          </div>
        ) : (
          // </Grid>
          <div className="reservation-list">
            <h2 className="title">追加した予約一覧</h2>
            {/* 追加されたデータを1件ずつ表示 */}
            <Grid container>
              {data.map((item, index) => {
                return (
                  <Grid className="reserve-data" key={index} item lg={3} sm={5}>
                    <ul>
                      <li className="start">
                        <label>開始日時：</label>
                        <span>{item.start}</span>
                      </li>
                      <li className="end">
                        <label>終了日時：</label>
                        <span>{item.end}</span>
                      </li>
                      <li>
                        <label>施設名：</label>
                        <span>{item.placeName}</span>
                      </li>
                      <li>
                        <label>年齢区分：</label>
                        {item.ageName.map((age, index) => {
                          return <span key={index}>{age} </span>;
                        })}
                      </li>
                      <li>
                        <label>利用区分：</label>
                        {item.usageName.map((usage, index) => {
                          return (
                            <span key={index} className="usage-content">
                              {usage}
                            </span>
                          );
                        })}
                      </li>
                      <li className="number">
                        <label>主催関係者：</label>
                        <span className="table-cell">{item.staffNum}人 </span>
                      </li>
                      <li className="number">
                        <label>参集人員：</label>
                        <span className="table-cell">{item.useNum}人</span>
                      </li>
                      <li>
                        <label>利用目的：</label>
                        <span className="reason">{item.reason}</span>
                      </li>
                      {item.device === "true" ? (
                        <>
                          <li className="device">
                            <label>附属設備・器具の使用：</label>
                            {item.equipmentName.map((equipment, index) => {
                              return (
                                <span key={index} className="usage-content">
                                  {equipment}
                                </span>
                              );
                            })}
                          </li>
                          <li className="device">
                            <label>特別設備：</label>
                            <span>{item.specialEquipment}</span>
                          </li>
                        </>
                      ) : null}
                      <li className="deferredPayment">
                        <label>後納申請：</label>
                        <span>
                          {item.deferredPayment === "true"
                            ? "利用する"
                            : "利用しない"}
                        </span>
                      </li>
                      {item.deferredPayment === "true" ? (
                        <li className="deferredPaymentReason">
                          <label>後納の理由：</label>
                          <span>{item.deferredPaymentReason}</span>
                        </li>
                      ) : null}
                    </ul>
                    <button
                      className="back-btn"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      削除
                    </button>
                    <span className="btn-space"></span>
                    <button
                      className="verify-btn"
                      onClick={() => {
                        // editPlaceData(data[index].placeId);
                        setModalIsOpen(true);
                        checkIndex(index);
                      }}
                    >
                      編集
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      className="modal-content"
                      overlayClassName="reserve-modal-overlay"
                    >
                      <div className="modal-wrapper">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          noValidate
                          className="reserve-modal-form"
                        >
                          <div className="modal-title">
                            <h2 className="modal-title-left">編集</h2>
                            <div className="modal-title-right">
                              <button
                                type="button"
                                className="back-btn"
                                onClick={() => {
                                  setModalIsOpen(false);
                                  setErrorMessage("");
                                }}
                              >
                                閉じる
                              </button>
                              <span className="btn-space"></span>
                              <button type="submit" className="btn">
                                完了
                              </button>
                            </div>
                          </div>
                          {errorMessage.length > 0 && (
                            <>
                              {
                                // モーダル内の一番上にスクロールする
                              }
                              <div className="reserve-error">
                                <p>{errorMessage}</p>
                              </div>
                            </>
                          )}
                          <div className="modalPlaceName form-group">
                            <p className="form-item">施設名:</p>
                            <Controller
                              name="placeId"
                              defaultValue={
                                data[indexCheck].placeId === undefined
                                  ? ""
                                  : data[indexCheck].placeId
                              }
                              control={control}
                              rules={{ required: "選択してください。" }}
                              render={({ field }) => (
                                <TextField
                                  style={{ width: "150px" }}
                                  select
                                  size="Normal"
                                  error={"placeName" in errors}
                                  helperext={
                                    errors.placeName ? "入力してください" : ""
                                  }
                                  {...field}
                                >
                                  {PlaceNameData.map((i, index) => (
                                    <MenuItem
                                      key={index}
                                      label={i.name}
                                      value={i.id === undefined ? "" : i.id}
                                      onClick={() => {
                                        editPlaceData(i.id);
                                      }}
                                    >
                                      {i.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </div>
                          <div className="modalAgeData form-group">
                            <p className="form-item">年齢区分：</p>
                            <FormControl error>
                              <FormHelperText>
                                {errors.ageGroup && errors.ageGroup.message}
                              </FormHelperText>
                              <FormGroup>
                                <Controller
                                  //Checkboxを制御するController
                                  control={control}
                                  id="ageGroup"
                                  name="ageGroup"
                                  defaultValue={data[indexCheck].age}
                                  rules={{ required: "選択してください" }}
                                  render={({ field }) => (
                                    <div>
                                      {AgeData &&
                                        AgeData.map((ageGroup, id) => (
                                          <FormControlLabel
                                            {...field}
                                            key={id}
                                            label={ageGroup.name}
                                            value={ageGroup.id}
                                            onChange={(e) =>
                                              field.onChange(
                                                handleCheck(
                                                  ageGroup.id,
                                                  "ageGroup",
                                                  e
                                                )
                                              )
                                            }
                                            control={
                                              <Checkbox
                                                defaultChecked={data[
                                                  indexCheck
                                                ].age.includes(ageGroup.id)}
                                                // checked={
                                                //   !!field.value.includes(
                                                //     ageGroup.id
                                                //   )
                                                // }
                                              />
                                            }
                                            labelPlacement="end"
                                          />
                                        ))}
                                    </div>
                                  )}
                                />
                              </FormGroup>
                            </FormControl>
                          </div>
                          <div className="modalUsage form-group">
                            <p className="form-item">利用区分：</p>
                            <FormControl error>
                              <FormHelperText>
                                {errors.usage && errors.usage.message}
                              </FormHelperText>
                              <FormGroup>
                                <Controller
                                  //radio buttonを制御するController
                                  name="usage"
                                  control={control}
                                  defaultValue={data[indexCheck].usage}
                                  rules={{ required: "選択してください" }}
                                  render={({ field }) => (
                                    <>
                                      <p className="sp-tab">(1)　</p>
                                      <RadioGroup
                                        {...field}
                                        row
                                        value={
                                          field.value === undefined
                                            ? ""
                                            : field.value
                                        }
                                      >
                                        <p className="pc">(1)　</p>
                                        <FormControlLabel
                                          value={2}
                                          control={<Radio />}
                                          label="一般利用"
                                        />
                                        <FormControlLabel
                                          value={3}
                                          control={<Radio />}
                                          label="競技会使用"
                                        />
                                      </RadioGroup>
                                    </>
                                  )}
                                />
                              </FormGroup>
                            </FormControl>
                          </div>
                          <div className="modalProfits form-group">
                            <FormControl error>
                              <FormHelperText>
                                {errors.profits && errors.profits.message}
                              </FormHelperText>
                              <Controller
                                //radio buttonを制御するController
                                name="profits"
                                defaultValue={data[indexCheck].profits}
                                control={control}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <p className="sp-tab">(2)　</p>
                                    <RadioGroup
                                      {...field}
                                      row
                                      value={
                                        field.value === undefined
                                          ? ""
                                          : field.value
                                      }
                                    >
                                      <p className="pc">(2)　</p>
                                      <FormControlLabel
                                        value={5}
                                        control={<Radio />}
                                        label="営利"
                                      />
                                      <FormControlLabel
                                        value={4}
                                        control={<Radio />}
                                        label="非営利"
                                      />
                                    </RadioGroup>
                                  </>
                                )}
                              />
                            </FormControl>
                          </div>
                          <div className="modalCollect form-group">
                            <FormControl error>
                              <FormHelperText>
                                {errors.collect && errors.collect.message}
                              </FormHelperText>
                              <Controller
                                //radio buttonを制御するController
                                name="collect"
                                defaultValue={data[indexCheck].collect}
                                control={control}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <p className="sp-tab">(3)　</p>
                                    <RadioGroup
                                      {...field}
                                      row
                                      value={
                                        field.value === undefined
                                          ? ""
                                          : field.value
                                      }
                                    >
                                      <p className="pc">(3)　</p>
                                      <FormControlLabel
                                        value={6}
                                        control={<Radio />}
                                        label="入場料を徴収する"
                                      />
                                      <FormControlLabel
                                        value={7}
                                        control={<Radio />}
                                        label="入場料を徴収しない"
                                      />
                                    </RadioGroup>
                                    {field.value === "6" && (
                                      <div className="form-group2">
                                        <FormControl error>
                                          <p className="form-item">
                                            徴収する入場料の最高額：
                                            <span className="red">
                                              <br />
                                              ※単位は不要です
                                            </span>
                                          </p>
                                          <FormHelperText>
                                            {errors.admissionFee &&
                                              errors.admissionFee.message}
                                          </FormHelperText>
                                          <Controller
                                            name="admissionFee"
                                            defaultValue={
                                              data[indexCheck].admissionFee
                                            }
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
                                                  {...register("admissionFee", {
                                                    required: "必須項目です",
                                                    pattern: {
                                                      value: /^[0-9]+$/,
                                                      message:
                                                        "数字を入力してください",
                                                    },
                                                    maxLength: {
                                                      value: 5,
                                                      message:
                                                        "5桁以内で入力してください",
                                                    },
                                                  })}
                                                  error={
                                                    "admissionFee" in errors
                                                  }
                                                  {...field}
                                                />
                                              </>
                                            )}
                                          />
                                        </FormControl>
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </FormControl>
                          </div>
                          {place && place.max - place.min > 0 && (
                            <div className="form-group">
                              <FormControl error>
                                <p className="form-item">
                                  予約するシート数または範囲の指定：
                                </p>
                                <FormHelperText>
                                  {errors.placeNumber &&
                                    errors.placeNumber.message}
                                </FormHelperText>
                                <Controller
                                  name="placeNumber"
                                  control={control}
                                  defaultValue={data[indexCheck].placeNumber}
                                  render={({ field }) => (
                                    <div>
                                      <TextField
                                        style={{ width: "200px" }}
                                        select
                                        size="Normal"
                                        defaultValue=""
                                        {...register("placeNumber", {
                                          required: "選択してください",
                                        })}
                                        error={"placeNumber" in errors}
                                        {...field}
                                      >
                                        {(place.min === 0.5 &&
                                          [place.min, place.max].map(
                                            (value, index) => (
                                              <MenuItem
                                                key={index}
                                                value={value}
                                              >
                                                {value === 0.5
                                                  ? "半面"
                                                  : "全面"}
                                              </MenuItem>
                                            )
                                          )) ||
                                          // max - minが1以上なら、max - min分のMenuItemを作成
                                          (place.max - place.min + 1 > 0 &&
                                            Array.from(
                                              Array(place.max - place.min + 1),
                                              (_v, i) => {
                                                return (
                                                  <MenuItem
                                                    key={i}
                                                    value={i + place.min}
                                                  >
                                                    {i + place.min}
                                                  </MenuItem>
                                                );
                                              }
                                            ))}
                                      </TextField>
                                    </div>
                                  )}
                                />
                              </FormControl>
                            </div>
                          )}
                          <div className="modalStartDate form-group">
                            <div>
                              <FormControl error>
                                <p className="form-item">利用開始日時：</p>
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
                                      // yyyy-mm-ddThh:mmからyyyy/mm/ddに変更
                                      new Date(
                                        data[indexCheck].startDate
                                      ).toLocaleDateString("ja-JP")
                                    }
                                    render={({ field }) => (
                                      <div>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDateFns}
                                          locale={ja}
                                        >
                                          <MobileDatePicker
                                            {...field}
                                            label="利用開始日時"
                                            mask="____/__/__"
                                            inputFormat="yyyy/MM/dd"
                                            value={
                                              field.value === undefined
                                                ? ""
                                                : field.value
                                            }
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
                                </div>
                              </FormControl>
                            </div>
                          </div>
                          <div className="modalStart form-group">
                            <p className="form-item">開始時間：</p>
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
                                  defaultValue={data[indexCheck].startTime}
                                  control={control}
                                  render={({ field }) => (
                                    <div>
                                      <TextField
                                        style={{ width: "150px" }}
                                        size="Normal"
                                        select
                                        defaultValue={
                                          data[indexCheck].startTime
                                        }
                                        {...register("startTime", {
                                          required: "選択してください",
                                        })}
                                        error={"startTime" in errors}
                                        {...field}
                                      >
                                        {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                        {data[index].placeName ===
                                        "カーリング場"
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
                              </FormControl>
                            </div>
                          </div>
                          <div className="modalEndDate form-group">
                            <FormControl error>
                              <p className="form-item">利用終了日時：</p>
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
                                  defaultValue={new Date(
                                    data[indexCheck].endDate
                                  ).toLocaleDateString("ja-JP")}
                                  render={({ field }) => (
                                    <div>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        locale={ja}
                                      >
                                        <MobileDatePicker
                                          {...field}
                                          label="利用終了日時"
                                          mask="____/__/__"
                                          inputFormat="yyyy/MM/dd"
                                          value={
                                            field.value === undefined
                                              ? ""
                                              : field.value
                                          }
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
                              </div>
                            </FormControl>
                          </div>
                          <div className="modalEnd form-group">
                            <p className="form-item">終了時間:</p>
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
                                defaultValue={data[indexCheck].endTime}
                                control={control}
                                rules={{
                                  required: "選択してください",
                                }}
                                render={({ field }) => (
                                  <div>
                                    <TextField
                                      style={{ width: "150px" }}
                                      select
                                      size="Normal"
                                      defaultValue=""
                                      {...register("endTime", {
                                        required: "選択してください",
                                      })}
                                      error={"endTime" in errors}
                                      {...field}
                                    >
                                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                                      {data.placeName === "カーリング場"
                                        ? curlingTimetable.map(
                                            (timetables, id) => (
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
                                            )
                                          )
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
                            </FormControl>
                          </div>
                          <div className="modalStaffNum form-group">
                            <FormControl error>
                              <p className="form-item">
                                主催関係者数：
                                <span className="red">
                                  <br />
                                  ※単位は不要です
                                </span>
                              </p>
                              <FormHelperText>
                                {errors.staffNum && errors.staffNum.message}
                              </FormHelperText>
                              <Controller
                                name="staffNum"
                                defaultValue={data[indexCheck].staffNum}
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
                          <div className="modalUseNum form-group">
                            <FormControl error>
                              <p className="form-item">
                                参集人員数：
                                <span className="red">
                                  <br />
                                  ※単位は不要です
                                </span>
                              </p>
                              <FormHelperText>
                                {errors.useNum && errors.useNum.message}
                              </FormHelperText>
                              <Controller
                                name="useNum"
                                defaultValue={data[indexCheck].useNum}
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
                          <div className="modalReason form-group">
                            <FormControl error>
                              <p className="form-item">利用目的：</p>
                              <FormHelperText>
                                {errors.reason && errors.reason.message}
                              </FormHelperText>
                              <Controller
                                //   TextFiledを制御するController
                                name="reason"
                                defaultValue={data[indexCheck].reason}
                                control={control}
                                render={({ field }) => (
                                  <div>
                                    <TextField
                                      inputProps={{ inputMode: "text" }}
                                      {...field}
                                      type={"text"}
                                      style={{ width: "225px" }}
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
                          <div className="modalDevice form-group">
                            <p className="form-item">附属設備・器具の使用：</p>
                            <FormControl error>
                              <FormHelperText>
                                {errors.device && errors.device.message}
                              </FormHelperText>
                              <Controller
                                //Checkboxを制御するController
                                control={control}
                                name="device"
                                defaultValue={data[indexCheck].device}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <RadioGroup {...field} row>
                                      {useDevice.map((useDevices, index) => (
                                        <FormControlLabel
                                          key={index}
                                          label={useDevices.label}
                                          value={useDevices.value}
                                          control={<Radio />}
                                          labelPlacement="end"
                                        />
                                      ))}
                                    </RadioGroup>
                                    {field.value === "true" && (
                                      // valueがtrueの場合
                                      <>
                                        <div>
                                          <FormControl error>
                                            <FormHelperText>
                                              {errors.equipment &&
                                                errors.equipment.message}
                                            </FormHelperText>
                                            <Controller
                                              control={control}
                                              name="equipment"
                                              defaultValue={
                                                data[indexCheck].device ===
                                                  "true" &&
                                                data[indexCheck].equipment
                                              }
                                              render={({ field }) =>
                                                EquipmentData &&
                                                EquipmentData.map(
                                                  (equipment, id) => (
                                                    <FormControlLabel
                                                      {...field}
                                                      key={id}
                                                      label={equipment.name}
                                                      value={equipment.id}
                                                      onChange={(e) =>
                                                        field.onChange(
                                                          handleCheck(
                                                            equipment.id,
                                                            "equipment",
                                                            e
                                                          )
                                                        )
                                                      }
                                                      control={
                                                        <Checkbox
                                                          defaultChecked={
                                                            data[indexCheck]
                                                              .device ===
                                                              "true" &&
                                                            data[
                                                              indexCheck
                                                            ].equipment.includes(
                                                              equipment.id
                                                            )
                                                          }
                                                        />
                                                      }
                                                      labelPlacement="end"
                                                    />
                                                  )
                                                )
                                              }
                                            />
                                          </FormControl>
                                        </div>
                                        <div className="modalSpecialEquipment">
                                          <FormControl error>
                                            <p className="form-item">
                                              特別設備：
                                              <span className="red">
                                                ※必須項目ではありません
                                              </span>
                                            </p>
                                            <FormHelperText>
                                              {errors.specialEquipment &&
                                                errors.specialEquipment.message}
                                            </FormHelperText>
                                            <Controller
                                              control={control}
                                              name="specialEquipment"
                                              defaultValue={
                                                data[indexCheck]
                                                  .specialEquipment
                                              }
                                              render={({ field }) => (
                                                <TextField
                                                  {...field}
                                                  style={{ width: "225px" }}
                                                />
                                              )}
                                            />
                                          </FormControl>
                                        </div>
                                      </>
                                    )}
                                  </>
                                )}
                              />
                            </FormControl>
                          </div>
                          <div className="modalDeferredPayment form-group">
                            <p className="form-item">後納申請：</p>
                            <FormControl error>
                              <FormHelperText>
                                {errors.deferredPayment &&
                                  errors.deferredPayment.message}
                              </FormHelperText>
                              <Controller
                                //Checkboxを制御するController
                                control={control}
                                name="deferredPayment"
                                defaultValue={data[indexCheck].deferredPayment}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <RadioGroup {...field} row>
                                      {deferredPayment.map(
                                        (deferredPayments, index) => (
                                          <FormControlLabel
                                            key={index}
                                            label={deferredPayments.label}
                                            value={deferredPayments.value}
                                            control={<Radio />}
                                            labelPlacement="end"
                                          />
                                        )
                                      )}
                                    </RadioGroup>
                                  </>
                                )}
                              />
                            </FormControl>
                          </div>
                        </form>
                        {loading && <Loading />}
                      </div>
                    </Modal>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};
