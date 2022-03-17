import React, { useCallback } from "react";

const UnapprovalBlock = (props) => {

  const hour = props.hour;
  const count = props.count;
  const endHour = hour + 1;

  let backgroundColor;
  if(props.change){
    backgroundColor = "tomato";
  } else {
    backgroundColor = "transparent";
  }

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
    props.change
  ]);

  if (props.change) {
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
  } else {
    if(count !== null){
      return (
        <div
          className="schedule-block"
          style={styleGeneratorHandler()}
        >
          {count === 0 ? (
            <span style={{ color: "blue" }}>〇</span>
          ) : null}
          {count === 1 ? (
            <span style={{ color: "green" }}>△</span>
          ) : null}
          {count === 2 ? (
            <span style={{ color: "black" }}>×</span>
          ) : null}
        </div>
      )
    } else { return null;}
  }
};

export default UnapprovalBlock;
