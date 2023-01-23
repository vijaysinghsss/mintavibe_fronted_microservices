import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import Wallet from '../Navbar/Wallet';

const Walletpop = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);

    return (
        <Offcanvas
            show={show}
            onHide={handleShow}
            placement={"end"}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Connect Your Wallet
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Wallet />
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Walletpop