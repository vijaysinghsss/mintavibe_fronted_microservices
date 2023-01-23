import { validationMessages } from "../store/actions/api-url";

export const validateFirstName = (fName) => {
  const errMsg = !fName
    ? validationMessages.fName
    : !/^[a-z][a-z\s]*$/i.test(fName)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};
export const validateLastName = (lName) => {
  const errMsg = !lName
    ? validationMessages.lName
    : !/^[a-z][a-z\s]*$/i.test(lName)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};
export const validateName = (Name) => {
  const errMsg = !Name
    ? validationMessages.name
    : !/^[a-z][a-z\s]*$/i.test(Name)
    ? validationMessages.allowAlphabets
    : "";
  return errMsg;
};
export const validateEmail = (Email) => {
  const errMsg = !Email
    ? validationMessages.emailReq
    : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)
    ? validationMessages.validEmail
    : "";
  return errMsg;
};
export const validateMobile = (Mobile) => {
  console.log(/\D/g.test(Mobile))
  const errMsg = !Mobile
    ? ""
    : // ? validationMessages.phoneReq
    /\D/g.test(Mobile)
    ? // : !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(Mobile)
      validationMessages.validMobile
    :Mobile.length < 8|| Mobile.length > 15
    ? validationMessages.validMobile
    : "";
  return errMsg;
};
export const validatePassWord = (password) => {
  const errMsg = !password
    ? validationMessages.passwReq
    : !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)
    ? validationMessages.validPass
    : "";
  return errMsg;
};
export const validateCPassWord = (cpassword, password) => {
  const errMsg = !cpassword
    ? validationMessages.cpasswReq
    : cpassword !== password
    ? validationMessages.notMatchPassw
    : "";
  return errMsg;
};
export const validateEnquiryType = (val) => {
  const errMsg = !val ? validationMessages.reqEnquiryType : "";
  return errMsg;
};

export const validateQueryMessage = (val) => {
  const errMsg = !val ? validationMessages.reqQueryMessage : "";
  return errMsg;
};
export const validateOTP=(otp)=>{
  console.log(otp)
  const errMsg = !otp
  ? validationMessages.otpEnter
  : otp&&otp.length<4
  ? validationMessages.validOtp
  : "";
return errMsg;
}
export const isValid = (errors) => {
  let keys = Object.keys(errors);
  let countError = keys.reduce(
    (acc, curr) => (errors[curr] ? acc + 1 : acc),
    0
  );
  return countError === 0;
};
