import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { Spinner } from "react-bootstrap";

function Follower() {
  const [followerData, setFollowerData] = useState([]);
  const { _id } = useSelector((state) => state.User?.data);
  const fetchFollower = async () => {
    try {
      await API({
        url: apiURl.profileFollowers + "?FollowingId=" + _id,
        method: "GET",
      }).then((data) => {
        console.log(data, "followerData");
        setFollowerData(data.data || []);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollower();
  }, []);
  const getHtml = () => {
    return (
      <>
        {/* <Spinner animation="border" size="sm" /> */}
        <p>No Follower Found</p>
      </>
    );
  };
  return (
    <>
      {followerData.length ? (
        followerData.map((value, key) => {
          return (
            <div className="notice-box" key={value._id}>
              <div className="notice-box-img">
                <img
                  src={process.env.REACT_APP_BACKENDURL + "/" + value.image}
                  alt=""
                />
              </div>
              <p>{value.FollowerId.Name}</p>
            </div>
          );
        })
      ) : (
        <>{getHtml()}</>
      )}
    </>
  );
}

export default Follower;
