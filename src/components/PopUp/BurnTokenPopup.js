import { Button } from "bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
function BurnTokenPopup() {
  const [showBurnPopUp, setShowBurnPopUp] = useState(true);

  const handleCloseBurnPopUp = () => setShowBurnPopUp(false);
  const handleShowBurnPopUp = () => setShowBurnPopUp(true);
  return (
    <div>
      <Modal show={showBurnPopUp} hide={handleCloseBurnPopUp}>
        <Modal.Body>
          <div className="pop_content">
            <div className="close-button">
              <a href="#">
                <img
                  onClick={handleCloseBurnPopUp}
                  src="/images/cross-button.svg"
                />
              </a>
            </div>
            <h2>Burn Token</h2>

            <p style={{ fontSize: "14px", fontWeight: "500" }}>
              Are you sure to burn this token? This action cannot be reverted,
              <br className="br" /> Token will be transferred to dead address.
              <br />
            </p>

            <div
              className="d-flex justify-content-between"
              style={{ textAlign: "center" }}
            >
              <a className="cancel-button" style={{ cursor: "pointer" }} onClick={handleCloseBurnPopUp}>
                Cancel
              </a>
              <a className="creat-button text-white">Confirm</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BurnTokenPopup;
