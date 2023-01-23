import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./filter.css";
function FilterNft({ filter, setFilter, ClearAll }) {
  const [index, setIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { Category = [], CreatorCategory } = useSelector(
    (state) => state.Slider
  );
  console.log(Category, "Category");

  const handleSelectCategory = (name) => {
    let arr = [...selectedCategory];
    let index = arr.findIndex((ele) => ele === name);
    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(name);
    }
    setSelectedCategory(arr);
    let str=arr.join(",")
    setFilter({ ...filter, category: str, page: 1 });

  };
console.log(selectedCategory,"selectedCateg")
  const handleSetFilter = (myParam, value) => {
    setFilter({ ...filter, [myParam]: value, page: 1 });
  };
  return (
    <>
      <div className="accordion">
        <div className="clear-div-button mx-3" onClick={() => ClearAll()}>
          <a href="javascript:;">
            <div className="appy-button">Clear All</div>
          </a>
        </div>

        <ul>
          <li className={`${index === 0 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 0 ? 0 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/Status-icon-2.svg" />
                </span>
                Status
              </a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 0 ? "block" : "" }}>
              <li
                className={`${
                  !filter?.status && "appy-filter"
                } status-lable current_page_item`}
                onClick={() => handleSetFilter("status", null)}
              >
                All NFTs
              </li>
              <li
                className={`${
                  filter?.status === "instant_sale_enabled" && "appy-filter"
                } status-lable `}
                onClick={() =>
                  handleSetFilter("status", "instant_sale_enabled")
                }
              >
                Instant Buy
              </li>
              <li
                className={`${
                  filter?.status === "open_for_bid" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("status", "open_for_bid")}
              >
                Open for Bid
              </li>
              <li className="status-lable">On Auction</li>
            </ul>
          </li>
        </ul>

        <ul>
          <li className={`${index === 1 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 1 ? 1 : -1)}>
              <span>
                <img src="/images/price-icon-2.svg" />
              </span>
              <a href="#">Price Range</a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>

            <ul
              style={{ display: index === 1 ? "block" : "", paddingTop: "0px" }}
            >
              <select
                id="example"
                name="currency"
                className="price-select"
                onChange={(e) => handleSetFilter("price", e.target.value)}
                value={filter?.price}
              >
                {/* <option value="btc" style={{ position: "relative" }}>
                  Bitcoin (BTC)
                  <div style={{ position: "absolute" }}>
                    <img src="/images/price-icon-2.svg" />
                  </div>
                </option> */}
                <option value="" data-icon="eth.png">
                  Select
                </option>
                <option value="Eth" data-icon="eth.png">
                  Ethereum (ETH)
                </option>
                <option value="xrp" data-icon="bch.png">
                  XRP
                </option>
              </select>
              <div className="form-div">
                <input
                  className="form-control amout"
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Min"
                  value={filter?.range_from}
                  onChange={(e) =>
                    handleSetFilter("range_from", e.target.value)
                  }
                />
                <input
                  className="form-control amout"
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="max"
                  value={filter?.range_to}
                  onChange={(e) => handleSetFilter("range_to", e.target.value)}
                />
                <div style={{ clear: "both" }}></div>
              </div>
            </ul>
          </li>
        </ul>

        <ul>
          <li className={`${index === 2 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 2 ? 2 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/sort-by-icon-2.svg" />
                </span>
                Sort By
              </a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 2 ? "block" : "" }}>
            <li
                className={`${
                  !filter?.sortBy && "appy-filter"
                } status-lable current_page_item`}
                onClick={() => handleSetFilter("sortBy", null)}
              >
                All
              </li>
              <li
                className={`${
                  filter?.sortBy === "trending" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("sortBy", "trending")}
              >
                Trending
              </li>
              <li
                className={`${
                  filter?.sortBy === "recentlisted" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("sortBy", "recentlisted")}
              >
                Recently Listed
              </li>
              <li
                className={`${
                  filter?.sortBy === "priceup" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("sortBy", "priceup")}
              >
                Price - High to Low
              </li>
              <li
                className={`${
                  filter?.sortBy === "pricedown" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("sortBy", "pricedown")}
              >
                Price - Low to High
              </li>
              <li className="status-lable">Auction Ending Soon</li>
            </ul>
          </li>
        </ul>

        <ul>
          <li className={`${index === 3 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 3 ? 3 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/quantity-icon-2.svg" />
                </span>
                Quantity
              </a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 3 ? "block" : "" }}>
              <li
                className={`${
                  !filter?.quantity && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("quantity", null)}
              >
                All
              </li>
              <li
                className={`${
                  filter?.quantity === "single" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("quantity", "single")}
              >
                Single Item
              </li>
              <li
                className={`${
                  filter?.quantity === "multiple" && "appy-filter"
                } status-lable `}
                onClick={() => handleSetFilter("quantity", "multiple")}
              >
                Multiple Item
              </li>
            </ul>
          </li>
        </ul>

        {/* <ul>
          <li className={`${index === 4 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 4 ? 4 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/collections-icon-2.svg" />
                </span>
                Collections
              </a>
              <i className="" >
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 4 ? "block" : "" }}>
              <li className="status-lable">Collection-1</li>
              <li className="status-lable">Collection-2</li>
              <li className="status-lable">Collection-3</li>
              <li className="status-lable">Collection-4</li>
            </ul>
          </li>
        </ul> */}

        <ul>
          <li className={`${index === 5 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 5 ? 5 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/chain-icon-2.svg" />
                </span>
                Chains
              </a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 5 ? "block" : "" }}>
              <li
                className={`${
                  !filter?.chains && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("chains", null)}
              >
                <div className="icon-bg">
                  <img src="/images/Fiat-Buy-icon.svg" className="all-icon" />
                </div>
                <span>Select All</span>
              </li>
              <li
                className={`${
                  filter?.chains === "Eth" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("chains", "Eth")}
              >
                <div className="icon-bg">
                  <img src="/images/chain-ETH-icon.svg" className="eth-icon" />
                </div>
                <span>ETH</span>
              </li>
              <li
                className={`${
                  filter?.chains === "xrp" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("chains", "xrp")}
              >
                <div className="icon-bg">
                  <img src="/images/chain-XRP-icon.svg" />
                </div>
                <span>XRP</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className={`${index === 6 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 6 ? 6 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/Category-iocn.svg" />
                </span>
                Category
              </a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 6 ? "block" : "" }}>
              {Category?.length > 0
                ? Category?.map((ele) => (
                    <li
                    className={`${
                      selectedCategory.includes(ele.Categoryname)  && "active-item"
                    } status-lable status-lable-2 page_item`}
                     
                      onClick={() => handleSelectCategory(ele.Categoryname)}
                    >
                      <span >{ele.Categoryname}</span>
                    </li>
                  ))
                : ""}
              {/* <li className="page_item active-item">
                <a href="javascript:;">Music</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Art</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Utility</a>
              </li>
              <li className="page_item active-item">
                <a href="javascript:;">Sports/Game</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Brands</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Influencers</a>
              </li>
              <li className="page_item active-item">
                <a href="javascript:;">Memes</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Virtual World</a>
              </li>
              <li className="page_item">
                <a href="javascript:; active-item">Literary</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Photography</a>
              </li>
              <li className="page_item">
                <a href="javascript:;">Movie/ Entertainment </a>
              </li> */}
            </ul>
          </li>
        </ul>

        {/* <ul>
          <li className={`${index === 7 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 7 ? 7 : -1)}>
              <a href="#">
                <span>
                  <img src="/images/menu-option-iocn-2.svg" />
                </span>
                Options
              </a>
              <i className="" >
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 7 ? "block" : "" }}>
              <li className="status-lable">Lazy Minted</li>
              <li className="status-lable">Option-1</li>
              <li className="status-lable">Option-2</li>
            </ul>
          </li>
        </ul> */}
        <ul>
          <li className={`${index === 8 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 8 ? 8 : -1)}>
              <span>
                <img src="/images/Availble-icon-2.svg" />
              </span>
              <a href="#">Available for Fiat Buy</a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>

            <ul style={{ display: index === 8 ? "block" : "" }}>
              <li
                className={`${
                  !filter?.wallet_type && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("wallet_type", null)}
              >
                <div className="icon-bg">
                  <img src="/images/Fiat-Buy-icon.svg" className="all-icon" />
                </div>
                <span>All</span>
              </li>
              <li
                className={`${
                  filter?.wallet_type === "fiatEth" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("wallet_type", "fiatEth")}
              >
                <div className="icon-bg">
                  <img src="/images/chain-ETH-icon.svg" className="eth-icon" />
                </div>
                <span>ETH</span>
              </li>
              <li
                className={`${
                  filter?.wallet_type === "fiatXrp" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("wallet_type", "fiatXrp")}
              >
                <div className="icon-bg">
                  <img src="/images/chain-XRP-icon.svg" />
                </div>
                <span>XRP</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className={`${index === 9 ? "open" : ""} pagenav`}>
            <h4 onClick={() => setIndex(index !== 9 ? 9 : -1)}>
             
              <a href="#">Creator Type</a>
              <i className="">
                <img src="/images/arrow-right.png" />
              </i>
            </h4>
            <ul style={{ display: index === 9 ? "block" : "" }}>
              <li
                className={`${
                  !filter?.creator && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("creator", null)}
              >
                
                <span>All</span>
              </li>
              <li
                className={`${
                  filter?.creator === "biopac" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("creator", "biopac")}
              >
               
                <span>By BIPOC Creators</span>
              </li>
              <li
                className={`${
                  filter?.creator === "Female" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("creator", "Female")}
              >
                
                <span>By Female Creators</span>
              </li>
              <li
                className={`${
                  filter?.creator === "LGBTQ" && "appy-filter"
                } status-lable status-lable-2 `}
                onClick={() => handleSetFilter("creator", "LGBTQ")}
              >
               
                <span>By LGBTQIA+ creators</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default FilterNft;
