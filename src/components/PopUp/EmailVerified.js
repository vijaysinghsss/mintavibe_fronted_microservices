import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function EmailVerified({ showModal }) {
  const [showDelist, setShowDelist] = useState(true);
  const [verifyed, setVerifyed] = useState(false);

  const handleShowDelist = () => setShowDelist(true);
  const handleCloseDelist = () => setShowDelist(false);
  return (
    <React.Fragment>
      <Modal show={showModal || showDelist} hide={handleCloseDelist}>
        <div className="pop-bg">
          <div className="pop_content login-screen">
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
                  <img
                    src="/images/success-icon.svg"
                    className="forgot-icon"
                  />
                </div>
                <h2 className="signup-heading">Email Verified!</h2>
                <p className="sign-up-text">
                  <span>Your Email has been verified successfully.</span>
                </p>
              </form>
            </div>
          </div>


        </div>
      </Modal>
    </React.Fragment>
  );
}

export default EmailVerified;
