import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function Delist() {
  const [showDelist, setShowDelist] = useState(true);

  const handleShowDelist = () => setShowDelist(true);
  const handleCloseDelist = () => setShowDelist(false);
  return (
    <div>
      <Modal show={showDelist} hide={handleCloseDelist}>
        <div className="pop-bg">
          <form>
            <div className="pop_content">
              <div className="close-button" onClick={handleCloseDelist}>
                <a href="#">
                  <img src="/images/cross-button.svg" />
                </a>
              </div>
              <h2>Delist From Sale</h2>

              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Are you sure to delist from sale?,
                <br className="br" /> Existing bids will be cancelled.
                <br />
              </p>
              <div className="col-md-6" style={{ textAlign: "center" }}>
                <a>
                  <div className="cancel-button" style={{ cursor: "pointer" }} onClick={handleCloseDelist}>
                    Cancel
                  </div>
                </a>
              </div>
              <div className="col-md-6" style={{ textAlign: "center" }}>
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

export default Delist;
