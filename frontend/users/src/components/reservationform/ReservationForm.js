import React, { useState, useEffect } from "react";
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
import { ReservationStep } from "./ReservationStep.js";
import { useFetch } from "../../hooks/useFetch";
import { usePlaceName } from "../../hooks/usePlaceName";
import { reservationSchema } from "./FormYup";
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
  Button,
  styled,
  FormHelperText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ReservationUrls } from "../../utils/reservationUrls";
const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

const schema = reservationSchema;
export const ReservationForm = () => {
  const [FormData, setFormData] = useRecoilState(formData);
  const tab = useRecoilValue(tabState);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [Data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  const [ageValue, setAgeValue] = useState([]);
  const [reservationId, setReservationId] = useState(0);
  const AgeData = useFetch({
    url: ReservationUrls.AGE,
  });
  const PlaceNames = usePlaceName(tab);

  const onSubmit = (e) => {
    console.log(e);
    //このままだとbackend側で使えないのでyyyy-LL-ddに変換
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const placeName = PlaceNames;
    const age = ageValue;
    const id = getId();
    // 選択中のタブを取得
    let placeId = tab;
    delete e["ageGroup"];
    // delete e["StartDate"];
    // delete e["EndDate"];
    const i = e.usage;
    const t = e.profits;
    const w = e.collect;
    const usageList = [i, t, w];
    const data = {
      ...e,
      start,
      end,
      placeName,
      id,
      age,
      placeId,
      startDate,
      endDate,
      reservationId,
      usageList,
    };
    setFormData(data);
    console.log(data);
    // let a = [];
    // a.push(data);
    // console.log(a);
  };

  // カーリングの時だけplace_numberにレーンのシート分投げる
  useEffect(() => {
    //利用人数99人までのListを生成
    const useNum = [];
    for (let i = 1; i < 100; i++) {
      let obj = { id: i, value: i };
      useNum.push(obj);
      setData(useNum);
    }
  }, []);
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
      <div className={form.parent_elements}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>予約情報入力</h1>
          <div>
            <>年齢</>
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
                        <FormControl error>
                          <FormControlLabel
                            {...field}
                            key={id}
                            label={ageGroup.name}
                            value={ageGroup.id}
                            control={<Checkbox onClick={checkAgeValue} />}
                            labelPlacement="end"
                          />
                          {/* <FormHelperText>
                          {errors.ageGroup?.message}
                        </FormHelperText> */}
                        </FormControl>
                      ))}
                  </div>
                )}
              />
            </FormGroup>
          </div>
          <Label>利用区分:</Label>
          <div>
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
                      error={"usage" in errors}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="一般利用"
                      error={"usage" in errors}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="競技会使用"
                      error={"usage" in errors}
                    />
                  </RadioGroup>
                </>
              )}
            />
          </div>
          <div>
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
          </div>
          <div></div>
          <div>
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
          </div>
          <div>
            <Controller
              name="placeNumber"
              control={control}
              defaultValue=""
              rules={{ required: "入力" }}
              render={({ field }) => (
                <div>
                  <TextField
                    style={{ width: "100px" }}
                    select
                    size="Normal"
                    defaultValue=""
                    label="予約シート数"
                    {...field}
                  >
                    {tab === 1 ? (
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
                defaultValue={new Date()}
                rules={{ required: "入力" }}
                render={({ field }) => (
                  <div className={form.StartDate}>
                    <Label>利用日時</Label>
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
                      style={{ width: "100px" }}
                      size="Normal"
                      select
                      defaultValue=""
                      label="何時から"
                      {...field}
                    >
                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}
                      {tabState === 1
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
                      style={{ width: "100px" }}
                      select
                      size="Normal"
                      defaultValue=""
                      label="何時まで"
                      {...field}
                    >
                      {/* カーリング場と他の施設ではtimetableが違うので条件分岐 */}

                      {tab === 1
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
              // rules={{ required: "入力してください" }}
              defaultValue=""
              render={({ field }) => (
                <div className={form.reason}>
                  <p>利用目的</p>
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
                    style={{ width: "100px" }}
                    select
                    size="Normal"
                    defaultValue=""
                    label="人"
                    {...field}
                  >
                    <MenuItem>
                      <em></em>
                    </MenuItem>
                    {Data.map((useNum, id) => (
                      <MenuItem key={id} label={useNum.id} value={useNum.value}>
                        {useNum.value}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    style={{ width: "100px" }}
                    select
                    size="Normal"
                    defaultValue=""
                    label="人"
                    {...field}
                  >
                    <MenuItem>
                      <em></em>
                    </MenuItem>
                    {Data.map((useNum, id) => (
                      <MenuItem key={id} label={useNum.id} value={useNum.value}>
                        {useNum.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            />
          </div>
          <FormControl>
            <Controller
              //Checkboxを制御するController
              control={control}
              name="device"
              defaultValue={""}
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <>
                  <Label>附属設備もしくは器具の使用</Label>
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
          <FormControl>
            <Controller
              //Checkboxを制御するController
              control={control}
              name="deferredPayment"
              defaultValue={""}
              rules={{ required: "選択してください。" }}
              render={({ field }) => (
                <>
                  <Label>後納申請</Label>
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
