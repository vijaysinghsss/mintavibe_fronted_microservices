import React, { useEffect, useState } from "react";
import { API } from "../../apiwrapper";
import Card from "../NftCard/card";
import { apiURl } from "../../store/actions";
import { useWeb3 } from "@3rdweb/hooks";

// const getApiURl = (type) => {
//   switch (type) {
//     case `listings`:
//       return apiURl.AllFavNft
//     case `created`:
//       return apiURl.AllFavNft
//     case `collected`:
//       return apiURl.AllFavNft
//     case `collections`:
//       return apiURl.GetCollections
//     case `favorites`:
//       return apiURl.AllFavNft;
//     case `importNft`:
//       return apiURl.AllFavNft
//     default:
//       return apiURl.AllFavNft
//   }
// }

function Listing({ type, title }) {
  const { address } = useWeb3();

  const [data, setData] = useState([]);

  const FetchData = (url) => {
    try {
      API({ url }).then((data) => {
        switch (url) {
          case apiURl.GetCollections:
            setData(data.data);
            break;
          case apiURl.ProfileListing:
            setData(data.data);

            break;
          case apiURl.Products:
            setData(data.data.allNft);

            break;
          case apiURl.CollectedNft:
            setData(data.data);

            break;
          case apiURl.AllFavNft:
            setData(data.data.allfavNft);

            break;
          case apiURl.AlchemyFetch:
            console.log("hello", data);
            // setData(data.ownedNfts);
            break;
          case apiURl.activityDetails:
            setData(data.allNotification);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    FetchData(type);
  }, [type]);

  return (
    <div
      className="resp-tab-content hor_1 resp-tab-content-active"
      aria-labelledby="hor_1_tab_item-1"
      style={{ display: "block" }}
    >
      <h2>{title}</h2>
      <div className="row">
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="col-md-4">
              <Card {...item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Listing;
