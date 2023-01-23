import moment from "moment";
import React from "react";
import { useCountdown } from "../Hooks/useCountdown";
import ShowCounter from "./ShowCounter";
const ExpiredNotice = ({ date }) => {
  console.log(date, "date");
  return (
    <p className="text-danger">
      {moment(date).format("MMM Do YYYY, h:mm:ss a")}
    </p>
  );
};
const CountdownTimer = ({ targetDate, remainigTime }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  
  if (days + hours + minutes + seconds <= 0) {
    remainigTime(days + hours + minutes + seconds);
    return <ExpiredNotice date={targetDate} />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;
