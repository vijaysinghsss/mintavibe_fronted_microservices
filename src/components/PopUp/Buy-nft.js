import React, { useState } from "react";

const BuyNft = ({
  buyHandleChange,
  Balance,
  Data,
  NetworkName,
  handleCloseFollow,
}) => {
  const [qty, setqty] = useState(1);

  return (
    <>
      <h2>Buy Now</h2>
      <div className="bid-pop-div">
        <p style={{ color: "#98999D" }}>You are about to purchase</p>
        <p>{Data.Nftname}</p>
        <p></p>
      </div>
      <div className="row grey-bg">
        <div className="col-sm-12">
          <input
            type={`text`}
            className="form-control form-control-sm"
            value={qty}
            onChange={(e) => {
              e.preventDefault();
              const re = /^[0-9]*$/;
              // (!Data.transaction_hash_list.length ? parseInt(Data.no_of_copies) : parseInt(Data.available_copies || 0))
              if (
                (e.target.value === "" || re.test(e.target.value)) &&
                parseInt(e.target.value || 0) <=
                  parseInt(Data.available_copies || 0)
              ) {
                setqty(
                  e.target.value == ""
                    ? e.target.value
                    : parseInt(e.target.value)
                );
              }
            }}
            disabled={Data.collection_type}
            placeholder="Qty"
          />
        </div>
        <div className="bid-details">
          <p>Buy Price</p>
          <p>
            <span className="single_collection_price_currency ">
              <span>{Data.sign_instant_sale_price}</span>
              <span id="buy_currency">
                &nbsp;{NetworkName && NetworkName[0] == "XUMM" ? "XRP" : "ETH"}
              </span>
            </span>
          </p>
        </div>
        <div className="bid-details">
          <p>Your balance</p>
          <p id="current_balance">
            <span>
              {parseFloat(Balance).toFixed(4)}&nbsp;{" "}
              {NetworkName && NetworkName[0] == "XUMM" ? "XRP" : "ETH"}
            </span>
          </p>
        </div>
        <div className="bid-details">
          <p>You will pay</p>
          <p>
            <span>
              {Data.sign_instant_sale_price * parseInt(qty || 1)} &nbsp;
              {NetworkName && NetworkName[0] == "XUMM" ? "XRP" : "ETH"}
            </span>
            <span> + (tranasaction charges)</span>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <a
            href="!#"
            onClick={(e) => {
              e.preventDefault();
              handleCloseFollow();
            }}
          >
            <div className="cancel-button">Cancel</div>
          </a>
        </div>
        <div className="col-6">
          <a href="!#" onClick={buyHandleChange(qty)}>
            <div className="creat-button">Buy</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default BuyNft;
