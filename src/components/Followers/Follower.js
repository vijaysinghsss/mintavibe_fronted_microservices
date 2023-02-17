import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Follower() {
  const [followerData, setFollowerData] = useState([]);
  const { _id } = useSelector((state) => state.User?.data);
  const { id } = useParams();

  const fetchFollower = async () => {
    try {
      await API({
        url: `${apiURl.profileFollowers}/${id ? id : _id}`,
        method: "GET",
      }).then((data) => {
        console.log(data, "followerData");
        setFollowerData(data?.data?.Followers || []);
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
  console.log(followerData,"followerData")
  return (
    <>
      {followerData.length>0 ? (
        followerData.map((value, key) => {
          return (
            <div className="notice-box" key={value._id}>
              <div className="notice-box-img">
              <img
                  src={
                    value.image
                      ? process.env.REACT_APP_BACKENDURL + "/" + value?.image
                      : "/images/profile-header-img.png"
                  }
                  alt=""
                />
              </div>
              <p>
                {value?.Name
                  ? value?.Name
                  : value?.Firstname && value?.Lastname
                  ? `${value?.Firstname} ${value?.Lastname}`
                  : "N/A"}
              </p>
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
