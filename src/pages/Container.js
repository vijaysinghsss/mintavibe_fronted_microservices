import React from "react";
import RecentArticles from "./RecentArticles";
import SideArea from "./SideArea";
import SubscribeBox from "./SubscribeBox";
import TrendingNft from "./TrendingNft";

function Container() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <SideArea />
        </div>
        <div className="col-md-5">
          <div className="right-sidebar">
            <RecentArticles />
            <SubscribeBox />
            <TrendingNft />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
