import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_USER_DATA,
  SIGNUP_USER_DATA,
} from "../../store/actions/ActionTypes";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { toast } from "react-toastify";
import {
  isValid,
  validateEmail,
  validatePassWord,
} from "../../Validation/InputValidation";
import { SetpopupReducerData } from "../../store/reducer";
import { Link } from "react-router-dom";

function Sell() {
  const dispatch = useDispatch();
  const { popupReducer, User } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [notVerify, setNotVerify] = useState(false);

  const url = "http://localhost:3001/" || process.env.REACT_APP_LIVE_URL;
  const [showPass, setShowPass] = useState(false);
  let regexNum = /^(?=.*[0-9])/;
  let regexSmlChar = /^(?=.*[a-z])/;
  let regexUprChar = /^(?=.*[A-Z])/;
  let regexSpclChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const { email, password } = inpData;
  const [verify, setVerify] = useState(true);
  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(SetpopupReducerData({ modalType: "SIGNUP", showModal: true }));
  };
  const handleForgetPassword = () => {
    dispatch(
      SetpopupReducerData({ modalType: "FORGETPASSWORD", showModal: true })
    );
  };
  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "email":
        errors1.email = validateEmail(e.target.value);
        break;
      case "password":
        errors1.password = validatePassWord(e.target.value);
        break;
      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.email = validateEmail(email);
    err1.password = "";

    return err1;
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        await API({
          url: apiURl.forgetpassword,
          method: "POST",
          body: { email: inpData.email },
          formData: false,
        }).then((data) => {
         
          if (data?.status || data?.status === "true") {
            // toast(`${data?.message}`, { type: "success" });
            dispatch(
              SetpopupReducerData({ modalType: "OTP", showModal: true })
            );
            dispatch({
              type: SIGNUP_USER_DATA,
              payload: { ...inpData },
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
  const handleSubmit = async (e) => {
    setApiErrors({ message: "" });
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        if (rememberMe) {
          setCookiesData();
        }
        await API({
          url: apiURl.login,
          method: "POST",
          body: { ...inpData },
          formData: false,
        }).then((data) => {
          if (data?.status || data?.status === "true") {
            // toast(`${data?.message}`, { type: "success" });
            dispatch({
              type: LOGIN_USER_DATA,
              payload: data?.response?.data,
            });
            localStorage.setItem("token", data?.response?.data?.token);
            dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
            setVerify(true);
          } else {
            if (data?.response?.data) {
              setVerify(data?.response?.data?.IsVerified);
            } else {
              setVerify(true);
            }
            setApiErrors({ message: data?.message, response: data?.response });
          }
        });
      } else {
        setErrors(err);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error);
      setApiErrors({ message: error.message });
    }
  };
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);

    // let obj = {};
    // obj.email = e.target.checked ? email : "";
    // obj.password = e.target.checked ? password : "";
    // document.cookie = `email=${obj.email}; path=${url}`;
    // document.cookie = `password=${obj.password}; path=${url}`;
  };
  const setCookiesData = () => {
    let obj = {};
    obj.email = email ? email : "";
    obj.password = password ? password : "";
    document.cookie = `email=${obj.email}; path=${url}`;
    // document.cookie = `password=${obj.password}; path=${url}`;
  };
  const getCookiesData = () => {
    const data = decodeURIComponent(document.cookie);
    let userEmail = data
      .split(";")
      .find((ele) => ele.startsWith("email="))
      ?.split("=")[1];
    // let userPass = data
    //   .split(";")
    //   .find((ele) => ele.startsWith(" password="))
    //   ?.split("=")[1];
    setInpData({ ...inpData, email: userEmail });
  };
  useEffect(() => {
    getCookiesData();
  }, []);
  console.log(apiErrors, "err");
  return (
    <>
      <div>
        <Modal show={showModal} hide={handleClosePopup} size="md offerPoup loginWidth">
          <div className="pop_content login-screen">
            <div className="close-button" onClick={handleClosePopup}>
              <a href="#">
                <img src="/images/cross-button.svg" />
              </a>
            </div>
            <h2>Sell</h2>

            <div className="login-section">
              
                <div className="text-center my-5">
                    <h5>Resale Your</h5>
                    <h5>Favourite NFT</h5>
                </div>
                
                
                <button
                  className="login-screen-button"
                  type="submit"
                //   onClick={handleSubmit}
                >
                  Continue
                </button>
                
              
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Sell;
