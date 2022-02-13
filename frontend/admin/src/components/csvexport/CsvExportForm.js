import React from "react";
import { useForm } from "react-hook-form";
import useUnmountRef from "../../hooks/useUnmountRef";
import useSafeState from "../../hooks/useSafeState";

const CsvExportForm = (props) => {
  const unmountRef = useUnmountRef();
  const [radioValue, setRadioValue] = useSafeState(unmountRef, "all");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    props.setStart1(e.start1);
    props.setStart2(e.start2);
    props.setApproval(radioValue);
    props.changeState("complete");
  };

  return (
    <>
      <form className="modal-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h3>CSV出力する予約データを指定</h3>
        <p>期間1から期間2の間のデータを出力します。</p>
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
              required: "※必須項目です",
            })}
          />
        </div>
        <p>
          <label>出力する予約データ：</label>
          <div>
            <input
              type="radio"
              name="select"
              value="all"
              id="all"
              //   checked={radioValue === "all"}
              onChange={() => setRadioValue("all")}
              defaultChecked
            />
            <label htmlFor="all">全て</label>
          </div>
          <div>
            <input
              type="radio"
              name="select"
              value="1"
              id="unapproval"
              checked={radioValue === "1"}
              onChange={() => setRadioValue("1")}
            />
            <label htmlFor="unapproval">未承認のみ</label>
          </div>
          <div>
            <input
              type="radio"
              name="select"
              value="2"
              id="approval"
              checked={radioValue === "2"}
              onChange={() => setRadioValue("2")}
            />
            <label htmlFor="approval">承認のみ</label>
          </div>
          <div>
            <input
              type="radio"
              name="select"
              value="3"
              id="disapproval"
              checked={radioValue === "3"}
              onChange={() => setRadioValue("3")}
            />
            <label htmlFor="disapproval">不承認のみ</label>
          </div>
          <div>
            <input
              type="radio"
              name="select"
              value="4"
              id="cancel"
              checked={radioValue === "4"}
              onChange={() => setRadioValue("4")}
            />
            <label htmlFor="cancel">キャンセルのみ</label>
          </div>
        </p>
        <button type="submit" className="modal-open-btn">
          発行
        </button>
        <button
          type="button"
          onClick={props.modalToggle}
          className="modal-close-btn"
        >
          閉じる
        </button>
      </form>
    </>
  );
};

export default CsvExportForm;
