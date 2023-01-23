import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import VerifyEmail from "./VerifyEmail";
import VerifyOTP from "./VerifyOTP";
function PasswordChanged() {
  const [showDelist, setShowDelist] = useState(true);
  const [verify, setVerify] = useState(false);

  const handleShowDelist = () => setShowDelist(true);
  const handleCloseDelist = () => setShowDelist(false);

  return (
    <>
      <Modal show={showDelist} hide={handleCloseDelist}>
        <div className="pop_content login-screen">
          <>
            <div className="close-button">
              <a href="#">
                <img src="/images/cross-button.svg" />
              </a>
            </div>

            <div className="login-section">
              <form action="" method="post">
                <div
                  className="form-div"
                  style={{ textAlign: "center", marginTop: "40px" }}
                >
                  <img src="/images/success-icon.svg" className="forgot-icon" />
                </div>
                <h2 className="signup-heading">Password Changed!</h2>
                <p className="sign-up-text">
                  <span>Your password has been reset successfully.</span>
                </p>
              </form>
            </div>
          </>
        </div>
      </Modal>
    </>
  );
}

export default PasswordChanged;
