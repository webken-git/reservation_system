import React from "react";

import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";
import "./ReservationList.scss";

export const ReservationList = () => {
  const data = useRecoilValue(formData);

  return (
    <>
      <div className="RL-root">
        {data.length === 0 ? (
          <Grid container alignItems="center" justifyContent={"center"}>
            <h2 className="notFacility">追加した予約がありません</h2>
          </Grid>
        ) : (
          <div className="reservation-list">
            <h2 className="title">追加した予約一覧</h2>
            {/* 追加されたデータを1件ずつ表示 */}
            <Grid container>
              {data.map((item, index) => {
                return (
                  <Grid className="reserve-data" key={index} item lg={3} md={5}>
                    <ul>
                      <li>
                        <label>施設名：</label>
                        <span>{item.placeName}</span>
                      </li>
                      <li>
                        <label>年齢区分：</label>
                        {item.ageName.map((age, index) => {
                          return <span key={index}>{age} </span>;
                        })}
                      </li>
                      <li>
                        <label>利用区分：</label>
                        {item.usageName.map((usage, index) => {
                          return (
                            <span key={index} className="usage-content">
                              {usage}
                            </span>
                          );
                        })}
                      </li>
                      <li className="start">
                        <label>開始日時：</label>
                        <span>
                          {item.startDate} {item.Start}
                        </span>
                      </li>
                      <li className="end">
                        <label>終了日時：</label>
                        <span>
                          {item.endDate} {item.End}
                        </span>
                      </li>
                      <li className="number">
                        <label>主催関係者：</label>
                        <span className="table-cell">{item.staffNum}人 </span>
                      </li>
                      <li className="number">
                        <label>参集人員：</label>
                        <span className="table-cell">{item.useNum}人</span>
                      </li>
                      <li>
                        <label>利用目的：</label>
                        <span className="reason">{item.reason}</span>
                      </li>
                      {item.device === "true" ? (
                        <>
                          <li className="device">
                            <label>附属設備・器具の使用：</label>
                            {item.equipmentName.map((equipment, index) => {
                              return (
                                <span key={index} className="usage-content">
                                  {equipment}
                                </span>
                              );
                            })}
                          </li>
                          <li className="device">
                            <label>特別設備：</label>
                            <span>{item.specialEquipment}</span>
                          </li>
                        </>
                      ) : null}
                      <li className="deferredPayment">
                        <label>後納申請：</label>
                        <span>
                          {item.deferredPayment === "true"
                            ? "利用する"
                            : "利用しない"}
                        </span>
                      </li>
                      {item.deferredPayment === "true" ? (
                        <li className="deferredPaymentReason">
                          <label>後納の理由：</label>
                          <span>{item.deferredPaymentReason}</span>
                        </li>
                      ) : null}
                    </ul>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};
