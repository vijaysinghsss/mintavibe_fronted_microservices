import React from "react";

function Properties({ data = [] }) {
  return (
    <div className="top-profile">
      {data.map((item) => (
        <div className="tab-porp-box text-center">
          {/* <p className="align-right">(10/1000)</p> */}
          <p title={item.trait_type}>
            {item.trait_type.length < 15
              ? item.trait_type
              : item.trait_type.slice(0, 15) + "..."}{" "}
          </p>
          <span title={item.value}>
            {" "}
            {item.value.length < 15
              ? item.value
              : item.value.slice(0, 15) + "..."}{" "}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Properties;
