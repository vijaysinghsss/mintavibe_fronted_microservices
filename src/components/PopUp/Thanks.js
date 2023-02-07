import React from "react";
import { Modal } from "react-bootstrap";

function Thanks({show, close}) {
  return (
    <>
      <div>
        <Modal
          show={show}
          hide={close}
          size="md offerPoup loginWidth"
        >
          <div className="pop_content login-screen">
            <div className="close-button" onClick={close}>
              <a href="#">
                <img src="/images/cross-button.svg" />
              </a>
            </div>
            <h2>Thanks</h2>

            <div className="login-section">
              <div className="text-center my-5">
                <h5>For Subscribe</h5>
              </div>

              <button
                className="login-screen-button"
                type="submit"
                  onClick={close}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Thanks;
