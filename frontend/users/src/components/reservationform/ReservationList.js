import React from "react";
import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";

export const ReservationList = () => {
  const data = useRecoilValue(formData);

  return (
    <Grid container>
      <Grid sm={2} />
      <Grid lg={8} sm={8} spacing={10}>
        <div>
          {data.length === 0 ? (
            <div>選択中の施設がありません</div>
          ) : (
            <div>
              <h2>選択中の施設一覧</h2>
              <div>施設名:{data.reservation}</div>
              <div>{data.usage}</div>
              <div>
                開始日時:{data.startDate}の{data.Start}時から
              </div>
              <div>
                終了日時:{data.endDate}の{data.End}時まで
              </div>
              <div>
                {data.profits}で{data.collect}
              </div>
              <div>
                主催者{data.staffNum}人 参加者{data.useNum}人
              </div>
              <div>利用理由{data.reason}</div>
              {data.device === "false" ? (
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
                  後納理由
                  {data.payLater}
                </div>
              )}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
