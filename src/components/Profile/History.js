import React from "react";
import moment from "moment";

function History({ HistoryData }) {
  console.log(HistoryData, "HistoryData");
  return (
    <div className="top-profile">
      <table>
        <tbody>
          {HistoryData.map((item) => (
            <tr>
              <td>
                <div className="tab-img-box">
                  <img
                    src={
                      item?.Userid?.image
                        ? process.env.REACT_APP_BACKENDURL +
                          "/" +
                          item?.Userid?.image
                        : "/images/user-icon.png"
                    }
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
              </td>
              <td>
                <div className="add-div">
                  <p>
                    {`${item?.Collectionid?.Nftname} ${item?.Message} ${
                      item?.Userid?.Firstname && item?.Userid?.Lastname
                        ? `${item?.Userid?.Firstname} ${item?.Userid?.Lastname}`
                        : item?.Userid?.Name
                        ? item?.Userid?.Name
                        : (item?.Userid?.cretor_wallet_address || "")?.slice(
                            0,
                            4
                          ) +
                          "..." +
                          (item?.Userid?.cretor_wallet_address || "").slice(-4)
                    } `}
                  </p>
                  <span>
                    {item.CreatedAt ? moment(item.CreatedAt).fromNow() : null}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
