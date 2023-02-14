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
import { Modal } from "react-bootstrap";
import CreatePopUp from "../components/CreateScreen/CreatePopUp";
import Wallet from "../components/Navbar/Wallet";
import Offcanvas from "react-bootstrap/Offcanvas";
import Subscribe from "./Subscribe";
import CountdownTimerHome from "./CountdownTimerHome";
import { API } from "../apiwrapper";
import { apiURl } from "../store/actions";
import { toast } from "react-toastify";
import { BASECONFIG } from "../config";
import moment from "moment";

const Home = () => {
  const {
    CuratedNft,
    TrendingNft,
    bipoc,
    femalecreator,
    lgbtq,
    CreatorCategory = [],
  } = useSelector((state) => state.Slider);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address, disconnectWallet, error } = useWeb3();
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [celeData, setCeleData] = useState([]);
  const [celebritylistData, setCelebritylistData] = useState([]);

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

  const fetchCategory = async (id) => {
    try {
      await API({
        url: `${apiURl.celebdata}/${id}`,
        method: "GET",
      }).then((data) => {
        console.log("data", data);
        if (data?.status || data?.status === "true") {
          setCeleData(data?.response || []);
        }
        console.log(data, "celebdata");
      });
    } catch (error) {
      console.log(error);
      toast(`Something Wrong.`, { type: "error" });
    }
  };
  const fetchCelebritylist = async () => {
    try {
      await API({
        url: `${apiURl.celebritylist}`,
        method: "GET",
      }).then((data) => {
        console.log("celebritylist", data);
        if (data?.status || data?.status === "true") {
          setCelebritylistData(data?.response || []);
        }
        console.log(data, "celebdata");
      });
    } catch (error) {
      console.log(error);
      toast(`Something Wrong.`, { type: "error" });
    }
  };
  const handleCategory = async (id) => {
    fetchCategory(id);
  };

  useEffect(() => {
    if (CreatorCategory?.length) {
      let id = CreatorCategory?.find(
        (elt) => elt.Creatorname === "Movies"
      )?._id;
      fetchCategory(id);
    }
    fetchCelebritylist();
  }, [CreatorCategory]);

  return (
    <>
      {showPopup && <OpenModal />}

      <section className="videoBox">
        <video src="../images/Mintavibe-Landing-Page.mp4" autoPlay loop controlsList="nodownload">
          <source src="../images/Mintavibe-Landing-Page.mp4" type="video/mp4" />
          <source src="../images/Mintavibe-Landing-Page.ogg" type="video/ogg" />
        </video>

        {/* <img className="img-fluid" src="../images/video-23.jpg" /> */}
      </section>

      <section className="nftSection">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg col-md-4">
              <h3>
                Exclusive Celebrity's <br className="d-none d-lg-block" /> NFTs
              </h3>
              <p>Join the exclusive club of fans of your favorite celebrities and get a rare glimpse into their world through unique NFTs.</p>
            </div>

            <div className="col-lg col-md-4 mx-lg-5">
              <h3>
                Own a moment in your <br className="d-none d-lg-block" />
                favourite celebrities
              </h3>
              <p>Take possession of a special moment from the life of your <br className="d-none d-lg-block" /> favorite celebrity and treasure <br className="d-none d-lg-block" />it forever through the ownership <br className="d-none d-lg-block" />of an NFT.</p>
            </div>

            <div className="col-lg col-md-4">
              <h3>
                Chance to meet
              </h3>
              <p>Experience the thrill of getting up close and personal with your favorite celebrity by gaining access to their world through NFTs that provide exclusive insights and the chance to interact directly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="celebrityNFT">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="exclCelebrity">
                <h2>Exclusive Celebrity's NFTs</h2>
                <h3>Limited Edition. Unlimited potential</h3>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <div className="crtNftScroll">
                <div className="flex-container flex-wrap">
                  {CreatorCategory?.length > 0 &&
                    CreatorCategory?.map((ele) => (
                      <button
                        className={`tabsection ${
                          !ele.coming_soon ? "active" : ""
                        }`}
                        key={ele._id}
                        disabled={ele.coming_soon}
                        onClick={() => handleCategory(ele._id)}
                        style={{ cursor: ele.coming_soon ? "" : "pointer" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKENDURL}/${ele.image}`}
                          width={50}
                          height={50}
                          className="actBtn"
                          alt=""
                        />
                        <img
                          src={`${process.env.REACT_APP_BACKENDURL}/${ele.active_image}`} //white
                          width={50}
                          height={50}
                          className="norBtn"
                          alt=""
                        />
                        {ele.coming_soon && (
                          <small className="comSoon">COMMING SOON</small>
                        )}
                        <span className="right">{ele.Creatorname}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-md-10">
              <div className="celebrityDtl">
                <div className="row align-items-center justify-content-around">
                  {celeData.length > 0 &&
                    celeData?.map((cele) => (
                      <>
                        <div className="col-md-5 h-100">
                          <div className="countDown">
                            <CountdownTimerHome targetDate={cele.Start_time} />
                          </div>
                          <Link
                            className="celebFrame"
                            to={`/${
                              cele.Creator_type?.Creatorname || "Unknown"
                            }/${cele.Slug}`}
                          >
                            <figure>
                              <img
                                src={`${BASECONFIG.BASE_URL}/${cele.image}`}
                                alt="Crosstower"
                              />
                              <span className="typeCelebrity">
                                {cele?.celebrityCategory}
                              </span>
                              <span className="nameTitle">
                                {cele?.celebrityname}
                              </span>
                            </figure>
                          </Link>
                          <div className="figCaption">
                            <h3>{cele.Title}</h3>

                            <p>{cele.Description}</p>
                          </div>
                        </div>
                      </>
                    ))}

                  {/* <div className="col-md-5">
                    <div className="countDown">
                      <CountdownTimerHome targetDate={new Date("04/03/2023")} />
                    </div>
                    <figure>
                      <Link to={"/celebrity/Anupam_Kher"}>
                        <img
                          src="../images/anupam-kher-nft.png"
                          className="img-fluid"
                        />
                      </Link>
                    </figure>
                    <div className="figCaption">
                      <h3>Mr. Kher in his</h3>
                      <h3>Be Brave like Bittu Collection</h3>
                      <p>
                        Insight into his world, his projects, side initiatives.
                        Chance to intract directly and be truely a part of his
                        world.
                      </p>

                    </div>
                  </div> */}
                  {/* 
                  <div className="col-md-5">
                    <div className="countDown">
                      <CountdownTimerHome targetDate={new Date("04/04/2023")} />
                    </div>
                    <figure>
                      <Link to={"/celebrity/Arjun_Rampal"}>
                        <img
                          src="../images/arjun-ram-pal-nft.png"
                          className="img-fluid"
                        />
                      </Link>
                    </figure>
                    <div className="figCaption">
                      <h3>Mr. Rampal</h3>
                      <h3>Stay Fit with Arjun Rampal</h3>
                      <p>
                        Insight into his world, his projects, side initiatives.
                        Chance to interact directly and be truly a part of his
                        world.
                      </p>
                    </div>
                  </div> */}
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
              <h3>Celebrities NFTs</h3>
              <SliderParent
                className={`top`}
                autoplay={true}
                draggable={true}
                arrows={false}
                dots={false}
                infinite={true}
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
                {celebritylistData?.length > 0
                  ? celebritylistData?.map((ele) => (
                      <Link to={`/collections/${ele?._id}`}>
                        <img
                          className="img-fluid"
                          src={`${process.env.REACT_APP_BACKENDURL}/${ele?.image}`}
                          alt=""
                        />
                      </Link>
                    ))
                  : ""
                    // <>
                    //   <img
                    //     src="../images/ak01.png"
                    //     className="img-fluid"
                    //     alt=""
                    //   />
                    //   <img
                    //     src="../images/ak02.png"
                    //     className="img-fluid"
                    //     alt=""
                    //   />
                    //   <img
                    //     src="../images/ak06.png"
                    //     className="img-fluid"
                    //     alt=""
                    //   />
                    //   <img
                    //     src="../images/ak04.png"
                    //     className="img-fluid"
                    //     alt=""
                    //   />
                    //   <img
                    //     src="../images/ak05.png"
                    //     className="img-fluid"
                    //     alt=""
                    //   />
                    // </>
                }
              </SliderParent>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="upcomingCelebrity">
        <div className="container">
          <div className="countDown">
            <ul>
              <li>
                12<p>Days</p>
              </li>
              <li>
                02<p>HRS</p>
              </li>
              <li>
                29<p>Min</p>
              </li>
              <li>
                24<p>Sec</p>
              </li>
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
                      <img
                        src="../images/akLandingImage.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="abtCelebt">
                        <h3>Drop 1: Three Editions</h3>
                        <h4>About Collection</h4>
                        <p>
                          This is a chance to engage with Mr. Rampal in his “Be
                          Brave like Bittu” collection where he provides
                          coaching via the lens of his 12-year-old un-inhibited
                          self that made him takes risks, pursue his dreams and
                          traverse his path to success.
                        </p>
                        <p>
                          With the purchase of this NFT the holders will collect
                          his Bittu mascot NFTs which will have different traits
                          unlocking benefits to fans.
                        </p>
                        <p>
                          Insight into his world, his projects, side
                          initiatives. Chance to interact directly and be truly
                          a part of his world.
                        </p>
                        <div className="editionSection mt-5">
                          <div>
                            <p>Edition</p>
                            <p className="amount">14,400.00</p>
                          </div>
                          <div className="ps-5">
                            <a href="#" className="moreBtn">
                              View More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="row justify-content-center mt-5">
                    <div className="col-md-4 me-4">
                      <img
                        src="../images/akLandingImage.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="abtCelebt">
                        <h3>Drop 1: Three Editions</h3>
                        <h4>About Collection</h4>
                        <p>
                          This is a chance to engage with Mr. Rampal in his “Be
                          Brave like Bittu” collection where he provides
                          coaching via the lens of his 12-year-old un-inhibited
                          self that made him takes risks, pursue his dreams and
                          traverse his path to success.
                        </p>
                        <p>
                          With the purchase of this NFT the holders will collect
                          his Bittu mascot NFTs which will have different traits
                          unlocking benefits to fans.
                        </p>
                        <p>
                          Insight into his world, his projects, side
                          initiatives. Chance to interact directly and be truly
                          a part of his world.
                        </p>
                        <div className="editionSection mt-5">
                          <div>
                            <p>Edition</p>
                            <p className="amount">14,400.00</p>
                          </div>
                          <div className="ps-5">
                            <a href="#" className="moreBtn">
                              View More
                            </a>
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
      </section> */}

      <section className="createYourWalet">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h3>How to create your wallet</h3>
                <p>A crypto wallet is a tool that allows you to securely hold and manage your digital assets. It operates on the principle of self-custody, where you have sole control over your crypto as it is stored on the blockchain. Accessing your funds is made possible through the use of a private key, providing a convenient and secure alternative to traditional intermediaries such as banks.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-5">
              <h4>Steps of how to create a wallet</h4>
              <ul className="walletSteps">
                <li>
                  <span>1</span> Select a software wallet app you want to use.
                </li>
                <li>
                  <span>2</span> Download the wallet app to your phone or
                  computer.
                </li>
                <li>
                  <span>3</span> Create an account.
                </li>
                <li>
                  <span>4</span> Transfer assets.
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="imageSection">
                <img src="../images/mintaVideo.png" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Subscribe />

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
              femalecreator.map((value, index) => (
                <Card key={index} {...value} />
              ))
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
