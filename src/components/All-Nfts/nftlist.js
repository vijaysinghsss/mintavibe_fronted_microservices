import React from "react";
import Card from "../NftCard/card";

export default function Nftlisting({ children, nft, ...props }) {
  console.log(nft)
  return (
    <>
      <div className="col-md-9" style={{ marginTop: "30px" }}>
        <div className="row">
          {nft.length > 0 &&
            nft.map((item, index) => (
              <div className="col-sm-4">
                {" "}
                <Card {...item} image={"/images/Art1.jpg"} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
