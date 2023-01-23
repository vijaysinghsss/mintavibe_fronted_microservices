import React from "react";
import { NavLink } from "react-router-dom";

function CreatePopUp(props) {
  return (
    <div className="pop-bg">
      <div className="pop_content">
        <div className="close-button">
          <a onClick={props.close} style={{ cursor: "pointer" }}>
            <img src="/images/cross-button.svg" />
          </a>
        </div>
        <h2 className="pb-2">Create</h2>

        <div className="row grey-bg">
          <div className="col-sm-6">
            <div className="pop-img-box">
              <div style={{ textAlign: "center " }}>
                <img src="/images/demo-img.png" />
              </div>
              <NavLink to="/create/One" onClick={props.close}>
                <div
                  className="pop-img-box-button"
                  style={{ cursor: "pointer" }}
                >
                  1/1
                </div>
              </NavLink>
            </div>
            <p>Choose “1/1” if you want your collectible to be one of a kind</p>
          </div>
          <div className="col-sm-6">
            <div className="pop-img-box">
              <div style={{ textAlign: "center" }}>
                <img src="/images/edit-img.png" alt="" />
              </div>
              <NavLink to="/create/Multiple" onClick={props.close}>
                <div
                  className="pop-img-box-button"
                  style={{ cursor: "pointer" }}
                >
                  Editions
                </div>
              </NavLink>
            </div>
            <p>
              Choose “Editions” if you want to sell one collectible multiple
              times
            </p>
          </div>
        </div>
        <p className="p-0 mb-0">
          We do not own your private keys and cannot access your <br />
          funds without your confirmation.
        </p>
      </div>
    </div>
  );
}

export default CreatePopUp;
