import { useWeb3 } from "@3rdweb/hooks";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { NotificationMsg } from "../../store/actions/api-url";
import {
  multipliedBy,
  percentageOf,
  plusNum,
} from "../../store/actions/common-functions";
import { FiatbuyAsset, gup } from "../../store/actions/extra-function";
import { SetBuyData, SetloaderData } from "../../store/reducer";

const Checkout = ({ showCheckout, setShowCheckout, qty, setqty }) => {
  const { checkout } = useSelector((state) => state.Buy.data);

  const { address, activeProvider, chainId, balance, provider } = useWeb3();

  const { walletAddress, userToken } = useSelector((state) => state.User.xumm);

  const { _id = "", type, signer } = useSelector((state) => state?.User?.data);

  const [dataNft, setdataNft] = useState({});
  const [currency, setCurrency] = useState("usd");

  const { id } = useParams();

  const dispatch = useDispatch();

  const [apiCall, setapiCall] = useState(null);
  const handleCurrencyType = (e) => {
    setCurrency(e.target.value);
  };
  console.log(checkout, "checkout");
  useEffect(() => {
    if (checkout) {
      try {
        API({
          url: apiURl.paymentGate,
          method: "POST",
          body: { id, qty: qty || 1, currency: currency },
        }).then((data) => {
          setdataNft(data.Data);
        });
      } catch (error) {
        console.log(error);
      }
      // clearInterval(apiCall);
      // setapiCall(
      //   setTimeout(() => {
      //     const token = gup("token");
      //     const session = gup("session");
      //     const Type = gup("type");

      //     if (token || session || Type) {
      //       dispatch(SetloaderData(true));
      //       try {
      //         API({
      //           url: apiURl.verifyPayment,
      //           method: "POST",
      //           body: { token, session, type: Type },
      //         }).then((data) => {
      //           const totalAmt = multipliedBy(
      //             dataNft?.NFtName?.sign_instant_sale_price,
      //             data?.result?.Quantity || 1
      //           );
      //           const serviceFee = percentageOf(2.5, totalAmt);
      //           const total = plusNum(totalAmt, serviceFee);
      //           console.log(type, "total", total);
      //           if (type == "METAMASK") {
      //             console.log("total", total);
      //             dispatch(
      //               FiatbuyAsset(
      //                 dataNft?.NFtName?.cretor_wallet_address,
      //                 dataNft?.NFtName?.collection_type ? 1 : 0,
      //                 dataNft?.NFtName?.collection_type
      //                   ? process.env.REACT_APP_CONTRACT_ADDRESS_ERC721
      //                   : process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155,
      //                 dataNft?.NFtName?.token,
      //                 dataNft?.NFtName?.sign_instant_sale_price,
      //                 data?.result?.Quantity || 1,
      //                 parseFloat(parseFloat(total)),
      //                 process.env.REACT_APP_WETHADDRESS,
      //                 18,
      //                 dataNft?.NFtName?._id,
      //                 address,
      //                 dataNft?.NFtName?.Royality,
      //                 provider,
      //                 signer,
      //                 "abcde",
      //                 _id,
      //                 dataNft?.NFtName?.is_eth_payment,
      //                 dataNft?.NFtName
      //               )
      //             );
      //           } else {
      //             console.log("apiURl.BuyBroker", apiURl.BuyBroker);

      //             API({
      //               url: apiURl.BuyBroker,
      //               method: "POST",
      //               body: { id, xumm_user_token: userToken },
      //             }).then((data) => {
      //               API({
      //                 url: apiURl.Buy,
      //                 method: "POST",
      //                 body: {
      //                   wallet_id: walletAddress,
      //                   price: 1,
      //                   UserId: _id,
      //                   id,
      //                   xumm_user_token: userToken,
      //                 },
      //               }).then((data) => {
      //                 // toast(NotificationMsg.buyoffer, { type: 'success' });
      //                 if (data.is_offer_accepted) {
      //                   dispatch(SetloaderData(false));
      //                 }
      //               });
      //             });
      //           }
      //         });
      //       } catch (error) {
      //         console.log(error);
      //         dispatch(SetloaderData(false));
      //       }
      //       return;
      //     }
      //   }, 1000)
      // );
    }
  }, [checkout, currency, type, qty]);
  console.log(dataNft, "dataNft");

  useEffect(() => {
    setShowCheckout(checkout);
  }, [checkout]);

  const handleCloseFollow = (e) => {
    e.preventDefault();
    dispatch(SetBuyData({ modal: false, checkout: false, buyModal: false, stripe: false }));
  };

  const handleClose = (e) => {
    setShowCheckout(false);

    e.preventDefault();
    API({
      url: apiURl.createPayment,
      method: "POST",
      body: {
        id,
        User_id: _id,
        url: window.location.origin,
        qty: qty || 1,
        currency: currency,
      },
    }).then((data) => {
      console.log(data, "payment11");
      if (data.success) {
        window.location = data.Data;
      }
    });
  };

  return (
    <>
      <Modal
        show={showCheckout}
        size={"lg"}
        hide={handleCloseFollow}
        centered
        contentClassName="modal-custom"
      >
        <div className="pop_content pop-div pop-width">
          <div className="close-button" onClick={handleCloseFollow}>
            <a onClick={handleCloseFollow} href="!#">
              <img alt="" src="/images/cross-button.svg" />
            </a>
          </div>
          <h2>Checkout</h2>
          <form className="inline inline-pop">
            <div className="input-icons">
              <p>User Wallet Address</p>
              <div className="position-relative d-flex justify-content-between align-items-center mb-2">
                <i className="icon">
                  <img
                    src="/images/nav-wallet.svg"
                    alt=""
                    style={{ width: "80%" }}
                    className="checkout-pop-wallet-icon"
                  />
                </i>
                <input
                  className="input-field wallet-input-box m-0"
                  type="text"
                  placeholder={address || walletAddress}
                  readonly=""
                />
                <i
                  className="fa fa-info-circle icon info-icon"
                  title="Thank you for the payment, This is the wallet address in which the NFT will be transferred."
                ></i>
              </div>
              <p>From Address</p>
              <div className="position-relative d-flex justify-content-between align-items-center mb-2">
                <i className="icon">
                  <img
                    src="/images/nav-wallet.svg"
                    alt=""
                    style={{ width: "80%" }}
                    className="checkout-pop-wallet-icon"
                  />
                </i>
                <input
                  className="input-field wallet-input-box m-0"
                  type="text"
                  placeholder={dataNft?.NFtName?.cretor_wallet_address || ""}
                  readonly=""
                />
              </div>
              <h2>NFT Details</h2>
              <hr />
              <div className="row ">
                <div className="col-sm-12 ">
                  <div className="form-div">
                    <label className="">Number of copy</label>
                    <input
                      type={`text`}
                      className="form-control form-control-sm my-2"
                      value={qty}
                      onChange={(e) => {
                        e.preventDefault();
                        const re = /^[0-9]*$/;
                        if (
                          (e.target.value === "" || re.test(e.target.value)) &&
                          parseInt(e.target.value || 0) <=
                          parseInt(dataNft?.NFtName?.available_copies || 0)
                        ) {
                          setqty(
                            e.target.value == ""
                              ? e.target.value
                              : parseInt(e.target.value)
                          );
                        }
                      }}
                      placeholder="qty"
                      disabled={dataNft?.NFtName?.collection_type}
                    />
                  </div>
                </div>
                <div className="col-sm-12  ">
                  <hr className="mt-2" />

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="currency"
                      id="currencyTypeRadio1"
                      value="usd"
                      checked={currency === "usd"}
                      onChange={handleCurrencyType}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="currencyTypeRadio1"
                    >
                      USD
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="currency"
                      id="currencyTypeRadio2"
                      value="inr"
                      checked={currency === "inr"}
                      onChange={handleCurrencyType}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="currencyTypeRadio2"
                    >
                      INR
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      Name
                      <br />
                      <b>{dataNft?.NFtName?.Nftname || ""}</b>
                    </td>
                    <td>
                      Creator
                      <br />
                      <b className="txtLmid">
                        {dataNft?.NFtName?.cretor_wallet_address || ""}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Price
                      <br />
                      <span style={{ fontSize: "14px" }}>
                        <b>This cost include network &amp; transaction fees</b>
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }} id="total-fiat-price">
                      {currency === "inr" ? "₹" : currency === "usd" ? "$" : ""}{" "}
                      {dataNft?.actualPrice || ""}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: "50px" }}>
                <a
                  href="!#"
                  onClick={handleClose}
                  className="triggerFiatBuyValidation"
                  role="button"
                >
                  <div className="creat-button"> Proceed to Buy</div>
                </a>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
