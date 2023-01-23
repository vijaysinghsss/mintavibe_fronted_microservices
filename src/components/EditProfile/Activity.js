import moment from "moment";
import React from "react";

function Activity({ activityData = [] }) {
  return (
    <>
      {activityData?.length > 0 ? (
        activityData?.map((ele) => (
          <div className="col-md-4 col-sm-6 block-bottom">
            <div className="atcive-box">
              <div className="atcive-box-img">
                <img
                  src={`${process.env.REACT_APP_BACKENDURL}/${ele?.image_url}`}
                  alt=""
                  width={60}
                  height={90}
                />
              </div>
              <div className="atcive-box-div">
                <p className="resp-vtabs-tab-space">{`${ele?.To_user_id?.Firstname} ${ele?.To_user_id?.Lastname}`}</p>
                <p>
                  <span>{ele?.Message}  </span>
                </p>
                <p>
                  <span className="hr">{moment(ele?.CreatedAt).fromNow()}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <p>No Data Found </p>
        </>
      )}
    </>
  );
}

export default Activity;
