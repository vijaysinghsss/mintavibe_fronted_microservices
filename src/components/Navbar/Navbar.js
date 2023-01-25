import Collapse from "react-bootstrap/Collapse";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import Wallet from "./Wallet";
import "../../menu.css";
import CreatePopUp from "../CreateScreen/CreatePopUp";
import { useSearchParams } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useWeb3 } from "@3rdweb/hooks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NotificationMsg } from "../../store/actions/api-url";
import { SetUserData, SetXummData } from "../../store/reducer/user";


import SliderParent from "../Slider/index";

// import SliderSection from "../SectionCard/slider-section";

import OpenModal from "./OpenModal";
import {
  SetpopupReducerData,
  SetSubscriptionUserData,
  SetthemeData,
} from "../../store/reducer";
import { id } from "ethers/lib/utils";
import { LOGOUT_USER_DATA } from "../../store/actions/ActionTypes";
function Navbar() {
  const { address, disconnectWallet, error } = useWeb3();
  const themeVal = localStorage.getItem("Theme");

  const { loginUserData = {} } = useSelector((state) => state.authUser);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { User } = useSelector((state) => state);

  const { image = null, _id = false, type = false } = User?.data;

  const [openProfile, setopenProfile] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [show, setShow] = useState(false);

  const [theme, setTheme] = useState(false);

  const handleShow = () => setShow(!show);
  const handleShowLogin = () => {
    dispatch(SetpopupReducerData({ modalType: "LOGIN", showModal: true }));
    setShowPopup(true);
  };

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const handleCloseCreatePopup = () => setShowCreatePopup(false);

  const handleShowCreatePopup = (e) => {
    e.preventDefault();

    // if (!loginUserData?.token) {
    //   handleShowLogin();
    //   return;
    // }

    // if (type === "XUMM") {
    //   navigate(`/create/One`);
    //   return;
    // }

    // if (!address) {
    //   handleShow();
    //   // toast(NotificationMsg.NotConnect, { type: "info" });
    //   return;
    // }

    setShowCreatePopup(true);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setShow((prev) => prev);
    if (error) {
      toast(JSON.stringify(error), { type: "error" });
    }
    return () => {
      dispatch(SetpopupReducerData({ modalType: "", showModal: false }));
    };
  }, [error]);

  const Logout = (e) => {
    e.preventDefault();
    // if (!!address) {
    //   disconnectWallet();
    // }
    dispatch(SetSubscriptionUserData({}));
    dispatch(SetUserData({}));
    dispatch(SetXummData(false));
    dispatch({
      type: LOGOUT_USER_DATA,
      payload: {},
    });
    localStorage.setItem("token", "");
    navigate("/");
  };
  const handleSetTheme = () => {
    let val = themeVal === "darkTheme" ? "lightTheme" : "darkTheme";
    localStorage.setItem("Theme", val);
  };
  useEffect(() => {
    dispatch(SetthemeData(theme));
    document.body.className = themeVal;
  }, [theme, themeVal]);

  return (
    <div>
      <div className="navbar-default w-100">
        {showPopup && <OpenModal />}
        <div className="container relative">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <NavLink index to="/" className="topLogo">
              <img className="img-fluid" src="../images/logo.png" alt="" />
              </NavLink>
            </div>
            <div className="col-lg-9">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <ul className="nav navbar-nav justify-content-end d-flex flex-row">
                    {/* <li><a href="!#" onClick={handleShowCreatePopup}>Create</a></li> */}
                    <li>
                      <NavLink to="/nftlist">Collect</NavLink>
                    </li>

                    <li>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={`Community`}
                        menuVariant="light"
                        className="customLink"
                      >
                        <NavDropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/blogs`);
                          }}
                          href="/blogs"
                        >
                          Blog
                        </NavDropdown.Item>
                        
                        <NavDropdown.Item href="#">Discord</NavDropdown.Item>
                        <NavDropdown.Item href="#">Contact Us</NavDropdown.Item>


                        {/* <NavDropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/about`);
                          }}
                          href="/about"
                        >
                          About Us
                        </NavDropdown.Item> 
                        
                        <NavDropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/faq`);
                          }}
                          href="/faq"
                        >
                          FAQ
                        </NavDropdown.Item> 

                        <NavDropdown.Item
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/terms-service`);
                          }}
                          href="/terms-service"
                        >
                          Terms of Service
                        </NavDropdown.Item> */}
                      </NavDropdown>
                    </li>
                    {/* <li>
                      <NavLink to="/nftforall">#NFTforAll</NavLink>
                    </li> */}
                  </ul>
                </div>
                <div className="col-md-5">
                  <div className="d-flex align-items-center">
                    <form id="form">
                      <div className="topSearch">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={(e) =>
                            setSearchParams({ query: e.target.value })
                          }
                        />
                        <button className="searchBtn" type="button">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                    <div className="ms-md-3">
                      <ul className="hedIcons">
                        {!loginUserData?.token && (
                          <li>
                            <button
                              className="btn btn-dark"
                              onClick={handleShowLogin}
                              style={{ border: "none" }}
                            >
                              Login
                            </button>
                          </li>
                        )}
                        {loginUserData?.token && (
                          <>
                            {
                              <li>
                                <NavDropdown
                                  id="nav-dropdown-dark-example"
                                  title={
                                    <img
                                      onClick={() =>
                                        setopenProfile(!openProfile)
                                      }
                                      className={image ? "filterNone" : ""}
                                      aria-controls="example-collapse-text"
                                      aria-expanded={openProfile}
                                      src={
                                        image
                                          ? process.env.REACT_APP_BACKENDURL +
                                            "/" +
                                            image
                                          : "/images/user-icon.svg"
                                      }
                                      alt=""
                                      title={address}
                                      width={40}
                                      height={40}
                                    />
                                  }
                                  menuVariant="light"
                                  className="customLink"
                                >
                                  <NavDropdown.Item
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(`/profile`);
                                    }}
                                    href="/profile"
                                    className="user-notice-box"
                                  >
                                    <div className="user-icon-box">
                                      <img
                                        alt=""
                                        src="/images/profile-iocn.svg"
                                      />
                                    </div>
                                    <p>Profile</p>
                                  </NavDropdown.Item>

                                  <NavDropdown.Item
                                    onClick={Logout}
                                    href="/edit-profile"
                                    className="user-notice-box"
                                  >
                                    <div className="user-icon-box">
                                      <img
                                        alt=""
                                        src="/images/settings-icon.svg"
                                      />
                                    </div>
                                    <p>LogOut</p>
                                  </NavDropdown.Item>
                                </NavDropdown>
                              </li>
                            }
                            <li>
                              <Link onClick={handleShow}>
                                <img src="/images/nav-wallet.svg" alt="" />
                              </Link>
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
                            </li>
                            <li>
                              <img src="/images/notice-icon.svg" alt="" />
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="topScroll">
          <div className="container">
              <div className="position-relative">
                <marquee direction="left" onmouseover="this.stop();" onmouseout="this.start();">
                  <ul>
                    <li><i class="far fa-hand-point-right"></i> Plaksha University made its first move in Metaverse</li>
                    <li><i class="far fa-hand-point-right"></i> ITSBLOC raised funds worth $7.5 million to build their new web 3.0 gaming platform</li>
                  </ul>
                </marquee>
                <div className="rightArrow"><i class="fas fa-arrow-circle-right"></i></div>
              </div>
          </div>
        </div>
      </div>





      <Modal
        size="lg offerPoup"
        centered
        show={showCreatePopup}
        onHide={handleCloseCreatePopup}
      >
        <CreatePopUp close={handleCloseCreatePopup} />
      </Modal>
    </div>
  );
}

export default Navbar;
