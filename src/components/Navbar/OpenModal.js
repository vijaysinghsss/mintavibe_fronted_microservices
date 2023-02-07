import React from "react";
import { useSelector } from "react-redux";
import CreateNewPassword from "../PopUp/CreateNewPassword";
import ForgetPassword from "../PopUp/ForgetPassword";
import Login from "../PopUp/Login";
import Sell from "../PopUp/Sell";
import SignUp from "../PopUp/SignUp";
import VerifyOTP from "../PopUp/VerifyOTP";

function OpenModal() {
  const { popupReducer, User } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;
  return (
    <>
      {modalType === "SIGNUP" && <SignUp />}
      {modalType === "FORGETPASSWORD" && <ForgetPassword />}
      {modalType === "LOGIN" && <Login />}
      {modalType === "OTP" && <VerifyOTP />}
      {modalType === "CHANGEPASSWORD" && <CreateNewPassword />}
      {modalType==="SELL"&&<Sell/>}
    </>
  );
}

export default OpenModal;
