import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";
import { stringify } from "../../store/actions/common-functions";
import { SetBuyData, SetFollowrData } from "../../store/reducer";
function Follow() {
  const {
    upload,
    mint,
    fixed,
    approve,
    modal,
    ModalType = "Create",
    func = () => {},
    help = false,
    MulBuyXRP = { qty: 0, remainig: 0 },
  } = useSelector((state) => state.Follow.data);

  const [showFollow, setShowFollow] = useState(true);

  const dispatch = useDispatch();

  const { type = false } = useSelector((state) => state.User?.data);

  const handleCloseFollow = () => {
    dispatch(
      SetFollowrData({
        upload,
        mint,
        fixed,
        approve,
        ModalType,
        func,
        help,
        modal: false,
      })
    );
  };

  useEffect(() => {
    setShowFollow(modal);
  }, [modal]);

  const helpRunMail = (e) => {
    e.preventDefault();
    if (help) {
      API({ url: apiURl.helpmail, method: "POST", body: { body: help } });
    }
  };
console.log(ModalType,MulBuyXRP,"MulBuyXRP")
  const modalBodyType = (type, wallet) => {
    switch (type) {
      case "MulBuy":
        return (
          <>
            <div className="col-md-12">
            {MulBuyXRP?.qty > 1 &&<h1 className="text-center">{`${MulBuyXRP?.remainig} of ${MulBuyXRP?.qty}`}</h1>}
              <ul>
                <li>
                  {upload ? (
                    upload == 5 ? (
                      <i
                        className="chec-iocn"
                        onClick={() => func()}
                        style={{ cursor: "pointer" }}
                      >
                        <img alt="" src={`/images/${"reload-button.svg"}`} />
                      </i>
                    ) : (
                      <i className="chec-iocn">
                        <img
                          alt=""
                          style={{
                            visibility: upload == 1 ? "visible" : "hidden",
                          }}
                          src={`/images/${"check-active.svg"}`}
                        />
                      </i>
                    )
                  ) : (
                    <span className="m-2 me-3">
                      <Spinner animation="border" size="sm" />
                    </span>
                  )}
                  <b>Check</b>
                  <br />
                  <span>Checking balance</span>
                </li>
                <li>
                  {mint ? (
                    mint == 5 ? (
                      <i
                        className="chec-iocn"
                        onClick={() => func()}
                        style={{ cursor: "pointer" }}
                      >
                        <img alt="" src={`/images/${"reload-button.svg"}`} />
                      </i>
                    ) : (
                      <i className="chec-iocn">
                        <img
                          alt=""
                          style={{
                            visibility: mint == 1 ? "visible" : "hidden",
                          }}
                          src={`/images/${"check-active.svg"}`}
                        />
                      </i>
                    )
                  ) : (
                    <span className="m-2 me-3">
                      <Spinner animation="border" size="sm" />
                    </span>
                  )}
                  <b>Buy</b>
                  <br />
                  <span>Please Accept the transaction.</span>
                </li>
                <li>
                  {fixed ? (
                    fixed == 5 ? (
                      <i
                        className="chec-iocn"
                        onClick={() => func()}
                        style={{ cursor: "pointer" }}
                      >
                        <img alt="" src={`/images/${"reload-button.svg"}`} />
                      </i>
                    ) : (
                      <i className="chec-iocn">
                        <img
                          alt=""
                          style={{
                            visibility: fixed == 1 ? "visible" : "hidden",
                          }}
                          src={`/images/${"check-active.svg"}`}
                        />
                      </i>
                    )
                  ) : (
                    <span className="m-2 me-3">
                      <Spinner animation="border" size="sm" />
                    </span>
                  )}
                  <b>Transfer</b>
                  <br />
                  <span>Please wait NFT is being transferred</span>
                </li>
              </ul>
            </div>
          </>
        );
      case "BURN":
        return (
          <div className="col-md-12">
            <ul>
              <li>
                {upload ? (
                  <i className="chec-iocn">
                    <img
                      alt=""
                      style={{
                        visibility: upload == 1 ? "visible" : "hidden",
                      }}
                      src={`/images/${"check-active.svg"}`}
                    />
                  </i>
                ) : (
                  <span className="m-2 me-3">
                    <Spinner animation="border" size="sm" />
                  </span>
                )}
                <b>Burn</b>
                <br />
                <span>Please Accept The Transaction</span>
              </li>
            </ul>
          </div>
        );
      case "OFFER":
        return (
          <div className="col-md-12">
            <ul>
              <li>
                {upload ? (
                  <i className="chec-iocn">
                    <img
                      alt=""
                      style={{
                        visibility: upload == 1 ? "visible" : "hidden",
                      }}
                      src={`/images/${"check-active.svg"}`}
                    />
                  </i>
                ) : (
                  <span className="m-2 me-3">
                    <Spinner animation="border" size="sm" />
                  </span>
                )}
                <b>Burn</b>
                <br />
                <span>Please Accept The Transaction</span>
              </li>
              <li>
                {mint ? (
                  <i className="chec-iocn">
                    <img
                      alt=""
                      style={{
                        visibility: mint == 1 ? "visible" : "hidden",
                      }}
                      src={`/images/${"check-active.svg"}`}
                    />
                  </i>
                ) : (
                  <span className="m-2 me-3">
                    <Spinner animation="border" size="sm" />
                  </span>
                )}
                <b>Burn</b>
                <br />
                <span>Please Accept The Transaction</span>
              </li>
              <li>
                {fixed ? (
                  <i className="chec-iocn">
                    <img
                      alt=""
                      style={{
                        visibility: fixed == 1 ? "visible" : "hidden",
                      }}
                      src={`/images/${"check-active.svg"}`}
                    />
                  </i>
                ) : (
                  <span className="m-2 me-3">
                    <Spinner animation="border" size="sm" />
                  </span>
                )}
                <b>Burn</b>
                <br />
                <span>Please Accept The Transaction</span>
              </li>
            </ul>
          </div>
        );
      case "Create":
        switch (wallet) {
          case "XUMM":
            return (
              <div className="col-md-12">
                <ul>
                  <li>
                    {upload ? (
                      <i className="chec-iocn">
                        <img
                          alt=""
                          style={{
                            visibility: upload == 1 ? "visible" : "hidden",
                          }}
                          src={`/images/${"check-active.svg"}`}
                        />
                      </i>
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Check</b>
                    <br />
                    <span>Check balance and approve</span>
                  </li>
                  <li>
                    {mint ? (
                      mint == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: mint == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Mint</b>
                    <br />
                    <span>Please Accept the transaction.</span>
                  </li>
                  <li>
                    {fixed ? (
                      fixed == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: fixed == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Create</b>
                    <br />
                    <span>Please Accept the transaction in Xumm Wallet</span>
                  </li>
                </ul>
              </div>
            );

          default:
            return (
              <div className="col-md-12">
                <ul>
                  <li>
                    {upload ? (
                      <i className="chec-iocn">
                        <img
                          style={{
                            visibility: upload == 1 ? "visible" : "hidden",
                          }}
                          alt=""
                          src={`/images/${"check-active.svg"}`}
                        />
                      </i>
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Upload</b>
                    <br />
                    <span>Check balance and approve</span>
                  </li>
                  <li>
                    {approve ? (
                      approve == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            style={{
                              visibility: approve == 1 ? "visible" : "hidden",
                            }}
                            alt=""
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Approve</b>
                    <br />
                    <span>
                      This transaction is conducted only once per collection
                    </span>
                  </li>
                  <li>
                    {mint ? (
                      mint == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            style={{
                              visibility: mint == 1 ? "visible" : "hidden",
                            }}
                            alt=""
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Mint</b>
                    <br />
                    <span>Send transaction to create your NFT</span>
                  </li>
                  <li>
                    {fixed ? (
                      fixed == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            style={{
                              visibility: fixed == 1 ? "visible" : "hidden",
                            }}
                            alt=""
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Set fixed price</b>
                    <br />
                    <span>Sign message to set fixed price</span>
                  </li>
                </ul>
              </div>
            );
        }

      default:
        switch (type) {
          case "stripe":
            return (
              <div className="col-md-12">
                <ul>
                  {/* <li>
                            {upload ? (
                              upload == 5 ? (
                                <i
                                  className="chec-iocn"
                                  onClick={() => func()}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    alt=""
                                    src={`/images/${"reload-button.svg"}`}
                                  />
                                </i>
                              ) : (
                                <i className="chec-iocn">
                                  <img
                                    alt=""
                                    style={{
                                      visibility:
                                        upload == 1 ? "visible" : "hidden",
                                    }}
                                    src={`/images/${"check-active.svg"}`}
                                  />
                                </i>
                              )
                            ) : (
                              <span className="m-2 me-3">
                                <Spinner animation="border" size="sm" />
                              </span>
                            )}
                            <b>Check</b>
                            <br />
                            <span>Checking balance</span>
                          </li> */}
                  <li>
                    {mint ? (
                      mint == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: mint == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Buy</b>
                    <br />
                    <span>Please Accept the transaction.</span>
                  </li>
                  <li>
                    {fixed ? (
                      fixed == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: fixed == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Transfer</b>
                    <br />
                    <span>Please wait NFT is being transferred</span>
                  </li>
                  {(mint == 5 || fixed == 5 || mint == 5) && (
                    <li className="text-center ">
                      <button
                        className="btn btn-sm btn-success ms-4"
                        onClick={helpRunMail}
                      >
                        {" "}
                        Help
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          default:
            return (
              <div className="col-md-12">
                <ul>
                  <li>
                    {upload ? (
                      upload == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: upload == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Check</b>
                    <br />
                    <span>Checking balance</span>
                  </li>
                  <li>
                    {mint ? (
                      mint == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: mint == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Buy</b>
                    <br />
                    <span>Please Accept the transaction.</span>
                  </li>
                  <li>
                    {fixed ? (
                      fixed == 5 ? (
                        <i
                          className="chec-iocn"
                          onClick={() => func()}
                          style={{ cursor: "pointer" }}
                        >
                          <img alt="" src={`/images/${"reload-button.svg"}`} />
                        </i>
                      ) : (
                        <i className="chec-iocn">
                          <img
                            alt=""
                            style={{
                              visibility: fixed == 1 ? "visible" : "hidden",
                            }}
                            src={`/images/${"check-active.svg"}`}
                          />
                        </i>
                      )
                    ) : (
                      <span className="m-2 me-3">
                        <Spinner animation="border" size="sm" />
                      </span>
                    )}
                    <b>Transfer</b>
                    <br />
                    <span>Please wait NFT is being transferred</span>
                  </li>
                </ul>
              </div>
            );
        }
        return;
    }
  };

  return (
    <div>
      <Modal
        show={showFollow}
        hide={handleCloseFollow}
        size="lg offerPoup followSteps"
        contentClassName="modal-custom"
      >
        <div className="pop-bg">
          <form>
            <div className="pop_content">
              <div className="close-button" onClick={handleCloseFollow}>
                <a onClick={(e) => e.preventDefault()} href="!#">
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
                  {modalBodyType(ModalType, type)}
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
