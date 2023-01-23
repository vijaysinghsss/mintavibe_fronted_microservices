import { useWeb3 } from "@3rdweb/hooks";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { NotificationMsg } from "../../store/actions/api-url";
import {
  isGreaterThanOrEqualTo,
  multipliedBy,
  percentageOf,
  plusNum,
} from "../../store/actions/common-functions";
import {
  allChainsIDS,
  buyAsset,
  Erc20Balance,
} from "../../store/actions/extra-function";
import { SetBuyData, SetFollowrData } from "../../store/reducer";
import BuyNft from "./Buy-nft";
import CheckoutPayment from "./checkout-payment";

const XummBuy = (props) => {
  const { modal, buyModal = false } = useSelector((state) => state.Buy.data);

  const { userToken, walletAddress } = useSelector((state) => state.User.xumm);

  const { _id = "", type, signer } = useSelector((state) => state.User.data);

  const { socket } = useSelector((state) => state.Socket);

  const { balance: balanceMeta, address, provider } = useWeb3();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [Balance, setBalance] = useState("0");

  const [buyTrue, setbuyTrue] = useState(false);

  const [PayStripe, setPayStripe] = useState(false);

  const [Data, setData] = useState(0);

  const [NetworkName, setNetworkName] = useState(false);

  const handleCloseFollow = () => {
    setPayStripe(false);
    dispatch(SetBuyData({ modal: false, checkout: false, buyModal: false }));
  };

  useEffect(() => {
    try {
      API({
        url: apiURl.XummNftPrice + `/${id}`,
        body: { qty: 1 },
        method: "POST",
      }).then((data) => {
        setData(data.Nft);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      if (type !== "METAMASK") {
        socket.emit("xumm-wallet", walletAddress, setBalance);
        return () => {
          socket.removeAllListeners("xumm-wallet");
        };
      }
    }
  });

  useEffect(() => {
    const NetworkName = Object.entries(allChainsIDS).find(
      (item) => Data?.wallet_type == item[1]
    );
    setNetworkName(NetworkName || false);
  }, [Data]);

  useEffect(() => {
    setShow(modal);
    if (type == "METAMASK") {
      setBalance(balanceMeta?.formatted || 0);
    }
  }, [modal, balanceMeta, type]);

  useEffect(() => {
    setbuyTrue(buyModal);
  }, [buyModal]);

  const buyHandleChange = (qty) => async (e) => {
    e.preventDefault();

    // is_fiat


    if (NetworkName && NetworkName[0] == "XUMM") {
      await XummBuyXrp(qty);
    } else {
      await EthMetaBuy(qty);
    }

    return;
  };

  const EthMetaBuy = async (qty) => {
    dispatch(SetBuyData({ modal: false, checkout: false, buyModal: false }));

    dispatch(
      SetFollowrData({
        upload: 0,
        mint: 2,
        fixed: 2,
        approve: 2,
        ModalType: "Buy",
        modal: true,
      })
    );

    const balance = await new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (parseFloat(Balance) >= parseFloat(Data.sign_instant_sale_price)) {
            resolve(true);
          } else {
            reject(false);
          }
        }, 1500);
      } catch (error) {
        reject(false);
      }
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(
          SetFollowrData({
            upload: 5,
            mint: 2,
            fixed: 2,
            approve: 2,
            ModalType: "Buy",
            func: async () => {
              await EthMetaBuy();
            },
            modal: true,
          })
        );
        return false;
      });

    if (!balance) {
      return;
    }
 
    const curErc20Balance = await Erc20Balance(
      process.env.REACT_APP_WETHADDRESS,
      18,
      address,
      provider
    );

    const ethBalance = balanceMeta?.formatted || 0;

    const totalAmt = multipliedBy(Data.sign_instant_sale_price, qty);
    const serviceFee = percentageOf(2.5, totalAmt);
    const total = plusNum(totalAmt, serviceFee);
    const exist = isGreaterThanOrEqualTo(ethBalance, total);
    console.log({ totalAmt, serviceFee, total: parseFloat(total), exist });
    // return;
    if (exist) {
      let paymentDetails = {};
      let isEthPayment = true;
      if (isEthPayment) {
        paymentDetails["pay_token_address"] =
          "0x0000000000000000000000000000000000000000";
        paymentDetails["pay_token_decimal"] = 18;
      }
      let is_collection_lazy_minted = false;
      if (is_collection_lazy_minted) {
        // MintAndBuyAsset(
        //     paymentDetails["owner_address"],
        //     toNum(paymentDetails["asset_type"]),
        //     paymentDetails["asset_address"],
        //     paymentDetails["token_id"],
        //     toNum(paymentDetails["unit_price"]),
        //     toNum($("#buy_qty").val()),
        //     toNum($("#buy-total-amt-dp").attr("buyAmt")),
        //     paymentDetails["pay_token_address"],
        //     toNum(paymentDetails["pay_token_decimal"]),
        //     paymentDetails["seller_sign"],
        //     paymentDetails["collection_id"],
        //     paymentDetails["token_uri"],
        //     paymentDetails["royalty"],
        //     paymentDetails["shared"],
        //     paymentDetails["total"],
        //     isEthPayment
        // );
        // Data.collection_type ? `0x3B5034A11716acd1b2119F9B626CF0B80d3b769E` :
      } else {
        // console.log(Data);
        // console.log({
        //     cretor_wallet_address: Data.cretor_wallet_address,
        //     Data.collection_type,
        //     Data.collection_type ? process.env.REACT_APP_CONTRACT_ADDRESS_ERC721 : process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155,
        //     Data.token,
        //     Data.sign_instant_sale_price,
        //     Data.no_of_copies,
        //     total,
        //     process.env.REACT_APP_WETHADDRESS,
        //     18,
        //     Data._id,
        //     address,
        //     Data.Royality,
        //     provider,
        //     signer,
        //     'abcde',
        //     Data.is_eth_payment
        // });
        // return;

        dispatch(
          buyAsset(
            Data.cretor_wallet_address,
            Data.collection_type ? 1 : 0,
            Data.collection_type
              ? process.env.REACT_APP_CONTRACT_ADDRESS_ERC721
              : process.env.REACT_APP_CONTRACT_ADDRESS_ERC1155,
            Data.token,
            Data.sign_instant_sale_price,
            qty,
            parseFloat(parseFloat(total)),
            process.env.REACT_APP_WETHADDRESS,
            18,
            Data._id,
            address,
            Data.Royality,
            provider,
            signer,
            "abcde",
            _id,
            Data.is_eth_payment,
            Data
          )
        );
      }
    } else {
      toast(NotificationMsg.Balance.replace(`%s`, total), { type: "error" });
    }
  };

  const XummBuyXrp = async () => {
    dispatch(SetBuyData({ modal: false, checkout: false, buyModal: false }));

    dispatch(
      SetFollowrData({
        upload: 0,
        mint: 2,
        fixed: 2,
        approve: 2,
        ModalType: "Buy",
        modal: true,
      })
    );

    const balanceCheck = await new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (
            parseFloat(Balance) >
            parseFloat(parseFloat(Data.sign_instant_sale_price) + 1)
          ) {
            resolve(true);
          } else {
            reject(false);
          }
        }, 1500);
      } catch (error) {
        reject(false);
      }
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        dispatch(
          SetFollowrData({
            upload: 5,
            mint: 2,
            fixed: 2,
            approve: 2,
            ModalType: "Buy",
            func: () => {
              XummBuyXrp();
            },
            modal: true,
          })
        );
        return err;
      });

    if (!balanceCheck) {
      return;
    }

    const data = {
      wallet_id: walletAddress,
      Price: Data.sign_instant_sale_price,
      UserId: _id,
      id,
      xumm_user_token: userToken,
    };

    BuyXrp(data);
  };

  const BuyXrp = async (value) => {
    dispatch(
      SetFollowrData({
        upload: 1,
        mint: 0,
        fixed: 2,
        approve: 2,
        ModalType: "Buy",
        modal: true,
      })
    );
    try {
      await API({ url: apiURl.BuyBroker, method: "POST", body: value });

      buy(id);
    } catch (error) {
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 5,
          fixed: 2,
          approve: 2,
          ModalType: "Buy",
          func: () => {
            BuyXrp(value);
          },
          modal: true,
        })
      );
    }
  };

  const buy = async (id) => {
    dispatch(
      SetFollowrData({
        upload: 1,
        mint: 1,
        fixed: 0,
        approve: 2,
        ModalType: "Buy",
        modal: true,
      })
    );

    try {
      await API({
        url: apiURl.Buy,
        method: "POST",
        body: { id, walletAddress, UserId: _id },
      });

      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 1,
          approve: 2,
          ModalType: "Buy",
          modal: true,
        })
      );

      await new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        } catch (error) {
          reject(false);
        }
      })
        .then((data) => {
          dispatch(
            SetFollowrData({
              upload: 1,
              mint: 1,
              fixed: 1,
              approve: 2,
              ModalType: null,
              modal: false,
            })
          );

          setTimeout(() => {
            window.location.reload();
          }, 1000);

          return data;
        })
        .catch((err) => {
          dispatch(
            SetFollowrData({
              upload: 2,
              mint: 2,
              fixed: 2,
              approve: 2,
              ModalType: null,
              modal: false,
            })
          );
        });
    } catch (error) {
      dispatch(
        SetFollowrData({
          upload: 1,
          mint: 1,
          fixed: 5,
          approve: 2,
          ModalType: "Buy",
          func: () => {
            buy(id);
          },
          modal: true,
        })
      );
    }
  };

  const BuyModalFun = () => {
    dispatch(SetBuyData({ modal: true, checkout: false, buyModal: true }));
  };

  const buyPurchase = (e) => {
    e.preventDefault();
    dispatch(SetBuyData({ modal: false, checkout: true, buyModal: false }));
    return;
    setPayStripe(true);
  };

  return (
    <Modal
      show={show}
      size={PayStripe ? "lg" : "md"}
      hide={handleCloseFollow}
      centered
      contentClassName="modal-custom"
    >
      <div className="pop-bg">
        <form>
          <div className="pop_content">
            <div className="close-button" onClick={handleCloseFollow}>
              <a onClick={buyPurchase} href="!#">
                <img alt="" src="/images/cross-button.svg" />
              </a>
            </div>

            {buyTrue ? (
              <BuyNft
                buyHandleChange={buyHandleChange}
                NetworkName={NetworkName}
                Balance={Balance}
                handleCloseFollow={handleCloseFollow}
                Data={Data}
              />
            ) : PayStripe ? (
              <CheckoutPayment />
            ) : (
              <>
                <h2 className="text-center">Mode of Payment</h2>
                <div className="button-div img calculate_price text-center">
                  <a href="!#" onClick={buyPurchase}>
                    <img
                      alt=""
                      width={`100%`}
                      src="/images/pay-usd-button.png"
                    />
                  </a>
                </div>
                <div className="line"></div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    marginBottom: "20px",
                  }}
                >
                  OR
                </p>
                <div className="w_btn" onClick={BuyModalFun}>
                  <a href="!#" onClick={(e) => e.preventDefault()}>
                    <span className="me-2">
                      {/* <img src="/images/xumm-wallet-icon.svg" alt="" /> */}
                    </span>
                    <strong> Pay using {NetworkName[0] == "XUMM" ? "XUMM" : 'MetaMask'}</strong>
                  </a>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default XummBuy;
