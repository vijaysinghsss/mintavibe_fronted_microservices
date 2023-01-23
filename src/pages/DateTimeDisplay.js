import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'text-danger' : ''}>
      <p>{value}{type} </p>
    </div>
  );
};

export default DateTimeDisplay;
