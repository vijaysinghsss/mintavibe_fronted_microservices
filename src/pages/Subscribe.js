import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../apiwrapper";
import Thanks from "../components/PopUp/Thanks";
import { apiURl } from "../store/actions";
import { isValid, validateEmail } from "../Validation/InputValidation";

function Subscribe() {
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
      <section className="subsScribe">
        <div className="container-md">
          <div className="row">
            <div className="col-xl-12">
              <h3>Stay Informed</h3>
              <p>Receive Mintavibe news and updates directly to your inbox.</p>
              <div className="subScribeBox">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Write your subscriber ID here."
                  value={subscriber}
                  name={"subscriber"}
                  onChange={handleChange}
                  onBlur={handleValidate}
                />
                <button className="btn subBtn" onClick={handleSubscribe}>
                  Subscribe Now!
                </button>
              </div>
            </div>
            {errors.subscriber ? (
              <span className="text-danger ml-0" style={{ fontSize: "14px" }}>
                {errors.subscriber}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Subscribe;
