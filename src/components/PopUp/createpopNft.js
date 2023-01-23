import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreatePopUp from '../CreateScreen/CreatePopUp';

const CreatepopNft = () => {
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const handleCloseCreatePopup = () => setShowCreatePopup(false);

    return (
        <Modal
            size="lg offerPoup"
            centered
            show={showCreatePopup}
            onHide={handleCloseCreatePopup}
        >

            <CreatePopUp close={handleCloseCreatePopup} />

        </Modal>
    )
}

export default CreatepopNft