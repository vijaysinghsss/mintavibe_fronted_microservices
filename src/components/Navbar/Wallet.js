import { useWeb3 } from "@3rdweb/hooks";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import apiURl, { NotificationMsg } from "../../store/actions/api-url";
import { SetUserData, SetXummData } from "../../store/reducer/user";


function Wallet() {
  const { connectWallet, address } = useWeb3();

  const dispatch = useDispatch();

  const [showCrtWalt, setShowCrtWalt] = useState(false);

  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const { socket, id } = useSelector((state) => state.Socket);

  const { type = false } = useSelector((state) => state.User.data);

  const { id: User_id } = useSelector((state) => state.authUser.loginUserData)

  const { xumm } = useSelector((state) => state.User);

  const handleCloseCreatePopup = () => setShowCreatePopup(false);

  const [qrCodeXumm, setqrCodeXumm] = useState(false);

  useEffect(() => {
    if (User_id) {
      socket.volatile.on("xummwallet", (data) => {
        setShowCreatePopup(true);
        setqrCodeXumm(data);
      });

      socket.volatile.on("xummwalletSignIn", (data) => {
        API({
          url: `${apiURl.userData}/${User_id}`,
          method: "PUT",
          body: { address: data.walletAddress, userToken: data.userToken },
          formData: false,
        }).then((data) => {
          dispatch(SetUserData({ ...data.result, type: "XUMM" }));

          // toast(NotificationMsg.connect, {
          //   type: "success",
          //   toastId: "roat-4332432-sdfsadf",
          // });
        });

        dispatch(SetXummData(data));
        // setTimeout(() => {

        // }, 1500);
      });
    }

  }, [dispatch, socket, User_id]);

  useEffect(() => {
    if (type == "XUMM") {
      setShowCreatePopup(false);
      setqrCodeXumm(false);
    }
  }, [type]);

  const xummWalletConnect = (e) => {
    e.preventDefault();

    if (address) {
      toast(NotificationMsg.reConnect, { type: "info" });
      return;
    }

    if (!socket || !socket.connected) {
      toast(NotificationMsg.socket, { type: "info" });
      return;
    }

    socket.volatile.emit("xumm", id);
  };

  return (
    <div className="wallet-connect-inner">
      <h5>Connect Your Wallet </h5>
      <p>
        Connect with one of available wallet providers or create a new wallet.
      </p>

      <div className="wallet-connect-grey">
        {!xumm && (
          <a href="!#" onClick={xummWalletConnect}>

            <img className="imgFilter" src="/images/xumm-wallet-icon.svg" alt="" />
            <p>Xumm Wallet</p>

            <span>XRP</span>
          </a>
        )}

        {!address ? (
          <a
            href="!#"
            onClick={(e) => {
              e.preventDefault();
              if (xumm || address) {
                toast(NotificationMsg.reConnect, { type: "info" });
                return;
              }
              connectWallet("injected");
            }}
          >
            <img
              src="/images/metamask-icon.svg"
              style={{ width: "32px", marginRight: "10px" }}
              alt=""
            />
            <p>Metamask</p>
            <span>ETH</span>
          </a>
        ) : null}

        {/* <a
          href="!#"
          onClick={(e) => {
            e.preventDefault();
            if (xumm || address) {
              toast(NotificationMsg.reConnect, { type: "info" });
              return;
            }
            connectWallet("walletconnect");
          }}
          style={{ marginBottom: "0px" }}
        >
          <img
            src="/images/wallet-connect-icon.svg"
            alt=""
            style={{ width: "32px", marginRight: "10px" }}
          />
          <p>Wallet Connect</p>
          <span>ETH</span>
        </a> */}

        <div className="cusWallet">
          <p className="text-left">Dummy Text</p>
          <button onClick={()=>setShowCrtWalt(true)} className="mb-0">
            <img
              src="/images/wallet-icon.png"
              alt=""
              style={{ width: "25px", marginRight: "10px" }}
            />
            <p><span>Custodial Wallet</span>Custodial Wallet</p>
          </button>
        </div>

      </div>
      <p className="termCond">*If you don't have any existing wallet create your own with clicking on "<b>Custodial Wallet</b>"</p>
      <p>*We do not own your private keys and cannot access your funds without your confirmation.</p>
      {qrCodeXumm && (
        <Modal className="walletPoup"
          size="md"
          centered
          show={showCreatePopup}
          onHide={handleCloseCreatePopup}
        >
          <Modal.Body>
            <div className="pop-bg">
              <div className="pop_content pt-0 pb-0">
                <div className="close-button" style={{ right: "0px", top: "0px" }} >
                  <a
                    href="!#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseCreatePopup();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="/images/cross-button.svg" alt="" />
                  </a>
                </div>

                <div className="my-2">
                  <h4 className="text-center">Xumm Wallet</h4>
                  <h5 className="text-center">
                    <span id="xumm-message">
                      {type
                        ? "Nft-Xumm Signed In Successfully"
                        : "Scan QR code with your Xumm Mobile Wallet"}
                    </span>
                  </h5>
                  <p className="mb-0"><i>This may take a few seconds once scanned</i></p>
                </div>

                <div className="row grey-bg">
                  <div className="col-sm-12 text-center">
                    <img src={qrCodeXumm} alt="xumm" width={`100%`} />
                  </div>
                </div>
                <div className="text-center">
                  <a href="https://xumm.app/" className="bigtext">Don’t have a wallet? Get one here</a>     
                  <p>We do not own private keys and cannot access your funds without your confirmation.</p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      
      











    {showCrtWalt &&

      <Modal
          size="md offerPoup loginWidth"
          centered
          show={showCrtWalt}
          onHide={()=>setShowCrtWalt(!showCrtWalt)}
        >
          <Modal.Body>
            <div className="pop-bg">
              <div className="pop_content p-2 p-md-3">
                <div className="close-button" onClick={()=>setShowCrtWalt(!showCrtWalt)} style={{ right: "0px", top: "0px" }} >
                  <a href="#"><img src="/images/cross-button.svg" alt="" /></a>
                </div>
                <h2 className="mt-2 mb-3">Create Wallet</h2>
                
                <div className="login-screen poupCrtWallet">
                  <form>
                    <div className="form-div">
                      <label for="name">Wallet Name</label>
                      <input type="text" placeholder="Enter your wallet's name"/>
                    </div>
                    <div className="form-div">
                      <label for="name">ETH Wallet Address</label>
                      <div className="copyCode">
                        <img src="/images/cart-eth-icon.svg" alt="" />
                        <span>746w...hfdyj12...18furj</span>
                        <a href="#" className="ms-auto"><img src="/images/copy-svgrepo-com.svg" alt="" /></a>
                      </div>
                    </div>
                    <div className="form-div">
                      <label for="name">XRP Wallet Address</label>
                      <div className="copyCode">
                        <img src="/images/xrp-icon.svg" alt="" />
                        <span>746w...hfdyj12...18furj</span>
                        <a href="#" className="ms-auto"><img src="/images/copy-svgrepo-com.svg" alt="" /></a>
                      </div>
                    </div>
                    <button className="login-screen-button" type="submit">Save</button>
                  </form>
                </div>
                
              </div>
            </div>
          </Modal.Body>
        </Modal>

}








    </div>
  );
}

export default Wallet;
