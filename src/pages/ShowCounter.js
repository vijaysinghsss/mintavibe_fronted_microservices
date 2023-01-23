import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <p className="d-flex justify-content-between">
      <DateTimeDisplay value={days} type={"d"} isDanger={days <= 3} /> {" "} : 
      <DateTimeDisplay value={hours} type={"h"} isDanger={false} />  {" "}  : 
      <DateTimeDisplay value={minutes} type={"m"} isDanger={false} /> {" "}  : 
      <DateTimeDisplay value={seconds} type={"s"} isDanger={false} />
    </p>
  );
};
export default ShowCounter;
