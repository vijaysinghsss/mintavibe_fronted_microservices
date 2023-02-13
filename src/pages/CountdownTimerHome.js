import moment from "moment";
import React from "react";
import { useCountdown } from "../Hooks/useCountdown";

const ExpiredNotice = ({ date }) => {
  return (
    ""
    // <ul className="text-danger">
    //   <li>
    //     Expire
    //     <p>{moment(date).format("DD/MM/YYYY , h:mm:ss a")}</p>
    //   </li>
    // </ul>
  );
};

const DayDateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    // <li className={isDanger ? "text-danger" : ""}>
    <li className={isDanger ? "d-none" : ""}>
      {value}
      <p>{type} </p>
    </li>
  );
};

const ShowTimer = ({ days, hours, minutes, seconds }) => {
  return (
    <ul>
      <DayDateTimeDisplay value={days} type={"Days"} isDanger={days <= 0} /> 
      <DayDateTimeDisplay value={hours} type={"HRS"} isDanger={false} /> 
      <DayDateTimeDisplay value={minutes} type={"Min"} isDanger={false} /> 
      <DayDateTimeDisplay value={seconds} type={"Sec"} isDanger={false} />
    </ul>
  );
};

const CountdownTimerHome = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice date={targetDate} />;
  } else {
    return (
      <ShowTimer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimerHome;
