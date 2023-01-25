import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SliderParent from "../components/Slider";
import { HomeSlider } from "../constant/homeSilder";
import Card from "../components/NftCard/card";
import SliderSection from "../components/SectionCard/slider-section";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SetpopupReducerData } from "../store/reducer";
import { useWeb3 } from "@3rdweb/hooks";
import OpenModal from "../components/Navbar/OpenModal";
import { Modal,  } from "react-bootstrap";
import CreatePopUp from "../components/CreateScreen/CreatePopUp";
import Wallet from "../components/Navbar/Wallet";
import Offcanvas from "react-bootstrap/Offcanvas";



function AkPage() {


const { CuratedNft, TrendingNft, bipoc, femalecreator, lgbtq } = useSelector(
    (state) => state.Slider
);
const [text, setText] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
const { address, disconnectWallet, error } = useWeb3();
const [show, setShow] = useState(false);
const [showPopup, setShowPopup] = useState(false);

const { loginUserData = {} } = useSelector((state) => state.authUser);
const { User } = useSelector((state) => state);
const { image = null, _id = false, type = false } = User?.data;
const [showCreatePopup, setShowCreatePopup] = useState(false);
const handleCloseCreatePopup = () => setShowCreatePopup(false);

const handleShow = () => setShow(!show);
const handleShowLogin = () => {
    dispatch(SetpopupReducerData({ modalType: "LOGIN", showModal: true }));
    setShowPopup(true);
};
const handleShowCreatePopup = (e) => {
    console.log(e);
    e.preventDefault();
    if (!loginUserData?.token) {
    handleShowLogin();
    return;
    }
    console.log(type, address, e);
    if (type === "XUMM") {
    navigate(`/create/One`);
    return;
    }
    if (!address) {
    handleShow();
    // toast(NotificationMsg.NotConnect, { type: "info" });
    return;
    }
    setShowCreatePopup(true);
};




  return (
    <div>

        <section className="clbrtBanner">
            <Container>
            <Row className="align-items-center justify-content-center">
                <Col md={6}>
                <h1>NFT'S Of Your Favourite Celebrities</h1>
                <p>MintAVibe has an exclusive collection of digital collectibles of your favourite celebrities in one place.</p>
                </Col>

                <Col md={5}>
                <SliderParent
                    className={`bnrSlider`}
                    dots={true}
                    infinite={true}
                    speed={100}
                    autoplay={true}
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    dotsClass="slick-dots li button:before"
                    sliderbannerClass="container"
                    bannerClass="row"
                    headingClass="col-md-7"
                    rowClass="col-md-5"
                    headerClass="search"
                    profile-walletClass="col-auto"
                    slickClass="slick-slider"
                    arrowClass=".slick-prev:before"
                    heartClass="fa, .fas"
                    searchClass="search-section.input-group"
                >
                    {HomeSlider.map(({ image, text, id }, index) => (
                    <div key={index} onClick={() => setText(id)}>
                        <a href={`#${id}`}>
                        {/* <img src={image?image:"/images/Art1.jpg"} alt="crosstower" /> */}
                        <img src="../images/anupamKhair1.png" />
                        <h2>{text}</h2>
                        </a>
                    </div>
                    ))}
                </SliderParent>
                </Col>
            </Row>
            </Container>
        </section>

        
        <section className="abtEdition">
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="col-md-4 me-4">
                        <img src="../images/akLandingImage.png" className="img-fluid" />
                    </div>
                    <div className="col-md-7">
                        <div className="abtCelebt">
                        <h3>Drop 1: Three Editions</h3>
                        <h4>About Collection</h4>
                        <p>This is a chance to engage with Mr. Rampal in his “Be Brave like Bittu” collection where he provides coaching via the lens of his 12-year-old un-inhibited self that made him takes risks, pursue his dreams and traverse his path to success.</p>
                        <p>With the purchase of this NFT the holders will collect his Bittu mascot NFTs which will have different traits unlocking benefits to fans.</p>
                        <p>Insight into his world, his projects, side initiatives. Chance to interact directly and be truly a part of his world.</p>
                            <div className="editionSection mt-5">
                              <div>
                                <p>Edition</p>
                                <p className="amount">14,400.00</p>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
  )
}

export default AkPage