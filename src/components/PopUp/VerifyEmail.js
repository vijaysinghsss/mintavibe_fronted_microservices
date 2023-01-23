import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EmailVerified from "./EmailVerified";
function VerifyEmail({ showModal }) {
  const [showDelist, setShowDelist] = useState(true);
  const [verifyed, setVerifyed] = useState(false);

  const handleShowDelist = () => setShowDelist(true);
  const handleCloseDelist = () => setShowDelist(false);
  return (
    <>
      <Modal show={showModal || showDelist} hide={handleCloseDelist}>
        {verifyed ? (
          <EmailVerified />

        ) : (
          <>
            <div className="pop_content login-screen">
              <div className="close-button">
                <a href="#">
                  <img src="/images/cross-button.svg" />
                </a>
              </div>
              <h2 className="signup-heading">Verify your email</h2>
              <p className="sign-up-text">
                <span>
                  Please enter your email id to <br />
                  receive a verification code.
                </span>
              </p>
              <div className="login-section">
                <form action="" method="post">
                  <div className="form-div" style={{ textAlign: "center" }}>
                    <img
                      src="/images/fogot-email-icon.svg"
                      className="forgot-icon"
                    />
                  </div>

                  <div className="form-div">
                    <label for="name">Eamil </label>
                    <input type="email" id="Eamil" placeholder="Eamil" />
                  </div>

                  <button
                    className="login-screen-button"
                    type="submit"
                    onClick={() => setVerifyed(true)}
                  >
                    Get OTP
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default VerifyEmail;
