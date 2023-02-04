import React from "react";
import moment from "moment";
import { CopyText } from "../../store/actions/extra-function";
function Details({
  setShowOwner,
  Owner_id,
  CreatedAt,
  NetworkName,
  nftTable,
  imageHash,
  transaction_hash,
  collection_type,
  no_of_copies,
  available_copies,
  wallet_type,
  cretor_wallet_address = "",
  owner_wallet_address = false,
  token,
  totalOwner,
}) {
  return (
    <div className="top-profile">
      {NetworkName[0] == "XUMM" ? (
        <div className="details-box">
          <span>Owner</span>
          <p title={owner_wallet_address || ""}>
            {" "}
            {(owner_wallet_address || "").slice(0, 4) +
              "..." +
              (owner_wallet_address || "").slice(-4)}
          </p>
        </div>
      ) : (
        <div className="details-box" >
          <span>Owner</span>
          {collection_type ? (
            <p title={owner_wallet_address} >
              {" "}
              {owner_wallet_address.slice(0, 4) +
                "..." +
                owner_wallet_address.slice(-4)}
            </p>
          ) : (
            <p onClick={() => setShowOwner(true)}> {(totalOwner ?`${totalOwner} Owners`:`${(totalOwner||1)} Owner`)}</p>
          )}
        </div>
      )}

      <div className="details-box">
        <span>Minted On</span>
        <p>{CreatedAt ? moment(CreatedAt).format("ll") : null}</p>
      </div>

      {NetworkName[0] == "XUMM" ? null : (
        <div className="details-box">
          <span>Available Editions</span>
          <p>
            {available_copies || 0} / {no_of_copies || 1}
          </p>
        </div>
      )}

      <div style={{ clear: "both" }}></div>
      {NetworkName[0] == "XUMM" ? (
        <div className="add-div">
          <p>Token ID</p>
          <span>{token} </span>
          <span>
            <button className="btn btn-success btn-sm">copy</button>
          </span>
          <img
            src="/images/copy.png"
            className="copy_address"
            alt=""
            onClick={(e) => {
              e.preventDefault();
              CopyText(token);
            }}
            style={{ width: "20px", cursor: "pointer" }}
          />
        </div>
      ) : (
        <div className="add-div">
          <p>Contract Address</p>
          <span>
            {collection_type
              ? process.env.REACT_APP_CONTRACT_ADDRESS_ERC721
              : process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155}
          </span>
        </div>
      )}

      <a href={imageHash} target={`_blank`}>
        <div className="tab-button">
          <img src="/images/ipfs-box.svg" alt="" /> IPFS{" "}
        </div>
      </a>

      {NetworkName[0] == "XUMM" ? (
        <a
          href={`${process.env.REACT_APP_XRPLTRANSACTION}${transaction_hash}`}
          target={`_blank`}
        >
          <div className="tab-button" style={{ width: "172px" }}>
            <img
              src="/images/xrp.png"
              className="mx-2 my-1"
              width={"14%"}
              alt=""
            />{" "}
            XRPL Explorer{" "}
          </div>
        </a>
      ) : (
        <a
          href={`${process.env.REACT_APP_ETHERSCANTRANSACTION}${transaction_hash}`}
          target={`_blank`}
        >
          <div className="tab-button">
            <img src="/images/eth.svg" alt="" /> Etherscan{" "}
          </div>
        </a>
      )}
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default Details;
