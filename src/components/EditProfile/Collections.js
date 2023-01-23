import React from "react";
import Collectartists from "../Collect-Page-artists/collectartists";

function Collections(props) {
  return (
    <div
      className="resp-tab-content hor_1 resp-tab-content-active"
      aria-labelledby="hor_1_tab_item-4"
      style={{ display: "block" }}
    >
      <h2>{props.title}</h2>
          <div className="row">
              <Collectartists />
          </div>
    </div>
  );
}

export default Collections;
