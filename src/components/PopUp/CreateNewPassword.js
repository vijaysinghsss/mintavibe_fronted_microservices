import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { SIGNUP_USER_DATA } from "../../store/actions/ActionTypes";
import { SetpopupReducerData } from "../../store/reducer";
import {
  isValid,
  validateCPassWord,
  validatePassWord,
} from "../../Validation/InputValidation";

function CreateNewPassword() {
  const dispatch = useDispatch();
  const { popupReducer, authUser } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  let regexNum = /^(?=.*[0-9])/;
  let regexSmlChar = /^(?=.*[a-z])/;
  let regexUprChar = /^(?=.*[A-Z])/;
  let regexSpclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const { email, password, cpassword } = inpData;

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
  };
  const [apiErrors, setApiErrors] = useState({ message: "" });

  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "password":
        errors1.password = validatePassWord(e.target.value);
        break;
      case "cpassword":
        errors1.cpassword = validateCPassWord(e.target.value, password);
        break;
      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.password = validatePassWord(password);
    err1.cpassword = validateCPassWord(cpassword, password);
    return err1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...inpData, email: authUser?.signUpUser?.email };
      let err = validateAll();
      if (isValid(err)) {
        await API({
          url: apiURl.resetpass,
          method: "POST",
          body: {
            ...payload,
          },
          formData: false,
        }).then((data) => {
          if (data?.status || data?.status === "true") {
            // toast(`${data?.message}`, { type: "success" });
            dispatch(
              SetpopupReducerData({ modalType: "LOGIN", showModal: true })
            );
            dispatch({
              type: SIGNUP_USER_DATA,
              payload: null,
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
      <Modal show={showModal} hide={handleClosePopup}>
        <div className="pop-bg">
          <div className="pop_content login-screen">
            <>
              <div className="close-button" onClick={handleClosePopup}>
                <a href="#">
                  <img src="/images/cross-button.svg" />
                </a>
              </div>
              <h2 className="signup-heading">Create new password</h2>
              <p className="sign-up-text">
                <span>
                  Your new password must be different from
                  <br /> previous used passwords.
                </span>
              </p>

              <div className="login-section">
                <form action="" method="post">
                  <div className="form-div">
                    <label for="name">
                      New Password <span className="text-danger"> *</span>
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={password}
                      autocomplete=""
                      placeholder="Password"
                      required=""
                      id="id_password"
                      onChange={handleChange}
                    />
                    <i
                      className={`${
                        showPass ? " fa fa-eye " : " fa fa-eye-slash "
                      } eye-icon`}
                      id="togglePassword"
                      onClick={() => setShowPass(!showPass)}
                    ></i>
                    {errors.password ? (
                      <>
                        <span
                          className="text-danger"
                          style={{ fontSize: "14px" }}
                        >
                          {errors.password}
                        </span>
                        <ul>
                          <li
                            className={
                              password.length >= 8
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {password.length >= 8 && (
                              <i className="fas fa-check-circle"></i>
                            )}
                            8 characters
                          </li>

                          <li
                            className={
                              regexUprChar.test(password)
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {regexUprChar.test(password) && (
                              <i className="fas fa-check-circle"></i>
                            )}{" "}
                            1 Uppercase{" "}
                          </li>
                          <li
                            className={
                              regexNum.test(password)
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {regexNum.test(password) && (
                              <i className="fas fa-check-circle"></i>
                            )}{" "}
                            1 Number{" "}
                          </li>
                          <li
                            className={
                              regexSpclChar.test(password)
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {regexSpclChar.test(password) && (
                              <i className="fas fa-check-circle"></i>
                            )}{" "}
                            1 Special character
                          </li>
                        </ul>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-div">
                    <p className="create-pss-text">
                      must be of at least 8 characters.
                    </p>
                  </div>

                  <div className="form-div">
                    <label for="name">
                      Confirm New Password{" "}
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type={showCPass ? "text" : "password"}
                      name="cpassword"
                      value={cpassword}
                      autocomplete=""
                      placeholder="Password"
                      required=""
                      id="id_password"
                      onChange={handleChange}
                      disabled={!password || false}
                    />
                    <i
                      className={`${
                        showCPass ? " fa fa-eye " : " fa fa-eye-slash "
                      } eye-icon`}
                      id="togglePassword"
                      onClick={() => setShowPass(!showCPass)}
                    ></i>
                    {errors.cpassword ? (
                      <span
                        className="text-danger"
                        style={{ fontSize: "14px" }}
                      >
                        {errors.cpassword}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-div">
                    <p className="create-pss-text">
                      password and confirm password should be same.
                    </p>
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
                    Submit
                  </button>
                </form>
              </div>
            </>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateNewPassword;
