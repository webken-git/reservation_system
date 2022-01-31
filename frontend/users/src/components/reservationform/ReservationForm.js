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
import { formData } from "../../recoil/form/atom";
import tabState from "../../recoil/tab";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFetch } from "../../hooks/useFetch";
// import { reservationSchema } from "./FormYup";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  // Select,
  MenuItem,
  // SelectField,
  // Button,
  styled,
  FormHelperText,
} from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
import { ReservationUrls } from "../../utils/reservationUrls";
// import { ref } from "yup";
const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

// const schema = reservationSchema;
export const ReservationForm = ({ placeLists }) => {
  const [FormData, setFormData] = useRecoilState(formData);
  let tab = useRecoilValue(tabState);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const [, setList] = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  const [ageValue, setAgeValue] = useState([]);
  // const [ageName, setAgeName] = useState([]);
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
  // Intに変換
  const placeName = tab.placeName;
  // スクロール位置を保持する
  const formRef = useRef(null);

  // scrollToRefの位置にスクロールする
  const scrollToElement = (element) => {
    element.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  // errorがある場合はエラーを表示
  const error = Object.values(errors);

  const onSubmit = (e) => {
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    // const reservation = placeName;
    const age = ageValue;
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
    //
    scrollToElement(formRef);
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
  const checkAgeValue = (e) => {
    //apiに配列で渡す為にcheckした年齢のvalueを配列入れる
    if ({ [e.target.value]: e.target.checked === true }) {
      setAgeValue([...ageValue, e.target.value]);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent={"center"}>
      <div className={form.parent_elements} ref={formRef}>
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
                            control={<Checkbox onClick={checkAgeValue} />}
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
                rules={{ required: "選択してください" }}
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
          <div>
            <Controller
              name="staffNum"
              defaultValue=""
              control={control}
              rules={{ required: "選択してください" }}
              render={({ field }) => (
                <div className={form.StaffNum}>
                  <Label>主催関係者</Label>
                  <TextField
                    type={"number"}
                    style={{ width: "150px" }}
                    label="半角数字で入力"
                    error={"staffNum" in errors}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Label>参加人数</Label>
            <Controller
              name="useNum"
              defaultValue=""
              control={control}
              rules={{ required: "選択してください" }}
              render={({ field }) => (
                <>
                  <TextField
                    type={"number"}
                    style={{ width: "150px" }}
                    label="半角数字で入力"
                    error={"useNum" in errors}
                    {...field}
                  />
                </>
              )}
            />
          </div>
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
          <div className="submitBtn">
            <button type="submit" className="btn">
              追加する
            </button>
          </div>
        </form>
      </div>
    </Grid>
  );
};
let id = 0;
function getId() {
  return id++;
}
