import React, { useCallback, useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faX } from "@fortawesome/free-solid-svg-icons";


const CheckBlock = (props) => {

  const hour = props.hour;
  const count = props.count;
  const endHour = hour + 1;
  console.log(count)


  // let backgroundColor = "tomato";

  const styleGenerator = useCallback(
    (top, height) => ({
      // backgroundColor: backgroundColor,
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    // [backgroundColor]
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

  // const iconStyle: React.CSSProperties = { padding: 10, fontSize: 50 };

  return (
    <div
    className="schedule-block"
    style={styleGeneratorHandler()}
    >
      {count === 0 ? (
        // <FontAwesomeIcon icon={faCircle} className="reservation-icon"/>
        <span>〇</span>
      ) : null}
      {count === 1 ? (
        // <FontAwesomeIcon icon={faCaretUp} className="reservation-icon"/>
        <span>△</span>
      ) : null}
      {count === 2 ? (
        // <FontAwesomeIcon icon={faX} className="reservation-icon"/>
        <span>×</span>
      ) : null}
    </div>
  );  
};

export default CheckBlock;
