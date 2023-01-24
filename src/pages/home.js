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


      <section className="videoBox">
        <img className="img-fluid" src="../images/video-23.jpg" />
      </section>


      <section className="nftSection">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-3 col-md-4">
              <h3>Exclusive Celebrity's <br className="d-none d-lg-block"/>NFTs</h3>
              <p>Be a part of your favourite Bollywood celebrity's world by getting insights to his world in the form of NFTs</p>
            </div>

            <div class="col-lg-3 col-md-4">
              <h3>Own a moment in your <br className="d-none d-lg-block"/>favourite celebrities</h3>
              <p>Own a moment of your favourite character of your favourite movie or celebrity's life in the form of NFTs</p>
            </div>

            <div class="col-lg-3 col-md-4">
              <h3>Chance to <br className="d-none d-lg-block"/>meet</h3>
              <p>Get Insights into your favourite celeb's world. Chance to interact directly and be truly a part of his/her world.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="celebrityNFT">
        <div className="container">
            <div class="row">
              <div class="col-md-12">
                <div class="exclCelebrity">
                  <h2>Exclusive Celebrity's NFTs</h2>
                  <h3>Limited Edition. Unlimited potential</h3>
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                  <div class="flex-container">
                    <div class="tabsection active button1">
                      <img src="../images/moviesLogo.png" alt="" />
                      <span class="right">Movies</span>
                    </div>
                    <div class="tabsection button2">
                        <img src="../images/musicIcon.png" alt="" />
                        <span class="right">Music</span>
                    </div>
                    <div class="tabsection button3">
                      <img src="../images/sportsLogo.png" alt="" />
                      <span class="right">Sports</span>
                    </div>
                    <div class="tabsection button4">
                      <img src="../images/influencerLogo.png" alt="" />
                      <span class="right">Influncer</span>
                    </div>
                    <div class="tabsection button5">
                      <img src="../images/labelsLogo.png" alt="" />
                      <span class="right">Fashion</span>
                    </div>
                  </div>
                
              </div>
            </div>

            <div class="row justify-content-center mt-5">
              <div class="col-md-10">
                <div class="celebrityDtl">
                  <div class="row align-items-center">
                    <div class="col-md-5"><img src="../images/bollywood-p0.png" class="img-fluid"/></div>
                    <div class="col-md-7">  
                      <div class="figCaption">
                        <h3>Mr. Kher in his</h3>
                        <h3>Be Brave like Bittu Collection</h3>
                        <p>Insight into his world, his projects, side initiatives. Chance to intract directly and be truely a part of his world.</p>
                        <div class="knowMore">
                          <a href="#">Know More</a>
                          <img src="../images/sigNature.png" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="celebrityPost">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h3>Celebrity NFTs</h3>
              <SliderParent
                className={`top`}
                autoplay={true}
                draggable={true}
                arrows={true}
                dots={false}
                infinite={false}
                speed={300}
                swipeToSlide={true}
                slidesToShow={3}
                slidesToScroll={3}
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
                  
                ]}
              >
                <img src="../images/ak01.png" className="img-fluid" alt="" />
                <img src="../images/ak02.png" className="img-fluid" alt="" />
                <img src="../images/ak06.png" className="img-fluid" alt="" />
                <img src="../images/ak04.png" className="img-fluid" alt="" />
                <img src="../images/ak05.png" className="img-fluid" alt="" />
              </SliderParent>
            </div>
          </div>
        </div>
      </section>

      <section className="upcomingCelebrity">
        <div className="container">
          <div className="countDown">
              <ul>
                <li>12<p>Days</p></li>
                <li>02<p>HRS</p></li>
                <li>29<p>Min</p></li>
                <li>24<p>Sec</p></li>
              </ul>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>Upcoming Celebrity Drops</h2>
              <SliderParent
                  className={`top`}
                  autoplay={true}
                  draggable={true}
                  arrows={true}
                  dots={false}
                  infinite={false}
                  speed={300}
                  swipeToSlide={true}
                  slidesToShow={1}
                  slidesToScroll={1}
                >
                    <div>
                      <div className="row justify-content-center mt-5">
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
                              <div className="ps-5">
                                <a href="#" className="moreBtn">View More</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="row justify-content-center mt-5">
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
                              <div className="ps-5">
                                <a href="#" className="moreBtn">View More</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </SliderParent>
            </div>
          </div>
        </div>
      </section>

      <section className="createYourWalet">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h3>How to create your wallet</h3>
                <p>A crypto wallet is a device designed to store and transfer your cryptocurrency through what's called
                  self-custody. That means instead of going through a third party, like a bank or financial institution,
                  you're able to store your crypto on the blockchain and access it using a private key more on that later.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-5">
              <h4>Steps of how to create a wallet</h4>
              <ul className="walletSteps">
                <li><span>1</span> Select a software wallet app you want to use.</li>
                <li><span>2</span> Download the wallet app to your phone or computer.</li>
                <li><span>3</span> Create an account.</li>
                <li><span>4</span> Transfer assets.</li>
              </ul>
            </div>
            <div className="col-md-6" >
              <div className="imageSection"><img src="../images/mintaVideo.png" className="img-fluid" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="subsScribe">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h3>Stay Informed</h3>
              <p>Receive Mintavibe news and updates directly to your inbox.</p>
              <div className="subScribeBox">
                <input type="text" className="form-control" placeholder="Write your email ID here." />
                <button className="btn subBtn">Subscribe Now!</button>
              </div>
            </div>
          </div>
        </div>
      </section>




      <section className="hero-section d-none">
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


<section className="d-none">

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

</section>

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
