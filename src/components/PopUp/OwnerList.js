import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
function OwnerList({ showOwner, setShowOwner }) {
  const handleCloseN = () => setShowOwner(false);
  const [ownerData, setOwnerData] = useState([]);
  const { id } = useParams();
  const fetchOwners = async () => {
    try {
      await API({
        url: `${apiURl.allowners}/${id}`,
        method: "GET",
      }).then((data) => {
        if (data?.status || data?.status === "true") {
          setOwnerData(data?.response?.data || []);
        } else {
          setOwnerData([]);
        }
        console.log("fetchOwners data", data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchOwners();
    }
  }, [id]);
  return (
    <div>
      <Modal show={showOwner} hide={handleCloseN}>
        <div className="pop_content ">
          <div
            className="close-button"
            style={{ cursor: "pointer" }}
            onClick={handleCloseN}
          >
            <a href="!#">
              <img src="/images/cross-button.svg" alt="" />
            </a>
          </div>
          <div className="">
            <h4 className="text-center">Owner`s List</h4>
            <hr />
            {ownerData.length > 0 ? (
              ownerData.map((item) => {
                if (item.own_copies < 1) {
                  return null;
                }
                return (
                  <Link
                    to={`/collections/${item?._id}`}
                    className="notice-box"
                    onClick={handleCloseN}
                  >
                    <div className="notice-box-img">
                      <img
                        src={
                          item?.Owner_id?.image
                            ? process.env.REACT_APP_BACKENDURL +
                            "/" +
                            item?.Owner_id?.image
                            : "/images/profile-iocn.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="me-3 text-dark">
                      {(item.Owner_id.Firstname || item.Owner_id.Lastname) &&
                        `${item.Owner_id.Firstname} ${item.Owner_id.Lastname}`}
                      <div title={item?.owner_wallet_address}>
                        {(item?.owner_wallet_address || "")?.slice(0, 4) +
                          "..." +
                          (item?.owner_wallet_address || "")?.slice(
                            (item?.owner_wallet_address || "").length - 4
                          )}
                      </div>
                    </div>

                    <div className="ms-auto text-dark">
                      {item.own_copies} copies
                    </div>
                    {/* <i
                    className={`fa fa-eye`}
                    id="togglePassword"
                  ></i> */}
                  </Link>
                )
              })
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default OwnerList;
