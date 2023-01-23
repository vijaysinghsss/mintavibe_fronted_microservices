import React from 'react'
import Card from '../NftCard/card';

function Created(props) {
  return (
    <div
          className="resp-tab-content hor_1 resp-tab-content-active"
          aria-labelledby="hor_1_tab_item-2"
          style={{ display: "block" }}
    >
      <h2>{props.title}</h2>
      <div className="row">
        <div className="col-md-4">
          <Card />
        </div>
        <div className="col-md-4">
          <Card />
        </div>
        <div className="col-md-4">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Created