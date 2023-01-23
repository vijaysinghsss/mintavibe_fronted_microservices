import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function TransferToken() {
  const [showTrans, setShowTrans] = useState(true);

  const handleShowTrans = () => setShowTrans(true);
  const handleCloseTrans = () => setShowTrans(false);
  return (
    <div>
      <Modal show={showTrans} hide={handleCloseTrans}>
        <div className="pop-bg">
          <form>
            <div className="pop_content">
              <div className="close-button" onClick={handleCloseTrans}>
                <a href="#">
                  <img src="/images/cross-button.svg" />
                </a>
              </div>
              <h2>Transfer Token</h2>

              <div className="row grey-bg">
                <div className="col-sm-12">
                  <div className="form-div col-sm-12">
                    <label for="name">User Wallet Address</label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      placeholder="Please provide wallet address"
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <a>
                  <div className="cancel-button" style={{ cursor: "pointer" }} onClick={handleCloseTrans}>
                    Cancel
                  </div>
                </a>
              </div>
              <div style={{ textAlign: "center" }}>
                <a href="!#">
                  <div className="creat-button">Confirm</div>
                </a>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default TransferToken;
