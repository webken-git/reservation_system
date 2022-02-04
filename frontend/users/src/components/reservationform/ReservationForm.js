import React, { useState, useEffect, useRef } from "react";
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
const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

// const schema = reservationSchema;
export const ReservationForm = React.forwardRef(({ placeLists }, ref) => {
  const [FormData, setFormData] = useRecoilState(formData);
  let tab = useRecoilValue(tabState);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    // criteriaMode: "all",
    reValidateMode: "onSubmit",
  });
  const error = Object.values(errors); // エラーがあるかどうか
  const [, setList] = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  // const [message, setMessage] = useState("");
  const setPopup = useSetRecoilState(popupState);
  const AgeData = useFetch({
    url: ReservationUrls.AGE,
  });
  // const UsageData = useFetch({
  //   url: ReservationUrls.USAGE,
  // });
  // const EquipmentData = useFetch({
  //   url: ReservationUrls.EQUIPMENT,
  // });
  // 選択中の施設を取得
  const placeId = parseInt(tab.placeId);
  const placeName = tab.placeName;

  const formRef = useRef();
  // scrollToRefの位置にスクロールする
  const scrollToElement = (element) => {
    element.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onSubmit = (e) => {
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    // const reservation = placeName;
    const age = getValues("ageGroup");
    const id = getId();
    delete e["ageGroup"];
    delete e["StartDate"];
    delete e["EndDate"];
    // 利用区分を取得
    const i = e.usage;
    const t = e.profits;
    const w = e.collect;
    const usageList = [i, t, w];
    // var i_name = UsageData.filter((item) => {
    //   if (item.id === i) return true;
    // });
    // const t_name = getUsageName(t);
    // const w_name = getUsageName(w);
    // const usageName = [i_name, t_name, w_name];
    const data = {
      ...e,
      start,
      end,
      // reservation,
      id,
      age,
      placeId,
      placeName,
      startDate,
      endDate,
      usageList,
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

  // カーリングの時だけplace_numberにレーンのシート分投げる
  useEffect(() => {
    const placeNum = [];
    for (let i = 1; i < 4; i++) {
      let numList = { id: i, value: i };
      placeNum.push(numList);
      setList(placeNum);
    }
  }, []);
  const checkUseDevice = (e) => {
    //trueなら TextFiledを表示
    setCheckValue(e.target.value);
  };
  const paymentChange = (e) => {
    //trueなら TextFiledを表示
    setCheckPayment(e.target.value);
  };

  const handleCheck = (ageGroupId, e) => {
    let values = getValues("ageGroup") || [];

    let newValues = [];
    // 選択されている場合
    if (e.target.checked) {
      // 選択されているageGroupIdを追加
      newValues = [...values, ageGroupId];
    } else {
      // 選択されていないageGroupIdを削除
      newValues = values.filter((value) => value !== ageGroupId);
    }
    setValue("ageGroup", newValues);
    return newValues;
  };

  return (
    <Grid container alignItems="center" justifyContent={"center"} ref={formRef}>
      <div className={form.parent_elements}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* {message && (
            <div className="reserve-message">
              <p>{message}</p>
            </div>
          )} */}
          <div>
            <Label>年齢：</Label>
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
                  rules={{ required: "選択してください。" }}
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
                              field.onChange(handleCheck(ageGroup.id, e))
                            }
                            control={
                              <Checkbox
                                // onClick={checkAgeValue}
                                // onChange={checkAgeValue}
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
            <FormControl error>
              <FormHelperText>
                {errors.usage && errors.usage.message}
              </FormHelperText>
              <FormGroup>
                <Controller
                  //radio buttonを制御するController
                  name="usage"
                  control={control}
                  rules={{ required: "選択してください。" }}
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        {...field}
                        row
                        value={field.value === undefined ? "" : field.value}
                        className={form.usage}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label="アマチュアスポーツ"
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label="一般利用"
                          // error={"usage" in errors}
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio />}
                          label="競技会使用"
                          // error={"usage" in errors}
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
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      {...field}
                      row
                      value={field.value === undefined ? "" : field.value}
                      className={form.profits}
                    >
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
          <div></div>
          <div>
            <FormControl error>
              <FormHelperText>
                {errors.collect && errors.collect.message}
              </FormHelperText>
              <Controller
                //radio buttonを制御するController
                name="collect"
                control={control}
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      {...field}
                      row
                      value={field.value === undefined ? "" : field.value}
                      className={form.profits}
                    >
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
                  </>
                )}
              />
            </FormControl>
          </div>
          {tab.max - tab.min > 0 && (
            <div>
              <Label>予約するシート数または範囲の指定：</Label>
              <Controller
                name="placeNumber"
                control={control}
                defaultValue=""
                rules={{ required: "入力" }}
                render={({ field }) => (
                  <div>
                    <TextField
                      style={{ width: "200px" }}
                      select
                      size="Normal"
                      defaultValue=""
                      label="選択してください"
                      error={"placeNumber" in errors}
                      {...field}
                    >
                      {(tab.min === 0.5 &&
                        [tab.min, tab.max].map((value, index) => (
                          <MenuItem key={index} value={value}>
                            {value === 0.5 ? "半面" : "全面"}
                          </MenuItem>
                        ))) ||
                        // max - minが1以上なら、max - min分のMenuItemを作成
                        (tab.max - tab.min + 1 > 0 &&
                          Array.from(Array(tab.max - tab.min + 1), (_v, i) => {
                            return (
                              <MenuItem key={i} value={i + tab.min}>
                                {i + tab.min}
                              </MenuItem>
                            );
                          }))}
                    </TextField>
                  </div>
                )}
              />
            </div>
          )}
          <div>
            <div>
              <Controller
                name="StartDate"
                control={control}
                defaultValue={new Date()}
                rules={{ required: "入力" }}
                render={({ field }) => (
                  <div className={form.StartDate}>
                    <Label>利用日時：</Label>
                    <LocalizationProvider dateAdapter={DateAdapter} locale={ja}>
                      <DesktopDatePicker
                        {...field}
                        label="利用日時:年/月/日"
                        mask="____/__/__"
                        renderInput={(params) => <TextField {...params} />}
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
                      label="利用開始時間"
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
            <div>
              <Controller
                name="EndDate"
                control={control}
                defaultValue={new Date()}
                rules={{ required: "入力" }}
                render={({ field }) => (
                  <div className={form.EndDate}>
                    <Label>
                      <br />
                    </Label>
                    <LocalizationProvider dateAdapter={DateAdapter} locale={ja}>
                      <DesktopDatePicker
                        {...field}
                        label="年/月/日"
                        mask="____/__/__"
                        renderInput={(params) => <TextField {...params} />}
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
                      label="利用終了時間"
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
          </div>
          <div>
            <Controller
              //   TextFiledを制御するController
              name="reason"
              control={control}
              rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div className={form.reason}>
                  <Label>利用目的：</Label>
                  <TextField
                    {...field}
                    label="利用目的を入力してください。"
                    variant="outlined"
                    error={"reason" in errors}
                    // 公式で説明している書き方だけどerrorでる
                    // helperText={errors.reason?.message}
                  />
                </div>
              )}
            />
          </div>
          <Grid container>
            <Grid item lg={3}>
              <FormControl error>
                <Label>主催関係者</Label>
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
                        type={"text"}
                        inputMode="numeric"
                        style={{ width: "150px" }}
                        placeholder="半角数字で入力"
                        {...register("staffNum", {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "数字を入力してください",
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
            <Grid item lg={3}>
              <FormControl error>
                <Label>参加人数</Label>
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
                        type={"text"}
                        inputMode="numeric"
                        style={{ width: "150px" }}
                        placeholder="半角数字で入力"
                        {...register("useNum", {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "数字を入力してください",
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
          <Label>附属設備もしくは器具の使用：</Label>
          <FormControl error>
            <FormHelperText>
              {errors.device && errors.device.message}
            </FormHelperText>
            <Controller
              //Checkboxを制御するController
              control={control}
              name="device"
              defaultValue={""}
              rules={{ required: "選択してください。" }}
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
                        control={<Radio onChange={checkUseDevice} />}
                        labelPlacement="end"
                      />
                    ))}
                  </RadioGroup>
                </>
              )}
            />
          </FormControl>
          <div className={form.usedevice}>
            {checkValue === "true" && (
              <Controller
                control={control}
                name="useDevice"
                defaultValue=""
                rules={{ required: "選択してください。" }}
                render={({ field }) => <TextField {...field} />}
              />
            )}
          </div>
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
              rules={{ required: "選択してください。" }}
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
                        control={<Radio onChange={paymentChange} />}
                        labelPlacement="end"
                      />
                    ))}
                  </RadioGroup>
                </>
              )}
            />
          </FormControl>
          <div className={form.usedevice}>
            {checkPayment === "true" && (
              <Controller
                control={control}
                name="payLater"
                defaultValue=""
                rules={{ required: "選択してください。" }}
                render={({ field }) => <TextField {...field} />}
              />
            )}
          </div>
          <div className="submit-btn">
            <button type="submit" className="btn">
              追加する
            </button>
          </div>
        </form>
      </div>
    </Grid>
  );
});
let id = 0;
function getId() {
  return id++;
}
