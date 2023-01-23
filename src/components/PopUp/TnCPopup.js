import { Button } from "bootstrap";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function TnCPopup() {
  const [showTnc, setShowTnc] = useState(true);

  const handleShowTrans = () => setShowTnc(false);
  const handleCloseTrans = () => setShowTnc(true);

  return (
    <div>
      <Modal show={showTnc} hide={handleCloseTrans}>
        <div className="pop-bg">
          <form>
            <div className="pop_content">
              <h2 style={{ fontFamily: "'Hahmlet', serif", fontWeight: "500" }}>Terms And Conditions</h2>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  I am at least 13 Years old
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckChecked">
                  I accept the Terms of Service
                </label>
              </div>
              <button className="btn btn-primary">Proceed</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default TnCPopup;
