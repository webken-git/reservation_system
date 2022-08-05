import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import { useForm } from "react-hook-form";
import { ReservationUrls } from "../../../utils/reservationUrls";
import "./adddata.scss";

/*
・施設の追加を行うコンポーネント
・施設の追加に伴い、料金データも追加する

〇データ追加の流れ
1. 施設の追加を入力
2. 追加する施設には、団体料金が存在するかどうか確認する
3. 時間区分を入力
4. 料金を入力
5. 貸出する道具がある場合は、道具を入力
6. 施設のデータ追加を実行 (api/places)
7. 時間区分のデータ追加を実行 (api/times)
8. 料金のデータ追加を実行 (api/facility_fees)
*/

const AddData = (props) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const [ageData, setAgeData] = useState([]);
  const [isGroup, setIsGroup] = useState(true);
  const [isSelect, setIsSelect] = useState(false);
  const [maxValue, setMaxValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const error = Object.values(errors); // エラーがあるかどうか

  const getAgeData = async () => {
    const response = await axios.get(ReservationUrls.AGE);
    setAgeData(response.data);
  };
  useEffect(() => {
    getAgeData();
  }, []);
  const age1 = ageData.filter((age) => age.name === "小学生");
  const age2 = ageData.filter((age) => age.name === "中学生");
  const age3 = ageData.filter((age) => age.name === "高校生");
  const age4 = ageData.filter((age) => age.name === "大学生");
  const age5 = ageData.filter((age) => age.name === "一般");
  const age6 = ageData.filter((age) => age.name === "高齢者");
  const age7 = ageData.filter((age) => age.name === "障がい者");

  const postFacilityFee = (
    placeId,
    ageId,
    timeId,
    isGroupValue,
    purpose,
    fee
  ) => {
    axios
      .post(ReservationUrls.FACILITY_FEE, {
        place_id: placeId,
        age_id: ageId,
        time_id: timeId,
        is_group: isGroupValue,
        purpose: purpose,
        fee: fee,
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };

  const onSubmit = (data) => {
    setLoading(true);
    setMessage("データを追加しています...");
    // 施設データを追加
    axios
      .post(ReservationUrls.PLACE, {
        name: getValues("name"),
        min: isSelect ? getValues("min") : 1,
        max: isSelect ? getValues("max") : 1,
      })
      .then((response) => {
        if (isGroup === false) {
          // 団体料金が存在しない場合
          // 施設データのidを取得
          const placeId = response.data.id;
          // 時間区分データを追加
          axios
            .post(ReservationUrls.TIME, {
              name: getValues("normal_time1") ? getValues("normal_time1") : "-",
            })
            .then((response) => {
              // 時間区分データのidを取得
              const timeId = response.data.id;
              // 料金データを追加
              postFacilityFee(
                placeId,
                age1[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_1") ? getValues("normal_fee1_1") : "-"
              );
              postFacilityFee(
                placeId,
                age2[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_2") ? getValues("normal_fee1_2") : "-"
              );
              postFacilityFee(
                placeId,
                age3[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_3") ? getValues("normal_fee1_3") : "-"
              );
              postFacilityFee(
                placeId,
                age4[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_4") ? getValues("normal_fee1_4") : "-"
              );
              postFacilityFee(
                placeId,
                age5[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_5") ? getValues("normal_fee1_5") : "-"
              );
              postFacilityFee(
                placeId,
                age6[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_6") ? getValues("normal_fee1_6") : "-"
              );
              postFacilityFee(
                placeId,
                age7[0].id,
                timeId,
                isGroup,
                "その他",
                getValues("normal_fee1_7") ? getValues("normal_fee1_7") : "-"
              );
              axios
                .post(ReservationUrls.TIME, {
                  name: getValues("normal_time2")
                    ? getValues("normal_time2")
                    : "-",
                })
                .then((response) => {
                  // 時間区分データのidを取得
                  const timeId = response.data.id;
                  // 料金データを追加
                  postFacilityFee(
                    placeId,
                    age1[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_1")
                      ? getValues("normal_fee2_1")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age2[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_2")
                      ? getValues("normal_fee2_2")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age3[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_3")
                      ? getValues("normal_fee2_3")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age4[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_4")
                      ? getValues("normal_fee2_4")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age5[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_5")
                      ? getValues("normal_fee2_5")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age6[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_6")
                      ? getValues("normal_fee2_6")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age7[0].id,
                    timeId,
                    isGroup,
                    "その他",
                    getValues("normal_fee2_7")
                      ? getValues("normal_fee2_7")
                      : "-"
                  );
                  axios
                    .post(ReservationUrls.TIME, {
                      name: getValues("normal_time3")
                        ? getValues("normal_time3")
                        : "-",
                    })
                    .then((response) => {
                      // 時間区分データのidを取得
                      const timeId = response.data.id;
                      // 料金データを追加
                      postFacilityFee(
                        placeId,
                        age1[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_1")
                          ? getValues("normal_fee3_1")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age2[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_2")
                          ? getValues("normal_fee3_2")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age3[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_3")
                          ? getValues("normal_fee3_3")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age4[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_4")
                          ? getValues("normal_fee3_4")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age5[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_5")
                          ? getValues("normal_fee3_5")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age6[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_6")
                          ? getValues("normal_fee3_6")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age7[0].id,
                        timeId,
                        isGroup,
                        "その他",
                        getValues("normal_fee3_7")
                          ? getValues("normal_fee3_7")
                          : "-"
                      );
                      window.scrollTo(0, 0);
                      setTimeout(() => {
                        setMessage("登録しました");
                        setLoading(false);
                        window.location.href = "/data-list";
                      }, 3500);
                    })
                    .catch((error) => {});
                })
                .catch((error) => {});
            })
            .catch((error) => {});
        } else if (isGroup === true) {
          // 団体料金が存在する場合
          // 施設データのidを取得
          const placeId = response.data.id;
          const max = response.data.max;
          // 時間区分データを追加
          axios
            .post(ReservationUrls.TIME, {
              name: getValues("private_time1")
                ? getValues("private_time1")
                : "-",
            })
            .then((response) => {
              // 時間区分データのidを取得
              const timeId = response.data.id;
              // 料金データを追加
              postFacilityFee(
                placeId,
                age1[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_1") ? getValues("private_fee1_1") : "-"
              );
              postFacilityFee(
                placeId,
                age2[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_2") ? getValues("private_fee1_2") : "-"
              );
              postFacilityFee(
                placeId,
                age3[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_3") ? getValues("private_fee1_3") : "-"
              );
              postFacilityFee(
                placeId,
                age4[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_4") ? getValues("private_fee1_4") : "-"
              );
              postFacilityFee(
                placeId,
                age5[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_5") ? getValues("private_fee1_5") : "-"
              );
              postFacilityFee(
                placeId,
                age6[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_6") ? getValues("private_fee1_6") : "-"
              );
              postFacilityFee(
                placeId,
                age7[0].id,
                timeId,
                false,
                "個人使用",
                getValues("private_fee1_7") ? getValues("private_fee1_7") : "-"
              );
              axios
                .post(ReservationUrls.TIME, {
                  name: getValues("private_time2")
                    ? getValues("private_time2")
                    : "-",
                })
                .then((response) => {
                  // 時間区分データのidを取得
                  const timeId = response.data.id;
                  // 料金データを追加
                  postFacilityFee(
                    placeId,
                    age1[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_1")
                      ? getValues("private_fee2_1")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age2[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_2")
                      ? getValues("private_fee2_2")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age3[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_3")
                      ? getValues("private_fee2_3")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age4[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_4")
                      ? getValues("private_fee2_4")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age5[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_5")
                      ? getValues("private_fee2_5")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age6[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_6")
                      ? getValues("private_fee2_6")
                      : "-"
                  );
                  postFacilityFee(
                    placeId,
                    age7[0].id,
                    timeId,
                    false,
                    "個人使用",
                    getValues("private_fee2_7")
                      ? getValues("private_fee2_7")
                      : "-"
                  );
                  axios
                    .post(ReservationUrls.TIME, {
                      name: getValues("private_time3")
                        ? getValues("private_time3")
                        : "-",
                    })
                    .then((response) => {
                      // 時間区分データのidを取得
                      const timeId = response.data.id;
                      // 料金データを追加
                      postFacilityFee(
                        placeId,
                        age1[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_1")
                          ? getValues("private_fee3_1")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age2[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_2")
                          ? getValues("private_fee3_2")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age3[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_3")
                          ? getValues("private_fee3_3")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age4[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_4")
                          ? getValues("private_fee3_4")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age5[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_5")
                          ? getValues("private_fee3_5")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age6[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_6")
                          ? getValues("private_fee3_6")
                          : "-"
                      );
                      postFacilityFee(
                        placeId,
                        age7[0].id,
                        timeId,
                        false,
                        "個人使用",
                        getValues("private_fee3_7")
                          ? getValues("private_fee3_7")
                          : "-"
                      );
                    })
                    .catch((error) => {});
                })
                .catch((error) => {});
            })
            .catch((error) => {});
          if (max > 1) {
            // 団体使用
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("group_time"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age1[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_1")
                );
                postFacilityFee(
                  placeId,
                  age2[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_2")
                );
                postFacilityFee(
                  placeId,
                  age3[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_3")
                );
                postFacilityFee(
                  placeId,
                  age4[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_4")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_5")
                );
                postFacilityFee(
                  placeId,
                  age6[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_6")
                );
                postFacilityFee(
                  placeId,
                  age7[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee_7")
                );
              })
              .catch((error) => {});
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("competition_time"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age1[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_1")
                );
                postFacilityFee(
                  placeId,
                  age2[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_2")
                );
                postFacilityFee(
                  placeId,
                  age3[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_3")
                );
                postFacilityFee(
                  placeId,
                  age4[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_4")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_5")
                );
                postFacilityFee(
                  placeId,
                  age6[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_6")
                );
                postFacilityFee(
                  placeId,
                  age7[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee_7")
                );
              })
              .catch((error) => {});
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("commercial_time"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "営利目的使用（入場料あり）",
                  getValues("commercial_fee_1")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "営利目的使用（入場料なし）",
                  getValues("commercial_fee_2")
                );
                window.scrollTo(0, 0);
                setTimeout(() => {
                  setMessage("登録しました");
                  setLoading(false);
                  window.location.href = "/data-list";
                }, 4000);
              })
              .catch((error) => {});
          } else if (max === 1) {
            // 団体使用
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("group_time1"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age1[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_1")
                );
                postFacilityFee(
                  placeId,
                  age2[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_2")
                );
                postFacilityFee(
                  placeId,
                  age3[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_3")
                );
                postFacilityFee(
                  placeId,
                  age4[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_4")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_5")
                );
                postFacilityFee(
                  placeId,
                  age6[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_6")
                );
                postFacilityFee(
                  placeId,
                  age7[0].id,
                  timeId,
                  true,
                  "団体使用",
                  getValues("group_fee1_7")
                );
                axios
                  .post(ReservationUrls.TIME, {
                    name: getValues("group_time2"),
                  })
                  .then((response) => {
                    // 時間区分データのidを取得
                    const timeId = response.data.id;
                    // 料金データを追加
                    postFacilityFee(
                      placeId,
                      age1[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_1")
                    );
                    postFacilityFee(
                      placeId,
                      age2[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_2")
                    );
                    postFacilityFee(
                      placeId,
                      age3[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_3")
                    );
                    postFacilityFee(
                      placeId,
                      age4[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_4")
                    );
                    postFacilityFee(
                      placeId,
                      age5[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_5")
                    );
                    postFacilityFee(
                      placeId,
                      age6[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_6")
                    );
                    postFacilityFee(
                      placeId,
                      age7[0].id,
                      timeId,
                      true,
                      "団体使用",
                      getValues("group_fee2_7")
                    );
                    axios
                      .post(ReservationUrls.TIME, {
                        name: getValues("group_time3"),
                      })
                      .then((response) => {
                        // 時間区分データのidを取得
                        const timeId = response.data.id;
                        // 料金データを追加
                        postFacilityFee(
                          placeId,
                          age1[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_1")
                        );
                        postFacilityFee(
                          placeId,
                          age2[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_2")
                        );
                        postFacilityFee(
                          placeId,
                          age3[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_3")
                        );
                        postFacilityFee(
                          placeId,
                          age4[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_4")
                        );
                        postFacilityFee(
                          placeId,
                          age5[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_5")
                        );
                        postFacilityFee(
                          placeId,
                          age6[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_6")
                        );
                        postFacilityFee(
                          placeId,
                          age7[0].id,
                          timeId,
                          true,
                          "団体使用",
                          getValues("group_fee3_7")
                        );
                      })
                      .catch((error) => {});
                  })
                  .catch((error) => {});
              })
              .catch((error) => {});
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("competition_time1"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age1[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_1")
                );
                postFacilityFee(
                  placeId,
                  age2[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_2")
                );
                postFacilityFee(
                  placeId,
                  age3[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_3")
                );
                postFacilityFee(
                  placeId,
                  age4[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_4")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_5")
                );
                postFacilityFee(
                  placeId,
                  age6[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_6")
                );
                postFacilityFee(
                  placeId,
                  age7[0].id,
                  timeId,
                  true,
                  "競技会使用",
                  getValues("competition_fee1_7")
                );
                axios
                  .post(ReservationUrls.TIME, {
                    name: getValues("competition_time2"),
                  })
                  .then((response) => {
                    // 時間区分データのidを取得
                    const timeId = response.data.id;
                    // 料金データを追加
                    postFacilityFee(
                      placeId,
                      age1[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_1")
                    );
                    postFacilityFee(
                      placeId,
                      age2[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_2")
                    );
                    postFacilityFee(
                      placeId,
                      age3[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_3")
                    );
                    postFacilityFee(
                      placeId,
                      age4[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_4")
                    );
                    postFacilityFee(
                      placeId,
                      age5[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_5")
                    );
                    postFacilityFee(
                      placeId,
                      age6[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_6")
                    );
                    postFacilityFee(
                      placeId,
                      age7[0].id,
                      timeId,
                      true,
                      "競技会使用",
                      getValues("competition_fee2_7")
                    );
                    axios
                      .post(ReservationUrls.TIME, {
                        name: getValues("competition_time3"),
                      })
                      .then((response) => {
                        // 時間区分データのidを取得
                        const timeId = response.data.id;
                        // 料金データを追加
                        postFacilityFee(
                          placeId,
                          age1[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_1")
                        );
                        postFacilityFee(
                          placeId,
                          age2[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_2")
                        );
                        postFacilityFee(
                          placeId,
                          age3[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_3")
                        );
                        postFacilityFee(
                          placeId,
                          age4[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_4")
                        );
                        postFacilityFee(
                          placeId,
                          age5[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_5")
                        );
                        postFacilityFee(
                          placeId,
                          age6[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_6")
                        );
                        postFacilityFee(
                          placeId,
                          age7[0].id,
                          timeId,
                          true,
                          "競技会使用",
                          getValues("competition_fee3_7")
                        );
                      })
                      .catch((error) => {});
                  })
                  .catch((error) => {});
              })
              .catch((error) => {});
            axios
              .post(ReservationUrls.TIME, {
                name: getValues("commercial_time1"),
              })
              .then((response) => {
                // 時間区分データのidを取得
                const timeId = response.data.id;
                // 料金データを追加
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "営利目的使用（入場料あり）",
                  getValues("commercial_fee1_1")
                );
                postFacilityFee(
                  placeId,
                  age5[0].id,
                  timeId,
                  true,
                  "営利目的使用（入場料なし）",
                  getValues("commercial_fee1_2")
                );
                axios
                  .post(ReservationUrls.TIME, {
                    name: getValues("commercial_time2"),
                  })
                  .then((response) => {
                    // 時間区分データのidを取得
                    const timeId = response.data.id;
                    // 料金データを追加
                    postFacilityFee(
                      placeId,
                      age5[0].id,
                      timeId,
                      true,
                      "営利目的使用（入場料あり）",
                      getValues("commercial_fee2_1")
                    );
                    postFacilityFee(
                      placeId,
                      age5[0].id,
                      timeId,
                      true,
                      "営利目的使用（入場料なし）",
                      getValues("commercial_fee2_2")
                    );
                    axios
                      .post(ReservationUrls.TIME, {
                        name: getValues("commercial_time3"),
                      })
                      .then((response) => {
                        // 時間区分データのidを取得
                        const timeId = response.data.id;
                        // 料金データを追加
                        postFacilityFee(
                          placeId,
                          age5[0].id,
                          timeId,
                          true,
                          "営利目的使用（入場料あり）",
                          getValues("commercial_fee3_1")
                        );
                        postFacilityFee(
                          placeId,
                          age5[0].id,
                          timeId,
                          true,
                          "営利目的使用（入場料なし）",
                          getValues("commercial_fee3_2")
                        );
                        window.scrollTo(0, 0);
                        setTimeout(() => {
                          setMessage("登録しました");
                          setLoading(false);
                          window.location.href = "/data-list";
                        }, 3000);
                      })
                      .catch((error) => {});
                  })
                  .catch((error) => {});
              })
              .catch((error) => {});
          }
        }
      })
      .catch((error) => {
        setMessage("登録に失敗しました");
        setLoading(false);
        window.location.href = "/data-list";
      });
  };

  if (age1.length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="add-data editfeelist">
          <h2>以下の項目を入力後、登録ボタンを押してください</h2>
          {/* <p className="red">※データ追加後、反映に5分程度掛かります。</p> */}
          {error.length > 0 && (
            <>
              {window.scrollTo(0, 0)}

              <div className="red">
                <p>
                  正しく入力されていない項目があります。
                  <br />
                  メッセージをご確認の上、もう一度ご入力ください。
                </p>
              </div>
            </>
          )}
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="add-data__form-group">
              <h4>施設名：</h4>
              {errors.name && <p className="red">{errors.name.message}</p>}
              <input
                type="text"
                name="name"
                className="add-data__form-input"
                id="name"
                {...register("name", {
                  required: "※必須項目です",
                })}
              />
            </div>
            <div className="add-data__form-group">
              <h4>団体料金の有無：</h4>
              {errors.is_group && (
                <p className="red">{errors.is_group.message}</p>
              )}
              <div className="add-data__form-group__radio">
                <div className="add-data__form-group__select">
                  <input
                    type="radio"
                    name="is_group"
                    id="is_group_true"
                    {...register("is_group", {
                      required: "※必須項目です",
                    })}
                    // value={true}
                    onChange={() => setIsGroup(true)}
                  />
                  <label htmlFor="is_group_true">あり</label>
                </div>
                <div className="add-data__form-group__select">
                  <input
                    type="radio"
                    name="is_group"
                    id="is_group_false"
                    {...register("is_group", {
                      required: "※必須項目です",
                    })}
                    // value={false}
                    onChange={() => setIsGroup(false)}
                  />
                  <label htmlFor="is_group_false">なし</label>
                </div>
              </div>
            </div>
            <div className="add-data__form-group">
              <h4>「シート数」または「全面/半面」の選択の有無：</h4>
              {errors.is_select && (
                <p className="red">{errors.is_select.message}</p>
              )}
              <div className="add-data__form-group__select">
                <input
                  type="radio"
                  name="is_select"
                  id="is_select_true"
                  {...register("is_select", {
                    required: "※必須項目です",
                  })}
                  onChange={() => setIsSelect(true)}
                  disabled={isGroup === false}
                />
                <label htmlFor="is_select_true">あり</label>
              </div>
              <div className="add-data__form-group__select">
                <input
                  type="radio"
                  name="is_select"
                  id="is_select_false"
                  {...register("is_select", {
                    required: "※必須項目です",
                  })}
                  onChange={() => {
                    setIsSelect(false);
                    setMaxValue(null);
                    setValue("min", null);
                    setValue("max", null);
                  }}
                />
                <label htmlFor="is_select_false">なし</label>
              </div>
            </div>
            {isSelect && (
              <>
                <div className="add-data__form-group">
                  <h4>予約可能なシート数の最小値：</h4>
                  {errors.min && <p className="red">{errors.min.message}</p>}
                  <p className="red">
                    ※「半面」の場合は、「0.5」と入力してください。
                  </p>
                  <p className="red">※「半面」の場合は後から変更できません。</p>
                  <input
                    type="text"
                    name="min"
                    className="add-data__form-input"
                    inputMode="decimal"
                    {...register("min", {
                      required: "※必須項目です",
                      pattern: {
                        // 小数点以下も入力可能
                        value: /^[0-9]*[.]?[0-9]*$/,
                        message: "※半角数字を入力してください",
                      },
                      min: {
                        value: 0.5,
                        message: "※0.5以上の値を入力してください",
                      },
                    })}
                  />
                </div>
                <div className="add-data__form-group">
                  <h4>予約可能なシート数の最大値：</h4>
                  {errors.max && <p className="red">{errors.max.message}</p>}
                  <p className="red">
                    ※「全面」の場合は、「1」と入力してください。
                  </p>
                  <p className="red">※「全面」の場合は後から変更できません。</p>
                  <input
                    type="text"
                    name="max"
                    className="add-data__form-input"
                    inputMode="numeric"
                    {...register("max", {
                      required: "※必須項目です",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "※半角数字で入力してください",
                      },
                      min: {
                        value: 1,
                        message: "※1以上の値を入力してください",
                      },
                      validate: (value) => {
                        if (getValues("min") > value) {
                          return "※最小値より大きい値を入力してください";
                        }
                      },
                    })}
                    onChange={(e) => {
                      setMaxValue(e.target.value);
                    }}
                  />
                </div>
              </>
            )}
            <h4>料金：</h4>
            <p className="red">※時間帯の部分は後から変更できません。</p>
            <p className="red">
              ※赤枠で囲まれている項目がある場合は、正しく入力されているか確認してください。
            </p>
            {isGroup || (
              <div className="add-data__form-group">
                {/* {errors.normal_fee && (
                  <p className="red">{errors.normal_fee.message}</p>
                )} */}
                <p className="red">
                  ※以下の項目を未入力の状態で施設追加する場合、
                  その項目は全て「-」と表示されます
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>時間帯</th>
                      <th>{age1[0].name}</th>
                      <th>{age2[0].name}</th>
                      <th>{age3[0].name}</th>
                      <th>{age4[0].name}</th>
                      <th>{age5[0].name}</th>
                      <th>{age6[0].name}</th>
                      <th>{age7[0].name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="normal_time1"
                          placeholder="午前（09時〜13時）"
                          {...register("normal_time1", {
                            required: false,
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_1 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_1"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_1", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_2 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_2"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_2", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_3 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_3"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_3", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_4 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_4"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_4", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_5 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_5"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_5", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_6 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_6"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_6", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee1_7 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee1_7"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee1_7", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="normal_time2"
                          placeholder="午後（13時〜17時）"
                          {...register("normal_time2", {
                            required: false,
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_1 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_1"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_1", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_2 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_2"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_2", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_3 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_3"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_3", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_4 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_4"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_4", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_5 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_5"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_5", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_6 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_6"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_6", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee2_7 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee2_7"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee2_7", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="normal_time3"
                          placeholder="夜間（17時〜21時）"
                          {...register("normal_time3", {
                            required: false,
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_1 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_1"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_1", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_2 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_2"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_2", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_3 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_3"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_3", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_4 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_4"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_4", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_5 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_5"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_5", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_6 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_6"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_6", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                      <td
                        style={
                          errors.normal_fee3_7 && {
                            borderStyle: "double",
                            borderColor: "#d32f2f",
                          }
                        }
                      >
                        <input
                          type="text"
                          name="normal_fee3_7"
                          inputMode="numeric"
                          autoComplete="off"
                          {...register("normal_fee3_7", {
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "※半角数字で入力してください",
                            },
                          })}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {isGroup && (
              <>
                <div className="form-group">
                  <p>個人使用</p>
                  <p className="red">
                    ※個人使用の項目を未入力の状態で施設追加する場合、
                    個人使用の項目は全て「-」と表示されます。
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>時間帯</th>
                        <th>{age1[0].name}</th>
                        <th>{age2[0].name}</th>
                        <th>{age3[0].name}</th>
                        <th>{age4[0].name}</th>
                        <th>{age5[0].name}</th>
                        <th>{age6[0].name}</th>
                        <th>{age7[0].name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="private_time1"
                            placeholder="午前（09時〜13時）"
                            {...register("private_time1", {
                              required: false,
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_1 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_1"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_1", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_2 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_2"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_2", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_3 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_3"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_3", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_4 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_4"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_4", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_5 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_5"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_5", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_6 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_6"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_6", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee1_7 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee1_7"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee1_7", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="private_time2"
                            placeholder="午後（13時〜17時）"
                            {...register("private_time2", {
                              required: false,
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_1 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_1"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_1", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_2 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_2"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_2", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_3 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_3"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_3", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_4 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_4"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_4", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_5 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_5"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_5", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_6 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_6"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_6", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee2_7 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee2_7"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee2_7", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="private_time3"
                            placeholder="夜間（17時〜21時）"
                            {...register("private_time3", {
                              required: false,
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_1 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_1"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_1", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_2 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_2"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_2", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_3 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_3"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_3", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_4 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_4"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_4", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_5 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_5"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_5", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_6 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_6"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_6", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                        <td
                          style={
                            errors.private_fee3_7 && {
                              borderStyle: "double",
                              borderColor: "#d32f2f",
                            }
                          }
                        >
                          <input
                            type="text"
                            name="private_fee3_7"
                            inputMode="numeric"
                            autoComplete="off"
                            {...register("private_fee3_7", {
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "※半角数字で入力してください",
                              },
                            })}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {maxValue > 1 && (
                  <>
                    <div className="form-group">
                      <p>団体使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>{age1[0].name}</th>
                            <th>{age2[0].name}</th>
                            <th>{age3[0].name}</th>
                            <th>{age4[0].name}</th>
                            <th>{age5[0].name}</th>
                            <th>{age6[0].name}</th>
                            <th>{age7[0].name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.group_time && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_time"
                                placeholder="１シート１時間につき"
                                {...register("group_time", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group">
                      <p>競技会使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>{age1[0].name}</th>
                            <th>{age2[0].name}</th>
                            <th>{age3[0].name}</th>
                            <th>{age4[0].name}</th>
                            <th>{age5[0].name}</th>
                            <th>{age6[0].name}</th>
                            <th>{age7[0].name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.competition_time && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_time"
                                placeholder="１シート１時間につき"
                                {...register("competition_time", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group">
                      <p>営利目的使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>営利目的使用（入場料あり）</th>
                            <th>営利目的使用（入場料なし）</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.commercial_time && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_time"
                                placeholder="１シート１時間につき"
                                {...register("commercial_time", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {maxValue === "1" || isSelect === false ? (
                  <>
                    <div className="form-group">
                      <p>団体使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>{age1[0].name}</th>
                            <th>{age2[0].name}</th>
                            <th>{age3[0].name}</th>
                            <th>{age4[0].name}</th>
                            <th>{age5[0].name}</th>
                            <th>{age6[0].name}</th>
                            <th>{age7[0].name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.group_time1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_time1"
                                placeholder="午前（09時〜13時）"
                                {...register("group_time1", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee1_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee1_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee1_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.group_time2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_time2"
                                placeholder="午後（13時〜17時）"
                                {...register("group_time2", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee2_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee2_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee2_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.group_time3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_time3"
                                placeholder="夜間（17時〜21時）"
                                {...register("group_time3", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.group_fee3_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="group_fee3_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("group_fee3_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group">
                      <p>競技会使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>{age1[0].name}</th>
                            <th>{age2[0].name}</th>
                            <th>{age3[0].name}</th>
                            <th>{age4[0].name}</th>
                            <th>{age5[0].name}</th>
                            <th>{age6[0].name}</th>
                            <th>{age7[0].name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.competition_time1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_time1"
                                placeholder="午前（09時〜13時）"
                                {...register("competition_time1", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee1_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee1_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee1_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.competition_time2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_time2"
                                placeholder="午後（13時〜17時）"
                                {...register("competition_time2", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee2_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee2_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee2_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.competition_time3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_time3"
                                placeholder="夜間（17時〜21時）"
                                {...register("competition_time3", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_3"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_3", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_4 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_4"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_4", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_5 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_5"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_5", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_6 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_6"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_6", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.competition_fee3_7 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="competition_fee3_7"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("competition_fee3_7", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group">
                      <p>営利目的使用</p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>時間帯</th>
                            <th>営利目的使用（入場料あり）</th>
                            <th>営利目的使用（入場料なし）</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              style={
                                errors.commercial_time1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_time1"
                                placeholder="午前（09時〜13時）"
                                {...register("commercial_time1", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee1_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee1_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee1_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee1_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee1_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee1_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.commercial_time2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_time2"
                                placeholder="午後（13時〜17時）"
                                {...register("commercial_time2", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee2_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee2_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee2_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee2_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee2_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee2_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={
                                errors.commercial_time3 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_time3"
                                placeholder="夜間（17時〜21時）"
                                {...register("commercial_time3", {
                                  required: "※必須項目です",
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee3_1 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee3_1"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee3_1", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                            <td
                              style={
                                errors.commercial_fee3_2 && {
                                  borderStyle: "double",
                                  borderColor: "#d32f2f",
                                }
                              }
                            >
                              <input
                                type="text"
                                name="commercial_fee3_2"
                                inputMode="numeric"
                                autoComplete="off"
                                {...register("commercial_fee3_2", {
                                  required: "※必須項目です",
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: "※半角数字で入力してください",
                                  },
                                })}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </>
            )}
            <div className="button-group">
              <button
                type="button"
                className="back-btn"
                onClick={() => window.history.back()}
              >
                戻る
              </button>
              <span className="btn-space"></span>
              <button type="submit" className="btn">
                登録
              </button>
            </div>
          </form>
        </div>
        {loading && <Loading />}
      </>
    );
  }
};

export default AddData;
