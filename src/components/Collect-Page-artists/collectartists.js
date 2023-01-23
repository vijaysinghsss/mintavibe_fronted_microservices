import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { SetActivityData } from "../../store/reducer/activity";
import { Pagination } from "../Pagination/Pagination";

function Collectartists() {
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate();

  const { _id } = useSelector((state) => state.User?.data);

  // const { image, message } = useSelector((state) => state.Activity?.data);
  // const dispatch = useDispatch();
  const [page, setpage] = useState(0);
  const addToUrl = (str, paramKey, paramVal) => {
    let quryString = paramVal
      ? str
        ? `${str}&${paramKey}=${paramVal}`
        : `${paramKey}=${paramVal}`
      : str;
    return quryString;
  };
  const makeSerchSting = () => {
    let searchStr = "";
    searchStr = addToUrl(searchStr, "page", page);
    return searchStr;
  };
  const getUrl = () => {
    let searchString = makeSerchSting();
    let url = searchString
      ? `${apiURl.artist}?${searchString}`
      : `${apiURl.artist}`;
    return url;
  };
  const fetchArtist = () => {
    const URL = getUrl();
    try {
      API({ url: URL, method: "GET" }).then((data) => {
        setActivityData(data || []);
        // dispatch(SetActivityData(data.result));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchArtist();
    // try {
    //   API({ url: apiURl.activityDetails + "/" + _id, method: "GET" }).then(
    //     (data) => {
    //       setActivityData(data.data.Notification || []);
    //       dispatch(SetActivityData(data.result));
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  }, [page]);

  return (
    <div>
      <div id="Artist">
        <div className="container">
          <div className="row top-spac">
            {activityData?.data?.filterartist?.length > 0 ? (
              activityData?.data?.filterartist?.map((value, key) => {
                return (
                  <div className="col-md-4 col-sm-3 block-bottom">
                    <div className="artists-box">
                      <div className="artists-box-img">
                        <img
                          src={`${process.env.REACT_APP_BACKENDURL}/${value.Image}`}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <p>{value?.Name ? value.Name : "N/A"}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-danger">No data found</p>
            )}
          </div>
          {activityData?.data?.filterartist?.length > 0 && (
            <Pagination
              totalPages={Math.ceil(
                activityData?.totalCount / activityData?.limit
              )}
              setData={(e) => {
                setpage(e.selected + 1);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Collectartists;
