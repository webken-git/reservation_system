import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, Controller, get } from "react-hook-form";
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
import { usePlaceName } from "../../hooks/usePlaceName";
import form from "./ReservationForm.module.scss";
import { formData } from "../../recoil/form/atom";
import tabState from "../../recoil/tab";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useFetch } from "../../hooks/useFetch";
import { Thanks } from "./Thanks";
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
import { ReservationUrls } from "../../utils/reservationUrls";
const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

export const ReservationForm = () => {
  const resetFormData = useResetRecoilState(formData);
  const [FormData, setFormData] = useRecoilState(formData);
  const tab = useRecoilValue(tabState);
  const [list, setList] = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  const [ageValue, setAgeValue] = useState([]);
  const [ageList, setAgeList] = useState([]);
  const AgeData = useFetch({
    url: ReservationUrls.AGE,
  });
  const UsageData = useFetch({
    url: ReservationUrls.USAGE,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      ageGroup: "",
      usage: "",
      profits: "",
      collect: "",
      placeNumber: "",
      StartDate: new Date(),
      Start: "",
      EndDate: new Date(),
      End: "",
      reason: "",
      staffNum: "",
      useNum: "",
      device: "",
      useDevice: "",
      deferredPayment: "",
      payLater: "",
    },
  });

  useEffect(() => {
    //tabを変更する度にformをリセット
    reset();
  }, [tab]);
  // console.log(getId());
  const onSubmit = (e) => {
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    console.log(startDate <= endDate);
    if (startDate <= endDate === true) {
      const start = startDate.concat(" ", startTime);
      const end = endDate.concat(" ", endTime);
      const age = ageValue;
      // const id = getId();
      // 選択中の施設を取得
      const placeId = tab.placeId;
      const placeName = tab.placeName;
      delete e["ageGroup"];
      delete e["StartDate"];
      delete e["EndDate"];
      // 利用区分を取得
      const i = e.usage;
      const t = e.profits;
      const w = e.collect;
      const usageList = [i, t, w];
      // const data = {
      //   ...e,
      //   start,
      //   end,
      //   placeName,
      //   age,
      //   placeId,
      //   placeName,
      //   startDate,
      //   endDate,
      //   usageList,
      //   id: getId(),
      // };
      // const list = [...FormData, data, ];
      setFormData((oldFormData) => [
        ...oldFormData,
        {
          ...e,
          start,
          end,
          placeName,
          age,
          placeId,
          placeName,
          startDate,
          endDate,
          usageList,
          id: getId(),
        },
      ]);
      reset();
    }
    if (startDate <= endDate === false) {
    }
  };
  console.log(FormData);
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
      setAgeList([...ageList, e.target.value]);
      //配列の重複要素を削除
      const list = ageList.filter((x, i, self) => self.indexOf(x) === i);
      setAgeValue(list);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent={"center"}>
      <div className={form.parent_elements}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <button onClick={resetFormData()}>aaa</button> */}
          <h1>予約情報入力</h1>
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
          <Label>利用区分：</Label>
          <div>
            <FormControl error>
              <FormHelperText>
                {errors.usage && errors.usage.message}
              </FormHelperText>
              <Controller
                //radio buttonを制御するController
                name="usage"
                rules={{ required: "選択してください。" }}
                control={control}
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
          <div>
            <Controller
              name="placeNumber"
              control={control}
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <div>
                  <TextField
                    style={{ width: "100px" }}
                    select
                    size="Normal"
                    defaultValue=""
                    label="予約シート数"
                    error={"placeNumber" in errors}
                    helperText={errors.placeNumber ? "入力してください" : ""}
                    {...field}
                  >
                    {tab.placeId === 1 ? (
                      list.map((lists, id) => (
                        <MenuItem
                          key={id}
                          label={lists.id}
                          value={lists.value === undefined ? "" : lists.value}
                        >
                          {lists.value}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem label="1" value={1}>
                        1
                      </MenuItem>
                    )}
                  </TextField>
                </div>
              )}
            />
          </div>
          <div>
            <div>
              <Controller
                name="StartDate"
                control={control}
                rules={{ required: "選択してください。" }}
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
                control={control}
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <div className={form.start}>
                    <TextField
                      style={{ width: "100px" }}
                      size="Normal"
                      select
                      defaultValue=""
                      label="何時から"
                      error={"Start" in errors}
                      helperText={errors.Start ? "入力してください" : ""}
                      {...field}
                    >
                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                      {tab.placeId === 1
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
                rules={{ required: "選択してください。" }}
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
                control={control}
                rules={{ required: "選択してください。" }}
                render={({ field }) => (
                  <div className={form.end}>
                    <TextField
                      style={{ width: "100px" }}
                      select
                      size="Normal"
                      defaultValue=""
                      label="何時まで"
                      error={"End" in errors}
                      helperText={errors.End ? "入力してください" : ""}
                      {...field}
                    >
                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}

                      {tab.placeId === 1
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
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <div className={form.reason}>
                  <Label>利用目的：</Label>
                  <TextField
                    {...field}
                    label="利用目的を入力してください。"
                    variant="outlined"
                    error={"reason" in errors}
                    helperText={errors.reason ? "入力してください" : ""}
                  />
                </div>
              )}
            />
          </div>
          <div>
            <Controller
              name="staffNum"
              control={control}
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <div className={form.StaffNum}>
                  <Label>主催関係者</Label>
                  <TextField
                    type="number"
                    style={{ width: "100px" }}
                    size="Normal"
                    label="人"
                    error={"staffNum" in errors}
                    {...field}
                    helperText={errors.staffNum ? "入力してください" : ""}
                  ></TextField>
                </div>
              )}
            />
          </div>
          <div>
            <Label>参加人数</Label>
            <Controller
              name="useNum"
              control={control}
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <>
                  <TextField
                    type="number"
                    style={{ width: "100px" }}
                    size="Normal"
                    label="人"
                    error={"useNum" in errors}
                    {...field}
                    helperText={errors.useNum ? "入力してください" : ""}
                  ></TextField>
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
              rules={{ required: "選択してください。" }}
              name="deferredPayment"
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
                rules={{ required: "選択してください。" }}
                name="payLater"
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
