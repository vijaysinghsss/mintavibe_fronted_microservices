import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SliderParent from "../Slider";
import { HomeSlider } from "../../constant/homeSilder";
import Card from "../NftCard/card";
import SliderSection from "../SectionCard/slider-section";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { SetpopupReducerData } from "../../store/reducer";
import { useWeb3 } from "@3rdweb/hooks";
import OpenModal from "../Navbar/OpenModal";
import { Modal } from "react-bootstrap";
import CreatePopUp from "../CreateScreen/CreatePopUp";
import Wallet from "../Navbar/Wallet";
import Offcanvas from "react-bootstrap/Offcanvas";
import Subscribe from "../../pages/Subscribe";
import { API } from "../../apiwrapper";
import { apiURl } from "../../store/actions";

function AnupamKher() {
  const { CuratedNft, TrendingNft, bipoc, femalecreator, lgbtq } = useSelector(
    (state) => state.Slider
  );
  const { Creatorname, Slug } = useParams();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address, disconnectWallet, error } = useWeb3();
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const [NftListAccording, setNftListAccording] = useState([]);
  const [banerList, setBanerList] = useState([]);

  const { loginUserData = {} } = useSelector((state) => state.authUser);
  const { User } = useSelector((state) => state);
  const { image = null, _id = false, type = false } = User?.data;
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const handleCloseCreatePopup = () => setShowCreatePopup(false);
  const classColor = ["coffeeLigh", "lightGry", "darkesBlue"];
  const handleShow = () => setShow(!show);
  const handleShowLogin = () => {
    dispatch(SetpopupReducerData({ modalType: "LOGIN", showModal: true }));
    setShowPopup(true);
  };

  useEffect(() => {
    API({ url: `${apiURl.categorydata}/${Slug}`, method: "GET" })
      .then((data) => data)
      .then((data) => {
        if (data.status) {
          setcategoryList(data.data?.allCategory || []);
        }
      });
  }, [Slug]);

  useEffect(() => {
    if (categoryList.length) {
      Promise.all(
        categoryList.map((value) =>
          API({
            url: `${apiURl.GetCollections}/${Slug}/${value._id}`,
            method: "GET",
          }).then((data) => data)
        )
      ).then((values) => {
        let dataArray = [];
        values.map((data) => {
          dataArray[data.collection_id] = Array.isArray(data.response)
            ? data.response
            : [];
        });

        setNftListAccording(dataArray);
      });
    }
  }, [Slug, categoryList]);
  useEffect(() => {
    let arr = categoryList?.map((item) => {
      return (
        Array.isArray(NftListAccording[item?._id]) &&
        NftListAccording[item?._id]?.[0]
      );
    });
    setBanerList(arr);
  }, [NftListAccording]);

  return (
    <div>
      <section className="clbrtBanner">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col md={6}>
              <h1>NFT'S Of Your Favourite Celebrities</h1>
              <p>Discover the exclusive collection of digital collectibles featuring your favorite celebrities, only at MintAVibe.</p>
            </Col>

            <Col md={6}>
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
                {banerList?.length > 0 &&
                  banerList?.map((ele, index) => (
                    <div key={index} onClick={() => setText(ele?.id)}>
                      <a href={`#${ele?.id}`}>
                        <img
                          src={
                            ele?.image
                              ? `${process.env.REACT_APP_BACKENDURL}/${ele.image}`
                              : "../images/anupamKhair1.png"
                          }
                          alt="anupam_img"
                        />
                        {/* <img src="../images/anupamKhair1.png" /> */}
                        <h2>
                          {ele?.Nftname.length < 20
                            ? ele?.Nftname
                            : ele?.Nftname.substr(0, 14) + "...."}
                        </h2>
                      </a>
                    </div>
                  ))}
              </SliderParent>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="abtEdition">
        <div className="container-md">
          <div className="row justify-content-center my-lg-5">
            <div className="col-auto col-md-5 pt-lg-5">
              <img src="../images/akLandingImage.png" className="img-fluid" />
            </div>
            <div className="col-md-7">
              <div className="abtCelebt">
                <h3>Drop 1: Three Editions</h3>
                <h4>About Collection</h4>
                <p>Join Mr. Kher as he takes you on a journey filled with bravery and success through the "Be Brave like Bittu" NFT collection. Immerse yourself in his world as you receive exclusive Bittu mascot NFTs with your purchase, offering a rare glimpse into his life and experiences. These NFTs not only serve as collectibles, but also unlock special perks and benefits for fans, providing an even deeper connection to Mr. Kher and his inspiring journey.</p>
                <p>By owning a piece of the "Be Brave like Bittu" collection, you will become a part of Mr. Kher's story and have the opportunity to engage directly with him. From exclusive merchandise drops to virtual meet and greets, your NFT will provide you with a unique and personal experience unlike any other. Join the community of fans who support Mr. Kher and be inspired by his bravery, determination, and success. Get ready to embark on a journey of a lifetime and "Be Brave like Bittu" with the exclusive NFT collection.</p>
                <div className="editionSection mt-4">
                  <div>
                    <p>Edition</p>
                    <p className="amount">14,400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* all categoery edition come by celebrity */}

      {categoryList.map((item, index) => {
        return (
          <section
            className={`comanNftSec ${classColor[index] ? classColor[index] : ""
              }`}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <h2>{item?.Categoryname}</h2>

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
                    {Array.isArray(NftListAccording[item?._id]) &&
                      NftListAccording[item?._id].length ? (
                      NftListAccording[item?._id].map((value, index) => (
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

                  {/* <div className="text-center mt-4">
                    <a className="viewMore">View More</a>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <Subscribe />
    </div>
  );
}

export default AnupamKher;
