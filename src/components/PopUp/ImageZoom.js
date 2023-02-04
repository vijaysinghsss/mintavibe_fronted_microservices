import React from "react";

function ImageZoom({ url, handleClose }) {
  return (
    <>
      <div
        className="enlarged-bg"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0px",
          zIndex: "10000",
          left: "0px",
        }}
      >
        <img
          src={url}
          className="enlarged-img"
          alt=""
        />{" "}
        <div className="expand-btn minimize-btn" onClick={handleClose}>
          {" "}
          <img src="/images/minimize.svg" />{" "}
        </div>
      </div>
    </>
  );
}

export default ImageZoom;
