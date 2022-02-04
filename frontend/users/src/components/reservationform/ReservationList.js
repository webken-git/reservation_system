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
            <div className="notFacility">追加した予約がありません</div>
          </Grid>
        ) : (
          <div className="reservation-list">
            <div className="title">追加した予約一覧</div>
            {/* 追加されたデータを1件ずつ表示 */}
            <Grid container>
              {data.map((item, index) => {
                return (
                  <Grid className="reserve-data" key={index} item lg={2} md={3}>
                    <div className="place">施設名：{item.placeName}</div>
                    <div className="reservation">{item.reservation}</div>
                    <div className="usage">
                      利用区分：
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
                    {/* {data.device === "false" ? (
                        <div>附属設備もしくは器具を使用しない</div>
                      ) : (
                        <div>
                          使用する設備または器具
                          {data.useDevice}
                        </div>
                      )}
                      {data.deferredPayment === "false" ? (
                        <div>後納申請しない</div>
                      ) : (
                        <div>
                          後納理由：
                          {data.payLater}
                        </div>
                        )}
                          )
                        }
                        </Grid>
                      )} */}
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
