import React, { useState } from "react";
import { Modal } from "react-bootstrap";
function Notification() {
    const [showN, setShowN] = useState(true)
    const handleShowN = () => setShowN(true)
    const handleCloseN = () => setShowN(false)
    return (
        <div>
            <Modal show={showN} hide={handleCloseN}>
                <div className="pop-bg">

                    <div className="notice">
                        <h4>Notification</h4>
                        <div className="close-button" style={{ cursor: "pointer" }} onClick={handleCloseN}><a href="#"><img src="/images/cross-button.svg" /></a></div>
                        <div className="notice-box">
                            <div className="notice-box-img"><img src="/images/profile-pic.png" /></div>
                            <p>PuppyDoc</p>
                        </div>
                        <div className="notice-box">
                            <div className="notice-box-img"><img src="/images/prfile-pic.jpg" /></div>
                            <p>PuppyDoc</p>
                        </div>

                        <div className="notice-box">
                            <div className="notice-box-img"><img src="/images/profile-pic.png" /></div>
                            <p>PuppyDoc</p>
                        </div>
                        <div className="notice-box">
                            <div className="notice-box-img"><img src="/images/prfile-pic.jpg" /></div>
                            <p>PuppyDoc</p>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Notification;