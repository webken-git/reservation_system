import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import "./approvalInfo.scss";
import { ReservationUrls } from "../../utils/reservationUrls";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import form from "../calendar/ReservationForm.module.scss";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ja } from "date-fns/locale";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  FormControl,
  FormHelperText,
  FormGroup,
  TextField,
  MenuItem,
  styled,
} from "@mui/material";
import { timetable } from "../calendar/FormDataList";
import { format } from "date-fns";
import { formData } from "../../recoil/form/atom";
import { useRecoilState } from "recoil";
import { useFetch } from "../../hooks/useFetch";

const Label = styled("p")({
  marginRight: 15,
  fontSize: 17,
});

const SuspensionInfo = (props) => {
  const [suspension, setSuspension] = useState([]);
  const id = props.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [FormData, setFormData] = useRecoilState(formData);
  const [updateFlag, setUpdateFlag] = useState(true);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const pullSuspension = () => {
    axios
      .get(`${ReservationUrls.SUSPENSION}?id=${id}`, {})
      .then((res) => {
        setSuspension(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPlaceList = useFetch({
    url: ReservationUrls.PLACE,
  });

  const modalTogglePatch = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const onSubmitPatch = (e) => {
    const startDate = format(e.StartDate, "yyyy-LL-dd");
    const endDate = format(e.EndDate, "yyyy-LL-dd");
    const startTime = e.Start;
    const endTime = e.End;
    const start = startDate.concat(" ", startTime);
    const end = endDate.concat(" ", endTime);
    const place = e.place;

    axios.patch(`${ReservationUrls.SUSPENSION}${id}/`, {
      start: start,
      end: end,
      place_id: place,
    })
    .then(res => {
      setModalIsOpen(false)
      setUpdateFlag(!updateFlag)
    })
    .catch(error => {
      console.log(error);
    })

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
  }

  const suspensionDelete = () => {
    axios.delete(`${ReservationUrls.SUSPENSION}${id}/`,{})
    .then(res => {
      window.location.href=`${window.location.protocol}//${window.location.host}/calendar/`
    })
    .catch(error => {
      console.log(error);
    })
  }

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
    setValue(name, newValues);
    return newValues;
  };

  useEffect(() => {
    pullSuspension();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFlag]);

  if (suspension.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="info-wrapper">
          <ul>
            <li>
              <label>利用開始日時：</label>
              <span>{suspension.start}</span>
            </li>
            <li>
              <label>利用終了日時：</label>
              <span>{suspension.end}</span>
            </li>
            <li>
              <label>場所：</label>
              {suspension.places.map((place, index) => {
                return (
                  <span key={index}>{place.name},</span>
                )
              })}
            </li>
          </ul>
          <button type="button" className="btn" onClick={modalTogglePatch}>変更</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={modalTogglePatch}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <div className="modal-wrapper">
              <div className="modal-title">
                <h2>予約停止情報の変更</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmitPatch)}>
                <ul>
                    <li>
                      <div>
                        <Label>開始日時</Label>
                        <FormControl error>
                          <FormHelperText>
                            {errors.StartDate && errors.StartDate.message}
                          </FormHelperText>
                          <FormGroup>
                            <Controller
                              name="StartDate"
                              control={control}
                              defaultValue={new Date(suspension.start)}
                              rules={{ required: "入力" }}
                              render={({ field }) => (
                                <div className={form.StartDate}>
                                  <Label>開始日時：</Label>
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
                          </FormGroup>
                        </FormControl>
                      </div>

                      <div>
                        <FormControl error>
                          <FormHelperText>
                            {errors.Start && errors.Start.message}
                          </FormHelperText>
                          <FormGroup>
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
                                    label={suspension.start.substr(11, 5)}
                                    error={"Start" in errors}
                                    {...field}
                                  >
                                    {timetable.map((timetables, id) => (
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
                            {errors.EndDate && errors.EndDate.message}
                          </FormHelperText>
                          <FormGroup>
                            <Controller
                              name="EndDate"
                              control={control}
                              defaultValue={new Date(suspension.end)}
                              rules={{ required: "入力" }}
                              render={({ field }) => (
                                <div className={form.EndDate}>
                                  <Label>終了日時</Label>
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
                          </FormGroup>
                        </FormControl>
                      </div>
                      <div>
                        <FormControl error>
                          <FormHelperText>
                            {errors.End && errors.End.message}
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
                                    label={suspension.end.substr(11, 5)}
                                    error={"End" in errors}
                                    {...field}
                                  >

                                    {timetable.map((timetables, id) => (
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
                    <p>施設名：</p>
                    {getPlaceList &&
                      getPlaceList.map((i, index) => {
                        return (
                          <p
                            key={index}
                            onChange={(e) => handleCheck(i.id, "place", e)}
                            className="place-list"
                          >
                            <input
                              name="place"
                              id={i.id}
                              type="checkbox"
                              value={i.id}
                            />
                            <label htmlFor={i.id} className="modal-label">{i.name}</label>
                          </p>
                        );
                      })}
                  </div>
                    </li>
                  </ul>
                  <div className="submit-btn">
                    <button type="submit" className="btn">
                      変更する
                    </button>
                  </div>
                  <button type="button"className="back-btn" onClick={() => setModalIsOpen(false)}>
                      閉じる
                  </button>
              </form>
            </div>
          </Modal>

          <button type="button" className="btn" onClick={suspensionDelete}>削除</button>

        </div>
      </>
    );
  }
};

export default SuspensionInfo;
