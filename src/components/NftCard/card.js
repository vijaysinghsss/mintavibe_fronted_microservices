import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allChainsIDS } from "../../store/actions/extra-function";

const Card = ({
  Nftname,
  image,
  likes_count,
  Category,
  Description,
  instant_sale_price,
  _id,
  wallet_type = "ETH",
  sign_instant_sale_price,
  coverImage,
  cretor_wallet_address,
  mediaType,
  no_of_copies,
  collection_type,
  Owner_id,
  nft_type,
  Bids,
}) => {
  const [NNetwokType, setNNetwokType] = useState(false);
  const { loginUserData = {} } = useSelector((state) => state.authUser);
  // const { id: User_Id = false } = loginUserData
  useEffect(() => {
    const NetworkName = Object.entries(allChainsIDS).find(
      (item) => wallet_type == item[1]
    );
    setNNetwokType(NetworkName || false);
  }, [wallet_type]);
  // const Highest_Bid = CollectionDetails?.Bids?.reduce(
  //   (acc, ass) => (+acc?.Amount > +ass?.Amount ? +acc?.Amount : +ass?.Amount),
  //   0
  // );

  return (
    <div className="nft-box">
      <div className="nft-box-img-box">
        {/* <img
            src={`${process.env.REACT_APP_BACKENDURL}/${coverImage || image}`}
            alt="crosstower"
            loading="lazy"
            style={{ maxHeight: "180px", minHeight: "180px" }}
          /> */}
        <img
          src={`${process.env.REACT_APP_BACKENDURL}/${coverImage}` || image}
          alt=""
        />
        <div className="nft-box-div">
          <div className="like-icon">
            {collection_type ? null : <> {no_of_copies}x</>}
            <img
              src={`/images/${mediaType == "video"
                ? "video"
                : mediaType == "audio"
                  ? "music"
                  : "image"
                }-icon.svg`}
              alt=""
            />
          </div>
          <p>
            {Nftname?.length < 20 ? Nftname : Nftname?.substr(0, 14) + "...."}
          </p>
          <span>
            {cretor_wallet_address &&
              cretor_wallet_address?.substr(0, 4) +
              "...." +
              cretor_wallet_address?.substr(-4)}
          </span>
          <div className="boder-bottom"></div>
        </div>
      </div>
      <div className="price-div">
        <div className="price-sub">
          <div className="eth-icon-div">
            <img
              src={`/images/${NNetwokType[0] == "XUMM" ? "xrp" : "cart-eth"}-icon.svg`}
              alt=""
            />
          </div>
          {nft_type === "OPENBID" ? (
            <>
              <p>Highest Bid</p>
              <span></span>
            </>
          ) : (
            <>
              <p>Price</p>
              <span>
                {sign_instant_sale_price || instant_sale_price || 0}{" "}
                {NNetwokType[0] == "XUMM" ? "XRP" : "ETH"}
              </span>
            </>
          )}
        </div>
        <div className="price-sub  price-sub-space">
          <Link to={`/collections/${_id}`}>
            {Owner_id && Owner_id?._id == loginUserData?.id
              ? "View"
              : nft_type === "OPENBID"
                ? "Bid"
                : "Buy"}
          </Link>
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
};

export default Card;
