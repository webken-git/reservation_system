import React, { useCallback, useEffect, useState } from "react";
import { withCookies } from "react-cookie";

const UnapprovalBlock = (props) => {

  const hour = props.hour;
  const count = props.count;
  const endHour = hour + 1;

  let backgroundColor = "tomato";

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = (hour) * 6 + 2;
    let height = (endHour - hour) * 6;

    return styleGenerator(top, height);
  }, [
    styleGenerator,
    hour,
    count,
    endHour,
  ]);

  if (count !== 0) {
    return (
      <div
      className="schedule-block"
      style={styleGeneratorHandler()}
      >
        <p>
          {count}件
        </p>
      </div>
    );
  } else { return null; }
};

export default UnapprovalBlock;
