import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { SetSubscriptionUserData } from "../../store/reducer";
import {
  isValid,
  validateEmail,
  validateMobile,
  validateName,
} from "../../Validation/InputValidation";

function SubscriptionPopup({ isMounted, setIsMounted }) {
  const [inpData, setInpData] = useState({
    name: "",
    wallet_address: "",
    mobile_number: "",
    email: "",
  });
  const {
    name = "",
    email = "",
    wallet_address = "",
    mobile_number = "",
  } = inpData;
  const dispatch = useDispatch();
  const handleCloseSubPopup = () => setIsMounted(false);
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "" });
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "name":
        errors1.name = validateName(e.target.value);
        break;
      case "email":
        errors1.email = validateEmail(e.target.value);
        break;
      case "mobile_number":
        errors1.mobile_number = validateMobile(e.target.value);
        break;

      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.name = validateName(name);
    err1.email = validateEmail(email);
    err1.mobile_number = validateMobile(mobile_number);
    return err1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        await API({
          url: apiURl.customerdata,
          method: "POST",
          body: { ...inpData },
          formData: false,
        }).then((data) => {
          if (data?.status || data?.status === "true") {
            setInpData({
              name: "",
              wallet_address: "",
              mobile_number: "",
              email: "",
            });
            dispatch(SetSubscriptionUserData({ ...data?.response?.data }));
            handleCloseSubPopup();
            // toast(`${data?.message}`, { type: "success" });
          } else {
            setApiErrors({ message: data?.message });
          }
        });
      } else {
        setErrors(err);
      }
    } catch (error) {
      setApiErrors({ message: error });
    }
  };
  return (
    <div>
      <Modal
        size="lg"
        className="cstPoup"
        show={isMounted}
        hide={handleCloseSubPopup}
      >
        <div className="pop-bg">
          <div className="subpop">
            <div className="close-button" onClick={handleCloseSubPopup}>
              <a href="#">
                <img src="/images/crowss-2.svg" />
              </a>
            </div>
            <div className="row gx-0">
              <div className="col-sm-5 subop-box">
                <img
                  src="/images/pop-3.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="col-sm-7 subop-box-2">
                <p>
                  Thank you for joining us on our journey to make NFTs
                  accessible to all. Stay up to date with big news, exciting
                  NFTs and giveaways along the way.
                </p>
                <div className="sub-form-box login-screen ">
                  <form>
                    <div className="form-div">
                      <input
                        className="form-control mb-0 mt-3"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Name *"
                        onBlur={handleValidate}
                        onChange={handleChange}
                      />
                      {errors.name ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-div">
                      <input
                        className="form-control mb-0 mt-3"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email *"
                        onBlur={handleValidate}
                        onChange={handleChange}
                      />
                      {errors.email ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-div">
                      <input
                        className="form-control mb-0 mt-3"
                        type="text"
                        id="wallet_address"
                        name="wallet_address"
                        value={wallet_address}
                        placeholder="Wallet Address"
                        onBlur={handleValidate}
                        onChange={handleChange}
                      />
                      {/* <div className="wallet-file-img">
                        <img
                          src="/images/nav-wallet.svg"
                          className="wallet_image  close_connect_wallet "
                        />
                        <span className="tooltiptext">
                          Please connect your wallet to get the verified
                          address.
                        </span>
                      </div> */}
                    </div>

                    <div className="form-div">
                      <input
                        className="input[type=number]::-webkit-outer-spin-button form-control mb-0 mt-3"
                        type="number"
                        id="mobile_number"
                        name="mobile_number"
                        value={mobile_number}
                        placeholder="Phone"
                        onBlur={handleValidate}
                        onChange={handleChange}
                      />
                      {errors.mobile_number ? (
                        <span
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.mobile_number}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* <p>
                      <span>
                        <a href="!#">Don’t have a wallet? Get one here.</a>
                      </span>
                    </p> */}
                    <div className="text-center">
                      <button
                        className="creat-button"
                        style={{ maxWidth: "120px" }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SubscriptionPopup;
