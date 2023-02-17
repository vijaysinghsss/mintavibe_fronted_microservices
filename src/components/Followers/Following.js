import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function Following() {
  const [followingData, setFollowingData] = useState([]);
  const { _id } = useSelector((state) => state.User?.data);
  const { id } = useParams();

  const fetchFollowing = async () => {
    try {
      await API({
        url: `${apiURl.profileFollowing}/${id ? id : _id}`,
        method: "GET",
      }).then((data) => {
        console.log("following data", data);
        setFollowingData(data?.data?.Followings || []);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <>
      {followingData?.length > 0 ? (
        followingData.map((value, key) => {
          return (
            <div className="notice-box" key={value._id}>
              <div className="notice-box-img">
                <img
                  src={process.env.REACT_APP_BACKENDURL + "/" + value.image}
                  alt=""
                />
              </div>
              <p>{value?.Name ? value?.Name : "N/A"}</p>
            </div>
          );
        })
      ) : (
        <p>No Data Found</p>
      )}
    </>
  );
}

export default Following;
