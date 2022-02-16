import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue, useRecoilState, selector } from "recoil";
import "./ReservationList.scss";
import Loading from "../loading/Loading";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { inputUnstyledClasses } from "@mui/material";

export const ReservationList = () => {
  const [data, setData] = useRecoilState(formData);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, reset, handleSubmit } = useForm({});
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.85)",
    },
    content: {
      position: "absolute",
      top: "5rem",
      left: "5rem",
      right: "5rem",
      bottom: "5rem",
      backgroundColor: "FFFFF",
      borderRadius: "1rem",
      padding: "1.5rem",
    },
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const remove = (item) => {
    const list = [...data];
    const id = item.id;
    console.log(list);
    if (data.length < 1) {
      list.splice([id], 1);
    } else {
      list.splice([0], 1);
    }
    console.log(list);
    setData([...list]);
    console.log(data);
  };
  return (
    <>
      <div className="RL-root">
        {data.length === 0 ? (
          <Grid container alignItems="center" justifyContent={"center"}>
            <div className="notFacility">追加した予約がありません</div>
          </Grid>
        ) : (
          <div className="reservation-list">
            <div className="title">追加した予約一覧</div>
            {/* 追加されたデータを1件ずつ表示 */}
            <Grid container>
              {data &&
                data.map((item, index) => {
                  // console.log(item);
                  return (
                    <Grid
                      className="reserve-data"
                      key={index}
                      item
                      lg={2}
                      md={3}
                    >
                      <div className="place">施設名：{item.placeName}</div>
                      <div className="reservation">{item.reservation}</div>
                      <div className="usage">
                        利用区分：{item.id}
                        {
                          // usage nameを表示する
                        }
                      </div>
                      <div className="start">
                        開始日時:
                        {item.startDate} {item.Start}から
                      </div>
                      <div className="end">
                        終了日時：{item.endDate} {item.End}まで
                      </div>
                      <div className="number">
                        主催者：{item.staffNum}人 参加者：{item.useNum}人
                      </div>
                      利用目的：
                      <div className="box">{item.reason}</div>
                      <div className="RL-btn">
                        <button
                          className="removeBtn"
                          onClick={() => remove(item)}
                        >
                          削除
                        </button>
                        <button onClick={() => setIsOpen(true)}>編集</button>
                        <Modal isOpen={modalIsOpen} style={modalStyle}>
                          <form onSubmit={handleSubmit(onSubmit)}></form>
                          <button onClick={() => setIsOpen(false)}>
                            閉じる
                          </button>
                        </Modal>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </>
  );
};
