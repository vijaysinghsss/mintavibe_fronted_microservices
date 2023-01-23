import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SetFollowrData } from "../../store/reducer";
function Follow() {

    const { upload, mint, fixed, approve, modal, ModalType = 'Create', func = () => { } } = useSelector((state) => state.Follow.data)

    const [showFollow, setShowFollow] = useState(true);

    const dispatch = useDispatch();

    const { type = false } = useSelector(state => state.User?.data);
    // const handleShowFollow = () => setShowFollow(true);

    const handleCloseFollow = () => {
        dispatch(SetFollowrData({ upload, mint, fixed, approve, ModalType, modal: false }));
    };

    useEffect(() => {
        setShowFollow(modal);
    }, [modal])



    return (
        <div>
            <Modal show={showFollow} hide={handleCloseFollow} size="lg offerPoup followSteps" contentClassName="modal-custom">
                <div className="pop-bg">
                    <form>
                        <div className="pop_content">
                            <div className="close-button" onClick={handleCloseFollow}>
                                <a onClick={(e) => e.preventDefault()} href="!#" >
                                    <img alt="" src="/images/cross-button.svg" />
                                </a>
                            </div>

                            <>
                                <h2>Follow Steps</h2>
                                <p>
                                    Great things take time! But this one will be
                                    <br className="br" />
                                    only a few minutes.
                                </p>
                                <div className="row grey-bg">
                                    {ModalType == 'Create' ?
                                        (type == 'XUMM'
                                            ?
                                            <div className="col-md-12">
                                                <ul>
                                                    <li>
                                                        {
                                                            upload ?
                                                                <i className="chec-iocn">
                                                                    <img alt="" style={{ visibility: upload == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                </i>
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Check</b>
                                                        <br />
                                                        <span>
                                                            Check balance and approve
                                                        </span>
                                                    </li>
                                                    <li>
                                                        {
                                                            mint ?
                                                                (mint == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    :
                                                                    <i className="chec-iocn">
                                                                        <img alt="" style={{ visibility: mint == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                (<span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>)

                                                        }
                                                        <b>Mint</b>
                                                        <br />
                                                        <span>
                                                            Please Accept the transaction.
                                                        </span>
                                                    </li>
                                                    <li >
                                                        {
                                                            fixed ?
                                                                (fixed == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    :
                                                                    <i className="chec-iocn">
                                                                        <img alt="" style={{ visibility: fixed == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Create</b>
                                                        <br />
                                                        <span>Please Accept the transaction in Xumm Wallet</span>
                                                    </li>
                                                </ul>
                                            </div> :
                                            <div className="col-md-12">
                                                <ul>
                                                    <li>
                                                        {
                                                            upload ?
                                                                <i className="chec-iocn">
                                                                    <img style={{ visibility: upload == 1 ? 'visible' : 'hidden' }} alt="" src={`/images/${'check-active.svg'}`} />
                                                                </i> :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>



                                                        }
                                                        <b>Upload</b>
                                                        <br />
                                                        <span>
                                                            Check balance and approve
                                                        </span>
                                                    </li>
                                                    <li >
                                                        {
                                                            approve ?
                                                                (approve == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">

                                                                        <img style={{ visibility: approve == 1 ? 'visible' : 'hidden' }} alt="" src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>


                                                        }
                                                        <b>Approve</b>
                                                        <br />
                                                        <span>This transaction is conducted only once per collection</span>
                                                    </li>
                                                    <li>
                                                        {
                                                            mint ?
                                                                (mint == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">

                                                                        <img style={{ visibility: mint == 1 ? 'visible' : 'hidden' }} alt="" src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Mint</b>
                                                        <br />
                                                        <span>
                                                            Send transaction to create your NFT
                                                        </span>
                                                    </li>
                                                    <li >
                                                        {
                                                            fixed ?
                                                                (fixed == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">
                                                                        <img style={{ visibility: fixed == 1 ? 'visible' : 'hidden' }} alt="" src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Set fixed price</b>
                                                        <br />
                                                        <span>Sign message to set fixed price</span>
                                                    </li>

                                                </ul>
                                            </div>
                                        )
                                        :
                                        <>
                                            <div className="col-md-12">
                                                <ul>
                                                    <li>
                                                        {
                                                            upload ?
                                                                (upload == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">
                                                                        <img alt="" style={{ visibility: upload == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Check</b>
                                                        <br />
                                                        <span>
                                                            Checking balance
                                                        </span>
                                                    </li>
                                                    <li>
                                                        {
                                                            mint ?
                                                                (mint == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">
                                                                        <img alt="" style={{ visibility: mint == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Buy</b>
                                                        <br />
                                                        <span>
                                                            Please Accept the transaction.
                                                        </span>
                                                    </li>
                                                    <li >
                                                        {
                                                            fixed ?
                                                                (fixed == 5 ?
                                                                    <i className="chec-iocn" onClick={() => func()} style={{ cursor: "pointer" }}>
                                                                        <img alt="" src={`/images/${'reload-button.svg'}`} />
                                                                    </i>
                                                                    : <i className="chec-iocn">
                                                                        <img alt="" style={{ visibility: fixed == 1 ? 'visible' : 'hidden' }} src={`/images/${'check-active.svg'}`} />
                                                                    </i>)
                                                                :
                                                                <span className="m-2 me-3">
                                                                    <Spinner animation="border" size="sm" />
                                                                </span>

                                                        }
                                                        <b>Transfer</b>
                                                        <br />
                                                        <span>Please wait NFT is being transferred</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
export default Follow;
