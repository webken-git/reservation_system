import React from "react";
import { useForm } from "react-hook-form";

const ReservationDeleteForm = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    // const start1 = `${e.start1} 00:00:00`;
    // const start2 = `${e.start2} 00:00:00`;
    props.setStart1(e.start1);
    props.setStart2(e.start2);
    props.changeState("complete");
  };

  return (
    <>
      <form className="modal-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h3>削除する予約データを指定</h3>
        <p>
          ・期間1から期間2の間のデータを削除します。
          <br />
          ・削除された予約データは復元できません。
        </p>
        {errors.start1 && <p className="error">{errors.start1.message}</p>}
        <div>
          <label>期間1：</label>
          <input
            type="datetime-local"
            name="start1"
            {...register("start1", {
              required: "※必須項目です",
            })}
          />
        </div>
        <div>
          <label>期間2：</label>
          <input
            type="datetime-local"
            name="start2"
            {...register("start2", {
              validate: (value) => {
                if (value === "") {
                  return "※必須項目です";
                }
                if (value < getValues("start1")) {
                  return "※期間1より前の日付は指定できません";
                }
              },
            })}
          />
        </div>
        <br />
        <button type="submit" className="approval-btn">
          削除
        </button>
        <span className="btn-space"></span>
        <button type="button" onClick={props.modalToggle} className="back-btn">
          閉じる
        </button>
      </form>
    </>
  );
};

export default ReservationDeleteForm;
