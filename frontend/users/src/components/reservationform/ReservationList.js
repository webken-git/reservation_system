import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import { formData } from "../../recoil/form/atom";
import { useRecoilValue } from "recoil";
import "./ReservationList.scss";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  SelectField,
  Button,
  styled,
  FormHelperText,
} from "@mui/material";
import { useEffect } from "react";
export const ReservationList = () => {
  const [usageTile, setUsageTile] = useState("");
  const data = useRecoilValue(formData);
  const title = () => {
    if (data.usage === "1") {
      return setUsageTile("アマチュアスポーツ");
    }
    if (data.usage === "2") {
      return setUsageTile("一般利用");
    }
    if (data.usage === "3") {
      return setUsageTile("競技会使用");
    }
  };
  useEffect(() => {
    title();
  }, [data]);
  console.log(usageTile);
  return (
    <div>
      <div className="RL-root">
        {data.length === 0 ? (
          <Grid container alignItems="center" justify={"center"}>
            <div className="notFacility">選択中の施設がありません</div>
          </Grid>
        ) : (
          <div>
            <div className="select">選択中の施設一覧</div>
            <div className="reservation">{data.reservation}</div>
            <div className="usage">利用区分 {usageTile}</div>
            <div className="start">
              開始日時:
              {data.startDate}の{data.Start}時から
            </div>
            <div className="end">
              終了日時:{data.endDate}の{data.End}時まで
            </div>
            <div className="number">
              主催者{data.staffNum}人 参加者{data.useNum}人
            </div>
            利用目的
            <div className="box">{data.reason}</div>
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
    </div>
  );
};
