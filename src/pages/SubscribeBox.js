import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../apiwrapper";
import Thanks from "../components/PopUp/Thanks";
import { apiURl } from "../store/actions";
import { isValid, validateEmail } from "../Validation/InputValidation";

function SubscribeBox() {
  const [inpData, setInpData] = useState({
    subscriber: "",
  });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const { subscriber } = inpData;
  const [showPopup, setshowPopup] = useState(false);

  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
    handleValidate(e);
    setApiErrors({ message: "" });
  };
  const handleValidate = (e) => {
    const errors1 = {};
    switch (e.target.name) {
      case "subscriber":
        errors1.subscriber = validateEmail(e.target.value);
        break;
      default:
        break;
    }
    setErrors(errors1);
  };
  const validateAll = () => {
    let err1 = {};
    err1.subscriber = validateEmail(subscriber);
    return err1;
  };
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      let err = validateAll();
      if (isValid(err)) {
        await API({
          url: apiURl.subscribe,
          method: "POST",
          body: { subscriber: inpData.subscriber },
          formData: false,
        }).then((data) => {
          if (data?.status || data?.status === "true") {
            setshowPopup(true);
            setInpData({ subscriber: "" });
          } 
        });
      } else {
        setErrors(err);
      }
    } catch (error) {
      setApiErrors({ message: error });
    }
  };
  const handleClosePopup = () => {
    setshowPopup(false);
  };
  return (
    <>
    {showPopup && <Thanks show={showPopup} close={handleClosePopup} />}

    <div className="newsletter-box">
      <h4>Be Informed On Our Next NFTs</h4>
      <p style={{ maxWidth: "320px", margin: "0 auto" }}>
        Enter your email address to register to our newsletter subscription
      </p>

      <form
        style={{
          marginBottom: "30px;",
          action: "",
          method: "post",
          id: "mc-embedded-subscribe-form",
          name: "mc-embedded-subscribe-form",
          className: "validate",
          target: "_blank",
          noValidate: "",
        }}
      >
        <input
          className="FieldInput"
          placeholder="Email Address"
          id=""
          type="text"
          value={subscriber}
          name={"subscriber"}
          onChange={handleChange}
          onBlur={handleValidate}
        />
        <button className="Submitbtn" onClick={handleSubscribe}>
          Subscribe Now!
        </button>
      </form>
      {errors.subscriber ? (
        <span className="text-danger ml-0" style={{ fontSize: "14px" }}>
          {errors.subscriber}
        </span>
      ) : (
        ""
      )}
    </div>
    </>
  );
}

export default SubscribeBox;
