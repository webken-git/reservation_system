import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { ja } from "date-fns/locale";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { timetable, useDevice, deferredpayment } from "./FormDataList";
import { format } from "date-fns";
import form from "./ReservationForm.module.scss";
import { formData } from "../../recoil/form/atom";
import { useRecoilState } from "recoil";
// import Content from "./Content.js";
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
  // formHelperTextClasses,
} from "@mui/material";

const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});
export const ReservationForm = ({ placeName, placeList }) => {
  const [ageData, setAgeData] = useState([]);
  const [, setFormData] = useRecoilState(formData);
  const { handleSubmit, control } = useForm();
  const [Data, setData] = useState([]);
  const [checkValue, setCheckValue] = useState("false");

  const onSubmit = (e) => {
    const StartDate = format(e.StartDate, "yyyy-LL-dd");
    const EndDate = format(e.StartDate, "yyyy-LL-dd");
    const reservation = placeName;
    const data = { ...e, StartDate, EndDate, reservation };
    console.log(data);
    // console.log(setData);
    // data) => ({ ...data, id: getId() })
    // return <Content postData={data} />;
    setFormData({
      ...data,
      id: getId(),
    });
  };
  // カーリングの時だけplace_numberにレーンのシート分投げる
  useEffect(() => {
    const getAgeUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/ages/`);
      try {
        setAgeData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAgeUser();
  }, []);
  // useEffect(() => {
  //   if (placeName === "カーリング場") {
  //     const newTimeData = [];
  //     for(let )
  //    }
  // }, [placeName]);
  useEffect(() => {
    //利用人数99人までのListを生成
    const useNum = [];
    for (let i = 0; i < 100; i++) {
      let obj = { id: i, value: i };
      useNum.push(obj);
      setData(useNum);
    }
  }, []);
  const handleChange = (e) => {
    setCheckValue(e.target.value);
  };
  return (
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
              render={({ field: { onChange } }) => (
                <div className={form.ageGroup}>
                  {ageData.map((ageGroup, id) => (
                    <FormControlLabel
                      key={id}
                      label={ageGroup.name}
                      value={ageGroup.value}
                      control={
                        <Checkbox value={ageGroup.id} onChange={onChange} />
                      }
                      labelPlacement="end"
                    />
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
                  {/* <Label>アマチュアスポーツ</Label> */}
                  <Label>アマチュアスポーツ</Label>
                  <FormControlLabel
                    value="一般利用"
                    control={<Radio />}
                    label="一般利用"
                  />
                  <FormControlLabel
                    value="競技会使用"
                    control={<Radio />}
                    label="競技会使用"
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
                  <Label>営利</Label>
                  <FormControlLabel
                    value="入場料を徴収する"
                    control={<Radio />}
                    label="入場料を徴収する"
                  />
                  <FormControlLabel
                    value="入場料を徴収しない"
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
            //radio buttonを制御するController
            name="nonprofits"
            control={control}
            rules={{ required: "選択してください。" }}
            render={({ field }) => (
              <>
                <RadioGroup
                  {...field}
                  row
                  // labelPlacement="end"
                  // valueの判定
                  value={field.value === undefined ? "" : field.value}
                  className={form.nonprofits}
                >
                  <Label>非営利</Label>
                  <FormControlLabel
                    value="入場料を徴収する"
                    control={<Radio />}
                    label="入場料を徴収する"
                  />
                  <FormControlLabel
                    value="入場料を徴収しない"
                    control={<Radio />}
                    label="入場料を徴収しない"
                  />
                </RadioGroup>
              </>
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
                    <MenuItem>
                      <em></em>
                    </MenuItem>
                    {timetable.map((timetables, id) => (
                      <MenuItem
                        key={id}
                        label={timetables.label}
                        value={timetables.value}
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
                    <MenuItem>
                      <em></em>
                    </MenuItem>
                    {timetable.map((timetables, id) => (
                      <MenuItem
                        key={id}
                        label={timetables.label}
                        value={timetables.value}
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
            name="Text"
            control={control}
            rules={{ required: "入力してください" }}
            defaultValue=""
            render={({ field }) => (
              <div className={form.reason}>
                <p>利用目的</p>
                <TextField
                  {...field}
                  label="利用目的を入力してください。"
                  variant="outlined"
                />
              </div>
            )}
          />
        </div>
        <div>
          <Controller
            name="StaffNum"
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
                      control={<Radio onChange={handleChange} />}
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
              name="usedevice"
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
            name="deferredpayment"
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
                  {deferredpayment.map((deferredpayments, index) => (
                    <FormControlLabel
                      key={index}
                      label={deferredpayments.label}
                      value={deferredpayments.value}
                      control={<Radio onChange={handleChange} />}
                      labelPlacement="end"
                    />
                  ))}
                </RadioGroup>
              </>
            )}
          />
        </FormControl>
        <div className="submitbtn">
          <button variant="contained" type="submit" className="btn">
            追加する
          </button>
        </div>
      </form>
    </div>
  );
};
//一意のidを作成
let id = 0;
function getId() {
  return id++;
}
