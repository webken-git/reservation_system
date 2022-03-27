import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const SuspensionBlock = (props) => {
  const suspension = props.suspension;
  const hour = suspension.start.substr(11, 2);
  const endHour = suspension.end.substr(11, 2);
  let placeFlag = false;

  suspension.places.map((place, index) =>
    place.name === props.placeFilter ? (placeFlag = true) : null
  );

  let backgroundColor = "red";

  const styleGenerator = useCallback(
    (top, height) => ({
      backgroundColor: backgroundColor,
      position: "absolute",
      width: "100%",
      top: top ? top + "vh" : "0vh",
      height: height ? height + "vh" : "0vh",
    }),
    [backgroundColor]
  );

  const styleGeneratorHandler = useCallback(() => {
    let top = (hour - 9) * 6 + 2;
    let height = (endHour - hour) * 6;

    return styleGenerator(top, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleGenerator, suspension, hour, endHour]);

  const id = suspension.id;

  if (placeFlag) {
    return (
      <Link
        className="schedule-block"
        style={styleGeneratorHandler()}
        to={`/calendar/suspension-info/${id}`}
      >
        <p>予約停止中</p>
      </Link>
    );
  } else {
    return null;
  }
};

export default SuspensionBlock;
