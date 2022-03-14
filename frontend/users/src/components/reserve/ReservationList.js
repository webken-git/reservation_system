import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useForm, Controller, useController } from "react-hook-form";
import { ReservationUrls } from "../../utils/reservationUrls";
import { useFetch } from "../../hooks/useFetch";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { ja } from "date-fns/locale";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { format } from "date-fns";
import { usePlaceName } from "../../hooks/usePlaceName";
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
import "./ReservationList.scss";
export const ReservationList = () => {
  const [data, setData] = useRecoilState(formData);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [indexCheck, setIndexCheck] = useState(0);
  const [placeName, setPlaceName] = useState("");
  const [usageValue, setUsageValue] = useState();
  const [profitValue, setProfitValue] = useState();
  const [collectValue, setCollectValue] = useState();
  const [deviceValue, setDeviceValue] = useState("");
  const [deferredPaymentValue, setDeferredPaymentValue] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
    watch,
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
  // console.log(PlaceNameData);
  useEffect(() => {
    //modalIsOpenの値が変わる度にformをresetする
    //resetしないとdefaultValueが前の値のままになる
    reset();
  }, [modalIsOpen]);
  const checkIndex = (index) => {
    //編集するために予約でのmapのindexを知る必要がある。
    setIndexCheck(index);
    console.log(indexCheck);
  };
  const deleteIndexCheck = (index) => {
    setDeleteIndex(index);
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

  // PlaceNameData &&
  //   PlaceNameData.map((data) => {
  //     const a = PlaceNameData.find((i) => i.id === data).name;
  //     console.log(a);
  //   });
  // if (PlaceNameData) {
  //   const a = PlaceNameData.find((i) => i.id === 1);
  //   console.log(a);
  // }
  // const defaultValues = [data[0].ageName];
  console.log(data);
  const onSubmit = (e) => {
    const formDataList = data;
    const id = indexCheck;
    console.log(formDataList[id]);
    const startDate = format(e.startDate, "yyyy-MM-dd");
    const endDate = format(e.endDate, "yyyy-MM-dd");
    const startTime = e.startTime;
    const endTime = e.endTime;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const age = getValues("ageGroup");
    const aa2 = getValues("placeId");
    console.log(aa2);
    const placeId = e.placeId;
    //placeNameを取得
    if (PlaceNameData) {
      const a = PlaceNameData.find((i) => i.id === placeId);
      const placeName = a.name;
      console.log(a);
      console.log(placeName);
      setPlaceName(placeName);
    }
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
        const equip = EquipmentData.find((data) => data.id === equipment).name;
        equipmentName.push(equip);
        return equipmentName;
      });
    }
    const usageList = [e.usage, e.profits, e.collect];
    const usageName = [];
    usageList.map((usage) => {
      const u = UsageData.find((data) => data.id === Number(usage)).name;
      usageName.push(u);
      return usageName;
    });
    delete e["ageGroup"];
    delete e["startDate"];
    delete e["endDate"];
    formDataList[id].age = e.age;
    formDataList[id].admissionFee = e.admissionFee;
    formDataList[id].ageName = ageName;
    formDataList[id].collect = e.collect;
    formDataList[id].deferredPayment = e.deferredPayment;
    formDataList[id].device = e.device;
    formDataList[id].start = start;
    formDataList[id].end = end;
    formDataList[id].equipmentName = equipmentName;
    formDataList[id].placeId = placeId;
    formDataList[id].placeName = placeName;
    formDataList[id].profits = e.profits;
    formDataList[id].reason = e.reason;
    formDataList[id].staffNum = e.staffNum;
    formDataList[id].usage = e.usage;
    formDataList[id].usageList = e.usageList;
    formDataList[id].usageName = usageName;
    formDataList[id].useNum = e.useNum;
    formDataList[id].specialEquipment = e.specialEquipment;
    formDataList[id].deferredPaymentReason = e.deferredPaymentReason;
    setData([...formDataList]);
  };
  const remove = () => {
    const list = [...data];
    //削除ボタンをクリックでitem.mapのindexをidに指定
    const id = deleteIndex;
    //listのid番目以外で新しい配列を作成
    const newArray = list.filter((n) => n != list[id]);
    setData([...newArray]);
  };
  const onModal = () => {
    setIsOpen(true);
    const id = indexCheck;
    console.log(indexCheck);
    // setValue("placeId", data[0].placeId);
    // setValue("startTime", data[indexCheck].startTime);
    // setValue("endTime", data[indexCheck].endTime);
    setValue("staffNum", data[indexCheck].staffNum);
    setValue("useNum", data[indexCheck].useNum);
    setValue("reason", data[indexCheck].reason);
    setValue("admissionFee", data[indexCheck].admissionFee);
    setUsageValue(data[id].usage);
    setProfitValue(data[id].profits);
    setCollectValue(data[id].collect);
    setDeviceValue(data[id].device);
    setDeferredPaymentValue(data[id].deferredPayment);
  };
  const usageChange = (e) => {
    console.log(e.target.value);
    setUsageValue(e.target.value);
  };
  const profitChange = (e) => {
    setProfitValue(e.target.value);
  };
  const collectChange = (e) => {
    setCollectValue(e.target.value);
  };
  const deviceChange = (e) => {
    setDeviceValue(e.target.value);
  };
  const deferredPaymentChange = (e) => {
    setDeferredPaymentValue(e.target.value);
  };
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
                      <li>
                        <div>施設名：</div>
                        <span>{item.placeName}</span>
                      </li>
                      <li>
                        <div>年齢区分：</div>
                        {item.ageName.map((age, index) => {
                          return <span key={index}>{age} </span>;
                        })}
                      </li>
                      <li>
                        <div>利用区分：</div>
                        {item.usageName.map((usage, index) => {
                          return (
                            <span key={index} className="usage-content">
                              {usage}
                            </span>
                          );
                        })}
                      </li>
                      <li className="start">
                        <label>開始日時：</label>
                        <span>{item.start}</span>
                      </li>
                      <li className="end">
                        <label>終了日時：</label>
                        <span>{item.end}</span>
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
                        deleteIndexCheck(index);
                        remove();
                      }}
                    >
                      削除
                    </button>
                    <button
                      style={{ marginLeft: 50 }}
                      className="btn"
                      onClick={() => {
                        onModal();
                        // setIsOpen(true);
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modalPlaceName">
                          <div>
                            施設名:
                            <Controller
                              name="placeId"
                              defaultValue={data[indexCheck].placeId}
                              control={control}
                              rules={{ required: "選択してください。" }}
                              render={({ field }) => (
                                <TextField
                                  style={{ width: "150px" }}
                                  select
                                  size="Normal"
                                  defaultValue=""
                                  label="施設名"
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
                                    >
                                      {i.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </div>
                          <div className="modalAgeData">
                            <div>年齢区分：</div>
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
                                  defaultValue={""}
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
                                                // defaultChecked={defaultValues.includes(
                                                //   ageGroup.name
                                                // )}
                                                checked={
                                                  !!field.value.includes(
                                                    ageGroup.id
                                                  )
                                                }
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
                          <div className="modalUsage">
                            <div>利用区分：</div>
                            <FormControl error>
                              <FormHelperText>
                                {errors.usage && errors.usage.message}
                              </FormHelperText>
                              <FormGroup>
                                <Controller
                                  //radio buttonを制御するController
                                  name="usage"
                                  control={control}
                                  rules={{ required: "選択してください" }}
                                  render={({ field }) => (
                                    <>
                                      <p
                                      // className="sp"
                                      >
                                        {/* (1)　 */}
                                      </p>
                                      <RadioGroup
                                        {...field}
                                        row
                                        onClick={usageChange}
                                        value={
                                          usageValue
                                          // field.value === undefined
                                          //   ? ""
                                          //   : field.value
                                        }
                                        // className={form.usage}
                                      >
                                        <p className="pc-tab">(1)　</p>
                                        <FormControlLabel
                                          value={1}
                                          control={<Radio />}
                                          label="アマチュアスポーツ"
                                        />
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
                          <div className="modalProfits">
                            <FormControl error>
                              <FormHelperText>
                                {errors.profits && errors.profits.message}
                              </FormHelperText>
                              <Controller
                                //radio buttonを制御するController
                                name="profits"
                                defaultValue=""
                                control={control}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <p className="sp">(2)　</p>
                                    <RadioGroup
                                      {...field}
                                      row
                                      onClick={profitChange}
                                      value={
                                        profitValue
                                        // field.value === undefined
                                        //   ? ""
                                        //   : field.value
                                      }
                                      // className={form.profits}
                                    >
                                      <p className="pc-tab">(2)　</p>
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

                          <div className="modalCollect">
                            <FormControl error>
                              <FormHelperText>
                                {errors.collect && errors.collect.message}
                              </FormHelperText>
                              <Controller
                                //radio buttonを制御するController
                                name="collect"
                                defaultValue=""
                                control={control}
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <p className="sp">(3)　</p>
                                    <RadioGroup
                                      {...field}
                                      row
                                      onClick={collectChange}
                                      value={
                                        collectValue
                                        // field.value === undefined
                                        //   ? ""
                                        //   : field.value
                                      }
                                      // className={form.profits}
                                    >
                                      <p className="pc-tab">(3)　</p>
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
                                      <div>
                                        <FormControl error>
                                          <div>
                                            徴収する入場料の最高額：
                                            <span className="red">
                                              <br />
                                              ※単位は不要です
                                            </span>
                                          </div>
                                          <FormHelperText>
                                            {errors.admissionFee &&
                                              errors.admissionFee.message}
                                          </FormHelperText>
                                          <Controller
                                            defaultValue=""
                                            name="admissionFee"
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
                          <div className="modalStartDate">
                            <div>
                              <FormControl error>
                                <div>利用開始日時：</div>
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
                                      data[0].startDate
                                      // 初期値は現在の日付 + 1日
                                      // new Date().getTime() + 1000 * 60 * 60 * 24
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
                                        label="利用開始時間"
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
                          <div className="modalEndDate">
                            <FormControl error>
                              <div>利用終了日時：</div>
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
                                      label="利用終了時間"
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
                          <div className="modalStaffNum">
                            <FormControl error>
                              <div>
                                主催関係者数：
                                <span className="red">
                                  <br />
                                  ※単位は不要です
                                </span>
                              </div>
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
                          <div className="modalUseNum">
                            <FormControl error>
                              <div>
                                参集人員数：
                                <span className="red">
                                  <br />
                                  ※単位は不要です
                                </span>
                              </div>
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
                          <div className="modalReason">
                            <FormControl error>
                              <div>利用目的：</div>
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
                          <div className="modalDevice">
                            <div>附属設備・器具の使用：</div>
                            <FormControl error>
                              <FormHelperText>
                                {errors.device && errors.device.message}
                              </FormHelperText>
                              <Controller
                                //Checkboxを制御するController
                                control={control}
                                name="device"
                                defaultValue=""
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <RadioGroup
                                      {...field}
                                      row
                                      value={
                                        deviceValue
                                        // field.value === undefined
                                        //   ? ""
                                        //   : field.value
                                      }
                                      onClick={deviceChange}
                                    >
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
                                              defaultValue={data.equipment}
                                              rules={{
                                                required: "選択してください",
                                              }}
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
                                                        // checked={
                                                        //   !!field.value.includes(
                                                        //     equipment.id
                                                        //   )
                                                        // }
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
                                            <div>
                                              特別設備：
                                              <span className="red">
                                                ※必須項目ではありません
                                              </span>
                                            </div>
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
                                                // item.specialEquipment
                                              }
                                              render={({ field }) => (
                                                <TextField {...field} />
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
                          <div className="modalDeferredPayment">
                            <div>後納申請：</div>
                            <FormControl error>
                              <FormHelperText>
                                {errors.deferredPayment &&
                                  errors.deferredPayment.message}
                              </FormHelperText>
                              <Controller
                                //Checkboxを制御するController
                                control={control}
                                name="deferredPayment"
                                defaultValue=""
                                rules={{ required: "選択してください" }}
                                render={({ field }) => (
                                  <>
                                    <RadioGroup
                                      {...field}
                                      row
                                      value={
                                        deferredPaymentValue
                                        // field.value === undefined
                                        //   ? ""
                                        //   : field.value
                                      }
                                      onClick={deferredPaymentChange}
                                    >
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
                                    {field.value === "true" && (
                                      // valueがtrueの場合
                                      <div
                                      // className={deferredPaymentReason}
                                      >
                                        <FormControl error>
                                          <div>後納の理由：</div>
                                          <FormHelperText>
                                            {errors.deferredPaymentReason &&
                                              errors.deferredPaymentReason
                                                .message}
                                          </FormHelperText>
                                          <Controller
                                            control={control}
                                            name="deferredPaymentReason"
                                            defaultValue={
                                              data[indexCheck]
                                                .deferredPaymentReason
                                              // item.deferredPaymentReason
                                            }
                                            render={({ field }) => (
                                              <TextField
                                                {...field}
                                                {...register(
                                                  "deferredPaymentReason",
                                                  {
                                                    required: "必須項目です",
                                                  }
                                                )}
                                                error={
                                                  "deferredPaymentReason" in
                                                  errors
                                                }
                                              />
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
                        </div>
                        <button
                          className="back-btn"
                          ｄ
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          閉じる
                        </button>
                        <button
                          style={{ marginLeft: 30 }}
                          type="submit"
                          className="btn"
                        >
                          編集する
                        </button>
                      </form>
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
