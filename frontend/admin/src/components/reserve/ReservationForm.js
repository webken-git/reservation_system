import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { ja } from "date-fns/locale";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Grid } from "@material-ui/core";
import {
  timetable,
  useDevice,
  deferredPayment,
  curlingTimetable,
} from "./FormDataList";
import { format } from "date-fns";
import form from "./ReservationForm.module.scss";
import { formData, popupState } from "../../recoil/form/atom";
import tabState from "../../recoil/tab";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useFetch } from "../../hooks/useFetch";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  MenuItem,
  styled,
  FormHelperText,
} from "@mui/material";
import { ReservationUrls } from "../../utils/reservationUrls";
import axios from "axios";

const Label = styled("p")({
  fontSize: "1.2rem",
  fontWeight: "bold",
});

export const ReservationForm = React.forwardRef(
  ({ placeLists, equipment }, ref) => {
    const [FormData, setFormData] = useRecoilState(formData);
    let tab = useRecoilValue(tabState);
    const [errorMessage, setErrorMessage] = useState("");
    const setPopup = useSetRecoilState(popupState);
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
    const error = Object.values(errors); // エラーがあるかどうか
    // 選択中の施設を取得
    const placeId = parseInt(tab.placeId);
    const placeName = tab.placeName;

    const AgeData = useFetch({
      url: ReservationUrls.AGE,
    });
    const UsageData = useFetch({
      url: ReservationUrls.USAGE,
    });
    const EquipmentData = equipment;
    // console.log(EquipmentData);

    const formRef = useRef();
    // scrollToRefの位置にスクロールする
    const scrollToElement = (element) => {
      element.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const onSubmit = (e) => {
      setErrorMessage("");
      //このままだとbackend側で使えないのでyyyy-LL-ddに変換
      const startDate = format(e.startDate, "yyyy-LL-dd");
      const endDate = format(e.endDate, "yyyy-LL-dd");
      const startTime = e.startTime;
      const endTime = e.endTime;
      const start = startDate.concat(" ", startTime);
      const end = endDate.concat(" ", endTime);
      const age = getValues("ageGroup");
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
              },
            })
            .then((res) => {
              // 配列ageに入っている値をAgeDataから取得
              const ageName = [];
              age.map((age) => {
                const a = AgeData.find((data) => data.id === age).name;
                ageName.push(a);
                return ageName;
              });
              // 利用区分を取得
              const usageList = ["1", e.usage, e.profits, e.collect];
              const usageName = [];
              usageList.map((usage) => {
                const u = UsageData.find(
                  (data) => data.id === Number(usage)
                ).name;
                usageName.push(u);
                return usageName;
              });
              const equipmentName = [];
              if (e.device === "true" && e.equipment.length > 0) {
                e.equipment.map((equipment) => {
                  const equip = EquipmentData.find(
                    (data) => data.id === equipment
                  ).name;
                  equipmentName.push(equip);
                  return equipmentName;
                });
              }
              delete e["ageGroup"];
              // delete e["startDate"];
              // delete e["endDate"];
              const data = {
                ...e,
                start,
                end,
                equipmentName,
                age,
                ageName,
                placeId,
                placeName,
                usageList,
                usageName,
              };
              const list = [...FormData, data];
              setFormData(list);
              window.scrollTo(0, 0);
              // フォームをリセット
              reset();
              setPopup({
                isOpen: true,
                message: "予約情報を追加しました。",
              });
            })
            .catch((err) => {
              setErrorMessage(
                "既に承認済みの予約と重なっています。利用開始日時及び利用終了日時を変更してください。"
              );
            });
        })
        .catch((err) => {
          setErrorMessage(
            "予約停止期間に予約することはできません。利用開始日時及び利用終了日時を変更してください。"
          );
        });
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

    return (
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        ref={formRef}
      >
        <div className={form.parent_elements}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>予約情報入力</h1>
            {error.length > 0 && (
              <>
                {scrollToElement(formRef)}
                <div className="reserve-error">
                  <p>
                    正しく入力されていない項目があります。
                    <br />
                    メッセージをご確認の上、もう一度ご入力ください。
                  </p>
                </div>
              </>
            )}
            {errorMessage.length > 0 && (
              <>
                {scrollToElement(formRef)}
                <div className="reserve-error">
                  <p>{errorMessage}</p>
                </div>
              </>
            )}
            <div>
              <Label>年齢区分：</Label>
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
                    rules={{ required: "※選択してください" }}
                    render={({ field }) => (
                      <div className={form.ageGroup}>
                        {AgeData &&
                          AgeData.map((ageGroup, id) => (
                            <FormControlLabel
                              {...field}
                              key={id}
                              label={ageGroup.name}
                              value={ageGroup.id}
                              onChange={(e) =>
                                field.onChange(
                                  handleCheck(ageGroup.id, "ageGroup", e)
                                )
                              }
                              control={
                                <Checkbox
                                  checked={!!field.value.includes(ageGroup.id)}
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
            <div>
              <Label>利用区分：</Label>
              <p className="red">(1)から順に選択してください。</p>
              <FormControl error>
                <FormHelperText>
                  {errors.usage && errors.usage.message}
                </FormHelperText>
                <FormGroup>
                  <Controller
                    //radio buttonを制御するController
                    name="usage"
                    control={control}
                    rules={{ required: "※選択してください" }}
                    render={({ field }) => (
                      <>
                        <p className="sp">(1)　</p>
                        <RadioGroup
                          {...field}
                          row
                          value={field.value === undefined ? "" : field.value}
                          className={form.usage}
                        >
                          <p className="pc-tab">(1)　</p>
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
            <div>
              <FormControl error>
                <FormHelperText>
                  {errors.profits && errors.profits.message}
                </FormHelperText>
                <Controller
                  //radio buttonを制御するController
                  name="profits"
                  control={control}
                  rules={{ required: "※選択してください" }}
                  render={({ field }) => (
                    <>
                      <p className="sp">(2)　</p>
                      <RadioGroup
                        {...field}
                        row
                        value={field.value === undefined ? "" : field.value}
                        className={form.profits}
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
            <div>
              <FormControl error>
                <FormHelperText>
                  {errors.collect && errors.collect.message}
                </FormHelperText>
                <Controller
                  //radio buttonを制御するController
                  name="collect"
                  control={control}
                  rules={{ required: "※選択してください" }}
                  render={({ field }) => (
                    <>
                      <p className="sp">(3)　</p>
                      <RadioGroup
                        {...field}
                        row
                        value={field.value === undefined ? "" : field.value}
                        className={form.profits}
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
                            <Label>
                              徴収する入場料の最高額：
                              <span className="red">
                                <br />
                                ※単位は不要です
                              </span>
                            </Label>
                            <FormHelperText>
                              {errors.admissionFee &&
                                errors.admissionFee.message}
                            </FormHelperText>
                            <Controller
                              name="admissionFee"
                              defaultValue=""
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
                                      required: "※必須項目です",
                                      pattern: {
                                        value: /^[0-9]+$/,
                                        message: "※数字を入力してください",
                                      },
                                      maxLength: {
                                        value: 5,
                                        message: "5桁以内で入力してください",
                                      },
                                    })}
                                    error={"admissionFee" in errors}
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
            {tab.max - tab.min > 0 && (
              <div>
                <FormControl error>
                  <Label>予約するシート数または範囲の指定：</Label>
                  <FormHelperText>
                    {errors.placeNumber && errors.placeNumber.message}
                  </FormHelperText>
                  <Controller
                    name="placeNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <TextField
                          style={{ width: "200px" }}
                          select
                          size="Normal"
                          defaultValue=""
                          {...register("placeNumber", {
                            required: "※選択してください",
                          })}
                          error={"placeNumber" in errors}
                          {...field}
                        >
                          {(placeLists.min === 0.5 &&
                            [placeLists.min, placeLists.max].map(
                              (value, index) => (
                                <MenuItem key={index} value={value}>
                                  {value === 0.5 ? "半面" : "全面"}
                                </MenuItem>
                              )
                            )) ||
                            // max - minが1以上なら、max - min分のMenuItemを作成
                            (placeLists.max - placeLists.min + 1 > 0 &&
                              Array.from(
                                Array(placeLists.max - placeLists.min + 1),
                                (_v, i) => {
                                  return (
                                    <MenuItem
                                      key={i}
                                      value={i + placeLists.min}
                                    >
                                      {i + placeLists.min}
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
                      new Date().getTime() + 1000 * 60 * 60 * 24
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
                            minDate={new Date().getTime() + 1000 * 60 * 60 * 24}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                {...register("startDate", {
                                  validate: (value) => {
                                    if (value === "") {
                                      return "※必須項目です";
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
                          required: "※選択してください",
                        })}
                        error={"startTime" in errors}
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
              </FormControl>
            </div>
            <div>
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
                      new Date().getTime() + 1000 * 60 * 60 * 24
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
                            minDate={new Date().getTime() + 1000 * 60 * 60 * 24}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                {...register("endDate", {
                                  validate: (value) => {
                                    if (value === "") {
                                      return "※必須項目です";
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
                  <br />
                </div>
              </FormControl>
            </div>
            <div>
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
                    required: "※選択してください",
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
                          required: "※選択してください",
                        })}
                        error={"endTime" in errors}
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
              </FormControl>
            </div>
            <div>
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
                          required: "※必須項目です",
                        })}
                        error={"reason" in errors}
                      />
                    </div>
                  )}
                />
              </FormControl>
            </div>
            <Grid container>
              <Grid item sm={3}>
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
                    defaultValue=""
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
                            required: "※必須項目です",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※数字を入力してください",
                            },
                            maxLength: {
                              value: 3,
                              message: "1000人以下で入力してください",
                            },
                          })}
                          error={"staffNum" in errors}
                          {...field}
                        />
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={3}>
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
                    defaultValue=""
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
                            required: "※必須項目です",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※数字を入力してください",
                            },
                            maxLength: {
                              value: 3,
                              message: "1000人以下で入力してください",
                            },
                          })}
                          error={"useNum" in errors}
                          {...field}
                        />
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Label>附属設備・器具の使用：</Label>
            <FormControl error>
              <FormHelperText>
                {errors.device && errors.device.message}
              </FormHelperText>
              <Controller
                //Checkboxを制御するController
                control={control}
                name="device"
                defaultValue={""}
                rules={{ required: "※選択してください" }}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      {...field}
                      row
                      value={field.value === undefined ? "" : field.value}
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
                        <div className={form.equipment}>
                          <FormControl error>
                            <FormHelperText>
                              {errors.equipment && errors.equipment.message}
                            </FormHelperText>
                            <Controller
                              control={control}
                              name="equipment"
                              defaultValue=""
                              // rules={{ required: "※選択してください" }}
                              render={({ field }) =>
                                EquipmentData.length > 0 &&
                                EquipmentData.map((equipment, id) => (
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
                                        checked={
                                          !!field.value.includes(equipment.id)
                                        }
                                      />
                                    }
                                    labelPlacement="end"
                                  />
                                ))
                              }
                            />
                          </FormControl>
                        </div>
                        <div className={form.specialEquipment}>
                          <FormControl error>
                            <Label>
                              特別設備：
                              <span className="red">
                                ※必須項目ではありません
                              </span>
                            </Label>
                            <FormHelperText>
                              {errors.specialEquipment &&
                                errors.specialEquipment.message}
                            </FormHelperText>
                            <Controller
                              control={control}
                              name="specialEquipment"
                              defaultValue=""
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  // {...register("specialEquipment", {
                                  //   required: "※必須項目です",
                                  // })}
                                  // error={"specialEquipment" in errors}
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
            <Label>後納申請：</Label>
            <FormControl error>
              <FormHelperText>
                {errors.deferredPayment && errors.deferredPayment.message}
              </FormHelperText>
              <Controller
                //Checkboxを制御するController
                control={control}
                name="deferredPayment"
                defaultValue={""}
                rules={{ required: "※選択してください" }}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      {...field}
                      row
                      value={field.value === undefined ? "" : field.value}
                    >
                      {deferredPayment.map((deferredPayments, index) => (
                        <FormControlLabel
                          key={index}
                          label={deferredPayments.label}
                          value={deferredPayments.value}
                          control={<Radio />}
                          labelPlacement="end"
                        />
                      ))}
                    </RadioGroup>
                  </>
                )}
              />
            </FormControl>
            <div className="submit-btn">
              <button type="submit" className="btn">
                追加する
              </button>
            </div>
          </form>
        </div>
      </Grid>
    );
  }
);

export default Label;
