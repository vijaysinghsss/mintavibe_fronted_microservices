import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";
import { Link, useNavigate } from "react-router-dom";

function Sell() {
  const dispatch = useDispatch();
  const { popupReducer, User } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;

  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
  };
const handleContinue=()=>{
  navigate(`/profile/collected`)
  dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
}
  return (
    <>
      <div>
        <Modal
          show={showModal}
          hide={handleClosePopup}
          size="md offerPoup loginWidth"
        >
          <div className="pop_content login-screen">
            <div className="close-button" onClick={handleClosePopup}>
              <a href="#">
                <img src="/images/cross-button.svg" />
              </a>
            </div>
            <h2>Sell</h2>

            <div className="login-section">
              <div className=" my-4">
                <div className="text-center ">
                <h5 className=" my-2">Resale Your Favourite NFT</h5>
               
                </div>
                <ol className="">
                  <li>
                    {" "}
                    You will be redirected to the Collect panel in your Profile
                    section.
                  </li>
                  <li> Select the NFT</li>
                  <li> Goto NFT detail page.</li>
                  <li>Click on the triple dots.</li>
                  <li> select option PUT on SALE</li>
                </ol>
                
              </div>
            
                <button className="login-screen-button" type="submit" onClick={handleContinue}>
                Continue
                </button>
             
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Sell;
