import React, { useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
// import EditData from "./EditData";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../../utils/reservationUrls";
import "./editfeelist.scss";

const EditFeeList = (props) => {
  const ageData = props.age;
  const feelistData = props.feelist;
  const placeData = props.place;
  let timeList = []; // 時間区分を格納する配列
  let changefeeData = []; // 変更したデータを格納する配列
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const age1 = ageData.filter((age) => age.name === "小学生");
  const age2 = ageData.filter((age) => age.name === "中学生");
  const age3 = ageData.filter((age) => age.name === "高校生");
  const age4 = ageData.filter((age) => age.name === "大学生");
  const age5 = ageData.filter((age) => age.name === "一般");
  const age6 = ageData.filter((age) => age.name === "高齢者");

  // feelistdataに含まれているtimeIdとnameを取得
  feelistData.map((feelist) => {
    return timeList.push({
      timeId: feelist.time.id,
      timeName: feelist.time.name,
    });
  });
  // timeIdListから重複しているデータを削除
  timeList = timeList.filter(
    (timeId, index, self) =>
      index === self.findIndex((t) => t.timeId === timeId.timeId)
  );

  const onChange = (e, timeId, ageId, feeId) => {
    changefeeData.push({
      place_id: placeData.id,
      time_id: timeId,
      age_id: ageId,
      inputName: e.target.name,
      fee_id: feeId,
    });
    // 重複しているデータを削除
    changefeeData = changefeeData.filter(
      (fee, index, self) =>
        index ===
        self.findIndex(
          (f) =>
            f.place_id === fee.place_id &&
            f.time_id === fee.time_id &&
            f.age_id === fee.age_id
        )
    );
  };
  const onSubmit = (data) => {
    setLoading(true);
    // 料金データを更新
    changefeeData.map((fee) => {
      axios
        .patch(`${ReservationUrls.FACILITY_FEE}${fee.fee_id}/`, {
          place_id: fee.place_id,
          age_id: fee.age_id,
          time_id: fee.time_id,
          fee: getValues(fee.inputName),
        })
        .then((res) => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
      return fee;
    });
    setLoading(false);
    setMessage("変更しました");
    // 0.5秒後にリロード
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // リストに値が入っているか確認
  if (timeList === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="editfeelist">
          {message !== "" && <p className="red">{message}</p>}
          <p>
            ・ 年齢区分の部分は変更できません。
            <br />
            ・ 料金の部分は全て半角数字で入力してください。
            <br />
            ・ 「完了」ボタンを押すと料金が変更されます。
            <br />
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* {errors && <p className="red">入力内容に誤りがあります。</p>} */}
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>{age1[0].name}</th>
                  <th>{age2[0].name}</th>
                  <th>{age3[0].name}</th>
                  <th>{age4[0].name}</th>
                  <th>{age5[0].name}</th>
                  <th>{age6[0].name}</th>
                </tr>
              </thead>
              <tbody>
                {timeList.map((time, index) => (
                  <tr key={time.timeId}>
                    <td>{time.timeName}</td>
                    <td>
                      <input
                        type="text"
                        name={`fee1-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age1[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee1-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) =>
                          onChange(
                            e,
                            time.timeId,
                            age1[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age1[0].id &&
                                feelist.is_group === false
                            ).id
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`fee2-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age2[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee2-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) => {
                          onChange(
                            e,
                            time.timeId,
                            age2[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age2[0].id &&
                                feelist.is_group === false
                            ).id
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`fee3-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age3[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee3-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) => {
                          onChange(
                            e,
                            time.timeId,
                            age3[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age3[0].id &&
                                feelist.is_group === false
                            ).id
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`fee4-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age4[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee4-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) => {
                          onChange(
                            e,
                            time.timeId,
                            age4[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age4[0].id &&
                                feelist.is_group === false
                            ).id
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name={`fee5-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age5[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee5-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) => {
                          onChange(
                            e,
                            time.timeId,
                            age5[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age5[0].id &&
                                feelist.is_group === false
                            ).id
                          );
                        }}
                      />
                    </td>
                    {/* <td>
                      <input
                        type="text"
                        name={`fee6-${index}`}
                        defaultValue={
                          feelistData.find(
                            (feelist) =>
                              feelist.time.id === time.timeId &&
                              feelist.age.id === age6[0].id &&
                              feelist.is_group === false
                          ).fee
                        }
                        {...register(`fee6-${index}`, {
                          required: "必須項目です",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数字で入力してください",
                          },
                        })}
                        onChange={(e) =>
                          onChange(
                            e,
                            time.timeId,
                            age6[0].id,
                            feelistData.find(
                              (feelist) =>
                                feelist.time.id === time.timeId &&
                                feelist.age.id === age6[0].id &&
                                feelist.is_group === false
                            ).id
                          )
                        }
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="btn-wrapper">
              <button type="submit" className="btn">
                完了
              </button>
              <button
                type="button"
                className="back-btn"
                onClick={() => props.setIsOpen(false)}
              >
                閉じる
              </button>
            </div>
          </form>
        </div>
        {loading && <Loading />}
      </>
    );
  }
};

export default EditFeeList;
