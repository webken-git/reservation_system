import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

const SuspensionBlock = (props) => {

  const suspension = props.suspension;
  const hour = suspension.start.substr(11, 2);
  const endHour = suspension.end.substr(11, 2);

  let backgroundColor = "red";

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = (hour-9) * 6 + 2;
    let height = (endHour - hour) * 6;

    return styleGenerator(top, height);
  }, [
    styleGenerator,
    suspension,
    hour,
    endHour
  ]);

  const id = suspension.id;

  return (
    <Link
    className="schedule-block"
    style={styleGeneratorHandler()}
    to={`/calendar/suspension-info/${id}`}
    >
      <p>
        予約停止中
      </p>
    </Link>
  );  
};

export default SuspensionBlock;
