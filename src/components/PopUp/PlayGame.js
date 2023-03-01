import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetpopupReducerData } from "../../store/reducer";

function PlayGame() {
  const dispatch = useDispatch();
  const { popupReducer, User } = useSelector((state) => state);
  const { modalType = "", showModal = false } = popupReducer?.modal;
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });
  const [allGames, setAllGames] = useState([
    "https://gameskite.com/play/fruit-chef",
    "https://gameskite.com/play/the-dandy?",
    "https://gameskite.com/play/birds-vs-blocks-online?id=portal",
    "https://gameskite.com/play/ram-the-yoddha-online?id=portal",
    "https://gameskite.com/play/cards-21",
    "https://gameskite.com/play/droid-o-online",
  ]);

  const handleClosePopup = () => {
    dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
  };
  const getGameUrl = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  };
  const onMessage = (event) => {
    console.log(event,"veeeeent");
  };
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener("message", onMessage, false);
    } else if (window.attachEvent) {
      window.attachEvent("message", onMessage, false);
    }
  }, []);
  return (
    <>
      <div>
        <Modal
          className="playModal"
          show={showModal}
          hide={handleClosePopup}
          size=""
        >
          <div className="pop_content login-screen">
            <div className="close-button" onClick={handleClosePopup}>
              <a href="#">
                <img src="/images/cross-button.svg" />
              </a>
            </div>
            <h2>Play Game</h2>

            <div className="play-section">
              <iframe
                width="560"
                height="315"
                src={getGameUrl(allGames)}
                title="YouTube video player"
                frameBorder={"0"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default PlayGame;
