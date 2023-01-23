import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { SIGNUP_USER_DATA } from "../../store/actions/ActionTypes";
import { SetpopupReducerData } from "../../store/reducer";
import { isValid, validateEmail } from "../../Validation/InputValidation";
function ForgetPassword() {
  const dispatch = useDispatch();
  const { popupReducer } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;
  const [inpData, setInpData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "" });

  const { email = "" } = inpData;
  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
  };
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "email":
        errors1.email = validateEmail(e.target.value);
        break;

      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};

    err1.email = validateEmail(email);

    return err1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        await API({
          url: apiURl.forgetpassword,
          method: "POST",
          body: { ...inpData },
          formData: false,
        }).then((data) => {

          if (data?.status || data?.status === "true") {
            // toast(`${data?.message}`, { type: "success" });
            dispatch(
              SetpopupReducerData({ modalType: "OTP", showModal: true })
            );
            dispatch({
              type: SIGNUP_USER_DATA,
              payload: { ...inpData, forgetpassword: true },
            });
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
    <>
      <Modal show={showModal} hide={handleClosePopup} size="md offerPoup loginWidth">
        <>
          <div className="pop_content login-screen">
            <div className="close-button">
              <a href="#" onClick={handleClosePopup}>
                <img src="/images/cross-button.svg" />
              </a>
            </div>
            <h2 className="signup-heading">Forgot Password?</h2>
            <p className="sign-up-text">
              <span>
                Please enter your registered email id to <br />
                receive a verification code.
              </span>
            </p>
            <div className="login-section">
              <form action="" method="post">
                <div className="form-div" style={{ textAlign: "center" }}>
                  <img
                    src="/images/fogot-email-icon.svg"
                    className="forgot-icon"
                    alt=""
                  />
                </div>

                <div className="form-div">
                  <label for="name">
                    Email <span className="text-danger"> *</span>
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleValidate}
                  />
                  {errors.email ? (
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                      {errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                {apiErrors.message && (
                  <span
                    className="text-danger mb-2 d-block"
                    style={{ fontSize: "14px" }}
                  >
                    {apiErrors.message}
                  </span>
                )}
                <button
                  className="login-screen-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Get OTP
                </button>
              </form>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default ForgetPassword;
