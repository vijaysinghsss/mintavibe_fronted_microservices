import { Button } from "bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { SetBurnData } from "../../store/reducer";
function BurnTokenPopup() {
  const { modal, Burnfunc = () => { }
  } = useSelector((state) => state.BurnNft.data);

  const [showBurnPopUp, setShowBurnPopUp] = useState(false);
  const dispatch = useDispatch();
  const handleCloseBurnPopUp = (e) => {
    e.preventDefault();
    dispatch(SetBurnData({
      modal: false,
      Burnfunc: () => { },
    }));
  };

  useEffect(() => {
    setShowBurnPopUp(modal)
  }, [modal])

  const burnNFTCALL = (e) => {
    e.preventDefault();
    Burnfunc();
  }
  return (
    <div>
      <Modal show={showBurnPopUp} hide={handleCloseBurnPopUp}>
        <Modal.Body>
          <div className="pop_content">
            <div className="close-button">
              <a href="!#">
                <img
                  onClick={handleCloseBurnPopUp}
                  src="/images/cross-button.svg"
                  alt=""
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
              <a href="!#" className="cancel-button" style={{ cursor: "pointer" }} onClick={handleCloseBurnPopUp}>
                Cancel
              </a>
              <a href="!#" className="creat-button text-white" onClick={burnNFTCALL}>Confirm</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BurnTokenPopup;
