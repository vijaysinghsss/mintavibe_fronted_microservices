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


const Home = () => {
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
    <>
      {showPopup && <OpenModal />}
      <section className="hero-section">
        <Container>
          <Row>
            <Col md={7}>
              <h1>
                We’re on a mission to make <br className="br" /> NFTs accessible
                to ALL.
              </h1>
              <p style={{ marginTop: "-9px" }}>
                Join us as we discover and celebrate NFTs of all styles, <br />
                from all kinds, to all people.
                <br className="br" />
                <p
                  className="banner-bold-text"
                  style={{
                    marginTop: "26px",
                    color: "#fff",
                    fontWeight: "bolder",
                  }}
                >
                  <b>
                    {" "}
                    <Link to={"/nftforall"}>#NFTforALL </Link>{" "}
                  </b>
                </p>
              </p>
              <div className="btn-hero-b">
                <a href="!#" onClick={handleShowCreatePopup}>
                  Create
                </a>
              </div>
              <div className="btn-hero-w">
                <Link to="/nftlist">Collect</Link>
              </div>
            </Col>
            <Col md={5}>
              <SliderParent
                className={`bannrer-sider`}
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
                      <img src={image?image:"/images/Art1.jpg"} alt="crosstower" />
                      <h2>{text}</h2>
                    </a>
                  </div>
                ))}
              </SliderParent>
            </Col>
          </Row>
        </Container>
      </section>

      <SliderSection
        title={`Curated For ALL`}
        id={"curatedSection"}
        text={text}
      >
        <SliderParent
          className={`top`}
          autoplay={true}
          draggable={true}
          arrows={true}
          dots={false}
          infinite={false}
          speed={300}
          swipeToSlide={true}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {Array.isArray(CuratedNft) && CuratedNft.length ? (
            CuratedNft.map((value, index) => <Card key={index} {...value} />)
          ) : (
            <div className="no-details">
              <img
                src="https://nft.crosstower.com/assets/no_data.png"
                className="img-responsive"
                alt=""
                width={`100%`}
              />
            </div>
          )}
        </SliderParent>
      </SliderSection>

      <SliderSection title={`Trending`} id={`trendingSection`} text={text}>
        <SliderParent
          className={`top`}
          autoplay={true}
          draggable={true}
          arrows={true}
          dots={false}
          infinite={false}
          speed={300}
          swipeToSlide={true}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {Array.isArray(TrendingNft) && TrendingNft.length ? (
            TrendingNft.map((value, index) => <Card key={index} {...value} />)
          ) : (
            <div className="no-details">
              <img
                src="https://nft.crosstower.com/assets/no_data.png"
                className="img-responsive"
                alt=""
                width={`100%`}
              />
            </div>
          )}
        </SliderParent>
      </SliderSection>

      <SliderSection
        title={`By Bipoc Creators `}
        id={`bipocSection`}
        text={text}
      >
        <SliderParent
          className={`top`}
          autoplay={true}
          draggable={true}
          arrows={true}
          dots={false}
          infinite={false}
          speed={300}
          swipeToSlide={true}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {Array.isArray(bipoc) && bipoc.length ? (
            bipoc.map((value, index) => <Card key={index} {...value} />)
          ) : (
            <div className="no-details">
              <img
                src="https://nft.crosstower.com/assets/no_data.png"
                className="img-responsive"
                alt=""
                width={`100%`}
              />
            </div>
          )}
        </SliderParent>
      </SliderSection>

      <SliderSection
        title={`By Female Creators `}
        id={`femaleSection`}
        text={text}
      >
        <SliderParent
          className={`top`}
          autoplay={true}
          draggable={true}
          arrows={true}
          dots={false}
          infinite={false}
          speed={300}
          swipeToSlide={true}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {Array.isArray(femalecreator) && femalecreator.length ? (
            femalecreator.map((value, index) => <Card key={index} {...value} />)
          ) : (
            <div className="no-details">
              <img
                src="https://nft.crosstower.com/assets/no_data.png"
                className="img-responsive"
                alt=""
                width={`100%`}
              />
            </div>
          )}
        </SliderParent>
      </SliderSection>

      <SliderSection
        title={`By LGBTQ+ Creators`}
        id={`lgbtSection`}
        text={text}
      >
        <SliderParent
          className={`top`}
          autoplay={true}
          draggable={true}
          arrows={true}
          dots={false}
          infinite={false}
          speed={300}
          swipeToSlide={true}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            {
              breakpoint: 1113,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]}
        >
          {Array.isArray(lgbtq) && lgbtq.length ? (
            lgbtq.map((value, index) => <Card key={index} {...value} />)
          ) : (
            <div className="no-details">
              <img
                src="https://nft.crosstower.com/assets/no_data.png"
                className="img-responsive"
                alt=""
                width={`100%`}
              />
            </div>
          )}
        </SliderParent>
      </SliderSection>
      <Offcanvas show={show} onHide={handleShow} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Connect Your Wallet</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Wallet />
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        size="lg"
        centered
        show={showCreatePopup}
        onHide={handleCloseCreatePopup}
      >
        <Modal.Body>
          <CreatePopUp close={handleCloseCreatePopup} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
